import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CloseCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-bw-wide">
        <Reveal>
          <p className="max-w-xl text-base text-ink-soft md:text-lg">
            Buselworks is intentionally small. You work with us. We figure it
            out together.{" "}
            <Link href="/about" className="link-aqua">
              More about us
            </Link>
          </p>
        </Reveal>

        <Reveal className="mt-12 border-t border-border-strong pt-12 md:mt-16 md:pt-16">
          <h2 className="font-display max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Have one of those
            <br />
            “what if we…” ideas?
          </h2>
          <p className="mt-5 max-w-xl text-base text-ink-soft md:text-lg">
            Tell us about it. It doesn’t have to be completely figured out yet.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/contact" className="btn-primary text-base">
              Start Something <span aria-hidden>→</span>
            </Link>
            <a
              href="mailto:nancy@buselworks.com"
              className="text-sm text-muted transition-colors hover:text-aqua-dark"
            >
              nancy@buselworks.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
