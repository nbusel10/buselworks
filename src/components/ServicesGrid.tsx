"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ServiceItem } from "@/data/types";

function ServiceCell({
  service,
  className = "",
}: {
  service: ServiceItem;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className={`group relative flex flex-col overflow-hidden ${className}`}
      whileHover={reduce ? undefined : { backgroundColor: "rgba(255,255,255,0.7)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Aqua accent rail */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-aqua transition-[width] duration-300 ease-out group-hover:w-1"
      />

      {/* Soft aqua wash from the left */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-aqua/[0.07] to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />

      <div className="relative transition-transform duration-300 ease-out group-hover:translate-x-1.5">
        <p className="font-mono-label text-[11px] tracking-[0.14em] uppercase text-aqua-dark transition-[letter-spacing,color] duration-300 group-hover:tracking-[0.2em] group-hover:text-aqua">
          {service.category}
        </p>
        <h2 className="font-display mt-3 flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          <span>{service.title}</span>
          <span
            aria-hidden
            className="inline-block translate-x-[-6px] text-aqua opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          >
            →
          </span>
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft transition-colors duration-300 group-hover:text-ink">
          {service.detail}
        </p>
      </div>
    </motion.article>
  );
}

export function ServicesGrid({ items }: { items: ServiceItem[] }) {
  const lead = items.find((s) => s.lead) ?? items[0];
  const rest = items.filter((s) => s.id !== lead.id);

  return (
    <div className="border-t border-border">
      <ServiceCell
        service={lead}
        className="border-b border-border py-10 md:py-14"
      />

      <div className="grid md:grid-cols-2">
        {rest.map((service, i) => {
          const isLeft = i % 2 === 0;
          return (
            <ServiceCell
              key={service.id}
              service={service}
              className={`border-b border-border py-10 md:py-14 ${
                isLeft
                  ? "md:border-r md:pr-10 lg:pr-14"
                  : "md:pl-10 lg:pl-14"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
