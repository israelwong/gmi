import { cn } from "@/lib/utils";

type SectionLayoutProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionLayout({
  id,
  title,
  subtitle,
  eyebrow,
  children,
  className,
  contentClassName,
}: SectionLayoutProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", className)}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
          contentClassName,
        )}
      >
        {(eyebrow || title || subtitle) && (
          <header className="mb-12 max-w-2xl space-y-3">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
