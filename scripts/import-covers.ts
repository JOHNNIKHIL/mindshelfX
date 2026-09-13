import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const MEDIA_DIR = path.resolve(process.cwd(), "Mediafiles");
const MAX_BYTES = 8 * 1024 * 1024;

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function normalize(value: string) {
  return value
    .replace(/\.[^/.]+$/, "")
    .replace(/fcked/gi, "f*cked")
    .replace(/fck/gi, "f*ck")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a: string, b: string) {
  if (a === b) return 1;
  const aa = new Set(a.split(" "));
  const bb = new Set(b.split(" "));
  const intersection = [...aa].filter((x) => bb.has(x)).length;
  const union = new Set([...aa, ...bb]).size;
  return union ? intersection / union : 0;
}

function isBlobUrl(value: string) {
  return /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//i.test(value);
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Run `vercel env pull .env.local` first.");
  }

  try {
    await fs.access(MEDIA_DIR);
  } catch {
    throw new Error(`Mediafiles folder not found: ${MEDIA_DIR}`);
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        cover: true,
      },
      orderBy: { title: "asc" },
    });

    const files = (await fs.readdir(MEDIA_DIR))
      .filter((name) => MIME_BY_EXT[path.extname(name).toLowerCase()])
      .sort((a, b) => a.localeCompare(b));

    console.log(`Found ${files.length} image files in Mediafiles.`);
    console.log(`Found ${books.length} books in PostgreSQL.\n`);

    const bookByKey = new Map(books.map((book) => [normalize(book.title), book]));
    const usedBooks = new Set<string>();

    let uploaded = 0;
    let skipped = 0;
    let unmatched = 0;
    let failed = 0;

    for (const filename of files) {
      const key = normalize(filename);
      let book = bookByKey.get(key);

      if (!book) {
        const candidates = books
          .filter((candidate) => !usedBooks.has(candidate.id))
          .map((candidate) => ({
            book: candidate,
            score: similarity(key, normalize(candidate.title)),
          }))
          .sort((a, b) => b.score - a.score);

        if (candidates[0] && candidates[0].score >= 0.82) {
          book = candidates[0].book;
        }
      }

      if (!book) {
        unmatched++;
        console.log(`⚠️  UNMATCHED  ${filename}`);
        continue;
      }

      if (usedBooks.has(book.id)) {
        failed++;
        console.log(`❌ DUPLICATE MATCH  ${filename} -> ${book.title}`);
        continue;
      }

      usedBooks.add(book.id);

      // Existing Blob covers are left untouched so the importer is safe to rerun.
      if (book.cover && isBlobUrl(book.cover)) {
        skipped++;
        console.log(`↩️  SKIP       ${book.title} (already has Blob cover)`);
        continue;
      }

      try {
        const filePath = path.join(MEDIA_DIR, filename);
        const stat = await fs.stat(filePath);

        if (stat.size > MAX_BYTES) {
          failed++;
          console.log(`❌ TOO LARGE  ${filename} (${Math.round(stat.size / 1024 / 1024)} MB)`);
          continue;
        }

        const body = await fs.readFile(filePath);
        const mime = MIME_BY_EXT[path.extname(filename).toLowerCase()];
        const safeName = normalize(filename).replace(/\s+/g, "-").slice(0, 120);

        const blob = await put(`covers/${safeName}${path.extname(filename).toLowerCase()}`, body, {
          access: "public",
          addRandomSuffix: true,
          contentType: mime,
        });

        await prisma.book.update({
          where: { id: book.id },
          data: { cover: blob.url },
        });

        uploaded++;
        console.log(`✅ UPLOADED   ${book.title}`);
      } catch (error) {
        failed++;
        const message = error instanceof Error ? error.message : String(error);
        console.log(`❌ FAILED     ${filename} -> ${message}`);
      }
    }

    console.log("\n────────────────────────────────────────");
    console.log("MindShelf cover import complete");
    console.log(`Uploaded:   ${uploaded}`);
    console.log(`Skipped:    ${skipped}`);
    console.log(`Unmatched:  ${unmatched}`);
    console.log(`Failed:     ${failed}`);
    console.log(`Total files:${files.length}`);
    console.log("────────────────────────────────────────");

    if (unmatched > 0) {
      console.log("\nUnmatched files should be reviewed before any retry.");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("\nImporter stopped:", error instanceof Error ? error.message : error);
  process.exit(1);
});
