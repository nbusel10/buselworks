import type { Metadata } from "next";
import { ScrollProgress } from "@/components/ScrollProgress";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2Header } from "@/components/v2/V2Header";
import "./v2.css";

export const metadata: Metadata = {
  title: {
    default: "Buselworks — Web Design + Development",
    template: "%s · Buselworks",
  },
  description:
    "A simpler alternate design for Buselworks — custom websites with modern tools, AI, and human judgment.",
};

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="theme-v2 flex min-h-full flex-col bg-ivory text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-aqua focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <V2Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <V2Footer />
      <ScrollProgress />
    </div>
  );
}
