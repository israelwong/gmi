import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const HERO_COPY = {
  line:
    "Ingeniería de precisión en Maquinados Industriales. Soluciones a medida desde 1985.",
};

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden border-b border-border">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        poster="https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1920&q=80"
      >
        <source src="/videos/hero-industrial.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/40"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl space-y-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            Capacidades industriales · Confidencialidad
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {HERO_COPY.line}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/90">
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
