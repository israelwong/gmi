"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  const title = `${item.fabricante} ${item.modelo}`;

  return (
    <Dialog>
      <>
        <article
          className="flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-slate-200/45"
          aria-labelledby={`${item.id}-title`}
        >
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative aspect-square w-full cursor-zoom-in overflow-hidden border-0 bg-muted/30 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              aria-label={`Ampliar imagen: ${title}`}
            >
              <Image
                src={item.image_url}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </button>
          </DialogTrigger>

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

        <DialogContent className="gap-0 overflow-hidden border-slate-200/90 bg-white/98 p-0 sm:max-w-5xl">
          <div className="relative aspect-square w-full max-h-[min(72vh,640px)] bg-slate-950/5 sm:mx-auto sm:aspect-auto sm:h-[min(72vh,560px)] sm:max-w-3xl">
            <Image
              src={item.image_url}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority={false}
            />
          </div>
          <DialogHeader className="border-t border-border bg-white/95 px-6 py-4">
            <DialogTitle className="text-left font-mono text-base font-semibold text-foreground">
              {title}
            </DialogTitle>
            <p className="text-left font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {item.categoria}
              {item.cantidad > 1 ? ` · ×${item.cantidad} u.` : null}
            </p>
          </DialogHeader>
          <div className="border-t border-border bg-slate-50/90 px-6 py-4">
            <dl className="space-y-0 divide-y divide-border/80">
              {specEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    {SPEC_LABELS[key]}
                  </dt>
                  <dd className="font-mono text-sm text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </DialogContent>
      </>
    </Dialog>
  );
}
