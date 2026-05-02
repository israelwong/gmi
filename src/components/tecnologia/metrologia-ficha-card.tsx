"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type MetrologiaCap = {
  titulo: string;
  descripcion: string;
  detalle: string;
  image_url: string;
};

type MetrologiaFichaCardProps = {
  cap: MetrologiaCap;
};

export function MetrologiaFichaCard({ cap }: MetrologiaFichaCardProps) {
  return (
    <Dialog>
      <>
        <article
          className="overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-slate-200/45"
          aria-labelledby="metrologia-card-title"
        >
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative aspect-square w-full cursor-zoom-in overflow-hidden border-0 bg-muted/30 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              aria-label={`Ampliar imagen: ${cap.titulo}`}
            >
              <Image
                src={cap.image_url}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </button>
          </DialogTrigger>
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
            <p className="border border-dashed border-primary/20 bg-slate-50/80 px-3 py-2 font-mono text-xs text-primary/95">
              {cap.detalle}
            </p>
          </div>
        </article>

        <DialogContent className="gap-0 overflow-hidden border-slate-200/90 bg-white/98 p-0 sm:max-w-5xl">
          <div className="relative aspect-square w-full max-h-[min(72vh,640px)] bg-slate-950/5 sm:mx-auto sm:aspect-auto sm:h-[min(72vh,560px)] sm:max-w-3xl">
            <Image
              src={cap.image_url}
              alt={cap.titulo}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
          <DialogHeader className="border-t border-border bg-white/95 px-6 py-4">
            <DialogTitle className="text-left font-mono text-base font-semibold text-foreground">
              {cap.titulo}
            </DialogTitle>
            <p className="text-left font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Verificación dimensional
            </p>
          </DialogHeader>
          <div className="space-y-4 border-t border-border bg-slate-50/90 px-6 py-5">
            <p className="font-mono text-sm leading-relaxed text-foreground">
              {cap.descripcion}
            </p>
            <div className="rounded-lg border border-border bg-white/90 px-4 py-3 font-mono text-sm text-foreground">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Alcance
              </span>
              <p className="mt-1">{cap.detalle}</p>
            </div>
          </div>
        </DialogContent>
      </>
    </Dialog>
  );
}
