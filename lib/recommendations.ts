import type { Book } from "@/lib/types";
import { getStatus, getProgress } from "@/lib/reading";

export function getBookOfTheDay(books: Book[], date = new Date()): Book | null {
  if (!books.length) return null;

  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return books[hash % books.length];
}

export function getWhatToReadNext(books: Book[]): Book | null {
  const unread = books.filter((book) => getStatus(book) === "Unread");
  const pool = unread.length ? unread : books.filter((book) => getStatus(book) !== "Read");
  const fallback = pool.length ? pool : books;
  if (!fallback.length) return null;

  const index = Math.floor(Math.random() * fallback.length);
  return fallback[index];
}

export function getFinishMe(books: Book[]): Book[] {
  return books
    .filter((book) => book.pagesRead > 0 && book.pagesRead < book.totalPages)
    .sort((a, b) => {
      const remainingA = a.totalPages - a.pagesRead;
      const remainingB = b.totalPages - b.pagesRead;
      if (remainingA !== remainingB) return remainingA - remainingB;
      return getProgress(b) - getProgress(a);
    })
    .slice(0, 5);
}

export function getSimilarBooks(book: Book, books: Book[]): Book[] {
  return books
    .filter((candidate) => candidate.id !== book.id)
    .map((candidate) => {
      let score = 0;

      if (candidate.genre.trim().toLowerCase() === book.genre.trim().toLowerCase()) {
        score += 100;
      }

      if (candidate.author.trim().toLowerCase() === book.author.trim().toLowerCase()) {
        score += 50;
      }

      // A small progress tie-breaker keeps the section useful without
      // turning reading progress into the similarity itself.
      score += getProgress(candidate) / 100;

      return { book: candidate, score };
    })
    .filter(({ score }) => score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ book: candidate }) => candidate);
}
