import { ShieldCheck } from "lucide-react";

export function InstitutionalVideo() {
  return (
    <section
      className="border-b border-border py-12 sm:py-16"
      aria-labelledby="titulo-confidencialidad"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-xl border border-primary/25 shadow-lg shadow-primary/10 ring-1 ring-primary/15">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#000d1a] via-[#001a33] to-[#002447] dark:from-[#030810] dark:via-[#0a1528] dark:to-[#060f1c]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_15%_10%,rgba(0,130,220,0.22),transparent_58%),radial-gradient(ellipse_85%_65%_at_100%_100%,rgba(0,25,55,0.5),transparent_52%)] dark:bg-[radial-gradient(ellipse_90%_70%_at_12%_8%,rgba(92,166,247,0.18),transparent_55%),radial-gradient(ellipse_80%_55%_at_100%_95%,rgba(0,0,0,0.35),transparent_50%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay [background-image:repeating-linear-gradient(105deg,transparent_0px,transparent_12px,rgba(255,255,255,0.04)_12px,rgba(255,255,255,0.04)_13px)] dark:opacity-[0.07]"
            aria-hidden
          />

          <div className="relative flex flex-col gap-5 px-6 py-8 text-primary-foreground sm:px-8 sm:py-10 md:flex-row md:items-center md:gap-8 lg:px-10 lg:py-12">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 shadow-sm backdrop-blur-[2px] sm:size-16">
              <ShieldCheck
                className="size-7 sm:size-8"
                strokeWidth={1.75}
                aria-hidden
              />
            </div>
            <div className="min-w-0 space-y-2.5">
              <h2
                id="titulo-confidencialidad"
                className="text-balance text-2xl font-bold leading-tight tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-3xl"
              >
                Confidencialidad
              </h2>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/92 sm:text-lg">
                Acuerdos de confidencialidad en cada proyecto.
              </p>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/90 via-primary to-primary/70"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
