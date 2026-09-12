import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

type JsonBook = {
  id?: string;
  title?: string;
  author?: string;
  genre?: string;
  totalPages?: number;
  pagesRead?: number;
  favorite?: boolean;
  cover?: string;
  createdAt?: string;
  updatedAt?: string;

  // Compatibility with early MindShelf data shapes.
  pages?: number;
  read?: number;
};

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function number(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.floor(n) : fallback;
}

async function main() {
  const file = path.join(process.cwd(), "data", "books.json");
  const raw = await readFile(file, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("data/books.json must contain an array.");
  }

  let imported = 0;

  for (const item of parsed as JsonBook[]) {
    const title = String(item.title ?? "").trim();
    const author = String(item.author ?? "").trim();
    const genre = String(item.genre ?? "").trim();
    const totalPages = number(item.totalPages ?? item.pages, 0);
    const pagesRead = Math.max(
      0,
      Math.min(totalPages, number(item.pagesRead ?? item.read, 0))
    );

    if (!title || !author || !genre || totalPages < 1) {
      console.warn("Skipping invalid book:", item);
      continue;
    }

    await prisma.book.upsert({
      where: { id: String(item.id ?? crypto.randomUUID()) },
      update: {
        title,
        author,
        genre,
        totalPages,
        pagesRead,
        favorite: Boolean(item.favorite),
        cover: String(item.cover ?? ""),
      },
      create: {
        id: String(item.id ?? crypto.randomUUID()),
        title,
        author,
        genre,
        totalPages,
        pagesRead,
        favorite: Boolean(item.favorite),
        cover: String(item.cover ?? ""),
        ...(item.createdAt ? { createdAt: new Date(item.createdAt) } : {}),
        ...(item.updatedAt ? { updatedAt: new Date(item.updatedAt) } : {}),
      },
    });

    imported++;
  }

  console.log(`Imported/upserted ${imported} book(s) from data/books.json.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
