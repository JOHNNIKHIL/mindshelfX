"use client";

import { useEffect, useMemo, useState } from "react";
import type { Book } from "@/lib/types";
import { getProgress, getStatus } from "@/lib/reading";
import BookCard from "./BookCard";

type SortKey = "recent" | "title" | "author" | "progress-high" | "progress-low" | "pages-high" | "pages-low";

const filters = ["All", "Reading", "Read", "Unread", "Favorites"];

export default function LibraryClient({ initialBooks }: { initialBooks: Book[] }) {
  const [books, setBooks] = useState(initialBooks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<SortKey>("recent");
  const [view, setView] = useState<"grid" | "compact">("grid");

  useEffect(() => {
    const savedView = window.localStorage.getItem("mindshelf-library-view");
    if (savedView === "grid" || savedView === "compact") setView(savedView);
  }, []);

  function changeView(next: "grid" | "compact") {
    setView(next);
    window.localStorage.setItem("mindshelf-library-view", next);
  }

  const genres = useMemo(
    () => [...new Set(books.map((book) => book.genre).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [books]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = books.filter((book) => {
      const matchesQuery = !q || [book.title, book.author, book.genre].some((value) => value.toLowerCase().includes(q));
      const matchesFilter = filter === "All" || (filter === "Favorites" && book.favorite) || getStatus(book) === filter;
      const matchesGenre = genre === "All" || book.genre === genre;
      return matchesQuery && matchesFilter && matchesGenre;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "title": return a.title.localeCompare(b.title);
        case "author": return a.author.localeCompare(b.author);
        case "progress-high": return getProgress(b) - getProgress(a);
        case "progress-low": return getProgress(a) - getProgress(b);
        case "pages-high": return b.totalPages - a.totalPages;
        case "pages-low": return a.totalPages - b.totalPages;
        default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [books, query, filter, genre, sort]);

  function replaceBook(updated: Book) {
    setBooks((current) => current.map((book) => (book.id === updated.id ? updated : book)));
  }

  const hasActiveSearch = Boolean(query.trim()) || filter !== "All" || genre !== "All";

  function clearFilters() {
    setQuery("");
    setFilter("All");
    setGenre("All");
  }

  return (
    <>
      <div className="library-toolbar library-toolbar-pro">
        <div className="search-wrap">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            className="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, or genre..."
            aria-label="Search library"
          />
          {query && <button type="button" className="search-clear" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
        </div>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} aria-label="Filter by genre">
          <option value="All">All genres</option>
          {genres.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort books">
          <option value="recent">Recently added</option>
          <option value="title">Title A–Z</option>
          <option value="author">Author A–Z</option>
          <option value="progress-high">Progress: highest</option>
          <option value="progress-low">Progress: lowest</option>
          <option value="pages-high">Pages: most</option>
          <option value="pages-low">Pages: fewest</option>
        </select>
        <div className="view-toggle" aria-label="Library view">
          <button type="button" className={view === "grid" ? "active" : ""} onClick={() => changeView("grid")} aria-label="Grid view">▦</button>
          <button type="button" className={view === "compact" ? "active" : ""} onClick={() => changeView("compact")} aria-label="Compact view">☷</button>
        </div>
      </div>

      <div className="filter-row">
        {filters.map((item) => (
          <button type="button" key={item} className={`filter-pill ${filter === item ? "active" : ""}`} onClick={() => setFilter(item)}>
            {item}
            {item === "Favorites" && books.filter((book) => book.favorite).length > 0 ? ` · ${books.filter((book) => book.favorite).length}` : ""}
          </button>
        ))}
      </div>

      <div className="library-meta-row">
        <div className="library-count"><strong>{filtered.length}</strong> {filtered.length === 1 ? "book" : "books"}{hasActiveSearch ? " found" : ""}</div>
        {hasActiveSearch && <button type="button" className="clear-filters" onClick={clearFilters}>Clear filters</button>}
      </div>

      {filtered.length ? (
        <div className={`book-grid ${view === "compact" ? "compact-view" : ""}`}>
          {filtered.map((book, index) => <BookCard key={book.id} book={book} onChange={replaceBook} />)}
        </div>
      ) : (
        <div className="empty-state search-empty">
          <div className="empty-icon">⌕</div>
          <strong>No books found.</strong>
          <span>Nothing matches your current search and filters.</span>
          <button type="button" className="btn" onClick={clearFilters}>Reset library view</button>
        </div>
      )}
    </>
  );
}
