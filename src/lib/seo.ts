import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://buselworks.com";

export const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === "staging";

export const SITE = {
  name: "Buselworks",
  legalName: "Buselworks LLC",
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, ""),
  email: "info@buselworks.com",
  locale: "en_US",
  title: "Buselworks — Custom Web Design + Development",
  description:
    "Buselworks designs and builds custom websites using modern development tools, AI, and a whole lot of human judgment. Phoenix + everywhere.",
  tagline:
    "Tell us what you want to build. We’ll figure out the best way to build it.",
};

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Buselworks — Custom Web Design + Development",
} as const;

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE.url;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${SITE.url}${withSlash}`;
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
  canonicalPath,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  canonicalPath?: string;
}): Metadata {
  const isHome = path === "/" || path === "";
  const canonical = absoluteUrl(canonicalPath ?? path);
  const pageUrl = absoluteUrl(path);
  const ogTitle = isHome || title.includes("Buselworks")
    ? title
    : `${title} · ${SITE.name}`;
  const allowIndex = index && !isStaging;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: pageUrl,
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE.url],
    },
    robots: allowIndex
      ? { index: true, follow: true }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false, noimageindex: true },
        },
  };
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      email: SITE.email,
      image: `${SITE.url}/brand/monogram.png`,
      logo: `${SITE.url}/brand/monogram.png`,
      description: SITE.description,
      slogan: SITE.tagline,
      areaServed: [
        { "@type": "City", name: "Phoenix" },
        { "@type": "Country", name: "United States" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Phoenix",
        addressRegion: "AZ",
        addressCountry: "US",
      },
      founder: { "@id": `${SITE.url}/about/#nancy` },
      contactPoint: {
        "@type": "ContactPoint",
        email: SITE.email,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE.url}/#business` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/about/#nancy`,
      name: "Nancy Buselmeier",
      jobTitle: "Founder · Designer · Developer",
      worksFor: { "@id": `${SITE.url}/#business` },
      url: `${SITE.url}/about/`,
      image: `${SITE.url}/about/nancy-buselmeier.png`,
      email: SITE.email,
    },
  ],
};
