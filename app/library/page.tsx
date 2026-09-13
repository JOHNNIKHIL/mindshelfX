import AppShell from "@/components/layout/AppShell";
import LibraryClient from "@/components/books/LibraryClient";
import { getBooks } from "@/lib/books";
import QuoteStrip from "@/components/ui/QuoteStrip";

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
      </div>

      <QuoteStrip
        quote="A library is not a list of books. It is a map of the ideas you chose to keep."
        label="Your shelf, your ideas"
      />

      <LibraryClient initialBooks={books} />
    </AppShell>
  );
}
