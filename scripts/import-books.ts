import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

type ImportBook = {
  title: string;
  author: string;
  genre: string;
  totalPages: number;
  pagesRead: number;
  favorite: boolean;
  cover: string;
};

const dataPath = path.join(process.cwd(), "data", "books-import.json");
const books = JSON.parse(fs.readFileSync(dataPath, "utf8")) as ImportBook[];

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured.");

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function key(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const aliases = new Map<string, string>([
  [key("Atomic Habit"), key("Atomic Habits")],
]);

async function main() {
  let created = 0;
  let updated = 0;

  const existing = await prisma.book.findMany({ select: { id: true, title: true } });
  const byTitle = new Map(existing.map(b => [key(b.title), b]));

  for (const b of books) {
    if (!b.title || !b.author || !b.genre || !Number.isInteger(b.totalPages) || b.totalPages <= 0) {
      throw new Error(`Invalid import record: ${JSON.stringify(b)}`);
    }

    const canonicalKey = key(b.title);
    const aliasMatch = [...aliases.entries()].find(([alias, canonical]) => canonical === canonicalKey && byTitle.has(alias));
    const existingBook = byTitle.get(canonicalKey) ?? (aliasMatch ? byTitle.get(aliasMatch[0]) : undefined);

    const data = {
      title: b.title,
      author: b.author,
      genre: b.genre,
      totalPages: b.totalPages,
      pagesRead: b.pagesRead,
      favorite: b.favorite,
      cover: b.cover,
    };

    if (existingBook) {
      await prisma.book.update({ where: { id: existingBook.id }, data });
      updated++;
    } else {
      const createdBook = await prisma.book.create({ data });
      byTitle.set(canonicalKey, { id: createdBook.id, title: createdBook.title });
      created++;
    }
  }

  console.log(`Imported ${books.length} books: ${created} created, ${updated} updated.`);
}

main()
  .catch(err => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
