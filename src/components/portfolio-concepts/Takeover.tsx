"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { VisitWebsite } from "./BrowserShot";
import { ShotFrame } from "./ProportionedBrowser";
import { conceptProjects, projectHost } from "./projects";
import { useConceptActivity } from "./useConceptActivity";

export function Takeover() {
  const { ref, wide } = useConceptActivity<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const project = conceptProjects[index];

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setIndex((current) => (current + 1) % conceptProjects.length);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setIndex((current) => (current - 1 + conceptProjects.length) % conceptProjects.length);
    }
    if (event.key === "Home") {
      event.preventDefault();
      setIndex(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setIndex(conceptProjects.length - 1);
    }
  }

  const list = (
    <div
      role="listbox"
      aria-label="Projects"
      aria-activedescendant={`takeover-${project.slug}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`outline-none focus-visible:ring-2 focus-visible:ring-aqua ${
        wide ? "flex flex-col gap-1" : "flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
      }`}
    >
      {conceptProjects.map((item, itemIndex) => {
        const selected = itemIndex === index;
        return (
          <button
            key={item.slug}
            id={`takeover-${item.slug}`}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => setIndex(itemIndex)}
            onMouseEnter={() => {
              if (wide) setIndex(itemIndex);
            }}
            className={`rounded-2xl text-left outline-none transition focus-visible:ring-2 focus-visible:ring-aqua ${
              wide ? "px-3 py-3" : "min-w-[11.5rem] shrink-0 px-3 py-3"
            } ${selected ? "bg-white shadow-[0_10px_30px_-22px_rgba(0,0,0,0.8)]" : "hover:bg-white/70"}`}
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: selected ? item.accent : "#d9d3cb" }}
              />
              <span className="font-display text-sm font-semibold tracking-tight">{item.name}</span>
            </span>
            <span className="mt-1 block pl-[1.15rem] text-xs text-muted">{item.category}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div ref={ref} className="bg-ivory p-3 sm:p-5">
      <div className={wide ? "grid grid-cols-[17rem_minmax(0,1fr)] gap-5" : "space-y-4"}>
        {list}
        <div className="min-w-0">
          <div className="max-w-[40rem] overflow-hidden rounded-[1.35rem] border border-black/10 bg-white shadow-[0_18px_44px_-28px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-1.5 border-b border-border bg-[#f3f1ec] px-2.5 py-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#28c840]" />
              <div className="relative ml-1.5 h-6 min-w-0 flex-1 overflow-hidden rounded-md bg-white">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={project.slug}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="absolute inset-0 truncate px-2 py-1 font-mono-label text-[10px] leading-4 text-muted"
                  >
                    {projectHost(project.url)}
                  </motion.p>
                </AnimatePresence>
              </div>
              <span
                aria-hidden
                className="h-2 w-8 shrink-0 rounded-full transition-colors duration-500"
                style={{ background: project.accent }}
              />
            </div>
            <div className="relative w-full" style={{ aspectRatio: "1440 / 900" }}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={project.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ShotFrame
                    project={project}
                    fill
                    sizes="(max-width: 900px) 92vw, 640px"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-display text-2xl font-semibold tracking-tight">{project.name}</p>
              <p className="mt-1 max-w-xl text-sm text-ink-soft">{project.descriptor}</p>
            </div>
            <VisitWebsite project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
