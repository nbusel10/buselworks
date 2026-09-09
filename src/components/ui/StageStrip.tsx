"use client";

import { motion, useReducedMotion } from "framer-motion";

const stages = ["IDEA", "PROMPT", "DESIGN", "CODE", "LAUNCH"];

export function StageStrip({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`flex flex-wrap items-center gap-2 font-mono-label text-[11px] tracking-wider text-muted ${className}`}
    >
      {stages.map((stage, i) => (
        <motion.span
          key={stage}
          className="inline-flex items-center gap-2"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 * i, duration: 0.45 }}
        >
          <motion.span
            className={i === stages.length - 1 ? "text-aqua-dark" : ""}
            animate={
              reduce
                ? undefined
                : i === stages.length - 1
                  ? { opacity: [1, 0.55, 1] }
                  : undefined
            }
            transition={
              i === stages.length - 1
                ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            {stage}
          </motion.span>
          {i < stages.length - 1 && (
            <motion.span
              className="text-aqua"
              aria-hidden
              animate={reduce ? undefined : { x: [0, 3, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          )}
        </motion.span>
      ))}
    </div>
  );
}
