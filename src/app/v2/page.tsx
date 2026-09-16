import type { Metadata } from "next";
import { V2FeaturedWork } from "@/components/v2/home/V2FeaturedWork";
import { V2Hero } from "@/components/v2/home/V2Hero";
import { V2HowWeWork } from "@/components/v2/home/V2HowWeWork";
import { V2TechHosting } from "@/components/v2/home/V2TechHosting";
import { V2VibeCoding } from "@/components/v2/home/V2VibeCoding";
import { V2WhyClose } from "@/components/v2/home/V2WhyClose";
import { QuickToLive } from "@/components/home/QuickToLive";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Alternate design",
  description:
    "A simpler alternate design for Buselworks — custom websites with modern tools, AI, and human judgment.",
  path: "/v2",
  index: false,
  canonicalPath: "/",
});

export default function V2HomePage() {
  return (
    <>
      <V2Hero />
      <V2HowWeWork />
      <QuickToLive contactHref="/v2/contact" containerClassName="v2-container-wide" />
      <V2VibeCoding />
      <V2TechHosting />
      <V2FeaturedWork />
      <V2WhyClose />
    </>
  );
}
