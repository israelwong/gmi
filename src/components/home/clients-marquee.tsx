"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from "react";

import { cn } from "@/lib/utils";
import type { ClientLogo } from "@/types/company";

export type ClientsMarqueeVariant = "band" | "embedded";

type ClientsMarqueeProps = {
  clientes: ClientLogo[];
  /** `band`: franja tipo home (full width). `embedded`: bloque contenido dentro de página. */
  variant?: ClientsMarqueeVariant;
  /** Título visible encima del carrusel. En `band`, por defecto el copy de portada. */
  title?: string;
  className?: string;
  /**
   * Solo `variant="band"`: fondo sobrio tipo pie de página (sin franja zinc de portada).
   * El carril sigue a ancho completo del viewport.
   */
  softBand?: boolean;
  /** Alineación del título sobre el carrusel. Por defecto: centrado en banda “hero”, izquierda en embedded y softBand. */
  headingAlign?: "center" | "left";
  /** Si es `true`, no se muestra el título encima del carrusel (solo `aria-label` y pista `.sr-only`). */
  hideHeading?: boolean;
};

const TITLE_BAND_DEFAULT =
  "Industrias que confían en nuestra ingeniería";

const IDLE_RESUME_MS = 3000;
const AUTOPLAY_PX_PER_SEC = 38;

/** Dos copias idénticas para bucle visual sin salto. */
function duplicateClients(clientes: ClientLogo[]) {
  return [...clientes, ...clientes];
}

