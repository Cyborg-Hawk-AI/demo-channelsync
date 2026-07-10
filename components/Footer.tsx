import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-raised">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 ring-1 ring-accent/30">
                <svg
                  className="h-3.5 w-3.5 text-accent"
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
              <span className="font-semibold text-white">ChannelSync</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-zinc-500">
              Inventory sync + WISMO automation for solo ecommerce sellers.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Product
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/demo" className="text-zinc-400 hover:text-white">
                    Live demo
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="text-zinc-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-zinc-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Research
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/research"
                    className="text-zinc-400 hover:text-accent"
                  >
                    How we found this idea
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-8 text-xs text-zinc-600 sm:flex-row sm:justify-between">
          <p>© 2026 ChannelSync. Mock demo by Idea Miner.</p>
          <p>Shopify · Amazon · eBay · Etsy</p>
        </div>
      </div>
    </footer>
  );
}
