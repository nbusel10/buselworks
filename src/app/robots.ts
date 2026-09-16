import type { MetadataRoute } from "next";
import { isStaging, SITE } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isStaging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
