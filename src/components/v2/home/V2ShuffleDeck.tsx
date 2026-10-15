"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SiteBrowser } from "@/components/portfolio-concepts/ProportionedBrowser";
import { useConceptActivity } from "@/components/portfolio-concepts/useConceptActivity";
import type { WorkProject } from "@/data/types";

export function V2ShuffleDeck({ projects }: { projects: WorkProject[] }) {
  const { ref, motionOn, wide, width } = useConceptActivity<HTMLDivElement>();
  const stacked = width < 720;
  const [index, setIndex] = useState(0);
  const [fan, setFan] = useState(false);
  const [direction, setDirection] = useState<-1 | 1>(-1);
  const count = projects.length;
  const front = projects[index];

  if (!front || count === 0) return null;

  function go(step: -1 | 1) {
    setDirection(step === 1 ? -1 : 1);
    setIndex((current) => (current + step + count) % count);
  }

  return (
    <div ref={ref} className="mt-8">
      <div
        className="relative mx-auto w-full max-w-[40rem] px-3 pt-2 pb-10 sm:px-8"
        onMouseEnter={() => {
          if (wide && motionOn) setFan(true);
        }}
        onMouseLeave={() => setFan(false)}
      >
        <div className="relative">
          <div aria-hidden className="invisible">
            <div className="h-9" />
            <div style={{ aspectRatio: "1440 / 900" }} />
          </div>
          {[3, 2, 1].map((depth) => {
            const project = projects[(index + depth) % count];
            const spread = fan ? 34 : 10;
            return (
              <motion.div
                key={project.slug}
                aria-hidden
                className="absolute inset-x-0 top-0"
                initial={false}
                animate={{
                  x: depth * spread,
                  y: depth * 10,
                  rotate: -3 + depth * 2.5,
                  scale: 1 - depth * 0.035,
                }}
                style={{ zIndex: 10 - depth }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <SiteBrowser project={project} sizes="(max-width: 800px) 86vw, 640px" />
              </motion.div>
            );
          })}

          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={front.slug}
              className="absolute inset-x-0 top-0 z-20 touch-pan-y"
              custom={direction}
              drag={motionOn ? "x" : false}
              dragDirectionLock
              dragSnapToOrigin
              dragElastic={0.7}
              variants={{
                enter: (dir: number) => ({
                  x: dir * -40,
                  rotate: -2,
                  scale: 0.98,
                  opacity: 0,
                }),
                center: { x: 0, rotate: -2, scale: 1, opacity: 1 },
                exit: (dir: number) => ({
                  x: dir * 520,
                  rotate: dir * 8,
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.velocity.x < -700) go(1);
                else if (info.offset.x > 80 || info.velocity.x > 700) go(-1);
              }}
            >
              <SiteBrowser
                project={front}
                priority={index === 0}
                sizes="(max-width: 800px) 88vw, 640px"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className={`mx-auto flex max-w-[40rem] gap-3 ${
          stacked ? "flex-col items-start" : "items-end justify-between"
        }`}
      >
        <div aria-live="polite" className="min-w-0">
          <p className="font-mono-label text-[11px] uppercase tracking-[0.14em] text-muted">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} · {count - 1} behind
          </p>
          <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight">{front.name}</h3>
          <p className="text-sm text-muted">{front.categoryLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <DeckButton label="Previous project" onClick={() => go(-1)}>
            ←
          </DeckButton>
          <DeckButton label="Next project" onClick={() => go(1)}>
            →
          </DeckButton>
          <a
            href={front.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            View Website <span aria-hidden>→</span>
          </a>
        </div>
      </div>
      <p className="mx-auto mt-3 max-w-[40rem] text-sm text-ink-soft">{front.descriptor}</p>
    </div>
  );
}

function DeckButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-white text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}