export function ClientsMarquee({
  clientes,
  variant = "band",
  title,
  className,
  softBand = false,
  headingAlign,
  hideHeading = false,
}: ClientsMarqueeProps) {
  const hintId = useId();
  const isEmbedded = variant === "embedded";
  const isBandHero = variant === "band" && !softBand;
  const isBandSoft = variant === "band" && softBand;

  const heading =
    title ?? (isEmbedded ? "Cartera referenciada de clientes" : TITLE_BAND_DEFAULT);

  const titleOnLeft =
    isEmbedded ||
    headingAlign === "left" ||
    (isBandSoft && headingAlign !== "center");

  const softTextFallback = isEmbedded || isBandSoft;

  const viewportTopMargin = hideHeading
    ? "mt-2 sm:mt-3"
    : isEmbedded
      ? "mt-6"
      : "mt-8";

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const userPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    startScroll: 0,
  });

  const reduceMotion = useReducedMotion();

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const scheduleResumeAutoplay = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      userPausedRef.current = false;
      resumeTimerRef.current = null;
    }, IDLE_RESUME_MS);
  }, [clearResumeTimer]);

  const normalizeScrollLeft = useCallback(() => {
    const vp = viewportRef.current;
    const W = loopWidthRef.current;
    if (!vp || W <= 0) return;
    let sl = vp.scrollLeft;
    if (sl < 0) sl = 0;
    while (sl >= W) sl -= W;
    if (sl !== vp.scrollLeft) {
      vp.scrollLeft = sl;
    }
  }, []);

  const measureLoopWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      loopWidthRef.current = 0;
      return;
    }
    const half = track.scrollWidth / 2;
    if (half > 0) loopWidthRef.current = half;
  }, []);

  useLayoutEffect(() => {
    measureLoopWidth();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measureLoopWidth());
    ro.observe(track);
    return () => ro.disconnect();
  }, [measureLoopWidth, clientes]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;

      const vp = viewportRef.current;
      const canAutoplay =
        reduceMotion !== true &&
        !userPausedRef.current &&
        loopWidthRef.current > 0 &&
        clientes.length > 0 &&
        vp;

      if (canAutoplay && vp) {
        let sl = vp.scrollLeft + AUTOPLAY_PX_PER_SEC * dt;
        const W = loopWidthRef.current;
        while (sl >= W) sl -= W;
        vp.scrollLeft = sl;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clientes.length, reduceMotion]);

  const endMouseDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.active) return;
      if (e.pointerId === dragRef.current.pointerId) {
        try {
          viewportRef.current?.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
      dragRef.current.active = false;
      normalizeScrollLeft();
      scheduleResumeAutoplay();
    },
    [normalizeScrollLeft, scheduleResumeAutoplay],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    clearResumeTimer();
    userPausedRef.current = true;

    const vp = viewportRef.current;
    if (!vp) return;

    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: vp.scrollLeft,
    };
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || e.pointerType !== "mouse") return;
    e.preventDefault();
    const vp = viewportRef.current;
    if (!vp) return;
    const dx = e.clientX - dragRef.current.startX;
    vp.scrollLeft = dragRef.current.startScroll - dx;
    normalizeScrollLeft();
  };

  const onScroll = () => {
    normalizeScrollLeft();
  };

  const onWheelPause = () => {
    userPausedRef.current = true;
    clearResumeTimer();
    scheduleResumeAutoplay();
  };

  const onTouchPause = () => {
    userPausedRef.current = true;
    clearResumeTimer();
  };

  const onTouchMaybeResume = () => {
    scheduleResumeAutoplay();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const vp = viewportRef.current;
    if (!vp) return;
    clearResumeTimer();
    userPausedRef.current = true;
    const step = 160;
    vp.scrollLeft += e.key === "ArrowLeft" ? -step : step;
    normalizeScrollLeft();
    scheduleResumeAutoplay();
  };

  const loop = duplicateClients(clientes);

  if (clientes.length === 0) {
    return null;
  }

  const sectionLabel =
    isEmbedded || isBandSoft ? heading : "Clientes y sectores atendidos";

  return (
    <section
      className={cn(
        className,
        isEmbedded &&
          "rounded-xl border border-border bg-muted/35 py-8 shadow-sm ring-1 ring-border/45 dark:bg-muted/20 dark:ring-border/55",
        isBandHero &&
          "border-b border-border py-10 dark:bg-zinc-400 dark:border-b dark:border-zinc-500/50",
        isBandSoft &&
          cn(
            "w-full border-t border-border border-b bg-muted/30 dark:bg-muted/20",
            hideHeading ? "py-6 sm:py-7" : "py-9",
          ),
      )}
      aria-label={sectionLabel}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
          isEmbedded && "max-w-none",
        )}
      >
        {!hideHeading && (
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.2em]",
              titleOnLeft && "text-left text-primary",
              !titleOnLeft &&
                "text-center text-sm font-bold tracking-[0.18em] text-primary sm:text-base dark:tracking-[0.2em]",
            )}
          >
            {heading}
          </p>
        )}
        <p id={hintId} className="sr-only">
          Carrusel automático de logos. Puede desplazarse horizontalmente; el
          movimiento automático se reanuda tras unos segundos sin interacción.
        </p>
      </div>
      <div
        ref={viewportRef}
        aria-describedby={hintId}
        tabIndex={0}
        className={cn(
          viewportTopMargin,
          "w-full cursor-grab touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain outline-none [scrollbar-width:none] [-ms-overflow-style:none] active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-scrollbar]:hidden select-none",
          isBandHero &&
            "dark:pb-2 dark:focus-visible:ring-zinc-800/55 dark:focus-visible:ring-offset-zinc-400",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endMouseDrag}
        onPointerCancel={endMouseDrag}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        onWheel={onWheelPause}
        onTouchStart={onTouchPause}
        onTouchEnd={onTouchMaybeResume}
        onTouchCancel={onTouchMaybeResume}
        onPointerLeave={(e) => {
          if (dragRef.current.active) endMouseDrag(e);
        }}
      >
        <div ref={trackRef} className="flex w-max gap-0 pb-1">
          {loop.map((c, i) => (
            <div
              key={`${c.slug}-${i}`}
              className="group flex shrink-0 items-center justify-center px-12 sm:px-16"
            >
              {/* Cajón fijo 44×200px: mismo encuadre en logo SVG y en texto de respaldo. */}
              <div className="relative h-11 w-[200px] max-w-[200px] shrink-0 px-3">
                {c.logo?.trim() ? (
                  <Image
                    src={c.logo.trim()}
                    alt={c.nombre}
                    fill
                    draggable={false}
                    sizes="200px"
                    className="pointer-events-none object-contain object-center px-1 py-0.5 opacity-95 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-90 dark:group-hover:opacity-100"
                  />
                ) : (
                  <span className="absolute inset-x-3 inset-y-0 flex items-center justify-center text-center">
                    <span
                      className={cn(
                        "line-clamp-2 max-h-full text-[10px] font-semibold uppercase leading-snug tracking-wide text-foreground/80 transition-colors duration-300 group-hover:text-primary sm:text-[11px]",
                        softTextFallback
                          ? "dark:text-foreground/75 dark:group-hover:text-primary"
                          : "dark:text-zinc-800",
                      )}
                    >
                      {c.nombre}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
