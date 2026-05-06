import { Factory, Layers, ShieldCheck } from "lucide-react";

const POINTS = [
  {
    icon: Factory,
    title: "Parque y cadena técnica",
    text: "HAAS · Doosan y equipamiento complementario para piezas exigentes.",
  },
  {
    icon: Layers,
    title: "Series y desarrollo",
    text: "Lotes recurrentes y prototipos bajo planos y tolerancias acordadas.",
  },
  {
    icon: ShieldCheck,
    title: "Confidencialidad",
    text: "Acuerdos de confidencialidad en cada proyecto, sin divulgar proceso.",
  },
] as const;

export function InstitutionalVideo() {
  return (
    <section
      className="border-b border-border bg-background"
      aria-labelledby="titulo-trabajo-en-planta"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <header className="max-w-prose space-y-3 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Grupo GMI
          </p>
          <h2
            id="titulo-trabajo-en-planta"
            className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl"
          >
            Así trabajamos en planta
          </h2>
          <p className="text-pretty text-sm leading-snug text-muted-foreground sm:text-base">
            Precisión industrial, equipo certero y confidencialidad en cada proyecto.
          </p>
        </header>

        <ul
          className="mt-12 grid list-none gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 lg:gap-8"
          role="list"
        >
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <article className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm ring-1 ring-border/35 sm:p-7 dark:bg-card/95 dark:ring-border/50 dark:shadow-none">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary"
                  aria-hidden
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 space-y-1.5 pt-1">
                  <h3 className="text-base font-semibold leading-snug text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
