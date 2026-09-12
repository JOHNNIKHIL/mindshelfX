import Link from "next/link";
import { headers } from "next/headers";

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "";

  const nav = [
    { href: "/", label: "Home" },
    { href: "/library", label: "Library" },
    { href: "/analytics", label: "Analytics" },
    { href: "/add", label: "Add Book" },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Mind<span>Shelf</span></div>
        <nav className="nav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                  ? "active"
                  : ""
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main">
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
