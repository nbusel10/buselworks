import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactTitle } from "@/components/ContactTitle";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Have one of those “what if we…” ideas? Tell us about it.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="v2-section pt-10 md:pt-14">
      <div className="v2-container-wide grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <ContactTitle className="font-display mt-3 text-[2.15rem] font-semibold tracking-tight sm:text-5xl" />
          <p className="mt-4 max-w-md text-base text-ink-soft">
            Tell us about it. It doesn’t have to be completely figured out yet.
          </p>
          <a
            href="mailto:info@buselworks.com"
            className="mt-6 inline-block text-aqua-dark transition-colors hover:text-ink"
          >
            info@buselworks.com
          </a>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
