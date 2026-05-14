import Link from "next/link";

const navItems = [
  { href: "/", label: "Reader Mode" },
  { href: "/preview/issue-one", label: "Opening Signal" },
  { href: "/archive", label: "Recovered Files" },
];

export function ArchiveNav() {
  return (
    <header className="archive-shell flex items-center justify-between gap-6 py-6">
      <Link href="/" className="font-display text-xl text-paper">
        Socarengue
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-3 text-xs uppercase tracking-[0.18em] text-paper/62">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-signal">
            {item.label}
          </Link>
        ))}
        <Link href="/studio" className="text-paper/30 transition hover:text-signal">
          Studio
        </Link>
      </nav>
    </header>
  );
}
