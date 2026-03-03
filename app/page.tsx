"use client"

import dynamic from "next/dynamic"

const PortfolioScene = dynamic(
  () => import("@/components/portfolio/PortfolioScene").then((mod) => ({ default: mod.PortfolioScene })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a14",
          fontFamily: "'Geist', sans-serif",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(255,255,255,0.1)",
            borderTopColor: "#58a6ff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
          Loading Portfolio...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    ),
  }
)

export default function PortfolioPage() {
  return <PortfolioScene />
}
