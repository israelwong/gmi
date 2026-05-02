import type { MachineryItem } from "@/types/company";

const SPEC_LABELS: Record<keyof MachineryItem["especificaciones"], string> = {
  husillo_rpm: "Husillo (RPM)",
  herramientas: "Herramientas",
  recorrido_xyz_mm: "Recorridos (mm)",
  control: "Control",
};

type MachineryFichaCardProps = {
  item: MachineryItem;
};

export function MachineryFichaCard({ item }: MachineryFichaCardProps) {
  const specEntries = Object.entries(item.especificaciones) as Array<
    [keyof MachineryItem["especificaciones"], string]
  >;

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-slate-200/45"
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
            {item.cantidad > 1 && (
              <span className="rounded border border-border bg-slate-50 px-2 py-0.5 font-mono text-xs text-foreground">
                ×{item.cantidad} unidades
              </span>
            )}
          </div>
        </header>
        <dl className="mt-3 space-y-0 divide-y divide-border/70">
          {specEntries.map(([key, value]) => (
            <div
              key={key}
              className="grid gap-1 py-2.5 sm:grid-cols-[9.5rem_1fr] sm:gap-4"
            >
              <dt className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {SPEC_LABELS[key]}
              </dt>
              <dd className="font-mono text-sm text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
