"use client";

import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import { MasonryPhotoAlbum } from "react-photo-album";
import type { Photo } from "react-photo-album";

import "yet-another-react-lightbox/styles.css";
import "react-photo-album/masonry.css";

const GALLERY_BASE =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/galeria";

const GALLERY_COUNT = 10;
const PHOTO_REF = { width: 1920, height: 1080 } as const;

function gallerySrc(index: number) {
  return `${GALLERY_BASE}/${index}.jpg`;
}

function buildPhotos(): Photo[] {
  return Array.from({ length: GALLERY_COUNT }, (_, i) => ({
    src: gallerySrc(i + 1),
    width: PHOTO_REF.width,
    height: PHOTO_REF.height,
    alt: `Grupo GMI — planta y proceso (${i + 1} / ${GALLERY_COUNT}), ampliar`,
    label: `Ampliar imagen ${i + 1}`,
  }));
}

const GALLERY_PHOTOS = buildPhotos();
const LIGHTBOX_SLIDES = GALLERY_PHOTOS.map((p) => ({
  src: p.src,
  width: p.width,
  height: p.height,
  alt: p.alt,
}));

export function HomeGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | undefined>(
    undefined,
  );
  const lightboxOpen = lightboxIndex !== undefined;

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
            Opera en detalle
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
            Fotografía de proceso: equipamiento CNC, taller y trabajo en pieza.
          </p>
        </div>

        <div className="mt-12">
          <MasonryPhotoAlbum
            photos={GALLERY_PHOTOS}
            columns={(w) =>
              (w ?? 768) < 520 ? 1 : (w ?? 768) < 900 ? 2 : 3
            }
            spacing={(w) => ((w ?? 768) < 520 ? 12 : 16)}
            sizes={{
              size: "min(calc(100vw - 2rem),72rem)",
            }}
            onClick={({ index }) => setLightboxIndex(index)}
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
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxIndex(undefined)}
        index={lightboxIndex ?? 0}
        slides={LIGHTBOX_SLIDES}
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
