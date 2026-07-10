"use client";

import { useState } from "react";
import {
  CHANNEL_COLORS,
  CHANNEL_LABELS,
  DIGEST,
  INVENTORY,
  SYNC_EVENTS,
  WISMO_TICKETS,
  type Channel,
  type WismoTicket,
} from "@/lib/data";

type Tab = "inventory" | "wismo" | "activity" | "digest";

function StatusBadge({ status }: { status: "live" | "paused" | "syncing" }) {
  const styles = {
    live: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    paused: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    syncing: "bg-accent/10 text-accent ring-accent/20",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function TicketStatusBadge({
  status,
}: {
  status: WismoTicket["status"];
}) {
  const styles = {
    pending: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
    "auto-replied": "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    escalated: "bg-red-500/10 text-red-400 ring-red-500/20",
  };
  const labels = {
    pending: "Pending",
    "auto-replied": "Auto-replied",
    escalated: "Escalated",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("inventory");
  const [selectedTicket, setSelectedTicket] = useState<string>(WISMO_TICKETS[0].id);
  const [bufferThreshold, setBufferThreshold] = useState(5);
  const [simulating, setSimulating] = useState(false);
  const [inventory, setInventory] = useState(INVENTORY);
  const [events, setEvents] = useState(SYNC_EVENTS);
  const [tickets, setTickets] = useState(WISMO_TICKETS);

  const ticket = tickets.find((t) => t.id === selectedTicket)!;

  const simulateSale = () => {
    if (simulating) return;
    setSimulating(true);

    const targetIdx = inventory.findIndex((i) => i.sku === "WB-HOOD-GRY-L");
    if (targetIdx === -1) return;

    setInventory((prev) => {
      const next = [...prev];
      const item = { ...next[targetIdx] };
      item.stock = Math.max(0, item.stock - 1);
      item.lastSync = "syncing…";
      item.channels = {
        ...item.channels,
        shopify: { ...item.channels.shopify, status: "syncing" },
        amazon: { ...item.channels.amazon, status: "syncing" },
        ebay: { ...item.channels.ebay, status: "syncing" },
        etsy: { ...item.channels.etsy, status: "syncing" },
      };
      next[targetIdx] = item;
      return next;
    });

    setTimeout(() => {
      setInventory((prev) => {
        const next = [...prev];
        const item = { ...next[targetIdx] };
        const newStock = item.stock;
        item.lastSync = "just now";
        (Object.keys(item.channels) as Channel[]).forEach((ch) => {
          item.channels[ch] = {
            qty: newStock,
            status:
              newStock < bufferThreshold && ch !== "shopify"
                ? "paused"
                : "live",
          };
        });
        next[targetIdx] = item;
        return next;
      });

      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      });

      setEvents((prev) => [
        {
          id: `e-${Date.now()}`,
          time: timeStr,
          type: "sale",
          channel: "shopify",
          sku: "WB-HOOD-GRY-L",
          detail: `Demo sale −1 → synced to all channels in 47s`,
        },
        ...prev.slice(0, 9),
      ]);

      setSimulating(false);
    }, 2000);
  };

  const autoReplyTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId && t.status === "pending"
          ? {
              ...t,
              status: "auto-replied" as const,
              tracking: "1Z999AA10987654321",
              carrier: "UPS",
              aiReply: `Hi ${t.customer.split(" ")[0]}! Your order ${t.orderId} shipped via UPS on Jul 9. Track it here: 1Z999AA10987654321 — estimated delivery Jul 12. Let us know if you need anything else!`,
            }
          : t
      )
    );
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "inventory", label: "Inventory" },
    { id: "wismo", label: "WISMO Inbox" },
    { id: "activity", label: "Activity" },
    { id: "digest", label: "Daily Digest" },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Demo header */}
      <div className="border-b border-white/5 bg-surface-raised">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Operations Dashboard</h1>
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/20">
                Demo mode
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-500">
              Wild Bloom Apparel · 4 channels connected
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-surface px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs text-zinc-400">All agents active</span>
            </div>
            <button
              onClick={simulateSale}
              disabled={simulating}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent-glow disabled:opacity-50"
            >
              {simulating ? "Syncing…" : "Simulate Shopify sale"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Orders today", value: DIGEST.totalOrders, sub: `$${DIGEST.revenue.toLocaleString()} revenue` },
            { label: "WISMO resolved", value: `${DIGEST.wismoResolved}/${DIGEST.wismoResolved + DIGEST.wismoEscalated}`, sub: `${DIGEST.wismoEscalated} escalated` },
            { label: "Low stock SKUs", value: DIGEST.lowStockCount, sub: "Below buffer threshold" },
            { label: "Carts recovered", value: DIGEST.cartsRecovered, sub: `$${DIGEST.recoveryRevenue} recovered` },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-white/5 bg-surface-raised p-4"
            >
              <p className="text-xs text-zinc-500">{kpi.label}</p>
              <p className="mt-1 font-mono text-2xl font-bold text-white">
                {kpi.value}
              </p>
              <p className="mt-0.5 text-xs text-zinc-600">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 overflow-x-auto rounded-lg border border-white/5 bg-surface-raised p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-accent/10 text-accent"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {activeTab === "inventory" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-surface-raised p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    Oversell buffer threshold
                  </p>
                  <p className="text-xs text-zinc-500">
                    Auto-pause secondary channels when stock drops below this level
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={bufferThreshold}
                    onChange={(e) => setBufferThreshold(Number(e.target.value))}
                    className="w-40 accent-accent"
                  />
                  <span className="font-mono text-sm text-accent">
                    {bufferThreshold} units
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/5">
                <table className="w-full min-w-[800px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-surface-raised text-xs uppercase tracking-wider text-zinc-500">
                      <th className="px-4 py-3 font-medium">SKU</th>
                      <th className="px-4 py-3 font-medium">Product</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                      <th className="px-4 py-3 font-medium">Shopify</th>
                      <th className="px-4 py-3 font-medium">Amazon</th>
                      <th className="px-4 py-3 font-medium">eBay</th>
                      <th className="px-4 py-3 font-medium">Etsy</th>
                      <th className="px-4 py-3 font-medium">Last sync</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => {
                      const lowStock = item.stock < bufferThreshold;
                      return (
                        <tr
                          key={item.id}
                          className={`border-b border-white/5 transition ${
                            lowStock ? "bg-amber-500/5" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                            {item.sku}
                          </td>
                          <td className="px-4 py-3 text-white">{item.name}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`font-mono font-semibold ${
                                lowStock ? "text-amber-400" : "text-white"
                              }`}
                            >
                              {item.stock}
                            </span>
                            {lowStock && (
                              <span className="ml-2 text-xs text-amber-500">
                                low
                              </span>
                            )}
                          </td>
                          {(Object.keys(item.channels) as Channel[]).map((ch) => (
                            <td key={ch} className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-zinc-400">
                                  {item.channels[ch].qty}
                                </span>
                                <StatusBadge status={item.channels[ch].status} />
                              </div>
                            </td>
                          ))}
                          <td className="px-4 py-3 text-xs text-zinc-500">
                            {item.lastSync}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "wismo" && (
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="demo-scroll max-h-[520px] overflow-y-auto rounded-xl border border-white/5">
                  {tickets.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTicket(t.id)}
                      className={`w-full border-b border-white/5 p-4 text-left transition hover:bg-white/5 ${
                        selectedTicket === t.id ? "bg-accent/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-white">{t.customer}</p>
                          <p className="mt-0.5 text-xs text-zinc-500">
                            {t.orderId} ·{" "}
                            <span className={CHANNEL_COLORS[t.channel]}>
                              {CHANNEL_LABELS[t.channel]}
                            </span>
                          </p>
                        </div>
                        <TicketStatusBadge status={t.status} />
                      </div>
                      <p className="mt-2 truncate text-sm text-zinc-400">
                        {t.subject}
                      </p>
                      <p className="mt-1 text-xs text-zinc-600">{t.receivedAt}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="rounded-xl border border-white/5 bg-surface-raised p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {ticket.subject}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        From {ticket.customer} · {ticket.email}
                      </p>
                    </div>
                    <TicketStatusBadge status={ticket.status} />
                  </div>

                  <div className="mt-6 rounded-lg border border-white/5 bg-surface p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                      Customer message
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      {ticket.message}
                    </p>
                  </div>

                  {ticket.status === "pending" && (
                    <button
                      onClick={() => autoReplyTicket(ticket.id)}
                      className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent-glow"
                    >
                      Run WISMO agent
                    </button>
                  )}

                  {ticket.aiReply && (
                    <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                        <p className="text-xs font-medium uppercase tracking-wider text-accent">
                          AI auto-reply sent
                        </p>
                        {ticket.carrier && (
                          <span className="text-xs text-zinc-500">
                            via {ticket.carrier}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                        {ticket.aiReply}
                      </p>
                      {ticket.tracking && (
                        <p className="mt-2 font-mono text-xs text-accent">
                          {ticket.tracking}
                        </p>
                      )}
                    </div>
                  )}

                  {ticket.status === "escalated" && (
                    <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-red-400">
                        Escalated to human review
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">
                        AI flagged: delivery dispute requires manual investigation.
                        Tracking shows delivered but customer reports non-receipt.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="demo-scroll max-h-[600px] overflow-y-auto rounded-xl border border-white/5">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-4 border-b border-white/5 p-4 transition hover:bg-white/[0.02]"
                >
                  <div className="w-24 shrink-0 font-mono text-xs text-zinc-600">
                    {event.time}
                  </div>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      event.type === "sale"
                        ? "bg-blue-500/10 text-blue-400"
                        : event.type === "pause"
                          ? "bg-amber-500/10 text-amber-400"
                          : event.type === "recovery"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-accent/10 text-accent"
                    }`}
                  >
                    {event.type === "sale" && "−"}
                    {event.type === "pause" && "⏸"}
                    {event.type === "recovery" && "↩"}
                    {event.type === "sync" && "↻"}
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      <span className={CHANNEL_COLORS[event.channel]}>
                        {CHANNEL_LABELS[event.channel]}
                      </span>
                      <span className="text-zinc-600"> · </span>
                      <span className="font-mono text-xs text-zinc-500">
                        {event.sku}
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-400">{event.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "digest" && (
            <div className="rounded-xl border border-white/5 bg-surface-raised p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Daily Operations Digest
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    Friday, July 10, 2026
                  </h3>
                </div>
                <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  Delivered 6:00 AM
                </span>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Sales by channel
                  </h4>
                  <div className="mt-4 space-y-3">
                    {(Object.keys(DIGEST.salesByChannel) as Channel[]).map(
                      (ch) => {
                        const count = DIGEST.salesByChannel[ch];
                        const pct =
                          (count / DIGEST.totalOrders) * 100;
                        return (
                          <div key={ch}>
                            <div className="flex justify-between text-sm">
                              <span className={CHANNEL_COLORS[ch]}>
                                {CHANNEL_LABELS[ch]}
                              </span>
                              <span className="text-zinc-400">
                                {count} orders ({pct.toFixed(0)}%)
                              </span>
                            </div>
                            <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/5">
                              <div
                                className="h-full rounded-full bg-accent/60"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <p className="mt-4 font-mono text-2xl font-bold text-white">
                    ${DIGEST.revenue.toLocaleString()}
                    <span className="ml-2 text-sm font-normal text-zinc-500">
                      total revenue
                    </span>
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <h4 className="text-sm font-semibold text-amber-400">
                      Low-stock alerts ({DIGEST.lowStockCount})
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                      <li>WB-TEE-BLK-M — 3 units (buffer: 5)</li>
                      <li>WB-SOCK-3PK — 8 units (buffer: 12)</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-white/5 p-4">
                    <h4 className="text-sm font-semibold text-white">
                      Support summary
                    </h4>
                    <p className="mt-2 text-sm text-zinc-400">
                      {DIGEST.wismoResolved} WISMO tickets auto-resolved ·{" "}
                      {DIGEST.wismoEscalated} escalated for review
                    </p>
                  </div>

                  <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
                    <h4 className="text-sm font-semibold text-purple-400">
                      Abandoned cart recovery
                    </h4>
                    <p className="mt-2 text-sm text-zinc-400">
                      {DIGEST.cartsRecovered} carts recovered · $
                      {DIGEST.recoveryRevenue} revenue from automated sequences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
