import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hi. I’m Nancy. Buselworks is intentionally small, highly capable, and collaborative.",
};

export default function V2AboutPage() {
  return (
    <div className="v2-section pt-10 md:pt-14">
      <div className="v2-container-wide grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-2xl bg-charcoal">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(39,199,205,0.3),transparent_55%)]" />
          <div className="absolute inset-0 flex flex-col justify-end p-7">
            <p className="font-mono-label text-xs tracking-widest text-aqua">
              Photo coming soon
            </p>
            <p className="font-display mt-2 text-2xl font-semibold text-white">
              Nancy Buselmeier
            </p>
            <p className="mt-1 text-sm text-white/60">
              Founder · Designer · Developer
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow">About</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Hi. I’m Nancy.
          </h1>
          <div className="mt-5 max-w-xl space-y-3 text-base leading-relaxed text-ink-soft">
            <p>
              I’ve spent years designing and building websites for small
              businesses — first with WordPress, now with modern tools and AI
              alongside human judgment.
            </p>
            <p>
              I still handle the unglamorous stuff: domains, hosting, email,
              analytics, SEO, and what happens after launch.
            </p>
            <p>Buselworks is intentionally small. You talk to me.</p>
          </div>
          <Link href="/v2/contact" className="btn-primary mt-7 inline-flex">
            Let’s Build Something <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
