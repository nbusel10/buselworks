import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have one of those “what if we…” ideas? Tell us about it.",
};

export default function V2ContactPage() {
  return (
    <div className="v2-section pt-10 md:pt-14">
      <div className="v2-container-wide grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Have a “what if we…” idea?
          </h1>
          <p className="mt-4 max-w-md text-base text-ink-soft">
            Tell us about it. It doesn’t have to be completely figured out yet.
          </p>
          <a
            href="mailto:nancy@buselworks.com"
            className="mt-6 inline-block text-aqua-dark transition-colors hover:text-ink"
          >
            nancy@buselworks.com
          </a>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
