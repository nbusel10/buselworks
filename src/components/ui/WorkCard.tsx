"use client";

import { motion } from "framer-motion";
import type { WorkProject } from "@/data/types";
import { BrowserFrame } from "./BrowserFrame";
import { TiltCard } from "./TiltCard";

export function WorkCard({
  project,
  large = false,
}: {
  project: WorkProject;
  large?: boolean;
}) {
  return (
    <TiltCard className={large ? "md:col-span-2" : ""}>
      <motion.article
        className="group relative"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <div className="overflow-hidden rounded-xl shadow-[0_0_0_0_rgba(39,199,205,0)] transition-shadow duration-300 group-hover:shadow-[0_20px_50px_-28px_rgba(39,199,205,0.45)]">
          <BrowserFrame
            project={project}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">{project.categoryLabel}</p>
            <h3 className="font-display mt-1 text-xl font-semibold tracking-tight md:text-2xl">
              {project.name}
            </h3>
            <p className="mt-1 max-w-md text-sm text-muted">{project.descriptor}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            View Website <span aria-hidden>→</span>
          </a>
        </div>
        <motion.div
          variants={{
            rest: { opacity: 0, y: 10, scale: 0.96 },
            hover: { opacity: 1, y: 0, scale: 1 },
          }}
          className="pointer-events-none absolute inset-x-0 top-0 hidden aspect-[16/10] items-end justify-start p-5 md:flex"
        >
          <span className="rounded-full bg-charcoal/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            {project.categoryLabel}
          </span>
        </motion.div>
      </motion.article>
    </TiltCard>
  );
}
