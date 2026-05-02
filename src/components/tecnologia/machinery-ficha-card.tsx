import type { MachineryItem } from "@/types/company";

type MachineryFichaCardProps = {
  item: MachineryItem;
};

export function MachineryFichaCard({ item }: MachineryFichaCardProps) {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-slate-200/45 dark:border-border dark:bg-card dark:text-card-foreground dark:shadow-lg dark:shadow-black/35 dark:ring-1 dark:ring-white/10"
      aria-labelledby={`${item.id}-title`}
    >
      <div
        className="h-1 shrink-0 bg-gradient-to-r from-primary/55 via-primary/25 to-transparent"
        aria-hidden
      />
      <div className="p-5">
        <header className="border-b border-dashed border-border pb-3">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Ficha técnica · {item.categoria}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
            <h3
              id={`${item.id}-title`}
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              <span className="font-mono text-primary">{item.fabricante}</span>{" "}
              <span className="text-foreground">{item.modelo}</span>
            </h3>
            {item.cantidad > 1 ? (
              <span className="rounded border border-border bg-slate-50 px-2 py-0.5 font-mono text-xs text-foreground dark:bg-muted">
                ×{item.cantidad} unidades
              </span>
            ) : null}
          </div>
        </header>
        <dl className="mt-3 space-y-0 divide-y divide-border/70">
          {item.especificaciones.map((fila, i) => (
            <div
              key={`${item.id}-spec-${i}`}
              className="grid gap-1 py-2.5 sm:grid-cols-[9.5rem_1fr] sm:gap-4"
            >
              <dt className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {fila.etiqueta}
              </dt>
              <dd className="font-mono text-sm text-foreground">{fila.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
