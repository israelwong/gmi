"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type HeroVideoLayerProps = {
  videoUrl: string;
};

/**
 * Vídeo de fondo, velo y anillo de carga hasta `loadeddata`.
 * El resto del hero puede seguir siendo server component.
 */
export function HeroVideoLayer({ videoUrl }: HeroVideoLayerProps) {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        onLoadedData={() => setVideoReady(true)}
        onError={() => setVideoReady(true)}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/55 to-black/40"
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[8] flex items-center justify-center transition-opacity duration-500 ease-out motion-reduce:duration-0",
          videoReady ? "opacity-0" : "opacity-100",
        )}
        aria-hidden={videoReady}
      >
        <span className="sr-only">Cargando vídeo de fondo…</span>
        <div
          className={cn(
            "size-8 shrink-0 rounded-full border-[1.5px] border-white/18 border-t-white/[0.82] sm:size-9",
            "motion-safe:animate-spin [animation-duration:0.9s]",
            "motion-reduce:animate-none motion-reduce:border-white/35",
          )}
          role="presentation"
        />
      </div>
    </>
  );
}
