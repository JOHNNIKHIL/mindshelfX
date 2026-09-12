import { notFound } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import BookDetailClient from "@/components/books/BookDetailClient";
import { getBooks } from "@/lib/books";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = (await getBooks()).find((item) => item.id === id);

  if (!book) notFound();

  return (
    <AppShell>
      <div className="page-head page-head-row">
        <div>
          <div className="eyebrow">Your library</div>
          <h1>Book details</h1>
        </div>
        <Link href={`/book/${book.id}/edit`} className="btn">Edit book</Link>
      </div>

      <BookDetailClient initialBook={book} />
    </AppShell>
  );
}
