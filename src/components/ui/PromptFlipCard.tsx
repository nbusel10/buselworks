"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const prompts = [
  {
    quote: "Make this section feel more editorial.",
    action: "→ translating to layout + code",
  },
  {
    quote: "What if these cards opened when you hovered?",
    action: "→ adding interaction + motion",
  },
  {
    quote: "Can this work more like an app?",
    action: "→ shaping the experience",
  },
  {
    quote: "Can we make this page less boring?",
    action: "→ dialing up the personality",
  },
  {
    quote: "What if the homepage felt like a conversation?",
    action: "→ rewriting the first impression",
  },
  {
    quote: "Make the brand feel warmer, but still sharp.",
    action: "→ tuning type, color + spacing",
  },
];

export function PromptFlipCard({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % prompts.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const current = prompts[index];

  return (
    <div
      className={`relative min-h-[7.5rem] overflow-hidden rounded-xl border border-border-strong bg-charcoal p-4 font-mono-label text-[11px] leading-relaxed text-aqua shadow-xl ${className}`}
    >
      <p className="text-white/50">{"// client note"}</p>
      <div className="relative mt-2 min-h-[3.75rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={
              reduce
                ? false
                : { opacity: 0, rotateX: -70, y: 14, transformOrigin: "top" }
            }
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={
              reduce
                ? undefined
                : { opacity: 0, rotateX: 55, y: -12, transformOrigin: "top" }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 900 }}
          >
            <p className="text-white/90">“{current.quote}”</p>
            <p className="mt-3 text-aqua">{current.action}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {!reduce && (
        <div className="mt-3 flex gap-1">
          {prompts.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                i === index ? "bg-aqua" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
