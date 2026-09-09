import Link from "next/link";
import { homeServiceTeasers } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function ServicesTeaser() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-bw-wide">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              However it needs to be built.
            </h2>
          </div>
          <Link href="/services" className="btn-secondary shrink-0">
            All services <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {homeServiceTeasers.map((service, i) => {
            const spans = [
              "md:col-span-3",
              "md:col-span-3",
              "md:col-span-2",
              "md:col-span-2",
              "md:col-span-2",
            ];
            return (
              <Reveal
                key={service.id}
                delay={i * 0.06}
                variant={i % 2 === 0 ? "scale" : "up"}
                className={`${spans[i] ?? "md:col-span-2"}`}
              >
                <TiltCard className="h-full">
                  <article className="flex h-full flex-col justify-between border border-border bg-surface p-6 transition-colors duration-300 hover:border-aqua/50 hover:bg-white md:p-8">
                    <div>
                      <p className="font-mono-label text-[10px] tracking-[0.14em] uppercase text-aqua-dark">
                        {service.category}
                      </p>
                      <h3 className="font-display mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                        {service.summary}
                      </p>
                    </div>
                    <span className="mt-6 font-mono-label text-[10px] tracking-widest text-aqua-dark">
                      0{i + 1}
                    </span>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
