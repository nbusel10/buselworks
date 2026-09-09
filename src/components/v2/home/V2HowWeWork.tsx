import { processSteps } from "@/data/process";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal } from "@/components/ui/Reveal";

export function V2HowWeWork() {
  return (
    <section id="how-we-work" className="v2-section scroll-mt-24 bg-surface">
      <div className="v2-container-wide">
        <Reveal>
          <p className="eyebrow">How we work</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Start with the idea — not a template.
          </h2>
          <p className="mt-3 max-w-xl text-base text-ink-soft">
            Tell us what you want the site to do and how it should feel. We
            prototype, refine, and build until it’s right.
          </p>
        </Reveal>

        <ProcessTimeline steps={processSteps} compact />
      </div>
    </section>
  );
}
