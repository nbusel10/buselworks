"use client";

import { motion } from "framer-motion";
import type { WorkProject } from "@/data/types";
import type { WorkFilter } from "@/data/work";
import { BrowserFrame } from "./BrowserFrame";
import { TiltCard } from "./TiltCard";

const categoryClass =
  "font-mono-label inline-block border-b border-transparent text-[10px] tracking-wider text-aqua-dark uppercase transition-colors";

export function WorkCard({
  project,
  large = false,
  onCategoryClick,
}: {
  project: WorkProject;
  large?: boolean;
  onCategoryClick?: (filter: WorkFilter) => void;
}) {
  const categoryLabel = onCategoryClick ? (
    <button
      type="button"
      onClick={() => onCategoryClick(project.filterGroup as WorkFilter)}
      aria-label={`Filter by ${project.categoryLabel}`}
      className={`${categoryClass} hover:border-aqua`}
    >
      [{project.categoryLabel}]
    </button>
  ) : (
    <span className={categoryClass}>[{project.categoryLabel}]</span>
  );

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
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            {categoryLabel}
            <h3 className="font-display mt-2 text-xl font-semibold tracking-tight md:text-2xl">
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
        {onCategoryClick ? (
          <motion.div
            variants={{
              rest: { opacity: 0, y: 10, scale: 0.96 },
              hover: { opacity: 1, y: 0, scale: 1 },
            }}
            className="pointer-events-none absolute inset-x-0 top-0 hidden aspect-[16/10] items-end justify-start p-5 md:flex"
          >
            <button
              type="button"
              onClick={() => onCategoryClick(project.filterGroup as WorkFilter)}
              aria-label={`Filter by ${project.categoryLabel}`}
              className={`${categoryClass} pointer-events-auto bg-ivory/80 px-1 backdrop-blur-sm hover:border-aqua`}
            >
              [{project.categoryLabel}]
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={{
              rest: { opacity: 0, y: 10, scale: 0.96 },
              hover: { opacity: 1, y: 0, scale: 1 },
            }}
            className="pointer-events-none absolute inset-x-0 top-0 hidden aspect-[16/10] items-end justify-start p-5 md:flex"
          >
            <span className={`${categoryClass} bg-ivory/80 px-1 backdrop-blur-sm`}>
              [{project.categoryLabel}]
            </span>
          </motion.div>
        )}
      </motion.article>
    </TiltCard>
  );
}
