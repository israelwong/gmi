"use client";

import type { ComponentPropsWithRef } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import { MasonryPhotoAlbum } from "react-photo-album";
import type { Photo, Render } from "react-photo-album";

import "yet-another-react-lightbox/styles.css";
import "react-photo-album/masonry.css";

const GALLERY_BASE =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/galeria-whatsapp";

const GALLERY_FILES = [
  "7ABC161F-A649-4ED5-999A-D4FD335E4293.JPG",
  "7ACD7BD9-6CC4-4784-9909-16AD6E483E4B.JPG",
  "C114A92A-F3EC-4991-B1A2-494DA4391E25.JPG",
  "E134F00B-DF63-4E4F-9A27-C7A6E30C9D01.JPG",
  "IMG_5759.jpeg",
  "IMG_5761.jpeg",
  "IMG_5763.jpeg",
  "IMG_5782.jpeg",
  "IMG_5783.jpeg",
  "IMG_5785.jpeg",
  "IMG_5786.jpeg",
  "IMG_5823.jpeg",
  "IMG_5845.PNG",
  "IMG_5882.jpeg",
  "IMG_5955.jpeg",
  "IMG_5956.jpeg",
  "IMG_6128.jpeg",
  "IMG_6129.jpeg",
  "IMG_6310.jpeg",
  "IMG_6314.jpeg",
  "IMG_6343.jpeg",
  "IMG_6344.jpeg",
  "IMG_6346.jpeg",
  "IMG_6352.jpeg",
  "IMG_6418.jpeg",
  "IMG_6420.jpeg",
  "IMG_6422.jpeg",
  "IMG_6448.jpeg",
  "IMG_6468.jpeg",
  "IMG_6472.jpeg",
  "IMG_6593.jpeg",
  "IMG_6613.jpeg",
  "IMG_6626.PNG",
  "IMG_6751.jpeg",
  "IMG_6863.jpeg",
  "IMG_6865.jpeg",
  "IMG_6868.jpeg",
  "IMG_6869.jpeg",
] as const;

function gallerySrc(file: string) {
  return `${GALLERY_BASE}/${encodeURIComponent(file)}`;
}

function loadPhoto(file: string, index: number): Promise<Photo> {
  const src = gallerySrc(file);
  const total = GALLERY_FILES.length;

  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      resolve({
        src,
        width: img.naturalWidth || 1200,
        height: img.naturalHeight || 900,
        alt: `Trabajo realizado en planta GMI (${index + 1} / ${total})`,
        label: `Ampliar imagen ${index + 1}`,
      });
    };
    img.onerror = () => {
      resolve({
        src,
        width: 1200,
        height: 900,
        alt: `Trabajo realizado en planta GMI (${index + 1} / ${total})`,
        label: `Ampliar imagen ${index + 1}`,
      });
    };
    img.src = src;
  });
}

function buildGalleryRender(reduceMotion: boolean | null): Render<Photo> | undefined {
  if (reduceMotion === true) return undefined;

  const imageRender: Render<Photo>["image"] = (
    props,
    { index },
  ) => {
    const p = props as ComponentPropsWithRef<"img">;
    const { ref, alt, ...imgProps } = p;
    return (
      <motion.div
        className="size-full"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -6% 0px", amount: 0.08 }}
        transition={{
          duration: 1.05,
          delay: Math.min(index * 0.04, 0.36),
          ease: [0.33, 1, 0.68, 1] as const,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- galería remota Supabase */}
        <img ref={ref} {...imgProps} alt={alt ?? ""} />
      </motion.div>
    );
  };

  return { image: imageRender };
}

export function HomeGallery() {
  const reduceMotion = useReducedMotion();
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;

    Promise.all(GALLERY_FILES.map((file, index) => loadPhoto(file, index))).then(
      (loaded) => {
        if (!cancelled) setPhotos(loaded);
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const lightboxSlides = useMemo(
    () =>
      (photos ?? []).map((p) => ({
        src: p.src,
        width: p.width,
        height: p.height,
        alt: p.alt,
      })),
    [photos],
  );

  const lightboxOpen = lightboxIndex !== undefined;
  const galleryRender = buildGalleryRender(reduceMotion);

  return (
    <section
      className="engineering-surface border-y border-border"
      aria-labelledby="titulo-imagenes-planta"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            En planta
          </p>
          <h2
            id="titulo-imagenes-planta"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Trabajos realizados
          </h2>
        </div>

        <div className="mt-12">
          {photos ? (
            <MasonryPhotoAlbum
              photos={photos}
              columns={(w) => ((w ?? 768) < 900 ? 2 : 3)}
              spacing={(w) => ((w ?? 768) < 900 ? 10 : 16)}
              sizes={{
                size: "min(calc(100vw - 2rem),72rem)",
              }}
              onClick={({ index }) => setLightboxIndex(index)}
              render={galleryRender}
              componentsProps={{
                wrapper: {
                  className:
                    "!mb-0 !rounded-xl overflow-hidden border border-border/75 bg-muted/40 shadow-sm ring-1 ring-border/45 transition-[transform,box-shadow,ring-color] hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/25 dark:bg-muted/25 dark:ring-border/60 dark:hover:ring-primary/35",
                },
                button: {
                  className:
                    "!relative !block !size-full !appearance-none cursor-zoom-in touch-manipulation p-0 [--rc-image-transition:transform_0.35s_ease]",
                  type: "button",
                },
                image: {
                  className:
                    "!mb-0 !block !size-full !object-cover transition-transform duration-300 ease-out hover:scale-[1.03]",
                  loading: "lazy",
                  decoding: "async",
                },
              }}
            />
          ) : (
            <div
              className="grid grid-cols-2 gap-2.5 sm:gap-4"
              aria-hidden
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] animate-pulse rounded-xl bg-muted/50"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxIndex(undefined)}
        index={lightboxIndex ?? 0}
        slides={lightboxSlides}
        plugins={[Zoom, Video]}
        zoom={{
          pinchZoomV4: true,
          scrollToZoom: true,
          maxZoomPixelRatio: 3,
        }}
        carousel={{ finite: true, preload: 2, imageFit: "contain" }}
        controller={{ closeOnBackdropClick: true }}
        labels={{
          Close: "Cerrar",
          Previous: "Anterior",
          Next: "Siguiente",
          "Zoom in": "Acercar",
          "Zoom out": "Alejar",
        }}
        animation={{ fade: 350 }}
      />
    </section>
  );
}
