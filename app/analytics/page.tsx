import AppShell from "@/components/layout/AppShell";
import { getBooks } from "@/lib/books";
import QuoteStrip from "@/components/ui/QuoteStrip";

export default async function Analytics() {
  const books = await getBooks();

  const totalPages = books.reduce((sum, book) => sum + book.totalPages, 0);
  const pagesRead = books.reduce((sum, book) => sum + book.pagesRead, 0);
  const completed = books.filter((book) => book.pagesRead >= book.totalPages).length;
  const reading = books.filter(
    (book) => book.pagesRead > 0 && book.pagesRead < book.totalPages
  ).length;
  const unread = books.filter((book) => book.pagesRead === 0).length;
  const overall = totalPages ? Math.round((pagesRead / totalPages) * 100) : 0;

  const map = new Map<string, { books: number; pages: number; read: number }>();

  for (const book of books) {
    const current = map.get(book.genre) ?? { books: 0, pages: 0, read: 0 };
    current.books += 1;
    current.pages += book.totalPages;
    current.read += book.pagesRead;
    map.set(book.genre, current);
  }

  const genres = [...map.entries()]
    .map(([name, values]) => ({
      name,
      ...values,
      pct: values.pages ? Math.round((values.read / values.pages) * 100) : 0,
    }))
    .sort((a, b) => b.pages - a.pages);

  return (
    <AppShell>
      <div className="page-head">
        <div>
          <div className="eyebrow">Your reading data</div>
          <h1>Analytics</h1>
          <div className="sub">
            Useful numbers from the books you actually own.
          </div>
        </div>
      </div>

      <QuoteStrip quote="Progress is quiet. A page today becomes a finished book tomorrow." label="Keep going" />

      <div className="stats">
        <div className="stat">
          <div className="stat-label">TOTAL PAGES</div>
          <div className="stat-value">{totalPages.toLocaleString()}</div>
          <div className="stat-small">in your library</div>
        </div>

        <div className="stat">
          <div className="stat-label">PAGES READ</div>
          <div className="stat-value">{pagesRead.toLocaleString()}</div>
          <div className="stat-small">{overall}% of all pages</div>
        </div>

        <div className="stat">
          <div className="stat-label">COMPLETED BOOKS</div>
          <div className="stat-value">{completed}</div>
          <div className="stat-small">of {books.length}</div>
        </div>

        <div className="stat">
          <div className="stat-label">FAVORITES</div>
          <div className="stat-value">
            {books.filter((book) => book.favorite).length}
          </div>
          <div className="stat-small">marked favorites</div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="panel">
          <h2>Reading status</h2>

          <div className="status-cards">
            <div><strong>{completed}</strong><span>Read</span></div>
            <div><strong>{reading}</strong><span>Reading</span></div>
            <div><strong>{unread}</strong><span>Unread</span></div>
          </div>

          <div className="library-total-progress">
            <div className="progress-track large">
              <div className="progress-fill" style={{ width: `${overall}%` }} />
            </div>

            <div className="progress-meta">
              <span>Overall completion by pages</span>
              <b>{overall}%</b>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Library size</h2>
          <div className="big-progress">{books.length}</div>
          <div className="sub">
            books across {genres.length} genres
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>By genre</h2>
          <span className="sub">Sorted by total pages</span>
        </div>

        <div className="genre-table">
          {genres.map((genre) => (
            <div className="genre-row" key={genre.name}>
              <div>
                <b>{genre.name}</b>
                <span>
                  {genre.books} {genre.books === 1 ? "book" : "books"} ·{" "}
                  {genre.pages.toLocaleString()} pages
                </span>
              </div>

              <div className="genre-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${genre.pct}%` }}
                  />
                </div>
                <span>{genre.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
