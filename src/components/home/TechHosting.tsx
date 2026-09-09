import { hostingChecklist, techPills } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";

export function TechHosting() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-bw-wide grid gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Flexible technology</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            We’re not married to the platform.
            <br />
            We’re committed to the outcome.
          </h2>
          <p className="mt-5 max-w-md text-base text-ink-soft">
            The platform should fit the project — not the other way around.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {techPills.map((pill) => (
              <span
                key={pill}
                className="font-mono-label rounded-full border border-border px-3 py-1.5 text-[10px] tracking-wider text-ink-soft"
              >
                {pill}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow">Hosting + the boring stuff</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            We handle the stuff you shouldn’t have to think about.
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {hostingChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="mt-0.5 text-aqua-dark" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Because building the website is only part of having a website.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
