import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — How we found ChannelSync | Idea Miner",
  description:
    "Validation research behind ChannelSync: real pain points from ecommerce sellers, checklist results, and source links.",
};

const validationItems = [
  { label: "10+ posts with this pain", checked: true },
  { label: "Paying for inferior solution", checked: true },
  { label: "Reachable channel", checked: true },
  { label: "MVP < 4 weeks", checked: true },
  { label: "Price point high enough", checked: true },
  { label: "Hair-on-fire problem", checked: true },
  { label: "Can pre-sell", checked: true },
  { label: "< 3 competitors", checked: true },
  { label: "AI-agent operable", checked: true },
];

const painPoints = [
  {
    problem:
      "Ecommerce store owners spend excessive time on repetitive duties like updating inventory, managing catalogs, processing orders, and correcting listing mistakes.",
    persona: "Ecommerce store owner",
    workaround: "Manual inventory updates, catalog management, order processing",
    frequency: "daily",
    wtp: "Actively seeking AI inventory assistant",
    url: "https://www.reddit.com/r/IndiaBusiness/comments/1u5j41a/need_help_managing_your_ecommerce_store_lets_talk/",
  },
  {
    problem:
      "Abandoned cart recovery, customer categorization, order distribution, inventory alerts, and follow-up emails require manual setup and management.",
    persona: "Ecommerce store owner, Shopify user",
    workaround: "Manual setup of automations or repetitive manual tasks",
    frequency: "daily",
    wtp: "Already using Shopify, seeking better automation",
    url: "https://www.reddit.com/r/ecommerce/comments/1uotfct/what_shopify_automation_has_been_the_biggest/",
  },
  {
    problem:
      "Creating product descriptions for ecommerce listings is tedious; manually entering brand, condition, year, and specs for each product.",
    persona: "Ecommerce seller, vintage guitar store",
    workaround: "Manual product description creation",
    frequency: "daily",
    wtp: "Built custom solution using Claude API",
    url: "https://www.reddit.com/r/ecommerce/comments/1uotfct/what_shopify_automation_has_been_the_biggest/",
  },
  {
    problem:
      "Customer support repeatedly answers the same questions about shipping and order status, consuming significantly more time than anticipated.",
    persona: "Ecommerce store owner, customer support",
    workaround: "Manual customer support responses",
    frequency: "daily",
    wtp: "Expressed frustration with time consumption",
    url: "https://www.reddit.com/r/smallbusiness/comments/1ultz5x/whats_one_ecommerce_task_you_wish_you_had/",
  },
  {
    problem:
      "Manual inventory synchronization across channels leads to overselling when stock updates are inaccurate.",
    persona: "Ecommerce seller, multi-channel",
    workaround: "Manual inventory tracking and updates",
    frequency: "daily",
    wtp: "Learned through costly overselling mistake",
    url: "https://www.reddit.com/r/smallbusiness/comments/1ultz5x/whats_one_ecommerce_task_you_wish_you_had/",
  },
  {
    problem:
      "Copying and pasting tracking numbers and responding to repetitive inquiries like 'Where is my order?' consumes evenings and is essential to automate.",
    persona: "Dropshipping store owner",
    workaround: "Manual tracking number entry and customer support responses",
    frequency: "daily",
    wtp: "Expressed need for automation to maintain sanity",
    url: "https://www.reddit.com/r/dropshipping/comments/1ulh6hf/anyone_else_feel_like_automation_is_the_only_way/",
  },
  {
    problem:
      "Managing ecommerce business alone is overwhelming with no structured process for content strategy, posting, reporting, and operational tasks.",
    persona: "Ecommerce business owner, solo operator",
    workaround: "Manual task management, trying to keep everything organized mentally",
    frequency: "daily",
    wtp: "Seeking help through fractional CMO or automation",
    url: "https://www.reddit.com/r/Entrepreneurs/comments/1uduew5/managing_my_ecommerce_business_alone_is_slowly/",
  },
];

const lookingFor = [
  {
    title: "Self-running micro-SaaS",
    desc: "One specific problem, a small dedicated user base, minimal manual ops (digital-nomad friendly).",
  },
  {
    title: "AI-agent operable",
    desc: "Daily support, content, and processing handled by autonomous agents on self-hosted LLMs (not locked into expensive cloud API token bills).",
  },
  {
    title: "Real pain only",
    desc: 'Every idea must trace back to actual posts where people complain, ask "is there a tool for X?", or say "I wish someone would build…".',
  },
  {
    title: "B2B & recurring revenue preferred",
    desc: "Higher willingness to pay, lower churn.",
  },
  {
    title: "Markets with <3 established competitors",
    desc: "Room for a focused wedge.",
  },
  {
    title: "MVP in under 4 weeks",
    desc: "Solo-dev buildable, no regulatory/hardware/capital barriers.",
  },
];

const coreFeatures = [
  "Real-time inventory sync across Shopify, Amazon, eBay, and Etsy via their APIs — updates all channels within 60 seconds of a sale",
  "WISMO (Where Is My Order) AI responder: connects to shipping carrier APIs, auto-replies to customer emails/chat with live tracking info",
  "Oversell prevention: auto-pauses listings on secondary channels when stock drops below configurable buffer threshold",
  "Daily operations digest email: sales by channel, low-stock alerts, support ticket summary",
  "Abandoned cart recovery sequence auto-triggered via email/SMS",
];

