import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Buselworks — Custom Web Design + Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/logo-wordmark.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f4ef",
          padding: 72,
        }}
      >
        <img src={logoSrc} width={248} height={57} alt="buselworks" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 58,
              fontWeight: 700,
              color: "#1c1c1c",
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            <span>You bring the idea.</span>
            <span>We’ll build what comes next.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#3d3d3d" }}>
            Custom web design + development · Phoenix + everywhere
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
