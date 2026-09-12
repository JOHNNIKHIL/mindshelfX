import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Book } from "./types";

const dataDir = path.join(process.cwd(), "data");
const coversDir = path.join(dataDir, "covers");
const dataFile = path.join(dataDir, "books.json");
const backupFile = path.join(dataDir, "books.json.bak");

// Serialize writes inside this Node process so two quick updates cannot overwrite
// each other with stale data.
let writeQueue: Promise<void> = Promise.resolve();

async function ensureStore() {
  await fs.mkdir(coversDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]\n", "utf8");
  }
}

function cleanText(value: unknown): string {
  return String(value ?? "").trim();
}

function wholeNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.floor(n) : fallback;
}

function normalizeBook(value: unknown): Book | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<Book>;
  const totalPages = wholeNumber(item.totalPages, 0);
  if (!item.id || !cleanText(item.title) || totalPages < 1) return null;

  const pagesRead = Math.max(0, Math.min(totalPages, wholeNumber(item.pagesRead, 0)));
  const now = new Date().toISOString();

  return {
    id: String(item.id),
    title: cleanText(item.title),
    author: cleanText(item.author),
    genre: cleanText(item.genre),
    totalPages,
    pagesRead,
    favorite: Boolean(item.favorite),
    cover: cleanText(item.cover),
    createdAt: cleanText(item.createdAt) || now,
    updatedAt: cleanText(item.updatedAt) || now,
  };
}

export async function getBooks(): Promise<Book[]> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf8");

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeBook).filter((book): book is Book => book !== null);
  } catch {
    // Do not destroy the user's file if JSON is temporarily malformed.
    // Return an empty result so the UI remains usable.
    return [];
  }
}

async function writeBooksUnsafe(books: Book[]) {
  await ensureStore();

  const payload = JSON.stringify(books, null, 2) + "\n";
  const tempFile = `${dataFile}.${process.pid}.${Date.now()}.tmp`;

  // Keep a last-known-good copy before replacing the primary file.
  try {
    await fs.copyFile(dataFile, backupFile);
  } catch {
    // Initial creation has no backup yet; that's fine.
  }

  await fs.writeFile(tempFile, payload, "utf8");
  await fs.rename(tempFile, dataFile);
}

async function writeBooks(books: Book[]) {
  const run = writeQueue.then(() => writeBooksUnsafe(books));
  writeQueue = run.catch(() => undefined);
  await run;
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
  const now = new Date().toISOString();
  const book: Book = {
    id: crypto.randomUUID(),
    title,
    author,
    genre,
    totalPages,
    pagesRead,
    favorite: Boolean(input.favorite),
    cover: cleanText(input.cover),
    createdAt: now,
    updatedAt: now,
  };

  const books = await getBooks();
  books.unshift(book);
  await writeBooks(books);
  return book;
}

export async function updateBook(
  id: string,
  input: Partial<Pick<Book, "title" | "author" | "genre" | "totalPages" | "pagesRead" | "favorite" | "cover">>
) {
  const books = await getBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return null;

  const current = books[index];
  const title = input.title === undefined ? current.title : cleanText(input.title);
  const author = input.author === undefined ? current.author : cleanText(input.author);
  const genre = input.genre === undefined ? current.genre : cleanText(input.genre);
  const totalPages = input.totalPages === undefined
    ? current.totalPages
    : wholeNumber(input.totalPages, 0);

  validateCore(title, author, genre, totalPages);

  // Important: if total pages is reduced below the current progress, reject the
  // edit rather than silently changing the user's reading history.
  const requestedPagesRead = input.pagesRead === undefined
    ? current.pagesRead
    : input.pagesRead;
  const pagesRead = normalizePagesRead(requestedPagesRead, totalPages);

  const updated: Book = {
    ...current,
    title,
    author,
    genre,
    totalPages,
    pagesRead,
    favorite: input.favorite === undefined ? current.favorite : Boolean(input.favorite),
    cover: input.cover === undefined ? current.cover : cleanText(input.cover),
    updatedAt: new Date().toISOString(),
  };

  books[index] = updated;
  await writeBooks(books);
  return updated;
}

export async function deleteBook(id: string) {
  const books = await getBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;

  const filtered = books.filter((book) => book.id !== id);
  await writeBooks(filtered);
  return true;
}

export async function saveCoverDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!match) throw new Error("Unsupported cover image. Use JPG, PNG or WebP.");

  const ext = match[1].includes("png")
    ? "png"
    : match[1].includes("webp")
      ? "webp"
      : "jpg";

  const filename = `${crypto.randomUUID()}.${ext}`;
  const filePath = path.join(coversDir, filename);
  await fs.writeFile(filePath, Buffer.from(match[2].replace(/\s/g, ""), "base64"));
  return `/api/covers/${filename}`;
}
