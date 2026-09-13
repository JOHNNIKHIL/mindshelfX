import Link from "next/link";
import { headers } from "next/headers";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const icons = {
  home: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>,
  library: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 18H3V6a2 2 0 0 1 2-2"/><path d="M9 8h7M9 12h7"/></svg>,
  analytics: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-8M22 19H2"/></svg>,
  add: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>,
};

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "";

  const nav = [
    { href: "/", label: "Home", icon: icons.home },
    { href: "/library", label: "Library", icon: icons.library },
    { href: "/analytics", label: "Analytics", icon: icons.analytics },
    { href: "/add", label: "Add Book", icon: icons.add },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="brand">Mind<span>Shelf</span></div>
          <ThemeSwitcher />
        </div>

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
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
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
