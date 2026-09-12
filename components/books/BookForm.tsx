"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/types";
import CoverPicker from "./CoverPicker";

export default function BookForm({ initialBook }: { initialBook?: Book }) {
  const router = useRouter();
  const editing = Boolean(initialBook);

  const [title, setTitle] = useState(initialBook?.title ?? "");
  const [author, setAuthor] = useState(initialBook?.author ?? "");
  const [genre, setGenre] = useState(initialBook?.genre ?? "");
  const [totalPages, setTotalPages] = useState(String(initialBook?.totalPages ?? ""));
  const [pagesRead, setPagesRead] = useState(String(initialBook?.pagesRead ?? "0"));
  const [favorite, setFavorite] = useState(initialBook?.favorite ?? false);
  const [cover, setCover] = useState(initialBook?.cover ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const total = Number(totalPages);
    const read = Number(pagesRead);

    if (!title.trim() || !author.trim() || !genre.trim()) {
      setError("Please fill in title, author and genre.");
      return;
    }

    if (!Number.isInteger(total) || total < 1) {
      setError("Total pages must be a whole number greater than 0.");
      return;
    }

    if (!Number.isInteger(read) || read < 0 || read > total) {
      setError(`Pages read must be between 0 and ${total}.`);
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        editing ? `/api/books/${initialBook!.id}` : "/api/books",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            author,
            genre,
            totalPages: total,
            pagesRead: read,
            favorite,
            cover,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not save book.");
        return;
      }

      router.push(`/book/${data.id}`);
      router.refresh();
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="book-form" onSubmit={submit}>
      <div className="form-main">
        <div className="form-section">
          <div className="eyebrow">Book information</div>
          <h2>{editing ? "Edit your book" : "Add a book"}</h2>

          <label>
            Book title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Atomic Habits"
              autoFocus
            />
          </label>

          <label>
            Author
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. James Clear"
            />
          </label>

          <label>
            Genre
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="e.g. Self Development"
            />
          </label>
        </div>

        <div className="form-section">
          <div className="eyebrow">Reading</div>
          <h2>Your page count</h2>

          <div className="two-fields">
            <label>
              Total pages
              <input
                type="number"
                min="1"
                step="1"
                value={totalPages}
                onChange={(e) => {
                  setTotalPages(e.target.value);
                  const nextTotal = Number(e.target.value);
                  if (Number.isFinite(nextTotal) && Number(pagesRead) > nextTotal) {
                    setPagesRead(String(nextTotal));
                  }
                }}
                placeholder="320"
              />
              <span className="field-hint">
                Enter this once. We treat the book&apos;s page count as fixed.
              </span>
            </label>

            <label>
              Pages read
              <input
                type="number"
                min="0"
                max={Number(totalPages) || undefined}
                step="1"
                value={pagesRead}
                onChange={(e) => setPagesRead(e.target.value)}
                placeholder="0"
              />
            </label>
          </div>

          <label className="favorite-check">
            <input
              type="checkbox"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
            <span>♡ Mark as favorite</span>
          </label>
        </div>

        {error && <div className="form-error form-error-large">{error}</div>}

        <div className="form-actions">
          <button
            type="button"
            className="btn"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </button>

          <button type="submit" className="btn primary" disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Add book"}
          </button>
        </div>
      </div>

      <aside className="form-cover-section">
        <div className="eyebrow">Cover</div>
        <h2>Make it yours</h2>
        <CoverPicker value={cover} onChange={setCover} />
      </aside>
    </form>
  );
}
