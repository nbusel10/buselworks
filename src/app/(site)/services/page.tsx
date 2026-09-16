import type { Metadata } from "next";
import Link from "next/link";
import { ServicesGrid } from "@/components/ServicesGrid";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Custom website design, development, AI-assisted builds, WordPress, Shopify, hosting, SEO, and support — scoped around what your business actually needs.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-28 md:pt-16">
      <div className="container-bw-wide">
        <p className="eyebrow">Services</p>
        <h1 className="font-display mt-4 max-w-3xl text-[2.15rem] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
          However it needs to be built.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          No rigid packages. Each project is scoped around what the business
          actually needs — and the best way to build it.
        </p>
        <p className="mt-3 max-w-xl text-sm text-muted md:text-base">
          Have a clear idea and want it live sooner? We can take it from
          conversation to a website people can actually visit.
        </p>

        <div className="mt-14">
          <ServicesGrid items={services} />
        </div>

        <div className="mt-12 rounded-2xl bg-charcoal px-6 py-8 text-white sm:px-8 sm:py-10 md:px-12 md:py-14">
          <h2 className="font-display text-[1.65rem] font-semibold tracking-tight sm:text-3xl md:text-4xl">
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
