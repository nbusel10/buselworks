"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { VisitWebsite } from "./BrowserShot";
import { SiteBrowser } from "./ProportionedBrowser";
import { conceptProjects, type ConceptProject } from "./projects";
import { useConceptActivity } from "./useConceptActivity";

export function Wall() {
  const { ref, wide, width } = useConceptActivity<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(conceptProjects[0].slug);
  const active = focus ?? hover;
  const featured = active ?? conceptProjects[0].slug;
  const selected =
    conceptProjects.find((project) => project.slug === active) ?? conceptProjects[0];
  const columns = width >= 520 ? 2 : 1;

  return (
    <div ref={ref} className="bg-[#fbfaf7] p-3 sm:p-4">
      {wide ? (
        <>
          <div
            className="grid grid-cols-4 items-start gap-3"
            onMouseLeave={() => setHover(null)}
            onBlur={(event) => {
              const grid = event.currentTarget;
              requestAnimationFrame(() => {
                if (!grid.contains(document.activeElement)) setFocus(null);
              });
            }}
          >
            {conceptProjects.map((project) => {
              const isActive = active === project.slug;
              const large = project.slug === featured;
              return (
                <motion.button
                  key={project.slug}
                  type="button"
                  layout
                  aria-pressed={isActive}
                  onMouseEnter={() => setHover(project.slug)}
                  onFocus={() => setFocus(project.slug)}
                  onClick={() => setFocus(project.slug)}
                  transition={{ layout: { type: "spring", stiffness: 320, damping: 34 } }}
                  className={`min-w-0 rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-aqua ${
                    large ? "col-span-2" : "col-span-1"
                  } ${isActive ? "ring-2 ring-aqua" : ""}`}
                >
                  <div className={active && !isActive ? "grayscale transition-[filter] duration-500" : ""}>
                    <SiteBrowser
                      project={project}
                      decorative
                      sizes={large ? "640px" : "280px"}
                    />
                  </div>
                  <span className="block px-1 pb-1 pt-2">
                    <span className="block font-display text-sm font-semibold tracking-tight">
                      {project.name}
                    </span>
                    {large ? (
                      <span className="mt-0.5 block text-xs text-muted">{project.category}</span>
                    ) : null}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3" aria-live="polite">
            {active ? (
              <>
                <div>
                  <p className="font-display text-2xl font-semibold tracking-tight">{selected.name}</p>
                  <p className="text-sm text-muted">{selected.category}</p>
                  <p className="mt-1 max-w-xl text-sm text-ink-soft">{selected.descriptor}</p>
                </div>
                <VisitWebsite project={selected} />
              </>
            ) : (
              <p className="text-sm text-muted">Hover or focus a project. The tile grows and the others reflow.</p>
            )}
          </div>
        </>
      ) : (
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {conceptProjects.map((project) => (
            <MobileTile
              key={project.slug}
              project={project}
              open={open === project.slug}
              onToggle={() =>
                setOpen((current) => (current === project.slug ? null : project.slug))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MobileTile({
  project,
  open,
  onToggle,
}: {
  project: ConceptProject;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-aqua"
      >
        <div className={open ? "" : "grayscale transition-[filter] duration-500"}>
          <SiteBrowser project={project} decorative sizes="360px" />
        </div>
        <span className="block px-3 pb-3 pt-3">
          <span className="block font-display text-base font-semibold tracking-tight">
            {project.name}
          </span>
          <span className="mt-0.5 block text-xs text-muted">{project.category}</span>
        </span>
      </button>
      {open ? (
        <div className="space-y-3 px-3 pb-3">
          <p className="text-sm text-ink-soft">{project.descriptor}</p>
          <VisitWebsite project={project} />
        </div>
      ) : null}
    </article>
  );
}
