"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./equipo-swiper.css";

const EQUIPO_IMAGES_BASE =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/tecnologia-geleria";

const EQUIPO_SLIDE_FILES = [
  "322.jpg",
  "284.jpg",
  "255.jpg",
  "215.jpg",
  "194.jpg",
  "171.jpg",
  "161-v2.jpeg",
  "109.jpg",
  "100.jpg",
  "63.jpg",
  "53.jpg",
  "51.jpg",
] as const;

const slides = EQUIPO_SLIDE_FILES.map((file, i) => ({
  src: `${EQUIPO_IMAGES_BASE}/${file}`,
  alt: `Equipo en planta GMI · fotografía ${i + 1}`,
}));

function useImageAspectRatios(urls: string[]) {
  const [ratios, setRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    urls.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        if (
          cancelled ||
          img.naturalWidth <= 0 ||
          img.naturalHeight <= 0
        ) {
          return;
        }
        const ratio = img.naturalWidth / img.naturalHeight;
        setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: ratio }));
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return ratios;
}

export type EquipoIsomaqSliderProps = {
  className?: string;
};

export function EquipoIsomaqSlider({ className }: EquipoIsomaqSliderProps) {
  const urls = useMemo(() => slides.map((s) => s.src), []);
  const aspectRatios = useImageAspectRatios(urls);

  if (slides.length === 0) return null;

  return (
    <div
      className={cn(
        "equipo-swiper-root relative overflow-hidden bg-muted/20 pb-10 pt-2 shadow-[inset_0_1px_0_0_rgba(15,23,42,0.06)] md:pb-12 md:pt-4",
        className,
      )}
    >
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView="auto"
        spaceBetween={0}
        centeredSlides={false}
        loop={slides.length >= 3}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        className="relative z-[1] w-full"
        watchOverflow
      >
        {slides.map((s, i) => {
          const ratio = aspectRatios[s.src];

          return (
            <SwiperSlide key={s.src} className="equipo-swiper-slide !w-auto">
              <div
                className={cn(
                  "equipo-swiper-frame relative overflow-hidden border-x border-border/70 bg-muted/30",
                  !ratio && "w-[min(85vw,420px)]",
                )}
                style={ratio ? { aspectRatio: ratio } : { aspectRatio: "4 / 3" }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 85vw, 420px"
                  className="object-cover object-center"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
