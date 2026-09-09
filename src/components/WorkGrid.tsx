"use client";

import { useMemo, useState } from "react";
import { workFilters, workProjects, type WorkFilter } from "@/data/work";
import { WorkCard } from "@/components/ui/WorkCard";

export function WorkGrid() {
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

      {filter === "ALL" ? (
        <div className="mt-12 space-y-16">
          {workFilters
            .filter((f) => f !== "ALL")
            .map((group) => {
              const items = workProjects.filter((p) => p.filterGroup === group);
              if (!items.length) return null;
              return (
                <div key={group}>
                  <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {group}
                  </h2>
                  <div className="mt-6 grid gap-10 md:grid-cols-2">
                    {items.map((project, i) => (
                      <WorkCard
                        key={project.slug}
                        project={project}
                        large={i === 0 && items.length > 2}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {filtered.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
