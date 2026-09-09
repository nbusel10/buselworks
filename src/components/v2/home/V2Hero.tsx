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

function useNegated(source: MotionValue<number>, factor = 1) {
  const out = useMotionValue(0);
  useEffect(
    () => source.on("change", (v) => out.set(-v * factor)),
    [source, out, factor],
  );
  return out;
}

export function V2Hero() {
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
    <section ref={ref} className="v2-section relative overflow-hidden pt-10 md:pt-14">
      <div className="v2-container-wide relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">
            Web Design + Development / Phoenix + Everywhere
          </p>
          <h1 className="font-display mt-4 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            You bring the idea.
            <br />
            We’ll build what comes next.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            Custom websites with modern tools, AI, and human judgment — from
            first idea to launch.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/v2/contact" className="btn-primary">
              Start Something <span aria-hidden>→</span>
            </Link>
            <Link href="/v2/work" className="btn-secondary">
              See Our Work
            </Link>
          </div>
          <StageStrip className="mt-8" />
        </div>

        <div className="relative mx-auto h-[340px] w-full max-w-lg sm:h-[400px] lg:h-[440px]">
          <motion.div
            style={reduce ? undefined : { x: springX, y: springY }}
            className="absolute left-[8%] top-[6%] z-10 w-[78%] rotate-[-4deg]"
          >
            {featured[0] && <BrowserFrame project={featured[0]} />}
          </motion.div>
          <motion.div
            style={reduce ? undefined : { x: negX, y: negY }}
            className="absolute right-0 top-[26%] z-20 w-[70%] rotate-[5deg]"
          >
            {featured[1] && <BrowserFrame project={featured[1]} />}
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
