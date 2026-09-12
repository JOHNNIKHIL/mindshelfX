import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { getBooks } from "@/lib/books";
import { getProgress, getStatus } from "@/lib/reading";

export default async function Home() {
  const books = await getBooks();
  const completed = books.filter((book) => getStatus(book) === "Read").length;
  const pagesRead = books.reduce((sum, book) => sum + book.pagesRead, 0);
  const continueReading = books
    .filter((book) => getStatus(book) === "Reading")
    .sort((a, b) => getProgress(b) - getProgress(a))
    .slice(0, 5);

  const recent = books.slice(0, 5);
  const favorites = books.filter((book) => book.favorite).slice(0, 5);

  return (
    <AppShell>
      <div className="page-head page-head-row">
        <div>
          <div className="eyebrow">Your reading space</div>
          <h1>Good evening.</h1>
          <div className="sub">A quiet place for the books that shape your mind.</div>
        </div>
        <Link href="/add" className="btn primary">+ Add book</Link>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-label">TOTAL BOOKS</div>
          <div className="stat-value">{books.length}</div>
          <div className="stat-small">in your library</div>
        </div>
        <div className="stat">
          <div className="stat-label">COMPLETED</div>
          <div className="stat-value">{completed}</div>
          <div className="stat-small">{books.length ? Math.round((completed / books.length) * 100) : 0}% of your books</div>
        </div>
        <div className="stat">
          <div className="stat-label">PAGES READ</div>
          <div className="stat-value">{pagesRead.toLocaleString()}</div>
          <div className="stat-small">across your library</div>
        </div>
        <div className="stat">
          <div className="stat-label">FAVORITES</div>
          <div className="stat-value">{books.filter((b) => b.favorite).length}</div>
          <div className="stat-small">books you love</div>
        </div>
      </div>

      {continueReading.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Continue reading</h2>
            <span className="sub">Pick up where you left off</span>
          </div>
          <div className="book-grid">
            {continueReading.map((book) => (
              <Link href={`/book/${book.id}`} className="book-card" key={book.id}>
                <div className="book-cover">
                  {book.cover ? <img src={book.cover} className="cover-image" alt="" /> : <div className="cover-fallback"><span>{book.title}</span></div>}
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
                <div className="progress-track"><div className="progress-fill" style={{width:`${getProgress(book)}%`}} /></div>
                <div className="progress-meta"><span>{book.pagesRead} / {book.totalPages}</span><span>{getProgress(book)}%</span></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {books.length === 0 && (
        <div className="empty-state">
          <strong>Your library is empty.</strong>
          <span>Add your first book to get started.</span>
          <Link href="/add" className="btn primary" style={{marginTop:12}}>Add your first book</Link>
        </div>
      )}

      {recent.length > 0 && (
        <section className="section" style={{marginTop:42}}>
          <div className="section-head">
            <h2>Recently added</h2>
            <Link href="/library" className="sub">View library →</Link>
          </div>
          <div className="book-grid">
            {recent.map((book) => (
              <Link href={`/book/${book.id}`} className="book-card" key={book.id}>
                <div className="book-cover">
                  {book.cover ? <img src={book.cover} className="cover-image" alt="" /> : <div className="cover-fallback"><span>{book.title}</span></div>}
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {favorites.length > 0 && (
        <section className="section" style={{marginTop:42}}>
          <div className="section-head">
            <h2>Favorites</h2>
          </div>
          <div className="book-grid">
            {favorites.map((book) => (
              <Link href={`/book/${book.id}`} className="book-card" key={book.id}>
                <div className="book-cover">
                  {book.cover ? <img src={book.cover} className="cover-image" alt="" /> : <div className="cover-fallback"><span>{book.title}</span></div>}
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
