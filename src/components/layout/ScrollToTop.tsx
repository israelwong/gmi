"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SHOW_AFTER_PX = 320;
const TOP_HIDE_PX = 120;
const DELTA_MIN = 6;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        lastY.current = y;

        if (y < TOP_HIDE_PX) {
          setVisible(false);
        } else if (delta > DELTA_MIN && y > SHOW_AFTER_PX) {
          setVisible(true);
        } else if (delta < -DELTA_MIN) {
          setVisible(false);
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.button
          key="scroll-top"
          type="button"
          initial={{ opacity: 0, y: 28, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 420, damping: 32, mass: 0.85 }
          }
          onClick={scrollTop}
          className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-cyan-50/90 text-primary shadow-lg shadow-sky-400/20 outline-none backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-sky-400/25 focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 dark:border-border dark:bg-card dark:shadow-lg dark:shadow-black/35 dark:hover:shadow-xl dark:hover:shadow-black/45 dark:focus-visible:ring-ring/60 dark:focus-visible:ring-offset-background"
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
