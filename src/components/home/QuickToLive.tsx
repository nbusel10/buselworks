import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const path = ["Idea", "Shape it", "Go live"];

export function QuickToLive({
  contactHref = "/contact",
  containerClassName = "container-bw-wide",
}: {
  contactHref?: string;
  containerClassName?: string;
}) {
  return (
    <section className="border-y border-border bg-charcoal py-14 text-white md:py-16">
      <div className={containerClassName}>
        <Reveal>
          <p className="font-mono-label text-[11px] tracking-[0.16em] uppercase text-aqua">
            Quick path to live
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            From idea to live website — without the long wait.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
            When you know what you need, we can move quickly: shape it together,
            build it, and get it online so real customers can find you — not
            stuck in months of drafts and meetings.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2 font-mono-label text-[11px] tracking-wider text-white/50">
            {path.map((step, i) => (
              <span key={step} className="inline-flex items-center gap-2">
                <span className={i === path.length - 1 ? "text-aqua" : ""}>
                  {step}
                </span>
                {i < path.length - 1 && (
                  <span className="text-aqua/70" aria-hidden>
                    →
                  </span>
                )}
              </span>
            ))}
          </div>

          <Link href={contactHref} className="btn-primary mt-8 inline-flex">
            Start Something <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
