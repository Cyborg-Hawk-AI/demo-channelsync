export const PITCH =
  "One agent syncs inventory across all channels and auto-answers WISMO tickets so you stop overselling and stop copy-pasting.";

export const CHANNELS = ["shopify", "amazon", "ebay", "etsy"] as const;
export type Channel = (typeof CHANNELS)[number];

export const CHANNEL_LABELS: Record<Channel, string> = {
  shopify: "Shopify",
  amazon: "Amazon",
  ebay: "eBay",
  etsy: "Etsy",
};

export const CHANNEL_COLORS: Record<Channel, string> = {
  shopify: "text-channel-shopify",
  amazon: "text-channel-amazon",
  ebay: "text-channel-ebay",
  etsy: "text-channel-etsy",
};

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  stock: number;
  buffer: number;
  channels: Record<Channel, { qty: number; status: "live" | "paused" | "syncing" }>;
  lastSync: string;
}

export interface WismoTicket {
  id: string;
  customer: string;
  email: string;
  orderId: string;
  channel: Channel;
  subject: string;
  message: string;
  status: "pending" | "auto-replied" | "escalated";
  tracking?: string;
  carrier?: string;
  aiReply?: string;
  receivedAt: string;
}

export interface SyncEvent {
  id: string;
  time: string;
  type: "sale" | "sync" | "pause" | "recovery";
  channel: Channel;
  sku: string;
  detail: string;
}

export interface DigestStats {
  salesByChannel: Record<Channel, number>;
  totalOrders: number;
  revenue: number;
  lowStockCount: number;
  wismoResolved: number;
  wismoEscalated: number;
  cartsRecovered: number;
  recoveryRevenue: number;
}

export const INVENTORY: InventoryItem[] = [
  {
    id: "1",
    sku: "WB-TEE-BLK-M",
    name: "Organic Cotton Tee — Black / M",
    stock: 3,
    buffer: 5,
    channels: {
      shopify: { qty: 3, status: "live" },
      amazon: { qty: 3, status: "paused" },
      ebay: { qty: 3, status: "paused" },
      etsy: { qty: 3, status: "live" },
    },
    lastSync: "12s ago",
  },
  {
    id: "2",
    sku: "WB-HOOD-GRY-L",
    name: "Fleece Hoodie — Heather Gray / L",
    stock: 47,
    buffer: 10,
    channels: {
      shopify: { qty: 47, status: "live" },
      amazon: { qty: 47, status: "live" },
      ebay: { qty: 47, status: "live" },
      etsy: { qty: 47, status: "live" },
    },
    lastSync: "8s ago",
  },
  {
    id: "3",
    sku: "WB-CAP-NAV-OS",
    name: "Dad Cap — Navy / One Size",
    stock: 128,
    buffer: 15,
    channels: {
      shopify: { qty: 128, status: "live" },
      amazon: { qty: 128, status: "live" },
      ebay: { qty: 128, status: "live" },
      etsy: { qty: 128, status: "live" },
    },
    lastSync: "5s ago",
  },
  {
    id: "4",
    sku: "WB-SOCK-3PK",
    name: "Merino Sock 3-Pack",
    stock: 8,
    buffer: 12,
    channels: {
      shopify: { qty: 8, status: "live" },
      amazon: { qty: 8, status: "paused" },
      ebay: { qty: 8, status: "paused" },
      etsy: { qty: 8, status: "live" },
    },
    lastSync: "18s ago",
  },
  {
    id: "5",
    sku: "WB-TOTE-ECO",
    name: "Canvas Tote — Eco Print",
    stock: 62,
    buffer: 8,
    channels: {
      shopify: { qty: 62, status: "live" },
      amazon: { qty: 62, status: "live" },
      ebay: { qty: 62, status: "live" },
      etsy: { qty: 62, status: "live" },
    },
    lastSync: "3s ago",
  },
];

