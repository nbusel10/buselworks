"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { projectHost, type ConceptProject } from "./projects";

type BrowserShotProps = {
  project: ConceptProject;
  color?: boolean;
  scroll?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  url?: ReactNode;
  compact?: boolean;
  framed?: boolean;
  decorative?: boolean;
};

export function BrowserShot({
  project,
  color = true,
  scroll = false,
  className = "",
  sizes = "(max-width: 800px) 88vw, 520px",
  priority = false,
  url,
  compact = false,
  framed = true,
  decorative = false,
}: BrowserShotProps) {
  const reduced = useReducedMotion() === true;
  const picture = (
    <div className={`relative min-h-0 overflow-hidden bg-ivory ${framed ? "flex-1" : `h-full ${className}`}`}>
      <motion.div
        className="absolute inset-x-0 top-0 h-[132%]"
        initial={false}
        animate={{ y: scroll && !reduced ? "-14%" : "0%" }}
        transition={{
          duration: reduced ? 0 : scroll ? 3.8 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={project.image}
          alt={decorative ? "" : `${project.name} website`}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover object-top transition-[filter] duration-500 ${
            color ? "grayscale-0" : "grayscale"
          }`}
        />
      </motion.div>
    </div>
  );

  if (!framed) return picture;

  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_18px_44px_-28px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div
        className={`flex shrink-0 items-center border-b border-border bg-[#f3f1ec] ${
          compact ? "gap-1 px-2 py-1.5" : "gap-1.5 px-2.5 py-2"
        }`}
      >
        <span aria-hidden className={`rounded-full bg-[#ff5f57] ${compact ? "h-1.5 w-1.5" : "h-2 w-2"}`} />
        <span aria-hidden className={`rounded-full bg-[#febc2e] ${compact ? "h-1.5 w-1.5" : "h-2 w-2"}`} />
        <span aria-hidden className={`rounded-full bg-[#28c840] ${compact ? "h-1.5 w-1.5" : "h-2 w-2"}`} />
        <div className="ml-1.5 min-w-0 flex-1 truncate rounded-md bg-white px-2 py-0.5 font-mono-label text-[10px] text-muted">
          {url ?? projectHost(project.url)}
        </div>
      </div>
      {picture}
    </div>
  );
}

export function VisitWebsite({
  project,
  className = "",
}: {
  project: ConceptProject;
  className?: string;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full bg-aqua px-4 text-sm font-semibold text-ink transition hover:bg-aqua-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${className}`}
    >
      View website
      <span aria-hidden>↗</span>
    </a>
  );
}
