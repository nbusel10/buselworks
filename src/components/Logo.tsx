import Link from "next/link";

export function LogoWordmark({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const busel = variant === "dark" ? "text-white/75" : "text-ink";

  return (
    <span
      className={`font-display inline-flex items-baseline text-[1.35rem] font-semibold tracking-[-0.04em] md:text-[1.5rem] ${className}`}
      aria-label="buselworks"
    >
      <span className={busel}>busel</span>
      <span className="text-aqua">works</span>
    </span>
  );
}

export function LogoMarkLink() {
  return (
    <Link href="/" aria-label="Buselworks home">
      <LogoWordmark />
    </Link>
  );
}
