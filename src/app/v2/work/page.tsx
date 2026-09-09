import type { Metadata } from "next";
import { V2WorkGrid } from "@/components/v2/V2WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Different businesses. Different audiences. Different solutions.",
};

export default function V2WorkPage() {
  return (
    <div className="v2-section pt-10 md:pt-14">
      <div className="v2-container-wide">
        <p className="eyebrow">Portfolio</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          The Work
        </h1>
        <p className="mt-3 max-w-lg text-base text-ink-soft">
          Different businesses. Different audiences. Different solutions.
        </p>
        <div className="mt-8">
          <V2WorkGrid />
        </div>
      </div>
    </div>
  );
}
