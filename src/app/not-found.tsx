import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col bg-ivory text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-aqua focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex flex-1 items-center py-16 sm:py-20 md:py-28">
        <div className="container-bw-wide">
          <p className="eyebrow">404</p>
          <h1 className="font-display mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            That page isn’t here.
          </h1>
          <p className="mt-4 max-w-md text-base text-ink-soft md:text-lg">
            The link may be outdated, or the page may have moved. Let’s get you
            back to something useful.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/" className="btn-primary">
              Back home <span aria-hidden>→</span>
            </Link>
            <Link href="/contact" className="btn-secondary">
              Start Something
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
