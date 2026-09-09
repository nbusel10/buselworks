"use client";

import Image from "next/image";
import { useState } from "react";
import type { WorkProject } from "@/data/types";

export function ProjectScreenshot({
  project,
  className = "object-cover object-top",
}: {
  project: WorkProject;
  className?: string;
}) {
  const [src, setSrc] = useState(project.image);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full min-h-[180px] flex-col justify-end bg-gradient-to-br from-ivory to-[#e8e4dc] p-6">
        <p className="eyebrow">{project.categoryLabel}</p>
        <p className="font-display mt-2 text-2xl font-semibold tracking-tight">
          {project.name}
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${project.name} website`}
      fill
      className={className}
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={() => {
        if (src.endsWith(".jpg")) {
          setSrc(`/work/${project.slug}.svg`);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
