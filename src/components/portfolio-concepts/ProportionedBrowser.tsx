"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { projectHost, type ConceptProject } from "./projects";

type FramedProject = Pick<ConceptProject, "name" | "url" | "image">;

const frameRatio = 900 / 1440;

export function SiteBrowser({
  project,
  priority = false,
  sizes = "(max-width: 800px) 92vw, 736px",
  decorative = false,
  children,
}: {
  project: FramedProject;
  priority?: boolean;
  sizes?: string;
  decorative?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_22px_50px_-32px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-1.5 border-b border-border bg-[#f3f1ec] px-3 py-2">
        <span aria-hidden className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="h-2 w-2 rounded-full bg-[#28c840]" />
        <div className="ml-2 min-w-0 flex-1 truncate rounded-md bg-white px-2 py-1 font-mono-label text-[10px] text-muted">
          {projectHost(project.url)}
        </div>
      </div>
      <ShotFrame project={project} priority={priority} sizes={sizes} decorative={decorative} />
      {children}
    </div>
  );
}

export function ShotFrame({
  project,
  priority = false,
  sizes = "(max-width: 800px) 92vw, 736px",
  fill = false,
  decorative = false,
}: {
  project: FramedProject;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  decorative?: boolean;
}) {
  const reduced = useReducedMotion() === true;
  const [maxShift, setMaxShift] = useState(0);
  const [shift, setShift] = useState(0);
  const scrollable = maxShift > 0.5;
  const alt = decorative ? "" : `${project.name} website`;

  function onLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    if (!image.naturalWidth || !image.naturalHeight) return;
    const natural = image.naturalHeight / image.naturalWidth;
    if (natural > frameRatio + 0.04) {
      setMaxShift((1 - frameRatio / natural) * 100);
    } else {
      setMaxShift(0);
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!scrollable || reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const next = (event.clientY - bounds.top) / bounds.height;
    setShift(Math.min(1, Math.max(0, next)));
  }

  return (
    <div
      className={`overflow-hidden bg-ivory ${fill ? "absolute inset-0" : "relative w-full"}`}
      style={fill ? undefined : { aspectRatio: "1440 / 900" }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setShift(0)}
    >
      {scrollable ? (
        // A taller capture stays full width and scrolls inside the 16:10 viewport.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={alt}
          draggable={false}
          className="absolute left-0 top-0 h-auto w-full max-w-none"
          style={{ transform: `translate3d(0, -${(reduced ? 0 : shift) * maxShift}%, 0)` }}
        />
      ) : (
        <Image
          src={project.image}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          draggable={false}
          onLoad={onLoad}
          className="object-contain object-top"
        />
      )}
      {scrollable ? (
        <p className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 font-mono-label text-[10px] uppercase tracking-[0.12em] text-muted">
          Move to scroll
        </p>
      ) : null}
    </div>
  );
}

export function MiniShot({ project }: { project: FramedProject }) {
  return (
    <span className="block overflow-hidden rounded-lg border border-black/10 bg-white">
      <span className="flex items-center gap-1 border-b border-border bg-[#f3f1ec] px-1.5 py-1">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="relative block aspect-[1440/900] bg-ivory">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="120px"
          draggable={false}
          className="object-contain object-top"
        />
      </span>
    </span>
  );
}

export function ArrowButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
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

export function useHorizontalSwipe(onSwipe: (direction: -1 | 1) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onPointerDown(event: ReactPointerEvent<HTMLElement>) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      start.current = { x: event.clientX, y: event.clientY };
    },
    onPointerUp(event: ReactPointerEvent<HTMLElement>) {
      if (!start.current) return;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
      onSwipe(dx < 0 ? 1 : -1);
    },
    onPointerCancel() {
      start.current = null;
    },
  };
}
