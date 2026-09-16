import type { Metadata } from "next";
import { CloseCta } from "@/components/home/CloseCta";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { HowWeWork } from "@/components/home/HowWeWork";
import { NotAnAgency } from "@/components/home/NotAnAgency";
import { QuickToLive } from "@/components/home/QuickToLive";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { TechHosting } from "@/components/home/TechHosting";
import { VibeCoding } from "@/components/home/VibeCoding";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowWeWork />
      <QuickToLive contactHref="/contact" />
      <VibeCoding />
      <ServicesTeaser />
      <FeaturedWork />
      <NotAnAgency />
      <TechHosting />
      <CloseCta />
    </>
  );
}