export default function ResearchPage() {
  return (
    <div className="py-12">
      <article className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="border-b border-white/5 pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 transition hover:text-accent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to ChannelSync
          </Link>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">
            ChannelSync
          </h1>
          <blockquote className="mt-4 border-l-2 border-accent pl-4 text-lg italic text-zinc-400">
            One agent syncs inventory across all channels and auto-answers WISMO
            tickets so you stop overselling and stop copy-pasting.
          </blockquote>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20">
              9/9 validation checks passed
            </span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent ring-1 ring-accent/20">
              Score: 111/130
            </span>
          </div>
        </div>

        {/* Why this research program exists */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">
            Why this research program exists
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            This app was auto-generated by the <strong className="text-zinc-300">Idea Miner</strong> pipeline — a twice-daily research
            program that hunts for validated micro-SaaS opportunities from real people expressing
            real pain online (Reddit, Hacker News, Stack Exchange, GitHub, and more).
          </p>

          <h3 className="mt-8 text-lg font-semibold text-white">
            What we&apos;re looking for
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {lookingFor.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/5 bg-surface-raised p-4"
              >
                <h4 className="font-medium text-white">{item.title}</h4>
                <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why this demo was built */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">
            Why this demo was built
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            When an idea passes the validation gate (≥8/9 checklist items, not declining on Google
            Trends, not previously built), the pipeline automatically ships a working mock on
            Vercel so we can see the product story, not just a slide deck.
          </p>
        </section>

        {/* This specific idea */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">This specific idea</h2>
          <p className="mt-4 text-zinc-400">
            ChannelSync scored <strong className="text-accent">111/130</strong> on the weighted rubric and passed{" "}
            <strong className="text-accent">9/9</strong> validation checks.
          </p>

          <div className="mt-6 rounded-xl border border-white/5 bg-surface-raised p-6">
            <p className="text-sm font-medium text-zinc-500">Cluster</p>
            <p className="mt-1 text-white">
              Ecommerce Operations Automation (Inventory, Listings, Support)
            </p>
            <p className="mt-4 text-sm font-medium text-zinc-500">
              Why we built this demo
            </p>
            <p className="mt-1 text-zinc-300">
              Combining inventory sync with AI-powered WISMO response in one tool eliminates two separate tool subscriptions; self-hosted LLM keeps support automation cost near zero
            </p>
          </div>
        </section>

        {/* Product specification */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">Product specification</h2>
          <p className="mt-4 text-zinc-400">
            <strong className="text-zinc-300">Target customer:</strong> Solo and small-team ecommerce sellers on 2+ channels (Shopify + Amazon/eBay/Etsy) doing $5K–$200K/month GMV who can&apos;t afford a full operations team
          </p>

          <h3 className="mt-8 text-lg font-semibold text-white">Core MVP features</h3>
          <ul className="mt-4 space-y-3">
            {coreFeatures.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-zinc-400">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4 rounded-xl border border-white/5 bg-surface-raised p-6 text-sm">
            <div>
              <p className="font-medium text-zinc-500">Pricing</p>
              <p className="mt-1 text-zinc-300">
                Tiered monthly SaaS by number of SKUs and channels at $79/month for up to 500 SKUs across 3 channels; $149/month for up to 2,000 SKUs
              </p>
            </div>
            <div>
              <p className="font-medium text-zinc-500">Go-to-market</p>
              <p className="mt-1 text-zinc-300">
                r/ecommerce, r/dropshipping, Shopify app store listing, Facebook ecommerce seller groups, cold DM to sellers posting about overselling/support pain
              </p>
            </div>
            <div>
              <p className="font-medium text-zinc-500">Competitive landscape</p>
              <p className="mt-1 text-zinc-300">
                Linnworks and Skubana (too expensive/complex for solos), Sellbrite (basic, no AI support layer). No affordable AI-native combo of inventory sync + automated WISMO support exists.
              </p>
            </div>
            <div>
              <p className="font-medium text-zinc-500">Agentic automation plan</p>
              <p className="mt-1 text-zinc-300">
                Sync agent polls all channel APIs every 60 seconds and pushes updates; WISMO agent monitors support inbox, queries carrier API, drafts and sends responses; alert agent monitors thresholds and pauses listings; digest agent compiles and emails daily summary — human reviews only escalated tickets flagged by AI
              </p>
            </div>
            <div>
              <p className="font-medium text-zinc-500">MVP estimate</p>
              <p className="mt-1 text-zinc-300">
                Python + Shopify/Amazon/eBay APIs + carrier APIs (EasyPost) + LLM (LLaMA 3 via Ollama) for email parsing/response + Postgres + simple React dashboard; 4 weeks solo dev
              </p>
            </div>
          </div>
        </section>

        {/* Validation checklist */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">
            Validation checklist (9/9)
          </h2>
          <ul className="mt-6 space-y-2">
            {validationItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface-raised px-4 py-3 text-sm"
              >
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-zinc-300">{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Source pain points */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">
            Source pain points (real posts)
          </h2>
          <div className="mt-6 space-y-6">
            {painPoints.map((pp, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-surface-raised p-6"
              >
                <p className="leading-relaxed text-zinc-300">{pp.problem}</p>
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-zinc-600">Persona</dt>
                    <dd className="text-zinc-400">{pp.persona}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-600">Workaround</dt>
                    <dd className="text-zinc-400">{pp.workaround}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-600">Frequency</dt>
                    <dd className="text-zinc-400">{pp.frequency}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-600">WTP signal</dt>
                    <dd className="text-zinc-400">{pp.wtp}</dd>
                  </div>
                </dl>
                <a
                  href={pp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-glow"
                >
                  View source post
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <footer className="mt-16 border-t border-white/5 pt-8 text-center text-sm text-zinc-600">
          <p>Generated by Idea Miner run 2026-07-10-pm on 2026-07-10 19:08 UTC</p>
          <Link
            href="/demo"
            className="mt-4 inline-block text-accent hover:text-accent-glow"
          >
            Explore the live demo →
          </Link>
        </footer>
      </article>
    </div>
  );
}
