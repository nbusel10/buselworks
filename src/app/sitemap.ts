import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://buselworks.com";
  const routes = [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
    "/v2",
    "/v2/work",
    "/v2/services",
    "/v2/about",
    "/v2/contact",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/v2") ? 0.5 : 0.8,
  }));
}
