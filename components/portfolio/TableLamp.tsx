"use client"

import { useRef } from "react"
import * as THREE from "three"

interface TableLampProps {
  isOn: boolean
  position?: [number, number, number]
}

export function TableLamp({ isOn, position = [2, 0, -0.3] }: TableLampProps) {
  const lightRef = useRef<THREE.SpotLight>(null)

  const metalColor = "#2a2a2a"
  const warmLight = "#ffecd2"

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.1, 32]} />
        <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Stem - lower */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
        <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Joint */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Stem - upper (angled) */}
      <group position={[0, 0.9, 0]} rotation={[0, 0, 0.3]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.7, 16]} />
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lamp shade */}
        <group position={[0, 0.7, 0]}>
          <mesh castShadow>
            <coneGeometry args={[0.3, 0.35, 32, 1, true]} />
            <meshStandardMaterial
              color={metalColor}
              metalness={0.7}
              roughness={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Inner shade (warm glow) */}
          <mesh>
            <coneGeometry args={[0.28, 0.33, 32, 1, true]} />
            <meshStandardMaterial
              color={warmLight}
              emissive={isOn ? warmLight : "#000000"}
              emissiveIntensity={isOn ? 0.8 : 0}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Bulb */}
          <mesh position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color="#fff8e7"
              emissive={isOn ? "#ffcc66" : "#000000"}
              emissiveIntensity={isOn ? 2 : 0}
              transparent
              opacity={isOn ? 1 : 0.5}
            />
          </mesh>

          {/* Spotlight */}
          {isOn && (
            <spotLight
              ref={lightRef}
              position={[0, -0.1, 0]}
              angle={0.8}
              penumbra={0.5}
              intensity={4}
              color={warmLight}
              castShadow
            />
          )}

          {/* Point light for ambient glow */}
          {isOn && (
            <pointLight
              position={[0, -0.1, 0]}
              intensity={1.5}
              color={warmLight}
              distance={5}
              decay={2}
            />
          )}
        </group>
      </group>

      {/* Power switch on base */}
      <mesh position={[0.2, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
        <meshStandardMaterial
          color={isOn ? "#44ff44" : "#ff4444"}
          emissive={isOn ? "#44ff44" : "#ff4444"}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}
