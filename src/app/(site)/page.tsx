import type { Metadata } from "next";
import { V2FeaturedWork } from "@/components/v2/home/V2FeaturedWork";
import { V2Hero } from "@/components/v2/home/V2Hero";
import { V2HowWeWork } from "@/components/v2/home/V2HowWeWork";
import { V2TechHosting } from "@/components/v2/home/V2TechHosting";
import { V2VibeCoding } from "@/components/v2/home/V2VibeCoding";
import { V2WhyClose } from "@/components/v2/home/V2WhyClose";
import { QuickToLive } from "@/components/home/QuickToLive";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <V2Hero />
      <V2HowWeWork />
      <QuickToLive contactHref="/contact" containerClassName="v2-container-wide" />
      <V2VibeCoding />
      <V2TechHosting />
      <V2FeaturedWork />
      <V2WhyClose />
    </>
  );
}
