import Link from "next/link";
import { homeServiceTeasers } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function V2ServicesTeaser() {
  const tiles = homeServiceTeasers.slice(0, 4);

  return (
    <section className="v2-section">
      <div className="v2-container-wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              However it needs to be built.
            </h2>
          </div>
          <Link href="/v2/services" className="btn-secondary shrink-0">
            All services <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.07} variant="scale">
              <TiltCard className="h-full">
                <article className="h-full border border-border bg-surface p-5 transition-colors duration-300 hover:border-aqua/45 hover:bg-white">
                  <p className="font-mono-label text-[10px] tracking-[0.14em] uppercase text-aqua-dark">
                    {service.category}
                  </p>
                  <h3 className="font-display mt-2 text-lg font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                    {service.summary}
                  </p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
