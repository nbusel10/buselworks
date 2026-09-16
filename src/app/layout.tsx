import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Outfit } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { isStaging, SITE, siteJsonLd } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s · Buselworks",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Nancy Buselmeier", url: `${SITE.url}/about` }],
  creator: "Nancy Buselmeier",
  publisher: SITE.legalName,
  category: "Web design and development",
  keywords: [
    "web design Phoenix",
    "custom website development",
    "AI web development",
    "small business websites",
    "Buselworks",
  ],
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: SITE.title,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.tagline,
    images: ["/opengraph-image"],
  },
  robots: isStaging
    ? {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false, noimageindex: true },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full antialiased">
        <JsonLd data={siteJsonLd} />
        {children}
      </body>
    </html>
  );
}
