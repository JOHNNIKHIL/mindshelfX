import AppShell from "@/components/layout/AppShell";
import LibraryClient from "@/components/books/LibraryClient";
import { getBooks } from "@/lib/books";

export default async function Library() {
  const books = await getBooks();

  return (
    <AppShell>
      <div className="page-head page-head-row">
        <div>
          <div className="eyebrow">Your collection</div>
          <h1>Library</h1>
          <div className="sub">
            {books.length} {books.length === 1 ? "book" : "books"} in your personal library.
          </div>
        </div>

        <a href="/add" className="btn primary">
          + Add book
        </a>
      </div>

      <LibraryClient initialBooks={books} />
    </AppShell>
  );
}
