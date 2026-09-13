"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/types";
import { progress, status } from "@/lib/reading";
import OptimizedCover from "./OptimizedCover";

export default function BookCard({
  book,
  onChange,
}: {
  book: Book;
  onChange?: (book: Book) => void;
}) {
  const [saving, setSaving] = useState(false);
  const pct = progress(book);
  const state = status(book);

  async function toggleFavorite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (saving) return;

    const previous = book.favorite;
    const next = !previous;

    // Optimistic UI: make the interaction feel instant.
    onChange?.({ ...book, favorite: next });
    setSaving(true);

    try {
      const response = await fetch(`/api/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: next }),
      });

      if (!response.ok) throw new Error("Favorite update failed.");

      const updated = await response.json();
      onChange?.(updated);
    } catch {
      // Roll back if the server update failed.
      onChange?.({ ...book, favorite: previous });
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="book-card">
      <Link href={`/book/${book.id}`} className="book-link">
        <div className="book-cover">
          {book.cover ? (
            <OptimizedCover src={book.cover} />
          ) : (
            <div className="cover-fallback">
              <span>{book.title}</span>
            </div>
          )}

          <button
            type="button"
            className={`favorite-btn ${book.favorite ? "is-favorite" : ""}`}
            onClick={toggleFavorite}
            disabled={saving}
            aria-label={book.favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {book.favorite ? "♥" : "♡"}
          </button>
        </div>

        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.author}</div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="progress-meta">
          <span>{state}</span>
          <span>{pct}%</span>
        </div>
      </Link>
    </article>
  );
}
