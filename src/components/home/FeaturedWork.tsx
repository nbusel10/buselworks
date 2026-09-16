import Link from "next/link";
import { workProjects } from "@/data/work";
import { Reveal } from "@/components/ui/Reveal";
import { WorkRow } from "@/components/ui/WorkRow";

export function FeaturedWork() {
  const featured = workProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-bw-wide">
        <Reveal>
          <p className="eyebrow">Featured work</p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Built differently because every business is different.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-soft md:text-lg">
            Restaurants. Travel. Fitness. Healthcare. Artists. Nonprofits.
            Beauty. Insurance. We don’t specialize in making every website look
            the same.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col">
          {featured.map((project, i) => (
            <div
              key={project.slug}
              className={i > 0 ? "mt-10 border-t border-border pt-10 md:mt-14 md:pt-14" : ""}
            >
              <WorkRow project={project} index={i} workBasePath="/work" />
            </div>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link href="/work" className="btn-primary">
            View All Work <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
