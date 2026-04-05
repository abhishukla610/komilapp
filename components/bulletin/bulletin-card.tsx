import { ExternalLink, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type BulletinItem, getCategoryInfo, formatRelativeTime } from "@/lib/bulletin";

interface BulletinCardProps {
  item: BulletinItem;
}

export function BulletinCard({ item }: BulletinCardProps) {
  const categoryInfo = getCategoryInfo(item.category);

  return (
    <Card className="group/bulletin transition-shadow hover:shadow-md hover:ring-foreground/20">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryInfo.color} ${categoryInfo.bgColor}`}
          >
            {categoryInfo.label}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {formatRelativeTime(item.publishedAt)}
          </span>
        </div>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link"
        >
          <h3 className="font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover/link:text-[var(--color-accent-gold)]">
            {item.title}
          </h3>
        </a>

        {item.description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.source}
          </a>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-[var(--color-accent-gold)] transition-colors hover:text-[var(--color-accent-gold)]/80"
          >
            Read more
            <ExternalLink className="size-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
