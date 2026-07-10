import Link from "next/link";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/demo", label: "Live Demo" },
];

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/30 transition group-hover:ring-accent/60">
            <svg
              className="h-4 w-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Channel<span className="text-accent">Sync</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white sm:inline-block"
          >
            Try demo
          </Link>
          <Link
            href="/demo"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent-glow"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </header>
  );
}
