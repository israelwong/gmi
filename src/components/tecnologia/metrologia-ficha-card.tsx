export type MetrologiaCap = {
  titulo: string;
  descripcion: string;
  detalle: string;
};

type MetrologiaFichaCardProps = {
  cap: MetrologiaCap;
};

export function MetrologiaFichaCard({ cap }: MetrologiaFichaCardProps) {
  return (
    <article
      className="max-w-xl overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-slate-200/45 dark:border-border dark:bg-card dark:text-card-foreground dark:shadow-lg dark:shadow-black/35 dark:ring-1 dark:ring-white/10"
      aria-labelledby="metrologia-card-title"
    >
      <div
        className="h-1 shrink-0 bg-gradient-to-r from-primary/55 via-primary/25 to-transparent"
        aria-hidden
      />
      <div className="space-y-4 p-6">
        <header className="border-b border-dashed border-border pb-3">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Área técnica · Metrología
          </p>
          <h3
            id="metrologia-card-title"
            className="mt-2 text-lg font-semibold tracking-tight text-foreground"
          >
            {cap.titulo}
          </h3>
        </header>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {cap.descripcion}
        </p>
        <p className="border border-dashed border-primary/20 bg-slate-50/80 px-3 py-2 font-mono text-xs text-primary/95 dark:border-primary/35 dark:bg-muted/80 dark:text-foreground">
          {cap.detalle}
        </p>
      </div>
    </article>
  );
}