export const WISMO_TICKETS: WismoTicket[] = [
  {
    id: "t1",
    customer: "Sarah Chen",
    email: "sarah.c@email.com",
    orderId: "#SH-48291",
    channel: "shopify",
    subject: "Where is my order??",
    message:
      "Hi, I ordered the fleece hoodie 5 days ago and haven't received any tracking. Can you tell me where it is?",
    status: "auto-replied",
    tracking: "1Z999AA10123456784",
    carrier: "UPS",
    aiReply:
      "Hi Sarah! Your order #SH-48291 shipped via UPS on Jul 7. Track it here: 1Z999AA10123456784 — estimated delivery Jul 11. Let us know if you need anything else!",
    receivedAt: "2:14 PM",
  },
  {
    id: "t2",
    customer: "Marcus Webb",
    email: "m.webb@gmail.com",
    orderId: "AMZ-10938472",
    channel: "amazon",
    subject: "Order not arrived",
    message:
      "Package shows delivered but I don't have it. Neighbors didn't get it either.",
    status: "escalated",
    tracking: "TBA123456789012",
    carrier: "Amazon Logistics",
    receivedAt: "1:47 PM",
  },
  {
    id: "t3",
    customer: "Emily R.",
    email: "emily.r@outlook.com",
    orderId: "EBY-8839201",
    channel: "ebay",
    subject: "Shipping update please",
    message: "When will my dad cap ship? Still says 'not dispatched'.",
    status: "pending",
    receivedAt: "3:02 PM",
  },
  {
    id: "t4",
    customer: "James Okonkwo",
    email: "j.okonkwo@yahoo.com",
    orderId: "ETSY-22910",
    channel: "etsy",
    subject: "Tracking number?",
    message: "Could you send tracking for my tote bag order? Thanks!",
    status: "auto-replied",
    tracking: "9400111899223344556677",
    carrier: "USPS",
    aiReply:
      "Hi James! Your Etsy order #22910 is on its way via USPS. Tracking: 9400111899223344556677 — currently in transit, expected Jul 12. Happy to help with anything else!",
    receivedAt: "11:28 AM",
  },
];

export const SYNC_EVENTS: SyncEvent[] = [
  {
    id: "e1",
    time: "3:04:12 PM",
    type: "sale",
    channel: "shopify",
    sku: "WB-TEE-BLK-M",
    detail: "Sale −1 → synced to all channels in 42s",
  },
  {
    id: "e2",
    time: "3:04:54 PM",
    type: "pause",
    channel: "amazon",
    sku: "WB-TEE-BLK-M",
    detail: "Stock below buffer (3 < 5) — listing auto-paused",
  },
  {
    id: "e3",
    time: "2:58:01 PM",
    type: "recovery",
    channel: "shopify",
    sku: "WB-HOOD-GRY-L",
    detail: "Abandoned cart email #2 sent — $68 cart recovered",
  },
  {
    id: "e4",
    time: "2:45:33 PM",
    type: "sync",
    channel: "ebay",
    sku: "WB-CAP-NAV-OS",
    detail: "Inventory push complete — 128 units live",
  },
  {
    id: "e5",
    time: "2:31:18 PM",
    type: "sale",
    channel: "amazon",
    sku: "WB-SOCK-3PK",
    detail: "Sale −2 → synced to all channels in 38s",
  },
];

export const DIGEST: DigestStats = {
  salesByChannel: {
    shopify: 34,
    amazon: 21,
    ebay: 12,
    etsy: 9,
  },
  totalOrders: 76,
  revenue: 6842,
  lowStockCount: 2,
  wismoResolved: 18,
  wismoEscalated: 2,
  cartsRecovered: 7,
  recoveryRevenue: 412,
};

export const FEATURES = [
  {
    title: "60-second inventory sync",
    description:
      "Every sale on Shopify, Amazon, eBay, or Etsy pushes updated stock to all channels within 60 seconds — no spreadsheets, no lag.",
    icon: "sync",
  },
  {
    title: "WISMO AI responder",
    description:
      "Connects to carrier APIs and auto-replies to 'Where is my order?' emails with live tracking. You only see escalations.",
    icon: "message",
  },
  {
    title: "Oversell prevention",
    description:
      "When stock drops below your buffer threshold, secondary channel listings auto-pause before you sell what you don't have.",
    icon: "shield",
  },
  {
    title: "Daily operations digest",
    description:
      "Morning email with sales by channel, low-stock alerts, and support ticket summary — your ops briefing in one read.",
    icon: "mail",
  },
  {
    title: "Abandoned cart recovery",
    description:
      "Multi-step email and SMS sequences trigger automatically when shoppers leave items behind — no manual setup.",
    icon: "cart",
  },
  {
    title: "Agent-first architecture",
    description:
      "Sync, WISMO, alert, and digest agents run 24/7 on self-hosted LLMs. Near-zero marginal cost per ticket.",
    icon: "agent",
  },
];

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: 79,
    description: "For solos getting serious about multichannel",
    skus: "Up to 500 SKUs",
    channels: "3 channels",
    features: [
      "Real-time inventory sync",
      "WISMO auto-responder",
      "Oversell prevention",
      "Daily digest email",
      "Abandoned cart recovery",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: 149,
    description: "For growing catalogs across every marketplace",
    skus: "Up to 2,000 SKUs",
    channels: "All 4 channels",
    features: [
      "Everything in Starter",
      "Priority sync queue",
      "Custom buffer rules per SKU",
      "SMS cart recovery",
      "Escalation routing rules",
    ],
    highlighted: true,
  },
];
