import Link from "next/link";
import { LogoWordmark } from "./Logo";

const footerLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-white">
      <div className="container-bw-wide grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:py-16">
        <div>
          <LogoWordmark variant="dark" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Web Design + Development
            <br />
            Phoenix, Arizona / Working Everywhere
          </p>
          <a
            href="mailto:nancy@buselworks.com"
            className="mt-4 inline-block text-aqua transition-colors hover:text-white"
          >
            nancy@buselworks.com
          </a>
        </div>

        <div className="flex flex-col justify-between gap-8 md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/75 transition-colors hover:text-aqua"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="max-w-xs text-sm text-white/55 md:text-right">
            Designed by a human. Built with some very smart machines.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-bw-wide flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Buselworks LLC</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/v2" className="hover:text-aqua">
              View alternate design →
            </Link>
            <Link href="/contact" className="hover:text-aqua">
              Start Something →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
