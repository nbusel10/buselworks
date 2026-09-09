import Link from "next/link";
import { workProjects } from "@/data/work";
import { V2ProjectCard } from "@/components/v2/V2ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

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

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08} variant="scale">
              <V2ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
