import Image from "next/image";

import { companyInfo } from "@/lib/company-data";

const NOSOTROS_HERO_IMAGE =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/nosotros-foto/461-v2.jpg";

export function NosotrosHero() {
  const { identidad, historia } = companyInfo;

  return (
    <section
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden border-b border-border"
      aria-labelledby="nosotros-hero-title"
    >
      <Image
        src={NOSOTROS_HERO_IMAGE}
        alt="Piezas mecanizadas de precisión · taller GMI"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-black/28 to-black/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1 bg-gradient-to-r from-primary/90 via-primary to-primary/70"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl space-y-4 text-white sm:space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            Trayectoria
          </p>
          <h1
            id="nosotros-hero-title"
            className="text-balance text-4xl font-bold leading-[1.08] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.4)] sm:text-5xl md:text-6xl"
          >
            {identidad.nombreOficial}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/92 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
            {historia.resumen}
          </p>
        </div>
      </div>
    </section>
  );
}
