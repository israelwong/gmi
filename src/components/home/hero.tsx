import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=2400&q=80";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden border-b border-border">
      <Image
        src={HERO_IMAGE}
        alt="Operaciones industriales y logística portuaria"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/25"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl space-y-8 text-primary-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/90">
            Ingeniería · México · Alto impacto
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Soluciones industriales que mueven a México
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/90">
            Diseño de ingeniería, sistemas modulares y cadena logística con
            precisión técnica, seguridad y un ADN mexicano orientado a resultados.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/servicios">
                Ver servicios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/contacto">Hablar con un especialista</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
