"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/lib/types";
import { getStatus } from "@/lib/reading";
import BookCard from "./BookCard";

export default function LibraryClient({ initialBooks }: { initialBooks: Book[] }) {
  const [books, setBooks] = useState(initialBooks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [genre, setGenre] = useState("All");

  const genres = useMemo(
    () => [...new Set(books.map((book) => book.genre))].sort((a, b) => a.localeCompare(b)),
    [books]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return books.filter((book) => {
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.genre.toLowerCase().includes(q);

      const matchesFilter =
        filter === "All" ||
        (filter === "Favorites" && book.favorite) ||
        getStatus(book) === filter;

      const matchesGenre = genre === "All" || book.genre === genre;

      return matchesQuery && matchesFilter && matchesGenre;
    });
  }, [books, query, filter, genre]);

  function replaceBook(updated: Book) {
    setBooks((current) =>
      current.map((book) => (book.id === updated.id ? updated : book))
    );
  }

  return (
    <>
      <div className="library-toolbar">
        <input
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books, authors, genres..."
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>All</option>
          {genres.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="filter-row">
        {["All", "Reading", "Read", "Unread", "Favorites"].map((item) => (
          <button
            type="button"
            key={item}
            className={`filter-pill ${filter === item ? "active" : ""}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="library-count">
        {filtered.length} {filtered.length === 1 ? "book" : "books"}
      </div>

      {filtered.length ? (
        <div className="book-grid">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} onChange={replaceBook} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No books found.</strong>
          <span>Try another search or filter.</span>
        </div>
      )}
    </>
  );
}
