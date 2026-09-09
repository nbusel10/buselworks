import { CloseCta } from "@/components/home/CloseCta";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { HowWeWork } from "@/components/home/HowWeWork";
import { NotAnAgency } from "@/components/home/NotAnAgency";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { TechHosting } from "@/components/home/TechHosting";
import { VibeCoding } from "@/components/home/VibeCoding";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowWeWork />
      <VibeCoding />
      <ServicesTeaser />
      <FeaturedWork />
      <NotAnAgency />
      <TechHosting />
      <CloseCta />
    </>
  );
}
