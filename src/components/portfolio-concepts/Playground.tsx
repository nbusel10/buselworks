"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { VisitWebsite } from "./BrowserShot";
import { SiteBrowser } from "./ProportionedBrowser";
import { conceptProjects, type ConceptProject } from "./projects";
import { useConceptActivity } from "./useConceptActivity";

const slots = [
  { x: 1, y: 4, w: 34, h: 48, r: -6.5, z: 2, d: 18 },
  { x: 24, y: 12, w: 36, h: 50, r: 2.4, z: 6, d: 28 },
  { x: 50, y: 2, w: 31, h: 44, r: 5.5, z: 3, d: 12 },
  { x: 70, y: 16, w: 27, h: 40, r: -3.2, z: 4, d: 22 },
  { x: 4, y: 50, w: 30, h: 44, r: 3.6, z: 5, d: 16 },
  { x: 32, y: 54, w: 32, h: 40, r: -2.2, z: 7, d: 14 },
  { x: 62, y: 48, w: 34, h: 46, r: 4.4, z: 1, d: 24 },
];

function shuffleIndexes(current: number[]) {
  const next = [...current];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function Playground() {
  const { ref, motionOn, wide, width } = useConceptActivity<HTMLDivElement>();
  const [placement, setPlacement] = useState(() => conceptProjects.map((_, index) => index));
  const [hover, setHover] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const activeSlug = focus ?? hover;
  const active =
    conceptProjects.find((project) => project.slug === (activeSlug ?? pinned)) ?? null;

  useEffect(() => {
    if (!motionOn) {
      mx.set(0);
      my.set(0);
    }
  }, [motionOn, mx, my]);

  function onCanvasMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!motionOn) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - bounds.left) / bounds.width - 0.5);
    my.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  return (
    <div ref={ref} className="bg-ivory">
      {wide ? (
        <div className="p-3 sm:p-4">
          <div
            className="relative h-[660px] overflow-hidden rounded-2xl border border-border"
            style={{
              backgroundImage:
                "radial-gradient(rgba(28,28,28,0.09) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              backgroundColor: "#f7f4ef",
            }}
            onMouseMove={onCanvasMove}
            onMouseLeave={(event) => {
              if (event.currentTarget.contains(event.relatedTarget as Node)) return;
              setHover(null);
              mx.set(0);
              my.set(0);
            }}
            onFocus={(event) => {
              const slug = (event.target as HTMLElement)
                .closest("[data-slug]")
                ?.getAttribute("data-slug");
              if (slug) setFocus(slug);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setFocus(null);
              }
            }}
          >
            {placement.map((projectIndex, slotIndex) => (
              <FloatingWindow
                key={conceptProjects[projectIndex].slug}
                project={conceptProjects[projectIndex]}
                slot={slots[slotIndex]}
                active={activeSlug === conceptProjects[projectIndex].slug}
                dim={activeSlug !== null}
                motionOn={motionOn}
                mx={mx}
                my={my}
                onHover={(slug) => {
                  setHover(slug);
                  if (slug) setPinned(slug);
                }}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0" aria-live="polite">
              {active ? (
                <>
                  <p className="font-display text-xl font-semibold tracking-tight">
                    {active.name}
                  </p>
                  <p className="text-sm text-muted">{active.category}</p>
                </>
              ) : (
                <>
                  <p className="font-display text-xl font-semibold tracking-tight">
                    Hover a window
                  </p>
                  <p className="text-sm text-muted">
                    It comes forward in color. The others settle back.
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPlacement((current) => shuffleIndexes(current))}
                className="inline-flex min-h-11 items-center rounded-full border border-border-strong bg-white px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
              >
                Shuffle projects
              </button>
              {active ? <VisitWebsite project={active} /> : null}
            </div>
          </div>
        </div>
      ) : (
        <MobileDeck
          width={width}
          index={mobileIndex}
          openSlug={mobileOpen}
          onIndex={setMobileIndex}
          onToggle={(slug) =>
            setMobileOpen((current) => (current === slug ? null : slug))
          }
        />
      )}
    </div>
  );
}

function FloatingWindow({
  project,
  slot,
  active,
  dim,
  motionOn,
  mx,
  my,
  onHover,
}: {
  project: ConceptProject;
  slot: (typeof slots)[number];
  active: boolean;
  dim: boolean;
  motionOn: boolean;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  onHover: (slug: string | null) => void;
}) {
  const px = useTransform(mx, (value) => value * slot.d);
  const py = useTransform(my, (value) => value * slot.d * 0.4);

  return (
    <motion.div
      className="absolute"
      initial={false}
      animate={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        width: `${slot.w}%`,
      }}
      style={{ zIndex: active ? 30 : slot.z, x: px, y: py }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: active ? 0 : slot.r,
          scale: active ? 1.05 : dim ? 0.95 : 1,
          y: motionOn && !active ? [0, -8, 0] : 0,
        }}
        transition={{
          rotate: { type: "spring", stiffness: 220, damping: 20 },
          scale: { type: "spring", stiffness: 280, damping: 24 },
          y:
            motionOn && !active
              ? {
                  duration: 5.2 + (slot.d % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.25 },
        }}
      >
        <div
          role="button"
          tabIndex={0}
          data-slug={project.slug}
          aria-label={project.name}
          aria-pressed={active}
          onMouseEnter={() => onHover(project.slug)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onHover(project.slug);
            }
          }}
          className={`cursor-pointer rounded-xl outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-aqua ${
            dim && !active ? "opacity-55" : "opacity-100"
          }`}
        >
          <div className={active ? "" : "grayscale transition-[filter] duration-500"}>
            <SiteBrowser project={project} decorative sizes="360px" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileDeck({
  width,
  index,
  openSlug,
  onIndex,
  onToggle,
}: {
  width: number;
  index: number;
  openSlug: string | null;
  onIndex: (index: number) => void;
  onToggle: (slug: string) => void;
}) {
  const project = conceptProjects[index];

  return (
    <div className="px-3 py-4">
      <div
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[7%] pb-2 [scrollbar-width:none]"
        onScroll={(event) => {
          const scroller = event.currentTarget;
          const cards = [...scroller.querySelectorAll<HTMLElement>("[data-card]")];
          const center = scroller.scrollLeft + scroller.clientWidth / 2;
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
          onIndex(best);
        }}
      >
        {conceptProjects.map((item, cardIndex) => {
          const open = openSlug === item.slug;
          return (
            <article
              key={item.slug}
              data-card
              className="w-[84%] shrink-0 snap-center"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => onToggle(item.slug)}
                className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-aqua"
              >
                <div className={cardIndex === index ? "" : "grayscale transition-[filter] duration-500"}>
                  <SiteBrowser project={item} sizes="320px" />
                </div>
              </button>
            </article>
          );
        })}
      </div>
      <div
        className={`mt-4 gap-3 ${width < 460 ? "flex flex-col" : "flex items-end justify-between"}`}
        aria-live="polite"
      >
        <div className="min-w-0">
          <p className="font-mono-label text-[11px] uppercase tracking-[0.14em] text-muted">
            {String(index + 1).padStart(2, "0")} / {String(conceptProjects.length).padStart(2, "0")}
          </p>
          <p className="font-display mt-1 text-xl font-semibold tracking-tight">
            {project.name}
          </p>
          <p className="text-sm text-pretty text-muted">{project.category}</p>
        </div>
        <VisitWebsite project={project} className="self-start" />
      </div>
      {openSlug === project.slug ? (
        <p className="mt-3 max-w-prose text-sm text-ink-soft">{project.descriptor}</p>
      ) : (
        <p className="mt-3 text-sm text-muted">Swipe for the next project. Tap a card for the description.</p>
      )}
    </div>
  );
}
