"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, MessageCircle, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { siteConfig, navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <span className="font-serif text-lg font-bold text-primary">
              Komil Koshti
            </span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.title}>
                <button
                  onClick={() => toggleExpanded(link.title)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.title}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      expandedItems.includes(link.title) && "rotate-180"
                    )}
                  />
                </button>
                {expandedItems.includes(link.title) && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {link.title}
              </Link>
            )
          )}
        </nav>

        <div className="mt-4 flex flex-col gap-3 border-t border-border px-4 pt-4">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Phone className="size-4" />
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MessageCircle className="size-4" />
            WhatsApp Us
          </a>
          <Link href="/contact" onClick={() => setOpen(false)}>
            <Button className="w-full bg-[var(--color-accent-gold)] text-white hover:bg-[var(--color-accent-gold)]/90">
              Book Free Consultation
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
