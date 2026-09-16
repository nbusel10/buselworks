import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Have one of those “what if we…” ideas? Tell us about it — it doesn’t have to be completely figured out yet.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-28 md:pt-16">
      <div className="container-bw-wide grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="font-display mt-4 text-[2.15rem] font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Have one of those
            <br />
            “what if we…” ideas?
          </h1>
          <p className="mt-5 max-w-md text-base text-ink-soft md:text-lg">
            Tell us about it. It doesn’t have to be completely figured out yet.
          </p>
          <a
            href="mailto:info@buselworks.com"
            className="mt-8 inline-block text-lg text-aqua-dark transition-colors hover:text-ink"
          >
            info@buselworks.com
          </a>
          <p className="mt-6 text-sm text-muted">
            Phoenix, Arizona / Working Everywhere
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
