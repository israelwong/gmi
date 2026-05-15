import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroVideoLayer } from "@/components/home/hero-video-layer";
import { Button } from "@/components/ui/button";
import { HERO_MAIN_VIDEO_URL } from "@/lib/hero-video";

const HERO_COPY = {
  line:
    "Ingeniería de precisión en Maquinados Industriales. Soluciones a medida desde 1985.",
};

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden border-b border-border">
      <HeroVideoLayer videoUrl={HERO_MAIN_VIDEO_URL} />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1 bg-gradient-to-r from-primary/90 via-primary to-primary/70"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl space-y-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            Capacidades industriales · Confidencialidad
          </p>
          <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.4)] sm:text-5xl md:text-6xl">
            {HERO_COPY.line}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/92 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
            Parque HAAS, Doosan y equipamiento complementario para proyectos que
            requieren tolerancias ajustadas, lotes recurrentes y discreción
            operativa.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/tecnologia">
                Ver tecnología
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contacto">Solicitar cotización de proyecto</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
