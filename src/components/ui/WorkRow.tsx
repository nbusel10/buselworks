import Link from "next/link";
import type { WorkProject } from "@/data/types";
import { workFilterHref, type WorkFilter } from "@/data/work";
import { BrowserFrame } from "./BrowserFrame";
import { Reveal } from "./Reveal";

/**
 * Full-width featured project: screenshot on one side, details on the other,
 * alternating sides down the stack. The screenshot reveals its color on scroll.
 */
export function WorkRow({
  project,
  index = 0,
  workBasePath = "/work",
}: {
  project: WorkProject;
  index?: number;
  workBasePath?: string;
}) {
  const flip = index % 2 === 1;

  return (
    <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
      <div className={`md:col-span-6 ${flip ? "md:order-2" : ""}`}>
        <BrowserFrame project={project} reveal />
      </div>

      <Reveal
        className={`md:col-span-6 ${flip ? "md:order-1" : ""}`}
        delay={0.08}
      >
        <Link
          href={workFilterHref(workBasePath, project.filterGroup as WorkFilter)}
          aria-label={`View ${project.categoryLabel} work`}
          className="font-mono-label inline-block border-b border-transparent text-[10px] tracking-wider text-aqua-dark uppercase transition-colors hover:border-aqua"
        >
          [{project.categoryLabel}]
        </Link>
        <h3 className="font-display mt-2 text-xl font-semibold tracking-tight md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted md:text-base">
          {project.descriptor}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-4 text-sm"
        >
          View Website <span aria-hidden>→</span>
        </a>
      </Reveal>
    </div>
  );
}
