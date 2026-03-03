"use client";

import { useState, useEffect, useCallback } from "react";

interface TerminalProps {
  onComplete: () => void;
}

export function Terminal({ onComplete }: TerminalProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines = [
    "$ echo 'Hello World'",
    "Hello World",
    "",
    "$ whoami",
    "Hussain Kagiwala",
    "",
    "$ cat about.txt",
    "Full-Stack Software Engineer",
    "Based in Dubai, UAE",
    "3.5+ years of experience",
    "",
    "$ cat skills.txt",
    "JavaScript | TypeScript | Python",
    "React.js | Next.js | Vue.js | Node.js",
    "PostgreSQL | MongoDB | AWS | Docker",
    "",
    "$ echo 'Welcome to my portfolio!'",
    "Welcome to my portfolio!",
    "",
    "Closing terminal in 3..2..1..",
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const advanceLine = useCallback(() => {
    setLines((prev) => [...prev, currentLine]);
    setCurrentLine("");
    setCharIndex(0);
    setLineIndex((prev) => prev + 1);
  }, [currentLine]);

  useEffect(() => {
    if (lineIndex >= terminalLines.length) {
      const timeout = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const targetLine = terminalLines[lineIndex];

    if (targetLine === "") {
      const timeout = setTimeout(advanceLine, 200);
      return () => clearTimeout(timeout);
    }

    if (charIndex < targetLine.length) {
      const isCommand = targetLine.startsWith("$");
      const speed = isCommand ? 40 : 20;

      const timeout = setTimeout(() => {
        setCurrentLine(targetLine.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(advanceLine, 400);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex, terminalLines.length, advanceLine]);

  if (isComplete) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d1117",
        color: "#c9d1d9",
        fontFamily: "'GeistMono', 'Courier New', monospace",
        fontSize: "13px",
        padding: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          background: "#161b22",
          borderBottom: "1px solid #30363d",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={onComplete}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#ff5f57",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
        </div>
        <span
          style={{
            color: "#8b949e",
            fontSize: "12px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          hussain@macbook ~ zsh
        </span>
      </div>

      {/* Terminal body */}
      <div
        style={{
          padding: "12px",
          overflow: "auto",
          flex: 1,
          lineHeight: "1.6",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ minHeight: "20px" }}>
            {line.startsWith("$") ? (
              <span>
                <span style={{ color: "#7ee787" }}>{"hussain@portfolio"}</span>
                <span style={{ color: "#8b949e" }}>:</span>
                <span style={{ color: "#79c0ff" }}>{"~"}</span>
                <span style={{ color: "#c9d1d9" }}>{line.substring(1)}</span>
              </span>
            ) : (
              <span style={{ color: "#f0f6fc" }}>{line}</span>
            )}
          </div>
        ))}
        {lineIndex < terminalLines.length && (
          <div style={{ minHeight: "20px" }}>
            {currentLine.startsWith("$") ? (
              <span>
                <span style={{ color: "#7ee787" }}>{"hussain@portfolio"}</span>
                <span style={{ color: "#8b949e" }}>:</span>
                <span style={{ color: "#79c0ff" }}>{"~"}</span>
                <span style={{ color: "#c9d1d9" }}>
                  {currentLine.substring(1)}
                </span>
              </span>
            ) : (
              <span style={{ color: "#f0f6fc" }}>{currentLine}</span>
            )}
            <span
              style={{
                opacity: showCursor ? 1 : 0,
                color: "#58a6ff",
                fontWeight: "bold",
              }}
            >
              {"_"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
