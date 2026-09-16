"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Scroll-driven color wipe laid over a screenshot. The shot starts black and
 * white and turns to color from the top down as the row rises through the
 * viewport, with a divider line riding the boundary.
 */
export function ScrollColorReveal() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // Hold off until the whole shot is on screen, then wipe while it stays
    // fully visible, rather than being nearly done as it finishes entering.
    target: ref,
    offset: ["end 1", "start 0.15"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    (p) => `inset(${(p * 100).toFixed(2)}% 0 0 0)`
  );
  const top = useTransform(scrollYProgress, (p) => `${(p * 100).toFixed(2)}%`);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.94, 1], [0, 1, 1, 0]);

  if (reduce) return null;

  return (
    <div ref={ref} className="reveal-overlay pointer-events-none absolute inset-0 z-10">
      <motion.div className="reveal-gray absolute inset-0" style={{ clipPath }} />
      <motion.div
        className="absolute inset-x-0 -translate-y-1/2"
        style={{ top, opacity: lineOpacity }}
      >
        <div className="h-0.5 w-full bg-aqua shadow-[0_0_14px_rgba(39,199,205,0.65)]" />
      </motion.div>
    </div>
  );
}
