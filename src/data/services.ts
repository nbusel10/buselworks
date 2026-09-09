import type { ServiceItem } from "./types";

export const services: ServiceItem[] = [
  {
    id: "custom-websites",
    category: "Design",
    title: "Custom Website Design",
    summary:
      "Custom-designed digital experiences without being boxed into a template.",
    detail:
      "Every Buselworks website starts with a design conversation, not a template selection. We work from a blank canvas, guided by your brand, your customers and your goals. The result is a website that looks and feels like your business — not like every other site built on the same framework.",
    homeTeaser: true,
    lead: true,
  },
  {
    id: "custom-development",
    category: "Development",
    title: "Custom Development",
    summary:
      "Clean, modern code that performs well and can grow with you.",
    detail:
      "We write clean, modern code that performs well, loads fast and can be maintained and extended over time. No bloated page builders, no unnecessary plugins, no technical debt baked in from day one.",
    homeTeaser: true,
  },
  {
    id: "ai-assisted",
    category: "AI",
    title: "AI-Assisted Development",
    summary:
      "Prototype and build faster with AI — human judgment stays in charge.",
    detail:
      "We use modern AI tools to prototype faster, experiment more freely and build things that would have taken much longer by hand. Human judgment stays in charge — always.",
    homeTeaser: true,
  },
  {
    id: "vibe-coding",
    category: "Collaboration",
    title: "Collaborative Vibe Coding",
    summary:
      "Sit with us and shape design and code in real time.",
    detail:
      "If you want to be part of the building process, you can be. We can work together in real time, making design and code decisions as we go. No technical background required — just tell us how it should feel.",
    homeTeaser: true,
  },
  {
    id: "wordpress",
    category: "CMS",
    title: "WordPress",
    summary:
      "Custom WordPress when it’s the right tool for the job.",
    detail:
      "WordPress is still a great choice for many businesses — especially when the right people build it right. We build custom WordPress sites from scratch, redesign existing ones, and provide ongoing support when WordPress fits the project.",
    homeTeaser: true,
  },
  {
    id: "shopify",
    category: "Ecommerce",
    title: "Shopify + Ecommerce",
    summary:
      "Storefronts designed around how your customers actually shop.",
    detail:
      "From product storytelling to checkout flow, we build ecommerce experiences that feel like your brand and work for the way people buy — beautiful storefronts with the custom functionality you need.",
    homeTeaser: false,
  },
  {
    id: "hosting",
    category: "Hosting",
    title: "Website Hosting",
    summary:
      "Managed hosting with SSL, backups, security and support.",
    detail:
      "Reliable hosting with SSL, backups, security monitoring, and someone to call when something needs attention. Up to 30 professional email accounts available with qualifying hosting plans.",
    homeTeaser: false,
  },
  {
    id: "email",
    category: "Email",
    title: "Professional Email",
    summary:
      "Up to 30 professional email accounts with qualifying plans.",
    detail:
      "Look professional with you@yourdomain.com accounts set up correctly alongside your hosting — DNS, deliverability basics, and ongoing support included.",
    homeTeaser: false,
  },
  {
    id: "seo",
    category: "SEO",
    title: "SEO",
    summary:
      "Technical SEO setup and ongoing reporting after launch.",
    detail:
      "We handle technical SEO foundations at launch — structure, metadata, Search Console — and can provide ongoing reporting so you know how the site is performing.",
    homeTeaser: false,
  },
  {
    id: "analytics",
    category: "Analytics",
    title: "Analytics",
    summary:
      "Analytics and Search Console set up correctly from day one.",
    detail:
      "Know what’s working. We set up Google Analytics and Search Console so you can see traffic, behavior, and opportunities without drowning in dashboards.",
    homeTeaser: false,
  },
  {
    id: "maintenance",
    category: "Support",
    title: "Website Maintenance",
    summary:
      "Updates, content changes and ongoing improvements after launch.",
    detail:
      "Websites aren’t finished on launch day. We help with updates, content changes, platform maintenance, and continuous improvements as your business evolves.",
    homeTeaser: false,
  },
  {
    id: "support",
    category: "Support",
    title: "Technical Support",
    summary:
      "Troubleshooting and a human you can actually reach.",
    detail:
      "When something breaks or you have an idea, you know who to contact. Direct support from the person who designed and built your site.",
    homeTeaser: false,
  },
];

export const homeServiceTeasers = services.filter((s) => s.homeTeaser);
