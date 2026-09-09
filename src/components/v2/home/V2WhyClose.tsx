import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function V2WhyClose() {
  return (
    <section className="v2-section">
      <div className="v2-container-wide">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal variant="left">
            <p className="eyebrow">Why Buselworks</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              You ↔ Us → Website
            </h2>
            <p className="mt-3 max-w-lg text-base text-ink-soft">
              Agency-level thinking without the agency maze. You work directly
              with the person designing and building your site.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink-soft">
              <li>
                <span className="font-semibold text-ink">Smart builds</span> —
                tech chosen for what you need
              </li>
              <li>
                <span className="font-semibold text-ink">Room to grow</span> —
                built for today, open for tomorrow
              </li>
              <li>
                <span className="font-semibold text-ink">A human you can call</span>{" "}
                — when something breaks or you have an idea
              </li>
            </ul>
            <p className="mt-5 text-sm text-muted">
              Hosting, email, SEO, analytics, and maintenance available —{" "}
              <Link href="/v2/services" className="link-aqua">
                see services
              </Link>
              .
            </p>
          </Reveal>

          <Reveal variant="scale" delay={0.1}>
            <div className="rounded-2xl bg-charcoal px-7 py-8 text-white transition-transform duration-300 hover:-translate-y-1 md:px-8 md:py-10">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Have a “what if we…” idea?
              </h2>
              <p className="mt-3 text-sm text-white/65">
                It doesn’t have to be figured out yet.
              </p>
              <Link href="/v2/contact" className="btn-primary mt-6 inline-flex">
                Start Something <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
