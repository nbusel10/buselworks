"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PHRASE = "“what if we…”";
const PREFIX = "Have a ";
const SUFFIX = " idea?";
const FULL = `${PREFIX}${PHRASE}${SUFFIX}`;
const CHAR_MS = 42;

export function ContactTitle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? PHRASE : "");
  const [done, setDone] = useState(!!reduce);

  useEffect(() => {
    if (reduce || !inView) return;

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(PHRASE.slice(0, i));
      if (i >= PHRASE.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, CHAR_MS);

    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <h1 ref={ref} aria-label={FULL} className={className}>
      <span className="text-ink">{PREFIX}</span>
      <span className="text-aqua">{typed}</span>
      {!reduce && !done && (
        <span
          className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.05em] animate-pulse bg-aqua align-baseline"
          aria-hidden
        />
      )}
      <motion.span
        className="text-ink"
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {SUFFIX}
      </motion.span>
    </h1>
  );
}
