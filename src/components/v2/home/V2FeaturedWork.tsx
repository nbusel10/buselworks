import Link from "next/link";
import { workProjects } from "@/data/work";
import { Reveal } from "@/components/ui/Reveal";
import { WorkRow } from "@/components/ui/WorkRow";

export function V2FeaturedWork() {
  const featured = workProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="v2-section bg-surface">
      <div className="v2-container-wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Work</p>
            <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Built differently for every business.
            </h2>
          </div>
          <Link href="/v2/work" className="btn-secondary shrink-0">
            View all <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <div className="mt-8 flex flex-col">
          {featured.map((project, i) => (
            <div
              key={project.slug}
              className={i > 0 ? "mt-9 border-t border-border pt-9 md:mt-12 md:pt-12" : ""}
            >
              <WorkRow project={project} index={i} workBasePath="/v2/work" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
