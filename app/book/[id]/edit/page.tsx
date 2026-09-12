import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import BookForm from "@/components/books/BookForm";
import { getBooks } from "@/lib/books";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = (await getBooks()).find((item) => item.id === id);

  if (!book) notFound();

  return (
    <AppShell>
      <div className="page-head">
        <div>
          <div className="eyebrow">Your library</div>
          <h1>Edit book</h1>
        </div>
      </div>

      <BookForm initialBook={book} />
    </AppShell>
  );
}
