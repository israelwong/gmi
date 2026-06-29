import { HeroVideoLayer } from "@/components/home/hero-video-layer";
import { HERO_MAIN_VIDEO_URL } from "@/lib/hero-video";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden border-b border-border">
      <HeroVideoLayer videoUrl={HERO_MAIN_VIDEO_URL} />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1 bg-gradient-to-r from-primary/90 via-primary to-primary/70"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl text-white">
          <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.4)] sm:text-5xl md:text-6xl">
            Manufactura de maquinados industriales
          </h1>
        </div>
      </div>
    </section>
  );
}
