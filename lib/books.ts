import "server-only";
import { prisma } from "@/lib/prisma";
import type { Book } from "./types";

function cleanText(value: unknown): string {
  return String(value ?? "").trim();
}

function wholeNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.floor(n) : fallback;
}

function toBook(row: {
  id: string;
  title: string;
  author: string;
  genre: string;
  totalPages: number;
  pagesRead: number;
  favorite: boolean;
  cover: string;
  createdAt: Date;
  updatedAt: Date;
}): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    genre: row.genre,
    totalPages: row.totalPages,
    pagesRead: row.pagesRead,
    favorite: row.favorite,
    cover: row.cover,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function validateCore(title: string, author: string, genre: string, totalPages: number) {
  if (!title) throw new Error("Book title is required.");
  if (!author) throw new Error("Author is required.");
  if (!genre) throw new Error("Genre is required.");
  if (!Number.isInteger(totalPages) || totalPages < 1) {
    throw new Error("Total pages must be a whole number greater than 0.");
  }
}

function normalizePagesRead(value: unknown, totalPages: number): number {
  const pagesRead = wholeNumber(value, 0);
  if (pagesRead < 0) throw new Error("Pages read cannot be negative.");
  if (pagesRead > totalPages) {
    throw new Error(`Pages read cannot exceed ${totalPages}.`);
  }
  return pagesRead;
}

export async function getBooks(): Promise<Book[]> {
  const rows = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toBook);
}

export async function getBook(id: string): Promise<Book | null> {
  const row = await prisma.book.findUnique({ where: { id } });
  return row ? toBook(row) : null;
}

export async function createBook(input: {
  title: string;
  author: string;
  genre: string;
  totalPages: number;
  pagesRead?: number;
  favorite?: boolean;
  cover?: string;
}) {
  const title = cleanText(input.title);
  const author = cleanText(input.author);
  const genre = cleanText(input.genre);
  const totalPages = wholeNumber(input.totalPages, 0);

  validateCore(title, author, genre, totalPages);

  const pagesRead = normalizePagesRead(input.pagesRead ?? 0, totalPages);

  const row = await prisma.book.create({
    data: {
      title,
      author,
      genre,
      totalPages,
      pagesRead,
      favorite: Boolean(input.favorite),
      cover: cleanText(input.cover),
    },
  });

  return toBook(row);
}

export async function updateBook(
  id: string,
  input: Partial<
    Pick<Book, "title" | "author" | "genre" | "totalPages" | "pagesRead" | "favorite" | "cover">
  >
) {
  const current = await prisma.book.findUnique({ where: { id } });
  if (!current) return null;

  const title = input.title === undefined ? current.title : cleanText(input.title);
  const author = input.author === undefined ? current.author : cleanText(input.author);
  const genre = input.genre === undefined ? current.genre : cleanText(input.genre);
  const totalPages =
    input.totalPages === undefined
      ? current.totalPages
      : wholeNumber(input.totalPages, 0);

  validateCore(title, author, genre, totalPages);

  const requestedPagesRead =
    input.pagesRead === undefined ? current.pagesRead : input.pagesRead;
  const pagesRead = normalizePagesRead(requestedPagesRead, totalPages);

  const row = await prisma.book.update({
    where: { id },
    data: {
      title,
      author,
      genre,
      totalPages,
      pagesRead,
      favorite:
        input.favorite === undefined ? current.favorite : Boolean(input.favorite),
      cover: input.cover === undefined ? current.cover : cleanText(input.cover),
    },
  });

  return toBook(row);
}

export async function deleteBook(id: string) {
  try {
    await prisma.book.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
