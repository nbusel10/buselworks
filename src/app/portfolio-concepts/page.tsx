import type { Metadata } from "next";
import { Showcase } from "@/components/portfolio-concepts/Showcase";

export const metadata: Metadata = {
  title: "Portfolio concepts",
  description: "Internal comparison of six featured-work concepts for Buselworks.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortfolioConceptsPage() {
  return <Showcase />;
}
