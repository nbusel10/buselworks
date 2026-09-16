import type { Metadata } from "next";
import Link from "next/link";
import { ServicesGrid } from "@/components/ServicesGrid";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Custom website design, development, AI-assisted builds, WordPress, Shopify, hosting, SEO, and support — scoped around what you need.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="v2-section pt-10 md:pt-14">
      <div className="v2-container-wide">
        <p className="eyebrow">Services</p>
        <h1 className="font-display mt-3 max-w-2xl text-[2.15rem] font-semibold tracking-tight sm:text-5xl">
          However it needs to be built.
        </h1>
        <p className="mt-3 max-w-xl text-base text-ink-soft">
          No rigid packages. Each project is scoped around what the business
          actually needs.
        </p>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Have a clear idea and want it live sooner? We can take it from
          conversation to a website people can actually visit.
        </p>

        <div className="mt-12">
          <ServicesGrid items={services} />
        </div>

        <div className="mt-12 rounded-2xl bg-charcoal px-6 py-8 text-white md:px-10 md:py-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Tell us what you want to build.
          </h2>
          <Link href="/contact" className="btn-primary mt-6 inline-flex">
            Start Something <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
