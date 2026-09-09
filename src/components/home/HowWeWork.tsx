import { processSteps } from "@/data/process";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal } from "@/components/ui/Reveal";

export function HowWeWork() {
  return (
    <section id="how-we-work" className="scroll-mt-24 bg-surface py-20 md:py-28">
      <div className="container-bw-wide">
        <Reveal>
          <p className="eyebrow">The new way to build</p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Websites don’t have to start with a template anymore.
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
            <p>
              AI has completely changed what is possible in web development.
              Instead of starting with a theme and trying to force your business
              into it, we can start with an idea.
            </p>
            <p>
              Tell us what you want the website to do, how you want it to feel
              and what would make your customers’ lives easier. Then we
              prototype, experiment, design and code until it feels right.
            </p>
          </div>
        </Reveal>

        <ProcessTimeline steps={processSteps} />

        <Reveal className="mt-16 md:mt-20" variant="blur" delay={0.1}>
          <blockquote className="font-display max-w-3xl text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
            “What if the website could…?” is one of our favorite questions.
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
