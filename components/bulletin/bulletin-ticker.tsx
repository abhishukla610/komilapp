"use client";

import { type BulletinItem } from "@/lib/bulletin";
import { Zap } from "lucide-react";

interface BulletinTickerProps {
  items: BulletinItem[];
}

export function BulletinTicker({ items }: BulletinTickerProps) {
  if (items.length === 0) return null;

  const tickerItems = items.slice(0, 5);
  // Duplicate for seamless loop
  const doubledItems = [...tickerItems, ...tickerItems];

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center">
        {/* LATEST label */}
        <div className="z-10 flex shrink-0 items-center gap-1.5 bg-[var(--color-accent-gold)] px-3 py-2 text-xs font-bold uppercase tracking-wider text-white">
          <Zap className="size-3.5 fill-current" />
          Latest
        </div>

        {/* Scrolling ticker */}
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap py-2">
            {doubledItems.map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center px-6 text-sm text-foreground transition-colors hover:text-[var(--color-accent-gold)]"
              >
                <span className="mr-2 inline-block size-1.5 rounded-full bg-[var(--color-accent-gold)]" />
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
