"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/types";
import { getProgress, getStatus } from "@/lib/reading";

export default function BookDetailClient({ initialBook }: { initialBook: Book }) {
  const router = useRouter();
  const [book, setBook] = useState(initialBook);
  const [pages, setPages] = useState(String(initialBook.pagesRead));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function update(patch: object) {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`/api/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(patch),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not save.");
        return false;
      }

      setBook(data);
      setPages(String(data.pagesRead));
      setMessage("Saved");
      window.setTimeout(() => setMessage(""), 1600);
      router.refresh();
      return true;
    } catch {
      setError("Could not connect to the server. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function saveProgress() {
    const next = Number(pages);
    if (!Number.isInteger(next) || next < 0 || next > book.totalPages) {
      setError(`Pages read must be a whole number from 0 to ${book.totalPages}.`);
      return;
    }
    await update({ pagesRead: next });
  }

  async function remove() {
    if (!window.confirm(`Delete “${book.title}” from your library? This cannot be undone.`)) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/books/${book.id}`, { method: "DELETE", cache: "no-store" });
      if (res.ok) {
        router.push("/library");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Could not delete book.");
      }
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const pct = getProgress(book);

  return (
    <div className="detail">
      <div className="book-cover">
        {book.cover ? (
          <img src={book.cover} alt="" className="cover-image" />
        ) : (
          <div className="cover-fallback"><span>{book.title}</span></div>
        )}
      </div>

      <div className="detail-info">
        <div className="eyebrow">{book.genre}</div>
        <h1>{book.title}</h1>
        <div className="sub">by {book.author}</div>

        <div className="meta">
          <span className="tag">{book.totalPages.toLocaleString()} pages</span>
          <span className="tag">{getStatus(book)}</span>
        </div>

        <div className="progress-card">
          <div className="progress-top">
            <div>
              <div className="eyebrow">Reading progress</div>
              <div className="big-progress">{pct}%</div>
            </div>
            <button
              type="button"
              className={`heart-large ${book.favorite ? "is-favorite" : ""}`}
              onClick={() => update({ favorite: !book.favorite })}
              disabled={saving}
              aria-label={book.favorite ? "Remove favorite" : "Add favorite"}
            >
              {book.favorite ? "♥" : "♡"}
            </button>
          </div>

          <div className="sub">
            {book.pagesRead.toLocaleString()} of {book.totalPages.toLocaleString()} pages
          </div>

          <div className="progress-track large">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>

          <div className="page-update">
            <label>
              Pages read
              <input
                type="number"
                min="0"
                max={book.totalPages}
                step="1"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveProgress();
                }}
              />
            </label>

            <button type="button" className="btn primary" disabled={saving} onClick={saveProgress}>
              {saving ? "Saving..." : "Save progress"}
            </button>
          </div>

          {message && <div className="save-message">{message}</div>}
          {error && <div className="form-error">{error}</div>}
        </div>

        <div className="detail-actions">
          <button type="button" className="btn" onClick={() => update({ favorite: !book.favorite })} disabled={saving}>
            {book.favorite ? "Remove favorite" : "Add to favorites"}
          </button>
          <button type="button" className="btn danger" onClick={remove} disabled={saving}>
            Delete book
          </button>
        </div>
      </div>
    </div>
  );
}
