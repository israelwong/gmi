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
          className="mt-12 grid list-none grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0 lg:mt-14"
          role="list"
        >
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex gap-4 py-8 md:flex-col md:gap-5 md:px-6 md:py-10 lg:gap-6"
            >
              <Icon
                className="mt-0.5 size-5 shrink-0 text-primary md:mt-0 md:size-6"
                strokeWidth={1.75}
                aria-hidden
              />
              <div className="min-w-0 space-y-1.5">
                <h3 className="text-base font-semibold leading-snug text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
