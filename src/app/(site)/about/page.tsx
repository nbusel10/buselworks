import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hi. I’m Nancy. Buselworks is a boutique web design and development studio — intentionally small, highly capable, and collaborative.",
};

export default function AboutPage() {
  return (
    <div className="pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="container-bw-wide grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-charcoal">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(39,199,205,0.35),transparent_55%)]" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="font-mono-label text-xs tracking-widest text-aqua">
                Photo coming soon
              </p>
              <p className="font-display mt-3 text-3xl font-semibold text-white">
                Nancy Buselmeier
              </p>
              <p className="mt-2 text-sm text-white/65">
                Founder · Designer · Developer
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow">About</p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Hi. I’m Nancy.
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
            <p>
              I’ve spent years designing, building and managing websites for
              small businesses. For a long time, that meant WordPress.
            </p>
            <p>
              Then AI changed the way websites could be designed and developed —
              and I jumped in. Today I combine design experience, web
              development, AI tools and a willingness to experiment until we get
              something that feels right.
            </p>
            <p>
              I still care about all the unglamorous things too: domains,
              hosting, email, analytics, SEO, mobile responsiveness and what
              happens after the website launches.
            </p>
            <p>
              Buselworks is intentionally small. You talk to me. We figure it
              out together.
            </p>
          </div>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Let’s Build Something <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
