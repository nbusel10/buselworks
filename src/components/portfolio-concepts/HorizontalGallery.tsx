"use client";

import { useRef, useState } from "react";
import { VisitWebsite } from "./BrowserShot";
import { ArrowButton, SiteBrowser } from "./ProportionedBrowser";
import { conceptProjects, padIndex } from "./projects";
import { useConceptActivity } from "./useConceptActivity";

export function HorizontalGallery() {
  const { ref, reduced, wide, width } = useConceptActivity<HTMLDivElement>();
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = conceptProjects.length;
  const project = conceptProjects[index];
  const stacked = width < 640;

  function syncFromScroll() {
    const rail = scroller.current;
    if (!rail) return;
    const cards = [...rail.querySelectorAll<HTMLElement>("[data-card]")];
    const center = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, cardIndex) => {
      const mid = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(mid - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = cardIndex;
      }
    });
    setIndex(best);
  }

  function scrollToIndex(next: number) {
    const rail = scroller.current;
    const card = rail?.querySelectorAll<HTMLElement>("[data-card]")[next];
    if (!rail || !card) return;
    const left = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;
    rail.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    setIndex(next);
  }

  function go(step: -1 | 1) {
    scrollToIndex((index + step + count) % count);
  }

  return (
    <div ref={ref} className="bg-ivory py-4">
      <div className={stacked ? "flex flex-col gap-3 px-3 sm:px-5" : "flex items-end justify-between gap-4 px-3 sm:px-5"}>
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
        ref={scroller}
        className={`mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:thin] ${
          wide ? "px-[max(1.25rem,calc((100%-42rem)/2))]" : "px-[7%]"
        }`}
        onScroll={syncFromScroll}
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
        tabIndex={0}
        aria-label="Project gallery"
      >
        {conceptProjects.map((item) => (
          <article
            key={item.slug}
            data-card
            className={`shrink-0 snap-center ${wide ? "w-[min(100%,42rem)]" : "w-[86%]"}`}
          >
            <SiteBrowser project={item} sizes={wide ? "672px" : "86vw"} />
            <p className="mt-3 font-display text-lg font-semibold tracking-tight">{item.name}</p>
            <p className="text-sm text-muted">{item.category}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
