import { workProjects } from "@/data/work";

export type ConceptProject = {
  slug: string;
  name: string;
  url: string;
  category: string;
  descriptor: string;
  image: string;
  accent: string;
};

const accents: Record<string, string> = {
  "greyedge-group": "#0f766e",
  "rkidds-pizza-and-wings": "#c2410c",
  "christinas-beauty-room": "#a15d6e",
  "dr-bluma-sapir": "#1e3a5f",
  "bettys-rooste": "#9a3412",
  "ckm-travel": "#8a6a3b",
};

const featuredSlugs = [
  "greyedge-group",
  "rkidds-pizza-and-wings",
  "christinas-beauty-room",
  "dr-bluma-sapir",
  "ckm-travel",
] as const;

function fromCatalog(slug: (typeof featuredSlugs)[number]): ConceptProject {
  const project = workProjects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`Missing work project: ${slug}`);
  }
  return {
    slug: project.slug,
    name: project.name,
    url: project.url,
    category: project.categoryLabel,
    descriptor: project.descriptor,
    image: project.image,
    accent: accents[project.slug] ?? "#27c7cd",
  };
}

export const conceptProjects: ConceptProject[] = featuredSlugs.map(fromCatalog);

export function projectHost(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}
