import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Buselworks",
    short_name: "Buselworks",
    description:
      "Custom web design and development — Phoenix + everywhere.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f4ef",
    theme_color: "#f7f4ef",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/brand/favicon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
