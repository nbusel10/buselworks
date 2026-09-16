"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const QUESTION = `"What if the website could…?"`;
const REST = " is one of our favorite questions.";
const FULL = `${QUESTION}${REST}`;
const CHAR_MS = 42;

export function V2FavoriteQuestion({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? QUESTION : "");
  const [done, setDone] = useState(!!reduce);

  useEffect(() => {
    if (reduce || !inView) return;

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(QUESTION.slice(0, i));
      if (i >= QUESTION.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, CHAR_MS);

    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <motion.blockquote
      ref={ref}
      aria-label={FULL}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
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
        {REST}
      </motion.span>
    </motion.blockquote>
  );
}
