import { notFound } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import BookDetailClient from "@/components/books/BookDetailClient";
import { getBooks } from "@/lib/books";
import { getSimilarBooks } from "@/lib/recommendations";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const books = await getBooks();
  const book = books.find((item) => item.id === id);
  if (!book) notFound();

  return (
    <AppShell>
      <div className="page-head page-head-row">
        <div><div className="eyebrow">Your library</div><h1>Book details</h1></div>
        <Link href={`/book/${book.id}/edit`} className="btn">Edit book</Link>
      </div>
      <BookDetailClient initialBook={book} similarBooks={getSimilarBooks(book, books)} />
    </AppShell>
  );
}
