import type { Metadata } from "next";
import Link from "next/link";
import { ServicesGrid } from "@/components/ServicesGrid";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom website design, development, AI-assisted builds, WordPress, Shopify, hosting, SEO, and support — scoped around what your business actually needs.",
};

export default function ServicesPage() {
  return (
    <div className="pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="container-bw-wide">
        <p className="eyebrow">Services</p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          However it needs to be built.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          No rigid packages. Each project is scoped around what the business
          actually needs — and the best way to build it.
        </p>

        <div className="mt-14">
          <ServicesGrid items={services} />
        </div>

        <div className="mt-12 rounded-2xl bg-charcoal px-8 py-10 text-white md:px-12 md:py-14">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Tell us what you want to build.
            <br />
            We’ll figure out the best way to build it.
          </h2>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Start Something <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
