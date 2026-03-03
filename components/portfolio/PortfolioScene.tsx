"use client"

import { Suspense, useRef, useState, useEffect, useCallback, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { MacBook } from "./MacBook"
import { TableLamp } from "./TableLamp"
import { Desk } from "./Desk"
import { MacBookScreen } from "./MacBookScreen"

type ScreenState = "off" | "terminal" | "desktop" | "resume" | "flappy"

function CameraController({ openAngle }: { openAngle: number }) {
  const { camera } = useThree()

  useFrame(() => {
    const progress = openAngle / (Math.PI / 2)

    const startPos = new THREE.Vector3(0, 2.8, 3.5)
    const endPos = new THREE.Vector3(0, 1.6, 2.5)
    const currentPos = startPos.clone().lerp(endPos, progress)

    const startLook = new THREE.Vector3(0, -0.3, 0)
    const endLook = new THREE.Vector3(0, 0.3, -0.2)
    const currentLook = startLook.clone().lerp(endLook, progress)

    camera.position.lerp(currentPos, 0.05)
    const target = new THREE.Vector3()
    target.copy(currentLook)
    camera.lookAt(target)
  })

  return null
}

function Scene({
  openAngle,
  isLampOn,
  screenContent,
  isMacOn,
}: {
  openAngle: number
  isLampOn: boolean
  screenContent: React.ReactNode
  isMacOn: boolean
}) {
  return (
    <>
      <CameraController openAngle={openAngle} />

      {/* Lighting */}
      <ambientLight intensity={0.15} color="#8899bb" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.3}
        color="#9bb0d4"
        castShadow
      />

      {/* Scene objects */}
      <group position={[0, 0, 0]}>
        <MacBook openAngle={openAngle} screenContent={screenContent} isOn={isMacOn} />
        <TableLamp isOn={isLampOn} position={[1.8, 0.01, -0.5]} />
        <Desk />
      </group>

      {/* Contact shadows on the desk */}
      <ContactShadows
        position={[0, -0.79, 0]}
        opacity={0.5}
        scale={10}
        blur={2.5}
        far={4}
        color="#000000"
      />

      <Environment preset="night" />
    </>
  )
}

export function PortfolioScene() {
  const [openAngle, setOpenAngle] = useState(0)
  const [targetAngle, setTargetAngle] = useState(0)
  const [isFullyOpen, setIsFullyOpen] = useState(false)
  const [screenState, setScreenState] = useState<ScreenState>("off")
  const [isMacOn, setIsMacOn] = useState(false)
  const [isLampOn, setIsLampOn] = useState(false)
  const [scrollLocked, setScrollLocked] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [isShutDown, setIsShutDown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Smooth animation of open angle
  useEffect(() => {
    let frame: number
    const animate = () => {
      setOpenAngle((prev) => {
        const diff = targetAngle - prev
        if (Math.abs(diff) < 0.001) return targetAngle
        return prev + diff * 0.08
      })
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [targetAngle])

  // Detect fully open
  useEffect(() => {
    if (openAngle > Math.PI / 2 - 0.05 && !isFullyOpen && !isShutDown) {
      setIsFullyOpen(true)
      setIsLampOn(true)
      setIsMacOn(true)
      setScreenState("terminal")
      setScrollLocked(true)
    }
  }, [openAngle, isFullyOpen, isShutDown])

  // Handle scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollLocked) {
        e.preventDefault()
        return
      }

      e.preventDefault()
      setShowScrollHint(false)

      const delta = e.deltaY * 0.0008
      setTargetAngle((prev) => {
        const next = prev + delta
        return Math.max(0, Math.min(next, Math.PI / 2))
      })
    }

    const handleTouch = (() => {
      let lastY = 0
      return {
        start: (e: TouchEvent) => {
          lastY = e.touches[0].clientY
        },
        move: (e: TouchEvent) => {
          if (scrollLocked) {
            e.preventDefault()
            return
          }
          e.preventDefault()
          setShowScrollHint(false)
          const currentY = e.touches[0].clientY
          const delta = (lastY - currentY) * 0.003
          lastY = currentY
          setTargetAngle((prev) => {
            const next = prev + delta
            return Math.max(0, Math.min(next, Math.PI / 2))
          })
        },
      }
    })()

    const el = containerRef.current
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false })
      el.addEventListener("touchstart", handleTouch.start, { passive: true })
      el.addEventListener("touchmove", handleTouch.move, { passive: false })
      return () => {
        el.removeEventListener("wheel", handleWheel)
        el.removeEventListener("touchstart", handleTouch.start)
        el.removeEventListener("touchmove", handleTouch.move)
      }
    }
  }, [scrollLocked])

  const handleShutdown = useCallback(() => {
    setScreenState("off")
    setIsMacOn(false)
    setIsLampOn(false)
    setIsFullyOpen(false)
    setScrollLocked(false)
    setIsShutDown(true)
    setTargetAngle(0)
    setShowScrollHint(false)
  }, [])

  // When lid closes after shutdown, allow reopening
  useEffect(() => {
    if (isShutDown && openAngle < 0.05) {
      // Lid is closed after shutdown, allow re-scroll
      setIsShutDown(false)
      setShowScrollHint(true)
    }
  }, [isShutDown, openAngle])

  const handleScreenStateChange = useCallback((state: ScreenState) => {
    setScreenState(state)
  }, [])

  const screenContent = useMemo(
    () => (
      <MacBookScreen
        screenState={screenState}
        onScreenStateChange={handleScreenStateChange}
        onShutdown={handleShutdown}
      />
    ),
    [screenState, handleScreenStateChange, handleShutdown]
  )

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0a0a14",
        position: "relative",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 2.8, 3.5], fov: 45 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
        }}
      >
        <Suspense fallback={null}>
          <Scene
            openAngle={openAngle}
            isLampOn={isLampOn}
            screenContent={screenContent}
            isMacOn={isMacOn}
          />
        </Suspense>
      </Canvas>

      {/* Scroll hint */}
      {showScrollHint && !isFullyOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            animation: "float 2s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontFamily: "'Geist', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            Scroll to open
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: 0.5 }}
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Title overlay when closed */}
      {openAngle < 0.1 && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(24px, 4vw, 48px)",
              fontWeight: 700,
              fontFamily: "'Geist', sans-serif",
              margin: 0,
              letterSpacing: "-0.02em",
              opacity: Math.max(0, 1 - openAngle * 10),
            }}
          >
            Hussain Kagiwala
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(14px, 2vw, 18px)",
              fontFamily: "'Geist', sans-serif",
              marginTop: "8px",
              opacity: Math.max(0, 1 - openAngle * 10),
            }}
          >
            Software Engineer - Dubai, UAE
          </p>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  )
}
