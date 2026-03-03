"use client"

import { useState } from "react"

interface ResumeDiaryProps {
  onClose: () => void
}

const pages = [
  {
    title: "Hussain Kagiwala",
    content: [
      "Full-Stack & Data Engineer",
      "",
      "Dubai, UAE",
      "+971-543535970",
      "hussain.f.kagi@gmail.com",
      "",
      "Full-stack Software Engineer with",
      "3.5+ years of experience specializing",
      "in end-to-end web application",
      "development, database engineering,",
      "and scalable product architecture.",
    ],
  },
  {
    title: "Technical Skills",
    content: [
      "Programming & Full-Stack:",
      "  JavaScript, TypeScript, Python",
      "  React.js, Next.js, Vue.js, Nuxt.js",
      "  Node.js, Express.js",
      "  PostgreSQL, MongoDB",
      "  Databricks (ETL / Data Engineering)",
      "",
      "Cloud & DevOps:",
      "  AWS (S3, EC2, IAM), Docker",
      "  CI/CD Pipelines",
      "  Linux (Ubuntu), macOS",
    ],
  },
  {
    title: "Experience",
    content: [
      "R3 Factory",
      "Full Stack Software Engineer",
      "Dubai, UAE | Jan 2023 - Present",
      "",
      "Designed and delivered enterprise",
      "applications across logistics,",
      "e-commerce, B2B, and ERP.",
      "",
      "Building cloud-ready full-stack",
      "solutions using React/Next.js,",
      "Vue/Nuxt, Node.js, Express.",
    ],
  },
  {
    title: "Key Projects (UAE)",
    content: [
      "1. Xoom Asset Tracker",
      "   Logistics tracking system for",
      "   vehicles, drivers, fines, and",
      "   asset data management.",
      "",
      "2. Redington Gulf - B2B Portal",
      "   Scalable B2B customer portal",
      "   for inquiries, orders, and",
      "   real-time status tracking.",
      "",
      "3. R3 Factory E-Commerce",
      "   Modern e-commerce platform",
      "   with Next.js SSR.",
    ],
  },
  {
    title: "More Projects",
    content: [
      "4. R3 Factory Admin Portal",
      "   Product upload automations,",
      "   pricing management, and",
      "   complete data control.",
      "",
      "5. Ikration LLC",
      "   End-to-end development.",
      "",
      "6. Firm Corner",
      "   Full-stack application.",
      "",
      "Led end-to-end SDLC: requirement",
      "analysis, system architecture,",
      "API integrations.",
    ],
  },
  {
    title: "Education & More",
    content: [
      "Education:",
      "  B.Tech - Information Technology",
      "  & Data Science",
      "  Parul University",
      "",
      "Certifications:",
      "  Data Science - Analytics INC.",
      "",
      "Industry Knowledge:",
      "  Logistics & Supply Chain",
      "  E-Commerce Operations",
      "  B2B Workflows",
      "  Agile/Scrum Development",
    ],
  },
]

export function ResumeDiary({ onClose }: ResumeDiaryProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((p) => p + 1)
        setIsFlipping(false)
      }, 300)
    }
  }

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((p) => p - 1)
        setIsFlipping(false)
      }, 300)
    }
  }

  const page = pages[currentPage]

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Geist', sans-serif",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 12px",
          background: "#161b22",
          borderBottom: "1px solid #30363d",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={onClose}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#ff5f57",
              border: "none",
              cursor: "pointer",
            }}
          />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840" }} />
        </div>
        <span style={{ color: "#8b949e", fontSize: "11px", margin: "0 auto" }}>
          Resume - Hussain Kagiwala
        </span>
      </div>

      {/* Diary content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Book */}
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            height: "340px",
            perspective: "1000px",
            position: "relative",
          }}
        >
          {/* Book spine shadow */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "4px",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.4)",
              zIndex: 5,
            }}
          />

          {/* Left page */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              height: "100%",
              background: "linear-gradient(135deg, #fdf6e3, #f5eedc)",
              borderRadius: "4px 0 0 4px",
              padding: "20px 16px 20px 20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "inset -2px 0 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              transform: isFlipping ? "rotateY(-15deg)" : "rotateY(0deg)",
              transformOrigin: "right center",
            }}
          >
            {/* Page lines */}
            <div
              style={{
                position: "absolute",
                inset: "40px 12px 12px 30px",
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 21px, #d4c9b0 21px, #d4c9b0 22px)",
              }}
            />
            {/* Red margin line */}
            <div
              style={{
                position: "absolute",
                left: "28px",
                top: "12px",
                bottom: "12px",
                width: "1px",
                background: "#e8a0a0",
              }}
            />

            <h3
              style={{
                margin: "0 0 12px 6px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#2c2c2c",
                fontFamily: "'Geist', serif",
                position: "relative",
                zIndex: 1,
              }}
            >
              {page.title}
            </h3>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                position: "relative",
                zIndex: 1,
                marginLeft: "6px",
              }}
            >
              {page.content.slice(0, 7).map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "11px",
                    color: line === "" ? "transparent" : "#3c3c3c",
                    lineHeight: "22px",
                    fontFamily: "'GeistMono', monospace",
                  }}
                >
                  {line || "."}
                </div>
              ))}
            </div>
          </div>

          {/* Right page */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50%",
              height: "100%",
              background: "linear-gradient(225deg, #fdf6e3, #f5eedc)",
              borderRadius: "0 4px 4px 0",
              padding: "20px 20px 20px 16px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "inset 2px 0 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              transform: isFlipping ? "rotateY(15deg)" : "rotateY(0deg)",
              transformOrigin: "left center",
            }}
          >
            {/* Page lines */}
            <div
              style={{
                position: "absolute",
                inset: "12px 12px 12px 12px",
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 21px, #d4c9b0 21px, #d4c9b0 22px)",
              }}
            />

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {page.content.slice(7).map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "11px",
                    color: line === "" ? "transparent" : "#3c3c3c",
                    lineHeight: "22px",
                    fontFamily: "'GeistMono', monospace",
                  }}
                >
                  {line || "."}
                </div>
              ))}
            </div>

            {/* Page number */}
            <div
              style={{
                textAlign: "right",
                fontSize: "10px",
                color: "#999",
                position: "relative",
                zIndex: 1,
              }}
            >
              {currentPage + 1} / {pages.length}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          padding: "12px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          style={{
            padding: "6px 20px",
            background: currentPage === 0 ? "#333" : "#58a6ff",
            color: currentPage === 0 ? "#666" : "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: currentPage === 0 ? "default" : "pointer",
            fontSize: "12px",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          {"< Prev"}
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          style={{
            padding: "6px 20px",
            background: currentPage === pages.length - 1 ? "#333" : "#58a6ff",
            color: currentPage === pages.length - 1 ? "#666" : "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: currentPage === pages.length - 1 ? "default" : "pointer",
            fontSize: "12px",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          {"Next >"}
        </button>
      </div>
    </div>
  )
}
