import { books } from "@/lib/demo-data";
import BookCard from "../books/BookCard";

export default function ContinueReading() {
  const reading = books.filter(b => b.read > 0 && b.read < b.pages).slice(0, 5);
  return (
    <section className="section">
      <div className="section-head"><h2>Continue reading</h2><span className="sub">Pick up where you left off</span></div>
      <div className="grid">{reading.map(book => <BookCard key={book.id} book={book} />)}</div>
    </section>
  );
}
