"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Cinematic } from "./Cinematic";
import { CommandCenter } from "./CommandCenter";
import { Deck } from "./Deck";
import { HorizontalGallery } from "./HorizontalGallery";
import { Orbit } from "./Orbit";
import { Playground } from "./Playground";
import { SplitStage } from "./SplitStage";
import { Takeover } from "./Takeover";
import { Wall } from "./Wall";

const storageKey = "bw-portfolio-concept-favorites";

type PreviewMode = "responsive" | "phone" | "desktop";

const concepts = [
  {
    id: "playground",
    num: "01",
    name: "Playground",
    title: "Floating Project Playground",
    blurb:
      "Overlapping browser windows drift, come forward on hover, and can be shuffled. Phones get a swipeable deck instead of a tiny version of the canvas.",
    trait: "Layered depth you can rearrange",
    Component: Playground,
    impact: "High",
    mobile: "Strong. Swipe with a peek of the next card. Tap for the description.",
    discovery: "Medium. One project leads, the rest stay visible around it.",
    performance: "Medium. Several transformed screenshots and a slow float.",
    complexity: "Medium",
    height: "About 600px on desktop. About 520px on a phone.",
  },
  {
    id: "orbit",
    num: "02",
    name: "Orbit",
    title: "Infinite Portfolio Orbit",
    blurb:
      "A cover-flow orbit with one project in color at the center. Drag, click a side preview, or use the arrows. Autoplay is slow and pauses while you interact.",
    trait: "Cinematic focus, with context on both sides",
    Component: Orbit,
    impact: "High",
    mobile: "Strong. Flatter perspective, large arrows, and horizontal swipe.",
    discovery: "Medium. The center is obvious and both neighbors stay in reach.",
    performance: "Medium. A few 3D transforms, paused when offscreen.",
    complexity: "Medium",
    height: "About 560px on desktop. About 500px on a phone.",
  },
  {
    id: "wall",
    num: "03",
    name: "Wall",
    title: "Interactive Website Wall",
    blurb:
      "Every project is on the wall at once. Hover or focus expands one tile and the others reflow. Small screens become a two-column gallery, then a single column, with nothing hidden behind a swipe.",
    trait: "See everything, then let one project take the room",
    Component: Wall,
    impact: "High",
    mobile: "Excellent. All five projects stay on the page. Tap to open details.",
    discovery: "Excellent. The full set is visible without advancing a carousel.",
    performance: "Medium. Layout shifts are transform-based and limited to the grid.",
    complexity: "Medium-high",
    height: "About 640px on desktop. Taller on a phone, because every project is listed.",
  },
  {
    id: "browser",
    num: "04",
    name: "Browser",
    title: "Browser Window Takeover",
    blurb:
      "A project list drives one large browser. The address bar, accent, and screenshot change together. Phones turn the list into scrolling tabs.",
    trait: "Clearest way to compare a full preview with the list",
    Component: Takeover,
    impact: "Medium-high",
    mobile: "Excellent. Tabs stay visible and the preview is large.",
    discovery: "Excellent. The whole set is a list, not a sequence you have to hunt through.",
    performance: "Low. One crossfade at a time, using local screenshots.",
    complexity: "Low",
    height: "About 520px on desktop. About 640px on a phone.",
  },
  {
    id: "deck",
    num: "05",
    name: "Deck",
    title: "Portfolio Shuffle Deck",
    blurb:
      "A physical stack. Drag the front card aside and the next one springs forward. Buttons are always there, and vertical page scrolling still works.",
    trait: "Tactile browsing, one project at a time",
    Component: Deck,
    impact: "High",
    mobile: "Good. Swipe or use the arrows. The page can still scroll vertically.",
    discovery: "Low. Only the front project is readable. The count shows what is behind it.",
    performance: "Low. Four cards are painted. The rest wait their turn.",
    complexity: "Medium",
    height: "About 600px. The front card is a full homepage.",
  },
  {
    id: "command",
    num: "06",
    name: "Command",
    title: "Project Command Center",
    blurb:
      "A charcoal panel with a short reveal. Choosing a project types one line, “open” and the domain, then the full website screenshot opens.",
    trait: "A build-and-reveal moment with a developer tone",
    Component: CommandCenter,
    impact: "High",
    mobile: "Good. Compact commands and a short reveal, then the screenshot.",
    discovery: "Excellent. Every project is a command in the menu.",
    performance: "Low. Motion is a short clip-path reveal, skipped when reduced motion is on.",
    complexity: "Medium",
    height: "About 670px on desktop. Taller on a phone, where the project list stacks above the preview.",
  },
  {
    id: "cinematic",
    num: "07",
    name: "Cinematic",
    title: "Cinematic Showcase",
    blurb:
      "One large browser, shown at the screenshot’s real proportions, with a filmstrip underneath. Arrows, swipe, and thumbnails move between projects. The full viewport is visible. Nothing is cropped to fit the frame.",
    trait: "A complete website, large enough to read",
    Component: Cinematic,
    impact: "High",
    mobile: "Strong. One full preview, swipe or arrows, and a thumbnail strip.",
    discovery: "Excellent. Every project is in the filmstrip.",
    performance: "Low. One large image crossfades at a time.",
    complexity: "Low",
    height: "About 660px on desktop. On a phone, one full-width 16:10 preview.",
  },
  {
    id: "split",
    num: "08",
    name: "Split",
    title: "Split-Screen Gallery",
    blurb:
      "Two full website previews sit side by side. Moving onto one expands it, and the other eases back, both keeping their real proportions. Phones show one preview at a time.",
    trait: "Compare two complete designs, then let one open up",
    Component: SplitStage,
    impact: "High",
    mobile: "Strong. One large preview, with swipe and arrows.",
    discovery: "Excellent on desktop, because two sites are fully visible. One at a time on a phone.",
    performance: "Low. Two contained images, no cover-cropping.",
    complexity: "Medium",
    height: "About 560px on desktop, rising to about 700px when one preview expands.",
  },
  {
    id: "horizontal",
    num: "09",
    name: "Horizontal",
    title: "Horizontal Project Gallery",
    blurb:
      "Large browsers in a horizontal row. Scroll, swipe, or use the arrows. The active preview is fully visible at its real proportions, and the next one peeks in from the side.",
    trait: "Move sideways through complete website previews",
    Component: HorizontalGallery,
    impact: "High",
    mobile: "Strong. One large card, neighbors peeking, swipe or arrows.",
    discovery: "Good. The row shows what is next without stacking the page.",
    performance: "Low. Native horizontal scrolling, paused work is just off-screen.",
    complexity: "Low",
    height: "About 620px on desktop. On a phone, one full-width preview.",
  },
] as const;

