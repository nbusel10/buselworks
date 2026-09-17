import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/work/", "/services/", "/about/", "/contact/"];

  return routes.map((route) => ({
    url: route === "/" ? SITE.url : `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
