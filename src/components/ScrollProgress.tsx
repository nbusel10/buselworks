"use client";

import { useEffect, useState } from "react";

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

function useScrolled(offset = 600) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

/** Scroll progress ring around the BW mark — doubles as back-to-top. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  const shown = useScrolled(500);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-ivory/95 text-ink shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-aqua hover:text-aqua-dark sm:bottom-8 sm:right-8 ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden
      >
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          pathLength={1}
          className="stroke-charcoal/10"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          pathLength={1}
          className="stroke-aqua transition-[stroke-dashoffset] duration-150"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
      </svg>
      <span className="relative flex flex-col items-center gap-0.5" aria-hidden>
        <svg className="h-[6px] w-[9px]" viewBox="0 0 8 5" fill="none">
          <path
            d="M1 4L4 1L7 4"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/favicon.svg"
          alt=""
          className="h-[14px] w-[14px] rounded-[3px]"
        />
      </span>
      <span className="sr-only">{Math.round(progress * 100)}% of page</span>
    </button>
  );
}
