"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { VisitWebsite } from "./BrowserShot";
import { SiteBrowser } from "./ProportionedBrowser";
import { conceptProjects, padIndex } from "./projects";
import { useConceptActivity } from "./useConceptActivity";

export function Orbit() {
  const { ref, motionOn, wide, width } = useConceptActivity<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const dragX = useMotionValue(0);
  const count = conceptProjects.length;
  const project = conceptProjects[index];
  const span = width >= 1100 ? 280 : wide ? 220 : Math.max(width * 0.42, 120);
  const cardWidth = width >= 1100 ? 520 : wide ? 420 : Math.min(Math.max(width - 48, 240), 320);
  const frameHeight = Math.round(cardWidth * (900 / 1440) + 42);

  useEffect(() => {
    if (!motionOn || hold) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 8000);
    return () => window.clearInterval(id);
  }, [motionOn, hold, count]);

  function go(direction: 1 | -1) {
    setIndex((current) => (current + direction + count) % count);
  }

  function offsetFor(itemIndex: number) {
    let delta = itemIndex - index;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    return delta;
  }

  return (
    <div ref={ref} className="bg-ivory px-3 py-4 sm:px-5">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Project orbit"
        tabIndex={0}
        className="outline-none focus-visible:ring-2 focus-visible:ring-aqua"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setHold(false);
        }}
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
        <motion.div
          className="relative mx-auto cursor-grab overflow-hidden active:cursor-grabbing"
          style={{ height: frameHeight + 56, x: dragX }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          dragDirectionLock
          onDragEnd={(_, info) => {
            animate(dragX, 0, { type: "spring", stiffness: 320, damping: 32 });
            if (info.offset.x < -36 || info.velocity.x < -400) go(1);
            else if (info.offset.x > 36 || info.velocity.x > 400) go(-1);
          }}
        >
          <div
            className="relative h-full"
            style={{ perspective: wide ? 1400 : 900 }}
          >
          {conceptProjects.map((item, itemIndex) => {
            const offset = offsetFor(itemIndex);
            const visible = Math.abs(offset) <= (wide ? 2 : 1);
            return (
              <motion.button
                key={item.slug}
                type="button"
                aria-label={`${item.name}, ${item.category}`}
                aria-current={offset === 0 ? "true" : undefined}
                tabIndex={visible ? 0 : -1}
                onClick={() => {
                  if (itemIndex !== index) setIndex(itemIndex);
                }}
                className="absolute top-6 outline-none focus-visible:ring-2 focus-visible:ring-aqua"
                style={{
                  width: cardWidth,
                  left: "50%",
                  zIndex: 10 - Math.abs(offset),
                  transformStyle: "preserve-3d",
                  pointerEvents: visible ? "auto" : "none",
                }}
                initial={false}
                animate={{
                  x: offset * span - cardWidth / 2,
                  rotateY: offset * (wide ? -36 : -14),
                  z: wide ? -Math.abs(offset) * 140 : -Math.abs(offset) * 30,
                  scale: offset === 0 ? 1 : wide ? 0.76 : 0.9,
                  opacity: visible ? (offset === 0 ? 1 : 0.92) : 0,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              >
                <div className={offset === 0 ? "" : "grayscale"} style={{ transformStyle: "preserve-3d" }}>
                  <SiteBrowser
                    project={item}
                    decorative
                    sizes={`${Math.round(cardWidth)}px`}
                  />
                </div>
              </motion.button>
            );
          })}
          </div>
        </motion.div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div aria-live="polite">
          <p className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-aqua-dark">
            {padIndex(index)} / {padIndex(count - 1)}
          </p>
          <p className="font-display mt-1 text-2xl font-semibold tracking-tight">{project.name}</p>
          <p className="text-sm text-muted">{project.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <OrbitButton label="Previous project" onClick={() => go(-1)}>
            ←
          </OrbitButton>
          <OrbitButton label="Next project" onClick={() => go(1)}>
            →
          </OrbitButton>
          <VisitWebsite project={project} />
        </div>
      </div>
      <p className="mt-3 max-w-xl text-sm text-ink-soft">{project.descriptor}</p>
    </div>
  );
}

function OrbitButton({
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
