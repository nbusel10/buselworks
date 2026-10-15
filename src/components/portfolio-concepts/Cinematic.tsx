"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { VisitWebsite } from "./BrowserShot";
import {
  ArrowButton,
  MiniShot,
  ShotFrame,
  useHorizontalSwipe,
} from "./ProportionedBrowser";
import { conceptProjects, padIndex, projectHost } from "./projects";
import { useConceptActivity } from "./useConceptActivity";

export function Cinematic() {
  const { ref, reduced, width } = useConceptActivity<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const count = conceptProjects.length;
  const project = conceptProjects[index];
  const stacked = width < 640;
  const swipe = useHorizontalSwipe((step) => go(step));

  function go(step: -1 | 1) {
    setDirection(step);
    setIndex((current) => (current + step + count) % count);
  }

  return (
    <div
      ref={ref}
      className="bg-ivory px-3 py-3 sm:px-5"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
      }}
    >
      <div className={stacked ? "flex flex-col gap-3" : "flex items-end justify-between gap-4"}>
        <div className="min-w-0" aria-live="polite">
          <p className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-aqua-dark">
            {padIndex(index)} / {padIndex(count - 1)}
          </p>
          <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight">{project.name}</h3>
          <p className="text-sm text-muted">{project.category}</p>
          <p className="mt-1 max-w-xl text-sm text-ink-soft">{project.descriptor}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ArrowButton label="Previous project" onClick={() => go(-1)}>
            ←
          </ArrowButton>
          <ArrowButton label="Next project" onClick={() => go(1)}>
            →
          </ArrowButton>
          <VisitWebsite project={project} />
        </div>
      </div>

      <div
        className="mx-auto mt-3 w-full max-w-[40rem] touch-pan-y"
        {...swipe}
      >
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_22px_50px_-32px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-1.5 border-b border-border bg-[#f3f1ec] px-3 py-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#28c840]" />
            <div className="relative ml-2 h-6 min-w-0 flex-1 overflow-hidden rounded-md bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={project.slug}
                  initial={{ y: reduced ? 0 : 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: reduced ? 0 : -8, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.28 }}
                  className="absolute inset-0 truncate px-2 py-1 font-mono-label text-[10px] leading-4 text-muted"
                >
                  {projectHost(project.url)}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <div className="relative w-full" style={{ aspectRatio: "1440 / 900" }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={project.slug}
                className="absolute inset-0"
                custom={direction}
                initial={{ opacity: 0, x: reduced ? 0 : direction * 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : direction * -36 }}
                transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ShotFrame
                  project={project}
                  priority={index === 0}
                  sizes="(max-width: 800px) 92vw, 640px"
                  fill
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Project filmstrip"
        className="mt-3 flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none]"
      >
        {conceptProjects.map((item, itemIndex) => {
          const selected = itemIndex === index;
          return (
            <button
              key={item.slug}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={item.name}
              onClick={() => {
                setDirection(itemIndex >= index ? 1 : -1);
                setIndex(itemIndex);
              }}
              className={`w-[6.75rem] shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-aqua ${
                selected ? "ring-2 ring-aqua" : "opacity-80 hover:opacity-100"
              }`}
            >
              <MiniShot project={item} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
