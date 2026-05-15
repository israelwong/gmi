"use client";

import Image from "next/image";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./equipo-swiper.css";

const EQUIPO_IMAGES_BASE =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/equipo";

const EQUIPO_SLIDE_FILES = [
  "equipo-maquina-702s-isomaq.webp",
  "equipo-maquina-2100b-isomaq.webp",
  "equipo-maquina-leo1600-isomaq.webp",
  "equipo-maquina-pumatt1800sy-isomaq.webp",
  "equipo-maquina-st10-isomaq.webp",
  "equipo-maquina-tmp1-isomaq.webp",
  "equipo-maquina-vf2-isomaq.webp",
  "equipo-maquina-vf3-isomaq.webp",
] as const;

const EQUIPO_SLIDE_ALTS: Record<string, string> = {
  "equipo-maquina-702s-isomaq.webp":
    "Centro de maquinado DN Solutions 702S · imagen de referencia comercial",
  "equipo-maquina-2100b-isomaq.webp":
    "Torno CNC LYNX 2100B · imagen de referencia comercial",
  "equipo-maquina-leo1600-isomaq.webp":
    "Equipo LEO 1600 · imagen de referencia comercial",
  "equipo-maquina-pumatt1800sy-isomaq.webp":
    "Torno PUMA TT 1800 SY · imagen de referencia comercial",
  "equipo-maquina-st10-isomaq.webp":
    "Torno CNC Haas ST-10 · imagen de referencia comercial",
  "equipo-maquina-tmp1-isomaq.webp":
    "Equipo de taller referencia TMP-1 · imagen comercial",
  "equipo-maquina-vf2-isomaq.webp":
    "Centro vertical Haas VF-2 · imagen de referencia comercial",
  "equipo-maquina-vf3-isomaq.webp":
    "Centro vertical Haas VF-3 · imagen de referencia comercial",
};

const slides = EQUIPO_SLIDE_FILES.map((file) => ({
  src: `${EQUIPO_IMAGES_BASE}/${file}`,
  alt:
    EQUIPO_SLIDE_ALTS[file] ??
    `Equipo de taller · ${file.replace(/\.webp$/, "")}`,
}));

export type EquipoIsomaqSliderProps = {
  className?: string;
};

export function EquipoIsomaqSlider({ className }: EquipoIsomaqSliderProps) {
  if (slides.length === 0) return null;

  return (
    <div
      className={cn(
        "equipo-swiper-root relative overflow-hidden bg-white pb-10 pt-2 shadow-[inset_0_1px_0_0_rgba(15,23,42,0.06)] md:pb-12 md:pt-4",
        className,
      )}
    >
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        loop={slides.length >= 3}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        className="relative z-[1] w-full"
        watchOverflow
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.src} className="!h-auto">
            <div className="relative aspect-[5/4] w-full border-x border-border/70 sm:aspect-[4/3] lg:aspect-[16/11]">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain object-center"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
