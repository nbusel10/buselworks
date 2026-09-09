import { V2FeaturedWork } from "@/components/v2/home/V2FeaturedWork";
import { V2Hero } from "@/components/v2/home/V2Hero";
import { V2HowWeWork } from "@/components/v2/home/V2HowWeWork";
import { V2ServicesTeaser } from "@/components/v2/home/V2ServicesTeaser";
import { V2WhyClose } from "@/components/v2/home/V2WhyClose";

export default function V2HomePage() {
  return (
    <>
      <V2Hero />
      <V2HowWeWork />
      <V2ServicesTeaser />
      <V2FeaturedWork />
      <V2WhyClose />
    </>
  );
}
