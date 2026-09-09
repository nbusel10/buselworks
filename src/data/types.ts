export type WorkProject = {
  name: string;
  slug: string;
  url: string;
  category: string;
  categoryLabel: string;
  filterGroup: string;
  descriptor: string;
  image: string;
  featured: boolean;
};

export type ServiceItem = {
  id: string;
  category: string;
  title: string;
  summary: string;
  detail: string;
  homeTeaser?: boolean;
  /** Full-width lead cell in the services grid */
  lead?: boolean;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};
