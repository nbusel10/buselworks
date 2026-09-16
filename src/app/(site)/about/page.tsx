import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Hi. I’m Nancy — the person behind Buselworks. Intentionally small, highly capable, and collaborative.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-28 md:pt-16">
      <div className="container-bw-wide grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-[65%] max-w-sm overflow-hidden rounded-2xl bg-charcoal sm:max-w-md lg:max-w-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(39,199,205,0.35),transparent_55%)]" />
            <Image
              src="/about/nancy-buselmeier-cutout.png"
              alt="Nancy Buselmeier, founder of Buselworks"
              fill
              priority
              className="object-contain object-[center_15%] p-3 pb-20"
              sizes="(max-width: 1024px) 18rem, 28vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="font-display text-3xl font-semibold text-white">
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
          <h1
            id="nancy"
            className="font-display mt-4 text-[2.15rem] font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            Hi. I’m Nancy.
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
            <p>I’m the person behind Buselworks.</p>
            <p>
              I’ve spent years designing and building websites for small
              businesses — first with WordPress, now with modern tools and AI
              alongside human judgment.
            </p>
            <p>
              We still handle the unglamorous stuff: domains, hosting, email,
              analytics, SEO, and what happens after launch.
            </p>
            <p>
              Buselworks is intentionally small. You work directly with us. We
              figure it out together.
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
