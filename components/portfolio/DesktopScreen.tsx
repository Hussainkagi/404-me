"use client"

import { useState } from "react"

interface DesktopScreenProps {
  onOpenResume: () => void
  onOpenFlappyBird: () => void
  onOpenTerminal: () => void
  onShutdown: () => void
}

export function DesktopScreen({ onOpenResume, onOpenFlappyBird, onOpenTerminal, onShutdown }: DesktopScreenProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [time] = useState(() => {
    const d = new Date()
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  })

  const icons = [
    {
      id: "resume",
      label: "My Resume",
      emoji: null,
      svg: (
        <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
          <rect x="8" y="4" width="32" height="40" rx="3" fill="#fff" stroke="#2563eb" strokeWidth="2" />
          <circle cx="24" cy="16" r="5" fill="#2563eb" />
          <rect x="14" y="24" width="20" height="2" rx="1" fill="#60a5fa" />
          <rect x="14" y="29" width="16" height="2" rx="1" fill="#93c5fd" />
          <rect x="14" y="34" width="20" height="2" rx="1" fill="#60a5fa" />
          <rect x="14" y="39" width="12" height="2" rx="1" fill="#93c5fd" />
        </svg>
      ),
      onClick: onOpenResume,
    },
    {
      id: "flappy",
      label: "Flappy Bird",
      emoji: null,
      svg: (
        <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
          <rect width="48" height="48" rx="10" fill="#70c5ce" />
          <ellipse cx="24" cy="24" rx="10" ry="8" fill="#f7dc6f" />
          <ellipse cx="28" cy="22" rx="4" ry="5" fill="#fff" />
          <circle cx="29" cy="22" r="2" fill="#2c3e50" />
          <path d="M34 24 L40 23 L34 26Z" fill="#e74c3c" />
          <path d="M16 22 L12 18 L14 24Z" fill="#f39c12" />
          <rect x="10" y="40" width="28" height="8" fill="#2ecc71" />
          <rect x="18" y="2" width="6" height="18" rx="2" fill="#27ae60" />
        </svg>
      ),
      onClick: onOpenFlappyBird,
    },
    {
      id: "terminal",
      label: "Terminal",
      emoji: null,
      svg: (
        <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
          <rect width="48" height="48" rx="10" fill="#1e1e2e" />
          <rect x="4" y="4" width="40" height="40" rx="6" fill="#282a36" stroke="#44475a" strokeWidth="1" />
          <path d="M14 16 L22 24 L14 32" stroke="#50fa7b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="24" y1="32" x2="34" y2="32" stroke="#8be9fd" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
      onClick: onOpenTerminal,
    },
    {
      id: "shutdown",
      label: "Shut Down",
      emoji: null,
      svg: (
        <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
          <circle cx="24" cy="24" r="18" fill="#1e1e1e" stroke="#ef4444" strokeWidth="2" />
          <path d="M24 12 L24 24" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M17 16 A12 12 0 1 0 31 16"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ),
      onClick: onShutdown,
    },
  ]

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Geist', -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Menu bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 14px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          fontSize: "11px",
          color: "#fff",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <span style={{ fontWeight: 700 }}>{"HK"}</span>
          <span style={{ opacity: 0.7 }}>Finder</span>
          <span style={{ opacity: 0.7 }}>File</span>
          <span style={{ opacity: 0.7 }}>Edit</span>
        </div>
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <span style={{ opacity: 0.7 }}>{time}</span>
        </div>
      </div>

      {/* Desktop icons */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "48px",
          zIndex: 10,
          position: "relative",
        }}
      >
        {icons.map((icon) => (
          <button
            key={icon.id}
            onClick={icon.onClick}
            onMouseEnter={() => setHoveredIcon(icon.id)}
            onMouseLeave={() => setHoveredIcon(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              border: "none",
              background: hoveredIcon === icon.id ? "rgba(255,255,255,0.1)" : "transparent",
              padding: "12px 16px",
              borderRadius: "12px",
              transition: "all 0.2s ease",
              transform: hoveredIcon === icon.id ? "scale(1.1)" : "scale(1)",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {icon.svg}
            </div>
            <span
              style={{
                fontSize: "11px",
                color: "#fff",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                fontWeight: 500,
              }}
            >
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Dock */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "8px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
            padding: "4px 12px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px)",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {icons.map((icon) => (
            <button
              key={icon.id + "-dock"}
              onClick={icon.onClick}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3) translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ transform: "scale(0.55)" }}>{icon.svg}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
