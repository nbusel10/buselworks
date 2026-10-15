"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VisitWebsite } from "./BrowserShot";
import { SiteBrowser } from "./ProportionedBrowser";
import { conceptProjects, projectHost } from "./projects";
import { useConceptActivity } from "./useConceptActivity";

export function CommandCenter() {
  const { ref, wide, reduced, motionOn } = useConceptActivity<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(true);
  const project = conceptProjects[index];
  const host = projectHost(project.url);

  useEffect(() => {
    const line = `open ${host}`;

    if (run === 0 || reduced) {
      setLines([line]);
      setRevealed(true);
      return;
    }

    setLines([]);
    setRevealed(false);
    const typeTimer = window.setTimeout(() => setLines([line]), 160);
    const revealTimer = window.setTimeout(() => setRevealed(true), 420);
    return () => {
      window.clearTimeout(typeTimer);
      window.clearTimeout(revealTimer);
    };
  }, [run, host, reduced]);

  function choose(next: number) {
    if (next === index && run > 0) return;
    setIndex(next);
    setRun((current) => current + 1);
  }

  return (
    <div ref={ref} className="bg-ivory p-3 sm:p-4">
      <div className="overflow-hidden rounded-[1.4rem] bg-charcoal text-ivory shadow-[0_24px_50px_-32px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <p className="min-w-0 font-mono-label text-sm text-white/90 sm:text-base">
            <span className="text-aqua">&gt;</span> explore buselworks projects
            <motion.span
              aria-hidden
              className="ml-0.5 inline text-aqua"
              animate={motionOn ? { opacity: [1, 0, 1] } : { opacity: 1 }}
              transition={
                motionOn
                  ? { duration: 1.15, repeat: Infinity, times: [0, 0.5, 1] }
                  : { duration: 0 }
              }
            >
              _
            </motion.span>
          </p>
          <span className="font-mono-label text-[10px] uppercase tracking-[0.16em] text-white/45">
            live
          </span>
        </div>

        <div className={wide ? "grid grid-cols-[16rem_minmax(0,1fr)]" : "block"}>
          <div
            role="listbox"
            aria-label="Project commands"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                choose((index + 1) % conceptProjects.length);
              }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                choose((index - 1 + conceptProjects.length) % conceptProjects.length);
              }
            }}
            className={`outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-aqua ${
              wide ? "border-r border-white/10 p-3" : "border-b border-white/10 p-3"
            }`}
          >
            {conceptProjects.map((item, itemIndex) => {
              const selected = itemIndex === index;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => choose(itemIndex)}
                  className={`mb-1 w-full rounded-xl px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-aqua sm:py-2.5 ${
                    selected ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono-label text-[10px] text-aqua">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-display text-sm font-semibold tracking-tight">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-4 sm:p-5">
            <div className="min-h-6 font-mono-label text-[12px] leading-6 text-white/70" aria-live="polite">
              {lines.map((line) => (
                <p key={line}>
                  <span className="text-aqua">›</span> {line}
                </p>
              ))}
            </div>
            <motion.div
              className="mt-3 w-full max-w-[40rem]"
              initial={false}
              animate={{
                clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                opacity: revealed ? 1 : 0.35,
              }}
              transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SiteBrowser project={project} sizes="(max-width: 800px) 92vw, 640px" />
            </motion.div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-display text-xl font-semibold">{project.name}</p>
                <p className="mt-1 max-w-xl text-sm text-white/65">{project.descriptor}</p>
              </div>
              <VisitWebsite project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
