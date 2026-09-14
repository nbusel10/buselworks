import Link from "next/link";

const WORDMARK = {
  light: "/brand/logo-wordmark.svg",
  dark: "/brand/logo-wordmark-on-dark.svg",
} as const;

export function LogoWordmark({
  className = "",
  variant = "light",
  priority = false,
}: {
  className?: string;
  variant?: "light" | "dark";
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG wordmark; keep native scaling
    <img
      src={WORDMARK[variant]}
      alt="buselworks"
      className={`h-[1.65rem] w-auto md:h-7 ${className}`}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

export function LogoMarkLink() {
  return (
    <Link href="/" aria-label="Buselworks home">
      <LogoWordmark priority />
    </Link>
  );
}
