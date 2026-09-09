"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { PromptFlipCard } from "@/components/ui/PromptFlipCard";
import { StageStrip } from "@/components/ui/StageStrip";
import { workProjects } from "@/data/work";

function HeroMockVisual({
  label,
  accent,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex h-full min-h-[180px] flex-col gap-3 bg-gradient-to-br from-[#f7f4ef] to-white p-4">
      <div className="flex items-center justify-between">
        <div className="h-2 w-16 rounded-full bg-charcoal/20" />
        <div
          className={`h-2 w-10 rounded-full ${accent ? "bg-aqua" : "bg-charcoal/15"}`}
        />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-[70%] rounded bg-charcoal/25" />
        <div className="h-2 w-full rounded bg-charcoal/10" />
        <div className="h-2 w-[85%] rounded bg-charcoal/10" />
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`aspect-[4/3] rounded-md ${
              i === 1 ? "bg-aqua/30" : "bg-charcoal/8"
            }`}
          />
        ))}
      </div>
      <p className="font-mono-label text-[9px] uppercase tracking-widest text-muted">
        {label}
      </p>
    </div>
  );
}

function useNegated(source: MotionValue<number>, factor = 1) {
  const out = useMotionValue(0);
  useEffect(() => source.on("change", (v) => out.set(-v * factor)), [source, out, factor]);
  return out;
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });
  const negX = useNegated(springX);
  const negY = useNegated(springY, 0.6);
  const softNegY = useNegated(springY, 0.4);
  const featured = workProjects.filter((p) => p.featured).slice(0, 2);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px * 24);
      y.set(py * 16);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [reduce, x, y]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(28,28,28,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,28,28,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="container-bw-wide relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow">
            Web Design + Development / Phoenix + Everywhere
          </p>
          <h1 className="font-display mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            You bring the idea.
            <br />
            We’ll build what comes next
            <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-pulse bg-aqua align-baseline" />
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
            Buselworks designs and builds custom websites using modern
            development tools, AI and a whole lot of human judgment. From a
            quick idea to a completely custom digital experience, we can design
            it, code it and launch it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/contact" className="btn-primary">
              Start Something <span aria-hidden>→</span>
            </Link>
            <Link href="/work" className="btn-secondary">
              See Our Work
            </Link>
          </div>

          <StageStrip className="mt-10" />
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-lg sm:h-[440px] lg:h-[500px]">
          <motion.div
            style={reduce ? undefined : { x: springX, y: springY }}
            className="absolute left-[8%] top-[8%] z-10 w-[78%] rotate-[-4deg]"
          >
            {featured[0] ? (
              <BrowserFrame project={featured[0]} />
            ) : (
              <BrowserFrame url="example.com">
                <HeroMockVisual label="prompt → layout" accent />
              </BrowserFrame>
            )}
          </motion.div>
          <motion.div
            style={reduce ? undefined : { x: negX, y: negY }}
            className="absolute right-0 top-[28%] z-20 w-[70%] rotate-[5deg]"
          >
            {featured[1] ? (
              <BrowserFrame project={featured[1]} />
            ) : (
              <BrowserFrame url="studio.dev">
                <HeroMockVisual label="design system" />
              </BrowserFrame>
            )}
          </motion.div>
          <motion.div
            style={reduce ? undefined : { x: springX, y: softNegY }}
            className="absolute bottom-0 left-[2%] z-30 w-[62%] rotate-[-2deg]"
          >
            <PromptFlipCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
