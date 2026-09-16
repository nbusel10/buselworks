import { processSteps } from "@/data/process";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { V2FavoriteQuestion } from "@/components/v2/home/V2FavoriteQuestion";

export function V2HowWeWork() {
  return (
    <section id="how-we-work" className="v2-section scroll-mt-24 bg-surface">
      <div className="v2-container-wide">
        <Reveal>
          <p className="eyebrow">The new way to build</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Start with an idea
          </h2>
          <div className="mt-4 max-w-xl space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              AI has completely changed what is possible in web development.
            </p>
            <p>
              Tell us what you want the website to do, how you want it to feel
              and what would make your customers’ lives easier. Then we
              prototype, experiment, design and code until it feels right.
            </p>
          </div>
        </Reveal>

        <ProcessTimeline steps={processSteps} />

        <V2FavoriteQuestion className="font-display mt-16 w-full text-center text-2xl font-medium leading-snug tracking-tight sm:mt-20 sm:text-3xl md:text-4xl" />
      </div>
    </section>
  );
}
