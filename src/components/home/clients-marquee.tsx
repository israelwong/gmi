"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import type { ClientLogo } from "@/types/company";

type ClientsMarqueeProps = {
  clientes: ClientLogo[];
};

const IDLE_RESUME_MS = 3000;
const AUTOPLAY_PX_PER_SEC = 38;

/** Dos copias idénticas para bucle visual sin salto. */
function duplicateClients(clientes: ClientLogo[]) {
  return [...clientes, ...clientes];
}

export function ClientsMarquee({ clientes }: ClientsMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const userPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    startOffset: 0,
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

  const normalizeOffset = useCallback(() => {
    const W = loopWidthRef.current;
    if (W <= 0) return;
    while (offsetRef.current <= -W) offsetRef.current += W;
    while (offsetRef.current > 0) offsetRef.current -= W;
  }, []);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
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

      const canAutoplay =
        reduceMotion !== true &&
        !userPausedRef.current &&
        loopWidthRef.current > 0 &&
        clientes.length > 0;

      if (canAutoplay) {
        offsetRef.current -= AUTOPLAY_PX_PER_SEC * dt;
        if (offsetRef.current <= -loopWidthRef.current) {
          offsetRef.current += loopWidthRef.current;
        }
        applyTransform();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [applyTransform, clientes.length, reduceMotion]);

  const endDrag = useCallback(
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
      normalizeOffset();
      applyTransform();
      scheduleResumeAutoplay();
    },
    [applyTransform, normalizeOffset, scheduleResumeAutoplay],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    clearResumeTimer();
    userPausedRef.current = true;

    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startOffset: offsetRef.current,
    };
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    e.preventDefault();
    const dx = e.clientX - dragRef.current.startX;
    offsetRef.current = dragRef.current.startOffset + dx;
    normalizeOffset();
    applyTransform();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    clearResumeTimer();
    userPausedRef.current = true;
    const step = 160;
    offsetRef.current +=
      e.key === "ArrowLeft" ? step : -step;
    normalizeOffset();
    applyTransform();
    scheduleResumeAutoplay();
  };

  const loop = duplicateClients(clientes);

  if (clientes.length === 0) {
    return null;
  }

  return (
    <section
      className="border-b border-border py-10"
      aria-label="Clientes y sectores atendidos"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Industrias que confían en nuestra ingeniería
        </p>
        <p id="clients-marquee-hint" className="sr-only">
          Carrusel automático de logos. Puede arrastrar horizontalmente; el
          movimiento automático se reanuda tras unos segundos sin interacción.
        </p>
      </div>
      <div
        ref={viewportRef}
        aria-describedby="clients-marquee-hint"
        tabIndex={0}
        className="mt-8 w-full cursor-grab touch-none overflow-x-hidden overflow-y-hidden outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        onPointerLeave={(e) => {
          if (dragRef.current.active) endDrag(e);
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-0 will-change-transform pb-1"
        >
          {loop.map((c, i) => (
            <div
              key={`${c.slug}-${i}`}
              className="group flex shrink-0 items-center justify-center px-12 sm:px-16"
            >
              <div className="relative h-9 w-[200px] max-w-[200px] shrink-0">
                <Image
                  src={c.logo}
                  alt={c.nombre}
                  fill
                  draggable={false}
                  className="pointer-events-none object-contain object-center opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
