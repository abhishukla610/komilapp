import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
}

export function Section({
  eyebrow,
  title,
  titleAccent,
  description,
  centered = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mb-12 max-w-2xl",
              centered && "mx-auto text-center"
            )}
          >
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-gold)]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
                {titleAccent && (
                  <span className="text-[var(--color-accent-gold)]">
                    {" "}
                    {titleAccent}
                  </span>
                )}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
