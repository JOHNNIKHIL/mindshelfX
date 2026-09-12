import AppShell from "@/components/layout/AppShell";
import BookForm from "@/components/books/BookForm";

export default function AddBook() {
  return (
    <AppShell>
      <div className="page-head">
        <div>
          <div className="eyebrow">Your library</div>
          <h1>Add a book</h1>
          <div className="sub">Keep the details simple. The rest is calculated automatically.</div>
        </div>
      </div>

      <BookForm />
    </AppShell>
  );
}
