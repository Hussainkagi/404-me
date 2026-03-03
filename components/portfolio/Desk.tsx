"use client"

import * as THREE from "three"

export function Desk() {
  const woodColor = "#5c3a1e"
  const darkWood = "#3d2512"

  return (
    <group position={[0, -0.8, 0]}>
      {/* Table top */}
      <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.08, 2.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Table top edge trim */}
      <mesh position={[0, 0.74, 1.16]} castShadow>
        <boxGeometry args={[4, 0.04, 0.08]} />
        <meshStandardMaterial color={darkWood} roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.74, -1.16]} castShadow>
        <boxGeometry args={[4, 0.04, 0.08]} />
        <meshStandardMaterial color={darkWood} roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Legs */}
      {[
        [-1.8, 0.38, -1],
        [1.8, 0.38, -1],
        [-1.8, 0.38, 1],
        [1.8, 0.38, 1],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.76, 0.1]} />
          <meshStandardMaterial color={darkWood} roughness={0.5} metalness={0.1} />
        </mesh>
      ))}

      {/* Cross bar */}
      <mesh position={[0, 0.2, -1]} castShadow>
        <boxGeometry args={[3.5, 0.06, 0.06]} />
        <meshStandardMaterial color={darkWood} roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.2, 1]} castShadow>
        <boxGeometry args={[3.5, 0.06, 0.06]} />
        <meshStandardMaterial color={darkWood} roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.9} metalness={0} />
      </mesh>

      {/* Wall behind */}
      <mesh position={[0, 3, -3]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#1e1e28" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  )
}
