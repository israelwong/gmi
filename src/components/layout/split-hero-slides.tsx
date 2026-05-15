"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type SplitHeroSlide = {
  image: { src: string; alt: string };
  title: string;
  description: string;
  highlights?: string[];
};

export type SplitHeroSlidesProps = {
  slides: SplitHeroSlide[];
  eyebrow?: string;
  autoRotateMs?: number;
  footer?: ReactNode;
  className?: string;
};

export function SplitHeroSlides({
  slides,
  eyebrow,
  autoRotateMs = 3000,
  footer,
  className,
}: SplitHeroSlidesProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      if (count <= 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || autoRotateMs <= 0 || reduceMotion) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, autoRotateMs);
    return () => window.clearTimeout(id);
  }, [index, count, autoRotateMs, reduceMotion]);

  const slide = count > 0 ? slides[Math.min(index, count - 1)] : null;
  if (!slide) return null;

  return (
    <section className={cn("relative isolate border-b border-border", className)}>
      <div className="mx-auto grid max-w-[1920px] md:min-h-[min(52vh,460px)] md:grid-cols-2">
        {/* Col 1: texto */}
        <div className="relative isolate order-2 flex min-h-0 flex-col justify-center overflow-hidden px-6 py-10 text-primary-foreground sm:px-8 md:order-1 md:py-12 lg:px-12 lg:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#000d1a] via-[#001a33] to-[#002447] dark:from-[#030810] dark:via-[#0a1528] dark:to-[#060f1c]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_15%_10%,rgba(0,130,220,0.2),transparent_58%),radial-gradient(ellipse_85%_65%_at_100%_100%,rgba(0,25,55,0.55),transparent_52%)] dark:bg-[radial-gradient(ellipse_90%_70%_at_12%_8%,rgba(92,166,247,0.14),transparent_55%),radial-gradient(ellipse_80%_55%_at_100%_95%,rgba(0,0,0,0.4),transparent_50%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:repeating-linear-gradient(105deg,transparent_0px,transparent_12px,rgba(255,255,255,0.042)_12px,rgba(255,255,255,0.042)_13px)] dark:opacity-[0.08]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_0_140px_rgba(0,0,0,0.42)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),inset_0_0_120px_rgba(0,0,0,0.55)]"
            aria-hidden
          />

          {count > 1 ? (
            <button
              type="button"
              className={cn(
                "absolute left-1 top-1/2 z-20 flex h-10 w-9 -translate-y-1/2 items-center justify-center sm:left-2 sm:h-11 sm:w-10",
                "rounded-sm border border-primary-foreground/22 bg-primary-foreground/12 text-primary-foreground shadow-sm",
                "backdrop-blur-[1.5px] transition-colors hover:bg-primary-foreground/20 active:bg-primary-foreground/25",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#001a33]",
              )}
              onClick={() => goTo(index - 1)}
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft className="size-[1.15rem] shrink-0 sm:size-5" aria-hidden />
            </button>
          ) : null}

          <div
            className={cn(
              "relative z-10 min-w-0 space-y-3 lg:space-y-4",
              count > 1 && "pl-11 sm:pl-12 lg:pl-14",
            )}
          >
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/85">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl md:text-[2rem] lg:text-4xl">
                {slide.title}
              </h1>
              <p
                className="max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/92 drop-shadow-[0_1px_12px_rgba(0,0,0,0.25)] sm:text-lg"
                id={`split-hero-desc-${index}`}
              >
                {slide.description}
              </p>
              {slide.highlights && slide.highlights.length > 0 ? (
                <p className="max-w-xl text-pretty text-sm leading-snug tracking-tight text-primary-foreground/88 sm:text-[0.9375rem]">
                  {slide.highlights.join(" · ")}
                </p>
              ) : null}
              {footer ? <div className="pt-2">{footer}</div> : null}
          </div>
        </div>

        {/* Col 2: imagen + siguiente (anterior va en columna de texto) */}
        <div className="relative order-1 min-h-[220px] w-full bg-black md:order-2 md:min-h-[min(52vh,460px)]">
          <Image
            key={`${slide.image.src}-${index}`}
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-opacity duration-300 motion-reduce:transition-none"
            priority={index === 0}
          />
          {count > 1 ? (
            <button
              type="button"
              className={cn(
                "absolute right-1 top-1/2 z-10 flex h-10 w-9 -translate-y-1/2 items-center justify-center sm:right-2 sm:h-11 sm:w-10",
                "rounded-sm border border-white/18 bg-black/55 text-white shadow-sm",
                "backdrop-blur-[1.5px] transition-colors hover:bg-black/72 active:bg-black/80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-0",
              )}
              onClick={() => goTo(index + 1)}
              aria-label="Diapositiva siguiente"
            >
              <ChevronRight className="size-[1.15rem] shrink-0 sm:size-5" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
