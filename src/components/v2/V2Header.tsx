"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoWordmark } from "@/components/Logo";

const nav = [
  { href: "/v2/work", label: "Work" },
  { href: "/v2/services", label: "Services" },
  { href: "/v2/#how-we-work", label: "How We Work" },
  { href: "/v2/about", label: "About" },
  { href: "/v2/contact", label: "Contact" },
];

export function V2Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-border bg-ivory/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="v2-container-wide flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <Link
          href="/v2"
          className="relative z-50"
          aria-label="Buselworks home"
          onClick={closeMenu}
        >
          <LogoWordmark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              item.href !== "/v2/#how-we-work" && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-aqua-dark ${
                  active ? "text-aqua-dark" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/v2/contact" className="btn-primary text-sm">
            Start Something <span aria-hidden>→</span>
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-px w-full bg-ink transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-ink transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-ink transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 bg-ivory lg:hidden">
          <nav
            className="flex h-full flex-col justify-center gap-6 px-8 pt-16"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="font-display text-3xl font-semibold tracking-tight text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/v2/contact"
              onClick={closeMenu}
              className="btn-primary mt-4 w-fit text-base"
            >
              Start Something <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
