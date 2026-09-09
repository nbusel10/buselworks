import { Reveal } from "@/components/ui/Reveal";

const agencySteps = [
  "Client",
  "Account Manager",
  "Project Manager",
  "Designer",
  "Developer",
  "Website",
];

const callouts = [
  {
    title: "Smart Builds",
    copy: "Technology chosen around what you actually need.",
  },
  {
    title: "Room to Grow",
    copy: "Build what you need today without boxing yourself in tomorrow.",
  },
  {
    title: "A Human You Can Call",
    copy: "When something breaks or you have an idea, you know who to contact.",
  },
];

export function NotAnAgency() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-bw-wide">
        <Reveal>
          <p className="eyebrow">Why Buselworks</p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Agency-level thinking.
            <br />
            Without the agency maze.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            You work directly with the person designing and building your
            website. No account manager translating what you said to a project
            manager who translates it to a designer who eventually sends it to a
            developer. That means fewer meetings, faster decisions and a website
            that actually feels like the conversations we had about your
            business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-8">
              <p className="font-mono-label text-xs tracking-widest text-muted">
                Traditional agency
              </p>
              <ol className="mt-6 space-y-0">
                {agencySteps.map((step, i) => (
                  <li key={step} className="flex flex-col items-start">
                    <span className="rounded-full border border-border px-4 py-2 text-sm text-ink-soft">
                      {step}
                    </span>
                    {i < agencySteps.length - 1 && (
                      <span
                        className="ml-6 py-1 text-muted"
                        aria-hidden
                      >
                        ↓
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-aqua/40 bg-charcoal p-6 text-white md:p-8">
              <div>
                <p className="font-mono-label text-xs tracking-widest text-aqua">
                  Buselworks
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink">
                    You
                  </span>
                  <span className="text-aqua" aria-hidden>
                    ↔
                  </span>
                  <span className="rounded-full bg-aqua px-4 py-2 text-sm font-semibold text-ink">
                    Us
                  </span>
                </div>
                <p className="mt-4 ml-2 text-white/45" aria-hidden>
                  ↓
                </p>
                <span className="mt-1 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm">
                  Website
                </span>
              </div>
              <p className="mt-10 font-display text-2xl font-medium tracking-tight md:text-3xl">
                High-end builds.
                <br />
                Small-business reality.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {callouts.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="border-t border-border-strong pt-5">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                  {item.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
