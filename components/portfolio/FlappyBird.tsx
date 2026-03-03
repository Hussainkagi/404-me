"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface FlappyBirdProps {
  onClose: () => void
}

const GAME_WIDTH = 680
const GAME_HEIGHT = 400
const BIRD_SIZE = 24
const PIPE_WIDTH = 48
const PIPE_GAP = 120
const GRAVITY = 0.45
const JUMP_FORCE = -7
const PIPE_SPEED = 2.5

interface Pipe {
  x: number
  topHeight: number
  passed: boolean
}

export function FlappyBird({ onClose }: FlappyBirdProps) {
  const [gameState, setGameState] = useState<"menu" | "playing" | "dead">("menu")
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState<Pipe[]>([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const frameRef = useRef<number>(0)
  const gameRef = useRef<HTMLDivElement>(null)

  const birdYRef = useRef(birdY)
  const birdVelocityRef = useRef(birdVelocity)
  const pipesRef = useRef(pipes)
  const scoreRef = useRef(score)
  const gameStateRef = useRef(gameState)

  birdYRef.current = birdY
  birdVelocityRef.current = birdVelocity
  pipesRef.current = pipes
  scoreRef.current = score
  gameStateRef.current = gameState

  const jump = useCallback(() => {
    if (gameStateRef.current === "menu") {
      setGameState("playing")
      setBirdY(GAME_HEIGHT / 2)
      setBirdVelocity(JUMP_FORCE)
      setPipes([])
      setScore(0)
    } else if (gameStateRef.current === "playing") {
      setBirdVelocity(JUMP_FORCE)
    } else if (gameStateRef.current === "dead") {
      setGameState("menu")
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        e.stopPropagation()
        jump()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [jump])

  useEffect(() => {
    if (gameState !== "playing") return

    let pipeTimer = 0

    const gameLoop = () => {
      const newVelocity = birdVelocityRef.current + GRAVITY
      const newY = birdYRef.current + newVelocity

      setBirdVelocity(newVelocity)
      setBirdY(newY)

      if (newY < 0 || newY > GAME_HEIGHT - BIRD_SIZE) {
        setGameState("dead")
        setHighScore((h) => Math.max(h, scoreRef.current))
        return
      }

      pipeTimer++
      setPipes((prevPipes) => {
        let newPipes = prevPipes
          .map((p) => ({ ...p, x: p.x - PIPE_SPEED }))
          .filter((p) => p.x > -PIPE_WIDTH)

        if (pipeTimer % 90 === 0) {
          const topHeight = 60 + Math.random() * (GAME_HEIGHT - PIPE_GAP - 120)
          newPipes.push({ x: GAME_WIDTH, topHeight, passed: false })
        }

        newPipes = newPipes.map((p) => {
          if (!p.passed && p.x + PIPE_WIDTH < 80) {
            setScore((s) => s + 1)
            return { ...p, passed: true }
          }
          return p
        })

        const birdLeft = 60
        const birdRight = 60 + BIRD_SIZE
        const birdTop = birdYRef.current
        const birdBottom = birdYRef.current + BIRD_SIZE

        for (const p of newPipes) {
          const pipeLeft = p.x
          const pipeRight = p.x + PIPE_WIDTH
          if (birdRight > pipeLeft && birdLeft < pipeRight) {
            if (birdTop < p.topHeight || birdBottom > p.topHeight + PIPE_GAP) {
              setGameState("dead")
              setHighScore((h) => Math.max(h, scoreRef.current))
              return prevPipes
            }
          }
        }

        return newPipes
      })

      frameRef.current = requestAnimationFrame(gameLoop)
    }

    frameRef.current = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(frameRef.current)
  }, [gameState])

  const birdRotation = Math.min(Math.max(birdVelocity * 3, -30), 70)

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d1117",
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
          Flappy Bird - Score: {score}
        </span>
      </div>

      {/* Game area */}
      <div
        ref={gameRef}
        onClick={jump}
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          background: "linear-gradient(to bottom, #4dc9f6, #70d6ff, #a0e7ff)",
        }}
      >
        {/* Clouds */}
        {[0.15, 0.35, 0.6, 0.8].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${pos * 100}%`,
              top: `${12 + i * 8}%`,
              width: "60px",
              height: "20px",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "20px",
            }}
          />
        ))}

        {/* Ground */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40px",
            background: "linear-gradient(to bottom, #90d26d, #5da33a)",
            borderTop: "3px solid #4a8c2a",
          }}
        />

        {/* Pipes */}
        {pipes.map((pipe, i) => (
          <div key={i}>
            {/* Top pipe */}
            <div
              style={{
                position: "absolute",
                left: pipe.x,
                top: 0,
                width: PIPE_WIDTH,
                height: pipe.topHeight,
                background: "linear-gradient(to right, #5cb85c, #4cae4c, #449d44)",
                borderBottom: "4px solid #3d8b3d",
                borderRadius: "0 0 4px 4px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: -3,
                  right: -3,
                  height: "16px",
                  background: "linear-gradient(to right, #5cb85c, #4cae4c)",
                  borderRadius: "2px",
                  border: "2px solid #3d8b3d",
                }}
              />
            </div>
            {/* Bottom pipe */}
            <div
              style={{
                position: "absolute",
                left: pipe.x,
                top: pipe.topHeight + PIPE_GAP,
                width: PIPE_WIDTH,
                height: GAME_HEIGHT - pipe.topHeight - PIPE_GAP,
                background: "linear-gradient(to right, #5cb85c, #4cae4c, #449d44)",
                borderTop: "4px solid #3d8b3d",
                borderRadius: "4px 4px 0 0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -2,
                  left: -3,
                  right: -3,
                  height: "16px",
                  background: "linear-gradient(to right, #5cb85c, #4cae4c)",
                  borderRadius: "2px",
                  border: "2px solid #3d8b3d",
                }}
              />
            </div>
          </div>
        ))}

        {/* Bird */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: birdY,
            width: BIRD_SIZE,
            height: BIRD_SIZE,
            transform: `rotate(${birdRotation}deg)`,
            transition: "transform 0.1s",
          }}
        >
          <svg viewBox="0 0 24 24" width={BIRD_SIZE} height={BIRD_SIZE}>
            <ellipse cx="12" cy="12" rx="10" ry="8" fill="#f7dc6f" />
            <ellipse cx="15" cy="10" rx="4" ry="5" fill="#fff" />
            <circle cx="16" cy="10" r="2" fill="#2c3e50" />
            <path d="M20 12 L25 11 L20 14Z" fill="#e74c3c" />
            <path d="M5 10 L1 7 L4 12Z" fill="#f39c12" />
          </svg>
        </div>

        {/* Menu overlay */}
        {gameState === "menu" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#fff",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                marginBottom: "8px",
              }}
            >
              Flappy Bird
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#fff",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                marginBottom: "4px",
              }}
            >
              Click or press Space to start
            </div>
            {highScore > 0 && (
              <div style={{ fontSize: "12px", color: "#ffd700" }}>Best: {highScore}</div>
            )}
          </div>
        )}

        {/* Death overlay */}
        {gameState === "dead" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#ff5555",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                marginBottom: "4px",
              }}
            >
              Game Over
            </div>
            <div style={{ fontSize: "18px", color: "#fff", marginBottom: "4px" }}>Score: {score}</div>
            {score >= highScore && score > 0 && (
              <div style={{ fontSize: "13px", color: "#ffd700", marginBottom: "4px" }}>New High Score!</div>
            )}
            <div style={{ fontSize: "12px", color: "#ccc" }}>Click to try again</div>
          </div>
        )}
      </div>
    </div>
  )
}
