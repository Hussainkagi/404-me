"use client"

import { useState, useCallback } from "react"
import { Terminal } from "./Terminal"
import { DesktopScreen } from "./DesktopScreen"
import { ResumeDiary } from "./ResumeDiary"
import { FlappyBird } from "./FlappyBird"

type ScreenState = "off" | "terminal" | "desktop" | "resume" | "flappy"

interface MacBookScreenProps {
  screenState: ScreenState
  onScreenStateChange: (state: ScreenState) => void
  onShutdown: () => void
}

export function MacBookScreen({ screenState, onScreenStateChange, onShutdown }: MacBookScreenProps) {
  const handleTerminalComplete = useCallback(() => {
    onScreenStateChange("desktop")
  }, [onScreenStateChange])

  const handleOpenResume = useCallback(() => {
    onScreenStateChange("resume")
  }, [onScreenStateChange])

  const handleOpenFlappy = useCallback(() => {
    onScreenStateChange("flappy")
  }, [onScreenStateChange])

  const handleOpenTerminal = useCallback(() => {
    onScreenStateChange("terminal")
  }, [onScreenStateChange])

  const handleCloseApp = useCallback(() => {
    onScreenStateChange("desktop")
  }, [onScreenStateChange])

  switch (screenState) {
    case "off":
      return (
        <div style={{ width: "100%", height: "100%", background: "#000" }} />
      )
    case "terminal":
      return <Terminal onComplete={handleTerminalComplete} />
    case "desktop":
      return (
        <DesktopScreen
          onOpenResume={handleOpenResume}
          onOpenFlappyBird={handleOpenFlappy}
          onOpenTerminal={handleOpenTerminal}
          onShutdown={onShutdown}
        />
      )
    case "resume":
      return <ResumeDiary onClose={handleCloseApp} />
    case "flappy":
      return <FlappyBird onClose={handleCloseApp} />
    default:
      return null
  }
}
