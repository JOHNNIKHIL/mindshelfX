"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/types";
import { progress, status } from "@/lib/reading";

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
    setSaving(true);

    try {
      const response = await fetch(`/api/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: !book.favorite }),
      });

      if (response.ok) {
        onChange?.(await response.json());
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="book-card">
      <Link href={`/book/${book.id}`} className="book-link">
        <div className="book-cover">
          {book.cover ? (
            <img src={book.cover} alt="" className="cover-image" />
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
