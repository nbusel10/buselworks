"use client";

import type { WorkProject } from "@/data/types";
import type { WorkFilter } from "@/data/work";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { TiltCard } from "@/components/ui/TiltCard";

export function V2ProjectCard({
  project,
  onCategoryClick,
}: {
  project: WorkProject;
  onCategoryClick?: (filter: WorkFilter) => void;
}) {
  const categoryClass =
    "font-mono-label w-fit border-b border-transparent text-left text-[10px] tracking-wider text-aqua-dark uppercase transition-[letter-spacing,border-color] duration-300 group-hover:tracking-[0.18em]";

  return (
    <TiltCard className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-300 hover:border-aqua/50">
        <div className="overflow-hidden">
          <BrowserFrame
            project={project}
            className="rounded-none border-0 shadow-none transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          {onCategoryClick ? (
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
          )}
          <h3 className="font-display mt-1 text-lg font-semibold tracking-tight">
            {project.name}
          </h3>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-3 text-sm"
          >
            View Website <span aria-hidden>→</span>
          </a>
        </div>
      </article>
    </TiltCard>
  );
}
