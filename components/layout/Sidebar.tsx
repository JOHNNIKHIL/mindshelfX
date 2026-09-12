import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Mind<span>Shelf</span></div>
      <nav className="nav">
        <Link className="active" href="/">Home</Link>
        <Link href="/library">Library</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/add">Add Book</Link>
      </nav>
    </aside>
  );
}
