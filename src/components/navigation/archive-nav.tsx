import Link from "next/link";

const navItems = [
  { href: "/", label: "Threshold" },
  { href: "/studio", label: "Studio" },
  { href: "/studio/issues/the-street-remembers", label: "Issue" },
  { href: "/archive", label: "Archive" },
  { href: "/reader/rain-signal", label: "Reader" },
];

export function ArchiveNav() {
  return (
    <header className="archive-shell flex items-center justify-between gap-6 py-6">
      <Link href="/" className="font-display text-xl text-paper">
        Socarengue Studio
      </Link>
      <nav className="flex flex-wrap justify-end gap-3 text-xs uppercase tracking-[0.18em] text-paper/62">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-signal">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