export function Showcase() {
  const [mode, setMode] = useState<PreviewMode>("responsive");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [resets, setResets] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState<string>(concepts[0].id);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown;
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((item) => typeof item === "string"));
        }
      }
    } catch {
      /* ignore broken local storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, ready]);

  useEffect(() => {
    const nodes = concepts
      .map((concept) => document.getElementById(concept.id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function toggleFavorite(id: string) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((item) => item !== id)
        : [...currentFavorites, id],
    );
  }

  const saved = concepts.filter((concept) => favorites.includes(concept.id));

  return (
    <div className="bg-ivory text-ink">
      <header className="sticky top-0 z-50 border-b border-border bg-ivory/92 backdrop-blur-md">
        <div className="container-bw-wide flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-muted">
            Portfolio concepts
          </p>
          <div role="radiogroup" aria-label="Preview width" className="flex rounded-full bg-white p-1">
            <ModeButton
              mode={mode}
              value="responsive"
              label="Responsive"
              onSelect={setMode}
            />
            <ModeButton mode={mode} value="phone" label="Phone 390" onSelect={setMode} />
            <ModeButton mode={mode} value="desktop" label="Desktop frame" onSelect={setMode} />
          </div>
        </div>
        <nav aria-label="Concepts" className="container-bw-wide flex gap-1.5 overflow-x-auto pb-3 [scrollbar-width:none]">
          {concepts.map((concept) => (
            <a
              key={concept.id}
              href={`#${concept.id}`}
              aria-current={current === concept.id ? "true" : undefined}
              className={`shrink-0 rounded-full px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${
                current === concept.id ? "bg-charcoal text-white" : "bg-white text-ink hover:text-aqua-dark"
              }`}
            >
              <span className="font-mono-label text-[10px] tracking-widest">{concept.num}</span>{" "}
              {concept.name}
            </a>
          ))}
          <a
            href="#compare"
            className="shrink-0 rounded-full bg-white px-3 py-2 text-sm font-medium hover:text-aqua-dark"
          >
            Compare
          </a>
        </nav>
        {saved.length > 0 ? (
          <div className="container-bw-wide flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none]">
            <span className="shrink-0 self-center font-mono-label text-[10px] uppercase tracking-[0.14em] text-muted">
              Saved
            </span>
            {saved.map((concept) => (
              <a
                key={concept.id}
                href={`#${concept.id}`}
                className="shrink-0 rounded-full border border-aqua/50 bg-aqua/10 px-3 py-1.5 text-sm font-semibold"
              >
                {concept.num} {concept.name}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <div className="container-bw-wide pb-6 pt-10">
        <p className="eyebrow">Internal preview</p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Nine ways to show the work.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink-soft md:text-lg">
          Working prototypes for a featured-projects section. This page is not in the site navigation, and the homepage is unchanged. Screenshots are the real project sites.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-ink-soft">
          Concepts 07–09 are the new direction. Each screenshot stays at its real 16:10 proportions, in full color, inside about 550–700px on desktop. The first six are still here for reference.
        </p>
        <p className="mt-5">
          <Link href="/" className="btn-secondary">
            Back to the homepage <span aria-hidden>→</span>
          </Link>
        </p>
      </div>

      {concepts.map((concept) => {
        const Demo = concept.Component;
        return (
          <section
            key={concept.id}
            id={concept.id}
            className="scroll-mt-36 border-t border-border py-12 md:py-16"
          >
            <div className="container-bw-wide">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="eyebrow">
                    <span className="text-aqua-dark">{concept.num}</span> · Concept
                  </p>
                  <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {concept.title}
                  </h2>
                  <p className="mt-3 text-sm text-ink-soft md:text-base">{concept.blurb}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={favorites.includes(concept.id)}
                    onClick={() => toggleFavorite(concept.id)}
                    className="inline-flex min-h-11 items-center rounded-full border border-border-strong bg-white px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
                  >
                    {favorites.includes(concept.id) ? "Saved" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setResets((currentResets) => ({
                        ...currentResets,
                        [concept.id]: (currentResets[concept.id] ?? 0) + 1,
                      }))
                    }
                    className="inline-flex min-h-11 items-center rounded-full bg-charcoal px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
                  >
                    Reset demo
                  </button>
                </div>
              </div>

              <PreviewFrame mode={mode}>
                <div className="overflow-hidden rounded-[1.6rem] border border-border bg-white shadow-[0_30px_70px_-46px_rgba(0,0,0,0.55)]">
                  <Demo key={resets[concept.id] ?? 0} />
                </div>
              </PreviewFrame>

              <p className="mt-3 font-mono-label text-[11px] uppercase tracking-[0.16em] text-muted">
                Strongest characteristic · {concept.trait}
              </p>
            </div>
          </section>
        );
      })}

      <section id="compare" className="scroll-mt-36 border-t border-border py-14 md:py-20">
        <div className="container-bw-wide">
          <p className="eyebrow">Compare</p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Which job should this section do?
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            These notes are about the prototypes above: how they feel at a glance, how a phone has to use them, and what it would take to move one onto the homepage.
          </p>
          <div className="mt-8 max-w-full overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead className="bg-[#f3efe8] font-mono-label text-[10px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Concept</th>
                  <th className="px-4 py-3 font-medium">Desktop impact</th>
                  <th className="px-4 py-3 font-medium">Mobile usability</th>
                  <th className="px-4 py-3 font-medium">Discovering projects</th>
                  <th className="px-4 py-3 font-medium">Performance</th>
                  <th className="px-4 py-3 font-medium">Complexity</th>
                  <th className="px-4 py-3 font-medium">Section height</th>
                </tr>
              </thead>
              <tbody>
                {concepts.map((concept) => (
                  <tr key={concept.id} className="border-t border-border align-top">
                    <th className="px-4 py-4 font-display text-base font-semibold">
                      <a href={`#${concept.id}`} className="hover:text-aqua-dark">
                        {concept.num} {concept.name}
                      </a>
                    </th>
                    <td className="px-4 py-4 text-ink-soft">{concept.impact}</td>
                    <td className="px-4 py-4 text-ink-soft">{concept.mobile}</td>
                    <td className="px-4 py-4 text-ink-soft">{concept.discovery}</td>
                    <td className="px-4 py-4 text-ink-soft">{concept.performance}</td>
                    <td className="px-4 py-4 text-ink-soft">{concept.complexity}</td>
                    <td className="px-4 py-4 text-ink-soft">{concept.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function ModeButton({
  mode,
  value,
  label,
  onSelect,
}: {
  mode: PreviewMode;
  value: PreviewMode;
  label: string;
  onSelect: (mode: PreviewMode) => void;
}) {
  const selected = mode === value;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={`min-h-10 rounded-full px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${
        selected ? "bg-charcoal text-white" : "text-ink-soft"
      }`}
    >
      {label}
    </button>
  );
}

function PreviewFrame({ mode, children }: { mode: PreviewMode; children: ReactNode }) {
  if (mode === "phone") {
    return (
      <div className="mx-auto w-full max-w-[390px]">
        {children}
        <p className="mt-2 text-center font-mono-label text-[10px] uppercase tracking-[0.16em] text-muted">
          390px phone frame
        </p>
      </div>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="max-w-full overflow-x-auto overscroll-x-contain rounded-[1.6rem]">
        <div className="w-[1180px]">{children}</div>
        <p className="mt-2 font-mono-label text-[10px] uppercase tracking-[0.16em] text-muted">
          1180px desktop frame. Scroll sideways inside this frame on a narrow window.
        </p>
      </div>
    );
  }

  return children;
}
