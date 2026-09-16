import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";

const footerLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function V2Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-white">
      <div className="v2-container-wide grid gap-8 py-12 md:grid-cols-[1.4fr_1fr] md:py-14">
        <div>
          <LogoWordmark variant="dark" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            Web Design + Development
            <br />
            Phoenix, Arizona / Working Everywhere
          </p>
          <a
            href="mailto:info@buselworks.com"
            className="mt-3 inline-block text-aqua transition-colors hover:text-white"
          >
            info@buselworks.com
          </a>
        </div>

        <div className="flex flex-col justify-between gap-6 md:items-end">
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end"
            aria-label="Footer"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-aqua"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="max-w-xs text-sm text-white/45 md:text-right">
            Designed by a human. Built with some very smart machines.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="v2-container-wide flex flex-col gap-2 py-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Buselworks LLC</span>
          <Link href="/contact" className="hover:text-aqua">
            Start Something →
          </Link>
        </div>
      </div>
    </footer>
  );
}
