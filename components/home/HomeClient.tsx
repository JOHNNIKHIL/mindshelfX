"use client";

import { useState } from "react";
import type { Book } from "@/lib/types";
import BookCard from "../books/BookCard";

export default function HomeClient({ initialBooks }: { initialBooks: Book[] }) {
  const [books, setBooks] = useState(initialBooks);
  const reading = books.filter(b => b.pagesRead > 0 && b.pagesRead < b.totalPages).slice(0, 5);
  const recent = [...books].sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const favorites = books.filter(b => b.favorite).slice(0, 5);
  const completed = books.filter(b => b.pagesRead >= b.totalPages).length;
  const pages = books.reduce((sum,b) => sum + b.pagesRead, 0);

  const replace = (updated: Book) => setBooks(current => current.map(b => b.id === updated.id ? updated : b));

  return (
    <>
      <div className="stats">
        <div className="stat"><div className="stat-label">TOTAL BOOKS</div><div className="stat-value">{books.length}</div><div className="stat-small">in your library</div></div>
        <div className="stat"><div className="stat-label">COMPLETED</div><div className="stat-value">{completed}</div><div className="stat-small">100% finished</div></div>
        <div className="stat"><div className="stat-label">PAGES READ</div><div className="stat-value">{pages.toLocaleString()}</div><div className="stat-small">across your library</div></div>
        <div className="stat"><div className="stat-label">FAVORITES</div><div className="stat-value">{books.filter(b => b.favorite).length}</div><div className="stat-small">books you love</div></div>
      </div>

      {reading.length > 0 && <section className="section"><div className="section-head"><h2>Continue reading</h2><a className="sub" href="/library">View library →</a></div><div className="grid">{reading.map(b => <BookCard key={b.id} book={b} onChange={replace} />)}</div></section>}
      {recent.length > 0 && <section className="section"><div className="section-head"><h2>Recently added</h2></div><div className="grid">{recent.map(b => <BookCard key={b.id} book={b} onChange={replace} />)}</div></section>}
      {favorites.length > 0 && <section className="section"><div className="section-head"><h2>Your favorites</h2></div><div className="grid">{favorites.map(b => <BookCard key={b.id} book={b} onChange={replace} />)}</div></section>}
      {books.length === 0 && <div className="empty">Your library is empty. Add your first book to get started.</div>}
    </>
  );
}
