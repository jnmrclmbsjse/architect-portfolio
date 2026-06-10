import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0c0a09",
          color: "#fafaf9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Junmar Jose
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a8a29e",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Software Architect, Technical Lead & Full Stack Engineer
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
            fontSize: 18,
            color: "#78716c",
          }}
        >
          <span>9+ years</span>
          <span>·</span>
          <span>8+ platforms integrated</span>
          <span>·</span>
          <span>SaaS / E-commerce / AI</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
