import type { ReactNode } from "react";
import type { WorkProject } from "@/data/types";
import { ProjectScreenshot } from "./ProjectScreenshot";

type BrowserFrameProps = {
  children?: ReactNode;
  project?: WorkProject;
  src?: string;
  alt?: string;
  url?: string;
  className?: string;
  imageClassName?: string;
  variant?: "light" | "dark";
};

export function BrowserFrame({
  children,
  project,
  src,
  alt = "",
  url = "buselworks.com",
  className = "",
  imageClassName = "object-cover object-top",
  variant = "light",
}: BrowserFrameProps) {
  const displayUrl = (project?.url ?? url).replace(/^https?:\/\//, "");
  const dark = variant === "dark";

  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)] ${
        dark
          ? "border-white/10 bg-[#111]"
          : "border-border-strong bg-white"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-2 border-b px-3 py-2.5 ${
          dark
            ? "border-white/10 bg-[#1a1a1a]"
            : "border-border bg-[#f3f1ec]"
        }`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div
          className={`ml-2 flex-1 truncate rounded-md px-3 py-1 font-mono-label text-[10px] ${
            dark
              ? "bg-black/50 text-white/45"
              : "bg-white text-muted"
          }`}
        >
          {displayUrl}
        </div>
      </div>
      <div className={`relative aspect-[16/10] ${dark ? "bg-[#0b0b0b]" : "bg-ivory"}`}>
        {project ? (
          <ProjectScreenshot project={project} className={imageClassName} />
        ) : src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${imageClassName}`} />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
