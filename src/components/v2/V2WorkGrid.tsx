"use client";

import { useMemo, useState } from "react";
import { workFilters, workProjects, type WorkFilter } from "@/data/work";
import { V2ProjectCard } from "@/components/v2/V2ProjectCard";

export function V2WorkGrid() {
  const [filter, setFilter] = useState<WorkFilter>("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return workProjects;
    return workProjects.filter((p) => p.filterGroup === filter);
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {workFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`font-mono-label rounded-full px-3 py-1.5 text-[10px] tracking-wider transition-colors ${
              filter === item
                ? "bg-charcoal text-white"
                : "border border-border text-muted hover:border-aqua hover:text-ink"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <V2ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
