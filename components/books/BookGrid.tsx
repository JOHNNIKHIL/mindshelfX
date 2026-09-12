import BookCard from "./BookCard";

export default function BookGrid({ books }: { books: Parameters<typeof BookCard>[0]["book"][] }) {
  return <div className="grid">{books.map(book => <BookCard key={book.id} book={book} />)}</div>;
}
