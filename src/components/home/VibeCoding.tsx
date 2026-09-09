"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const prompts = [
  "Make this section feel more editorial.",
  "What if these cards opened when you hovered?",
  "Can this work more like an app?",
  "Can we make this page less boring?",
];

export function VibeCoding() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"prompt" | "site">("prompt");

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setPhase((p) => {
        if (p === "prompt") return "site";
        setIndex((i) => (i + 1) % prompts.length);
        return "prompt";
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-charcoal py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-aqua/15 blur-3xl" />
      <div className="container-bw-wide relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono-label text-xs tracking-[0.16em] text-aqua">
            Collaborative by design
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Yes. You can vibe code your website with us.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
            You don’t need to know how to code. Sit with us and describe what
            you want in plain language — we translate ideas into working design
            and code, often while you’re right there.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80 md:text-base">
            {prompts.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="text-aqua" aria-hidden>
                  →
                </span>
                <span>“{p}”</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative min-h-[320px] rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-aqua" />
              <span className="font-mono-label text-[10px] tracking-widest text-white/50">
                LIVE SESSION
              </span>
            </div>

            <AnimatePresence mode="wait">
              {phase === "prompt" || reduce ? (
                <motion.div
                  key={`prompt-${index}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  className="font-mono-label text-sm leading-relaxed text-aqua"
                >
                  <p className="text-white/40">you@buselworks ~</p>
                  <p className="mt-3 text-lg text-white md:text-xl">
                    “{prompts[index]}”
                    <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-aqua align-middle" />
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`site-${index}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden rounded-xl bg-ivory text-ink"
                >
                  <div className="flex gap-1.5 border-b border-border bg-[#ece8e1] px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-24 rounded-full bg-aqua/50" />
                    <div className="h-6 w-[70%] rounded bg-charcoal/20" />
                    <div className="h-2 w-full rounded bg-charcoal/10" />
                    <div className="h-2 w-[80%] rounded bg-charcoal/10" />
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="aspect-[4/3] rounded-lg bg-charcoal/8" />
                      <div className="aspect-[4/3] rounded-lg bg-aqua/25" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
