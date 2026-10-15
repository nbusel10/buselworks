import type { WorkProject } from "./types";

export const workProjects: WorkProject[] = [
  {
    name: "The GreyEdge Group",
    slug: "greyedge-group",
    url: "https://greyedgegroup.com",
    category: "professional",
    categoryLabel: "Energy / Professional Services",
    filterGroup: "PROFESSIONAL",
    descriptor: "Technical site for a thermal energy network consultancy.",
    image: "/work/greyedge-group.jpg",
    featured: true,
  },
  {
    name: "R. Kidds Pizza & Wings",
    slug: "rkidds-pizza-and-wings",
    url: "https://rkiddspizzaandwings.com",
    category: "food",
    categoryLabel: "Restaurant / Hospitality",
    filterGroup: "FOOD",
    descriptor: "Neighborhood pizza shop built around pickup and delivery.",
    image: "/work/rkidds-pizza-and-wings.jpg",
    featured: true,
  },
  {
    name: "Christina's Beauty Room",
    slug: "christinas-beauty-room",
    url: "https://christinasbeautyroom.com",
    category: "beauty",
    categoryLabel: "Beauty / Esthetics",
    filterGroup: "BEAUTY + WELLNESS",
    descriptor: "Polished beauty brand with booking-forward design.",
    image: "/work/christinas-beauty-room.jpg",
    featured: true,
  },
  {
    name: "Dr. Bluma Sapir",
    slug: "dr-bluma-sapir",
    url: "https://drblumasapir.com",
    category: "professional",
    categoryLabel: "Clinical Psychology",
    filterGroup: "PROFESSIONAL",
    descriptor: "Practice site for a licensed clinical psychologist.",
    image: "/work/dr-bluma-sapir.jpg",
    featured: true,
  },
  {
    name: "Betty's Rooste",
    slug: "bettys-rooste",
    url: "https://bettysrooste.com",
    category: "food",
    categoryLabel: "Restaurant / Hospitality",
    filterGroup: "FOOD",
    descriptor: "Warm hospitality site for a Phoenix restaurant.",
    image: "/work/bettys-rooste.jpg",
    featured: false,
  },
  {
    name: "CKM Travel",
    slug: "ckm-travel",
    url: "https://ckmtravel.com",
    category: "travel",
    categoryLabel: "Luxury Travel",
    filterGroup: "TRAVEL",
    descriptor: "Luxury travel experiences with editorial presence.",
    image: "/work/ckm-travel.jpg",
    featured: false,
  },
  {
    name: "Eat. Drink. Work. Play.",
    slug: "eat-drink-work-play",
    url: "https://eatdrinkworkplay.com",
    category: "lifestyle",
    categoryLabel: "Lifestyle / Editorial",
    filterGroup: "CREATIVE",
    descriptor: "Lifestyle editorial with a magazine sensibility.",
    image: "/work/eat-drink-work-play.jpg",
    featured: false,
  },
  {
    name: "Live a Life Explored",
    slug: "live-a-life-explored",
    url: "https://livealifeexplored.com",
    category: "travel",
    categoryLabel: "Travel / Editorial",
    filterGroup: "TRAVEL",
    descriptor: "Travel storytelling with immersive imagery.",
    image: "/work/live-a-life-explored.jpg",
    featured: false,
  },
  {
    name: "Lynn Balter",
    slug: "lynn-balter",
    url: "https://lynnbalter.com",
    category: "author",
    categoryLabel: "Author / Personal Brand",
    filterGroup: "CREATIVE",
    descriptor: "Author platform with clear, personal branding.",
    image: "/work/lynn-balter.jpg",
    featured: false,
  },
  {
    name: "Southwest Insurance Solutions",
    slug: "southwest-insurance",
    url: "https://southwestinsurancesolutions.net",
    category: "professional",
    categoryLabel: "Insurance / Professional Services",
    filterGroup: "PROFESSIONAL",
    descriptor: "Trust-building site for insurance professionals.",
    image: "/work/southwest-insurance.jpg",
    featured: false,
  },
  {
    name: "The Novi Foundation for Cures",
    slug: "novi-foundation",
    url: "https://thenovifoundationforcures.org",
    category: "nonprofit",
    categoryLabel: "Nonprofit / Medical Research",
    filterGroup: "NONPROFIT",
    descriptor: "Mission-driven nonprofit with clear calls to action.",
    image: "/work/novi-foundation.jpg",
    featured: false,
  },
  {
    name: "TR Fitness Centers",
    slug: "tr-fitness",
    url: "https://trfitnesscenters.com",
    category: "fitness",
    categoryLabel: "Fitness / Wellness",
    filterGroup: "BEAUTY + WELLNESS",
    descriptor: "Energetic fitness brand with membership focus.",
    image: "/work/tr-fitness.jpg",
    featured: false,
  },
  {
    name: "Wade Weber",
    slug: "wade-weber",
    url: "https://wadeweber.com",
    category: "artist",
    categoryLabel: "Artist / Portfolio",
    filterGroup: "CREATIVE",
    descriptor: "Artist portfolio that lets the work lead.",
    image: "/work/wade-weber.jpg",
    featured: false,
  },
];

export const workFilters = [
  "ALL",
  "FOOD",
  "BEAUTY + WELLNESS",
  "TRAVEL",
  "PROFESSIONAL",
  "NONPROFIT",
  "CREATIVE",
] as const;

export type WorkFilter = (typeof workFilters)[number];

export function parseWorkFilter(
  value: string | string[] | undefined,
): WorkFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && (workFilters as readonly string[]).includes(raw)) {
    return raw as WorkFilter;
  }
  return "ALL";
}

export function workFilterHref(basePath: string, filter: WorkFilter): string {
  if (filter === "ALL") return basePath;
  return `${basePath}?filter=${encodeURIComponent(filter)}`;
}
