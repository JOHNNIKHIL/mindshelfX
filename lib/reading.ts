import type { Book } from "./types";

/**
 * Reading progress is always derived from pages read / total pages.
 * It is never stored separately.
 */
export function getProgress(
  book: Pick<Book, "pagesRead" | "totalPages">
): number {
  if (book.totalPages <= 0) return 0;
  return Math.min(
    100,
    Math.round((book.pagesRead / book.totalPages) * 100)
  );
}

/**
 * A book is "Read" only when all pages have been read.
 */
export function getStatus(
  book: Pick<Book, "pagesRead" | "totalPages">
): "Read" | "Reading" | "Unread" {
  if (book.pagesRead >= book.totalPages) return "Read";
  if (book.pagesRead > 0) return "Reading";
  return "Unread";
}

/*
 * Compatibility exports.
 *
 * Your existing BookCard.tsx imports:
 *   import { progress, status } from "@/lib/reading";
 *
 * The newer code uses getProgress/getStatus.
 * Keep both names so existing components continue to work.
 */
export const progress = getProgress;
export const status = getStatus;
