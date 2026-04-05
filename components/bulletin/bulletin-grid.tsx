"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type BulletinItem, formatRelativeTime } from "@/lib/bulletin";
import { BulletinCard } from "@/components/bulletin/bulletin-card";
import { BulletinTicker } from "@/components/bulletin/bulletin-ticker";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "gst", label: "GST" },
  { key: "income-tax", label: "Income Tax" },
  { key: "compliance", label: "Compliance" },
  { key: "budget", label: "Budget" },
] as const;

type CategoryFilter = (typeof CATEGORIES)[number]["key"];

export function BulletinGrid() {
  const [items, setItems] = useState<BulletinItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const fetchBulletins = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("/api/bulletin");
      const data = await res.json();
      setItems(data.items || []);
      setUpdatedAt(data.updatedAt || "");
    } catch {
      // Silently fail — keep existing items
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBulletins();
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchBulletins(true), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchBulletins]);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      {/* Ticker */}
      <BulletinTicker items={items} />

      {/* Filter bar + status */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat.key
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status + refresh */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {updatedAt && (
            <span>Updated {formatRelativeTime(updatedAt)}</span>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 px-2.5 text-xs"
            onClick={() => fetchBulletins(true)}
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <RefreshCw className="size-3" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-5 w-full animate-pulse rounded bg-muted" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-full animate-pulse rounded bg-muted" />
                <div className="h-3.5 w-5/6 animate-pulse rounded bg-muted" />
                <div className="h-3.5 w-2/3 animate-pulse rounded bg-muted" />
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            No updates yet. Check back soon.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchBulletins(true)}
          >
            <RefreshCw className="mr-1.5 size-3.5" />
            Try again
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <BulletinCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
