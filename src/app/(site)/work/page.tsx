import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Different businesses. Different audiences. Different solutions. Explore websites designed and built by Buselworks.",
};

export default function WorkPage() {
  return (
    <div className="pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="container-bw-wide">
        <p className="eyebrow">Portfolio</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          The Work
        </h1>
        <p className="mt-4 max-w-xl text-base text-ink-soft md:text-lg">
          Different businesses. Different audiences. Different solutions.
        </p>
        <div className="mt-12">
          <WorkGrid />
        </div>
      </div>
    </div>
  );
}
