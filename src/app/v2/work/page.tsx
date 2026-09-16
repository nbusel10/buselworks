import type { Metadata } from "next";
import { Suspense } from "react";
import { V2WorkGrid } from "@/components/v2/V2WorkGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Different businesses. Different audiences. Different solutions.",
  path: "/v2/work",
  index: false,
  canonicalPath: "/work",
});

export default function V2WorkPage() {
  return (
    <div className="v2-section pt-10 md:pt-14">
      <div className="v2-container-wide">
        <p className="eyebrow">Portfolio</p>
        <h1 className="font-display mt-3 text-[2.15rem] font-semibold tracking-tight sm:text-5xl">
          The Work
        </h1>
        <p className="mt-3 max-w-lg text-base text-ink-soft">
          Different businesses. Different audiences. Different solutions.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <V2WorkGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
