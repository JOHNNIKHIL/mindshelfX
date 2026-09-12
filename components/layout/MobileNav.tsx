import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      <Link className="active" href="/">Home</Link>
      <Link href="/library">Library</Link>
      <Link href="/analytics">Stats</Link>
      <Link href="/add">Add</Link>
    </nav>
  );
}
