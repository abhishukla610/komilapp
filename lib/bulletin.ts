export interface BulletinItem {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  link: string;
  publishedAt: string;
  category: "gst" | "income-tax" | "compliance" | "budget" | "general";
}

export const RSS_FEEDS = [
  { url: "https://taxguru.in/feed/", source: "TaxGuru", sourceUrl: "https://taxguru.in", category: "general" as const },
  { url: "https://www.taxscan.in/feed/", source: "TaxScan", sourceUrl: "https://www.taxscan.in", category: "general" as const },
  { url: "https://cleartax.in/s/blog/feed/", source: "ClearTax", sourceUrl: "https://cleartax.in", category: "general" as const },
];

// Simple XML tag extractor (handles CDATA and plain text)
function extractTag(xml: string, tag: string): string {
  const match = xml.match(
    new RegExp(
      `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,
      "i"
    )
  );
  return match ? (match[1] || match[2] || "").trim() : "";
}

// Extract all occurrences of a tag block
function extractAllBlocks(xml: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
  return xml.match(regex) || [];
}

// Strip HTML tags from a string
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Categorize article by keywords in the title
function categorizeByTitle(title: string): BulletinItem["category"] {
  const lower = title.toLowerCase();
  if (lower.includes("gst") || lower.includes("goods and services tax")) return "gst";
  if (lower.includes("income tax") || lower.includes("itr") || lower.includes("section 80") || lower.includes("tds")) return "income-tax";
  if (lower.includes("compliance") || lower.includes("penalty") || lower.includes("filing") || lower.includes("due date") || lower.includes("deadline")) return "compliance";
  if (lower.includes("budget") || lower.includes("finance bill") || lower.includes("union budget")) return "budget";
  return "general";
}

// Generate a simple hash-based ID
function generateId(title: string, source: string): string {
  const str = `${source}-${title}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export async function fetchRSSFeed(
  feedUrl: string,
  source: string,
  sourceUrl: string,
  defaultCategory: string
): Promise<BulletinItem[]> {
  try {
    const response = await fetch(feedUrl, {
      headers: { "User-Agent": "KomilApp-BulletinBot/1.0" },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const items = extractAllBlocks(xml, "item");

    return items.slice(0, 10).map((item) => {
      const title = stripHtml(extractTag(item, "title"));
      const rawDesc = extractTag(item, "description");
      const description = stripHtml(rawDesc).slice(0, 300);
      const link = extractTag(item, "link");
      const pubDate = extractTag(item, "pubDate");
      const category = categorizeByTitle(title) !== "general"
        ? categorizeByTitle(title)
        : (defaultCategory as BulletinItem["category"]);

      return {
        id: generateId(title, source),
        title,
        description,
        source,
        sourceUrl,
        link,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        category,
      };
    });
  } catch {
    return [];
  }
}

export async function fetchAllBulletins(): Promise<BulletinItem[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map((feed) =>
      fetchRSSFeed(feed.url, feed.source, feed.sourceUrl, feed.category)
    )
  );

  const allItems = results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : []
  );

  // Deduplicate by similar titles (normalize and compare)
  const seen = new Set<string>();
  const deduped = allItems.filter((item) => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort by publishedAt descending
  deduped.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return deduped.slice(0, 30);
}

export function getCategoryInfo(cat: BulletinItem["category"]): {
  label: string;
  color: string;
  bgColor: string;
} {
  switch (cat) {
    case "gst":
      return { label: "GST Update", color: "text-blue-700 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-950" };
    case "income-tax":
      return { label: "Income Tax", color: "text-green-700 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-950" };
    case "compliance":
      return { label: "Compliance", color: "text-orange-700 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-950" };
    case "budget":
      return { label: "Budget", color: "text-purple-700 dark:text-purple-400", bgColor: "bg-purple-100 dark:bg-purple-950" };
    case "general":
    default:
      return { label: "General", color: "text-gray-700 dark:text-gray-400", bgColor: "bg-gray-100 dark:bg-gray-800" };
  }
}

export function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
