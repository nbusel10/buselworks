"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Playful hover lift / tilt wrapper for cards and tiles. */
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        y: -8,
        rotate: -0.6,
        scale: 1.015,
        transition: { type: "spring", stiffness: 280, damping: 18 },
      }}
      whileTap={{ scale: 0.985 }}
    >
      {children}
    </motion.div>
  );
}
