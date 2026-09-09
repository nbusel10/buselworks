import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://buselworks.com"),
  title: {
    default: "Buselworks — Web Design + Development",
    template: "%s · Buselworks",
  },
  description:
    "Buselworks designs and builds custom websites using modern development tools, AI, and a whole lot of human judgment. Phoenix + everywhere.",
  openGraph: {
    title: "Buselworks — Web Design + Development",
    description:
      "Tell us what you want to build. We’ll figure out the best way to build it.",
    url: "https://buselworks.com",
    siteName: "Buselworks",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
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
      className={`${outfit.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
