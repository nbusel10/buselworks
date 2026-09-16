"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

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

export function V2VibeCoding() {
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
    <section className="v2-section relative overflow-hidden bg-surface">
      <div className="v2-container-wide relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono-label text-xs tracking-[0.16em] text-aqua">
            Collaborative by design
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Yes. You can vibe code your website with us.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
            You don&apos;t need to know how to code. Sit with us and describe
            what you want in plain language — we translate ideas into working
            design and code, often while you&apos;re right there.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-charcoal p-5 font-mono-label shadow-xl sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-aqua" />
              <span className="text-[10px] tracking-widest text-white/50">
                LIVE SESSION
              </span>
            </div>

            <p className="text-[11px] text-white/50">{"// client note"}</p>

            <div className="relative mt-3 min-h-[6.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={
                    reduce
                      ? false
                      : {
                          opacity: 0,
                          rotateX: -70,
                          y: 14,
                          transformOrigin: "top",
                        }
                  }
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={
                    reduce
                      ? undefined
                      : {
                          opacity: 0,
                          rotateX: 55,
                          y: -12,
                          transformOrigin: "top",
                        }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 900 }}
                >
                  <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-aqua">{current.action}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {!reduce && (
              <div className="mt-5 flex gap-1.5">
                {prompts.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      i === index ? "bg-aqua" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
