import { isStaging } from "@/lib/seo";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function isAnalyticsEnabled() {
  return (
    process.env.NODE_ENV === "production" &&
    !isStaging &&
    Boolean(GA_MEASUREMENT_ID)
  );
}
