import Link from "next/link";
import { FeatureIcon } from "@/components/FeatureIcon";
import { FEATURES, PITCH, PRICING_TIERS } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Syncing 4 channels in under 60 seconds
          </div>

          <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl text-balance">
            Stop overselling.{" "}
            <span className="text-accent">Stop copy-pasting</span> tracking
            numbers.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl text-balance">
            {PITCH}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-surface transition hover:bg-accent-glow"
            >
              Explore live demo
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-white/5 bg-surface-raised/50 p-6 backdrop-blur sm:grid-cols-4">
            {[
              { value: "<60s", label: "Sync latency" },
              { value: "94%", label: "WISMO auto-resolved" },
              { value: "0", label: "Oversells this week" },
              { value: "$412", label: "Carts recovered today" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-mono text-2xl font-bold text-accent md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-white/5 bg-surface-raised">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-6">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-600">
            Works with
          </span>
          {["Shopify", "Amazon", "eBay", "Etsy"].map((name) => (
            <span key={name} className="text-sm font-medium text-zinc-500">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              One ops agent. Every channel.
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Built for solo sellers doing $5K–$200K/month across Shopify,
              Amazon, eBay, and Etsy — without hiring an operations team.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/5 bg-surface-raised p-6 transition hover:border-accent/20 hover:bg-surface-overlay"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/20 transition group-hover:ring-accent/40">
                  <FeatureIcon icon={feature.icon} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-white/5 bg-surface-raised py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            How ChannelSync works
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Connect your channels",
                desc: "Link Shopify, Amazon, eBay, and Etsy in minutes. No code required.",
              },
              {
                step: "02",
                title: "Agents run 24/7",
                desc: "Sync, WISMO, alert, and digest agents handle ops while you sleep.",
              },
              {
                step: "03",
                title: "Review only escalations",
                desc: "Inventory stays accurate. Support tickets auto-resolve. You see exceptions only.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center md:text-left">
                <span className="font-mono text-4xl font-bold text-accent/20">
                  {item.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Simple, SKU-based pricing
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              No enterprise sales calls. Pick a tier and start syncing.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-6 lg:max-w-4xl lg:mx-auto">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-accent/40 bg-accent/5 ring-1 ring-accent/20"
                    : "border-white/5 bg-surface-raised"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-surface">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${tier.price}
                  </span>
                  <span className="text-zinc-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-accent">
                  {tier.skus} · {tier.channels}
                </p>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition ${
                    tier.highlighted
                      ? "bg-accent text-surface hover:bg-accent-glow"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Start free trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-surface-raised to-surface p-10 text-center md:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white md:text-4xl text-balance">
                See it work on real sample data
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
                Explore the interactive demo — inventory sync, WISMO auto-replies,
                oversell prevention, and daily digest. No signup required.
              </p>
              <Link
                href="/demo"
                className="mt-8 inline-flex items-center rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-surface transition hover:bg-accent-glow"
              >
                Open live demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
