"use client";

import { useEffect, useRef, useState } from "react";

/** Portada extráida del propio archivo (instante reproducible como imagen JPEG). */
const POSTER_TIMESTAMP_SEC = 3 * 60 + 38; // 3:38

type InstitutionalVideoEmbedProps = {
  src: string;
  mimeType: string;
  title: string;
};

/**
 * Obtiene el frame en POSTER_TIMESTAMP_SEC como data URL para `poster=` del vídeo.
 * Falla sin ruido si CORS ou canvas no permite leer pixels (captura opcional).
 */
export function InstitutionalVideoEmbed({
  src,
  mimeType,
  title,
}: InstitutionalVideoEmbedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poster, setPoster] = useState<string | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let attempted = false;

    const clampTime = () => {
      const t = POSTER_TIMESTAMP_SEC;
      const d = Number.isFinite(video.duration) ? video.duration : 0;
      if (d <= 0) return t;
      return Math.min(t, Math.max(0.05, d - 0.1));
    };

    const grabFrameToPoster = () => {
      if (cancelled || attempted) return;
      attempted = true;
      video.currentTime = clampTime();

      const onSeeked = () => {
        if (cancelled) return;
        try {
          const vw = video.videoWidth;
          const vh = video.videoHeight;
          if (vw <= 0 || vh <= 0) return;

          const canvas = document.createElement("canvas");
          const maxW = 1440;
          const scale = Math.min(1, maxW / vw);
          canvas.width = Math.round(vw * scale);
          canvas.height = Math.round(vh * scale);
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.86);
          if (!cancelled) setPoster(dataUrl);
        } catch {
          /* Sin poster si CORS o sandbox impiden leer el frame */
        } finally {
          video.currentTime = 0;
        }
      };

      video.addEventListener("seeked", onSeeked, { once: true });
    };

    const onMeta = () => {
      grabFrameToPoster();
    };

    video.addEventListener("loadedmetadata", onMeta, { once: true });

    /* Si los metadatos ya están (caché) */
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      onMeta();
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      controls
      playsInline
      preload="metadata"
      crossOrigin="anonymous"
      title={title}
      poster={poster}
    >
      <source src={src} type={mimeType} />
    </video>
  );
}
