"use client";

import { useState } from "react";
import { VisitWebsite } from "./BrowserShot";
import { ArrowButton, SiteBrowser, useHorizontalSwipe } from "./ProportionedBrowser";
import { conceptProjects, padIndex } from "./projects";
import { useConceptActivity } from "./useConceptActivity";

export function SplitStage() {
  const { ref, reduced, wide, width } = useConceptActivity<HTMLDivElement>();
  const [start, setStart] = useState(0);
  const [expanded, setExpanded] = useState<0 | 1 | null>(null);
  const count = conceptProjects.length;
  const stacked = width < 560;
  const pair = [conceptProjects[start], conceptProjects[(start + 1) % count]];
  const swipe = useHorizontalSwipe((step) => shift(step));

  function shift(step: -1 | 1) {
    setExpanded(null);
    setStart((current) => (current + step + count) % count);
  }

  const columns =
    expanded === 0
      ? "minmax(0,1.62fr) minmax(0,0.72fr)"
      : expanded === 1
        ? "minmax(0,0.72fr) minmax(0,1.62fr)"
        : "minmax(0,1fr) minmax(0,1fr)";

  return (
    <div ref={ref} className="bg-[#fbfaf7] px-3 py-4 sm:px-5">
      <div className={stacked ? "flex flex-col gap-3" : "flex items-end justify-between gap-4"}>
        <div>
          <p className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-aqua-dark">
            {padIndex(start)} – {padIndex((start + 1) % count)} / {padIndex(count - 1)}
          </p>
          <p className="mt-1 max-w-xl text-sm text-ink-soft">
            On a wide screen, two complete sites sit side by side and the one you move across grows. On a phone, one site fills the frame.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ArrowButton label="Previous pair" onClick={() => shift(-1)}>
            ←
          </ArrowButton>
          <ArrowButton label="Next pair" onClick={() => shift(1)}>
            →
          </ArrowButton>
        </div>
      </div>

      {wide ? (
        <div
          className="mx-auto mt-4 grid w-full max-w-[72rem] items-start gap-4"
          style={{
            gridTemplateColumns: columns,
            transition: reduced ? "none" : "grid-template-columns 520ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onMouseLeave={() => setExpanded(null)}
          onBlur={(event) => {
            const next = event.relatedTarget;
            if (!(next instanceof Node) || !event.currentTarget.contains(next)) setExpanded(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              shift(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              shift(-1);
            }
          }}
        >
          {pair.map((project, side) => {
            const open = expanded === side;
            return (
              <div key={project.slug}>
                <button
                  type="button"
                  aria-pressed={open}
                  onMouseEnter={() => setExpanded(side as 0 | 1)}
                  onFocus={() => setExpanded(side as 0 | 1)}
                  className="block w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-aqua"
                >
                  <SiteBrowser
                    project={project}
                    sizes={open ? "(max-width: 1200px) 60vw, 760px" : "(max-width: 1200px) 40vw, 520px"}
                  />
                </button>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold tracking-tight">{project.name}</p>
                    <p className="text-sm text-muted">{project.category}</p>
                  </div>
                  <VisitWebsite project={project} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <MobilePair index={start} onIndex={setStart} swipe={swipe} stacked={stacked} />
      )}
    </div>
  );
}

function MobilePair({
  index,
  onIndex,
  swipe,
  stacked,
}: {
  index: number;
  onIndex: (index: number) => void;
  swipe: ReturnType<typeof useHorizontalSwipe>;
  stacked: boolean;
}) {
  const count = conceptProjects.length;
  const project = conceptProjects[index];

  function go(step: -1 | 1) {
    onIndex((index + step + count) % count);
  }

  return (
    <div className="mt-4" {...swipe}>
      <SiteBrowser project={project} sizes="92vw" />
      <div className={`mt-4 gap-3 ${stacked ? "flex flex-col" : "flex items-end justify-between"}`}>
        <div className="min-w-0" aria-live="polite">
          <p className="font-mono-label text-[11px] uppercase tracking-[0.14em] text-muted">
            {padIndex(index)} / {padIndex(count - 1)}
          </p>
          <p className="font-display mt-1 text-2xl font-semibold tracking-tight">{project.name}</p>
          <p className="text-sm text-muted">{project.category}</p>
          <p className="mt-1 text-sm text-ink-soft">{project.descriptor}</p>
        </div>
        <div className="flex items-center gap-2">
          <ArrowButton label="Previous project" onClick={() => go(-1)}>
            ←
          </ArrowButton>
          <ArrowButton label="Next project" onClick={() => go(1)}>
            →
          </ArrowButton>
          <VisitWebsite project={project} />
        </div>
      </div>
    </div>
  );
}
