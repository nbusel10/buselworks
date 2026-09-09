"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { ProcessStep } from "@/data/types";

export function ProcessTimeline({
  steps,
  compact = false,
}: {
  steps: ProcessStep[];
  compact?: boolean;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();
  const active = reduce || inView;

  return (
    <div className="relative mt-10 md:mt-12">
      {/* Spreading rail */}
      <div className="pointer-events-none absolute left-0 right-0 top-[1.15rem] hidden h-px bg-border md:block">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-aqua via-aqua to-aqua/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <ol
        ref={ref}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
      >
        {steps.map((step, i) => (
          <motion.li
            key={step.number}
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.92 }}
            animate={
              active
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 28, scale: 0.92 }
            }
            transition={{
              duration: 0.55,
              delay: reduce ? 0 : 0.15 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              reduce
                ? undefined
                : { y: -4, transition: { duration: 0.25 } }
            }
          >
            <div className="mb-3 hidden md:flex">
              <motion.span
                className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-aqua bg-ivory"
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: active ? 1 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                  delay: reduce ? 0 : 0.35 + i * 0.12,
                }}
              >
                <span className="h-2 w-2 rounded-full bg-aqua" />
              </motion.span>
            </div>
            <p className="font-mono-label text-xs text-aqua-dark md:text-sm">
              {step.number}
            </p>
            <h3 className="font-display mt-2 text-base font-semibold tracking-tight md:text-lg">
              {step.title}
            </h3>
            {!compact && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
