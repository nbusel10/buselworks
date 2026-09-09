import Link from "next/link";
import { workProjects } from "@/data/work";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/ui/WorkCard";

export function FeaturedWork() {
  const featured = workProjects.filter((p) => p.featured).slice(0, 5);

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

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05} className={i === 0 ? "md:col-span-2" : ""}>
              <WorkCard project={project} large={i === 0} />
            </Reveal>
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
