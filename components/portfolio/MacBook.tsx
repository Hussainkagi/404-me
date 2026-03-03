"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

interface MacBookProps {
  openAngle: number;
  screenContent: React.ReactNode;
  isOn: boolean;
}

export function MacBook({ openAngle, screenContent, isOn }: MacBookProps) {
  const lidRef = useRef<THREE.Group>(null);

  // Clamp angle: 0 = closed, PI/2 = fully open (90 degrees)
  const clampedAngle = Math.max(0, Math.min(openAngle, Math.PI / 2));

  const aluminumColor = "#c0c0c8";
  const darkColor = "#1a1a1a";
  const keyColor = "#2a2a2e";
  const keyCapColor = "#333338";

  // Base dimensions
  const baseW = 2.2;
  const baseD = 1.5;
  const baseH = 0.04;

  // Generate realistic keyboard layout
  const keyPositions = useMemo(() => {
    const keys: { x: number; z: number; w: number; h: number }[] = [];
    const keyW = 0.075;
    const keyH = 0.075;
    const gap = 0.012;
    const stride = keyW + gap;

    // 6 rows of keys
    const rows = [
      { count: 14, offset: 0, startZ: -0.42 }, // function row
      { count: 14, offset: 0, startZ: -0.42 + stride }, // number row
      { count: 13, offset: stride * 0.3, startZ: -0.42 + stride * 2 }, // Q row
      { count: 12, offset: stride * 0.6, startZ: -0.42 + stride * 3 }, // A row
      { count: 11, offset: stride * 0.9, startZ: -0.42 + stride * 4 }, // Z row
    ];

    const kbWidth = 14 * stride;
    const kbStartX = -kbWidth / 2 + keyW / 2;

    for (const row of rows) {
      for (let c = 0; c < row.count; c++) {
        keys.push({
          x: kbStartX + row.offset + c * stride,
          z: row.startZ,
          w: keyW,
          h: keyH,
        });
      }
    }

    // Space bar row
    const spaceZ = -0.42 + stride * 5;
    // modifier keys left
    for (let i = 0; i < 4; i++) {
      keys.push({
        x: kbStartX + i * stride * 1.1,
        z: spaceZ,
        w: keyW * 1.05,
        h: keyH,
      });
    }
    // space bar
    keys.push({ x: 0, z: spaceZ, w: keyW * 5.5, h: keyH });
    // modifier keys right
    for (let i = 0; i < 4; i++) {
      keys.push({
        x: 0.28 + i * stride * 1.1,
        z: spaceZ,
        w: keyW * 1.05,
        h: keyH,
      });
    }

    return keys;
  }, []);

  return (
    <group position={[0, 0.01, 0]}>
      {/* ===================== BASE ===================== */}
      <group>
        {/* Main base body */}
        <mesh position={[0, baseH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[baseW, baseH, baseD]} />
          <meshStandardMaterial
            color={aluminumColor}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Front edge (thin wedge look) */}
        <mesh position={[0, 0.005, baseD / 2 + 0.005]} castShadow>
          <boxGeometry args={[baseW, 0.01, 0.01]} />
          <meshStandardMaterial
            color={aluminumColor}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Keyboard recess */}
        <mesh position={[0, baseH + 0.001, -0.08]} receiveShadow>
          <boxGeometry args={[1.7, 0.002, 0.95]} />
          <meshStandardMaterial
            color={darkColor}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Individual keys */}
        {keyPositions.map((key, i) => (
          <mesh
            key={i}
            position={[key.x, baseH + 0.004, key.z - 0.08]}
            receiveShadow
          >
            <boxGeometry args={[key.w, 0.005, key.h]} />
            <meshStandardMaterial
              color={keyCapColor}
              metalness={0.15}
              roughness={0.65}
            />
          </mesh>
        ))}

        {/* Trackpad */}
        <mesh position={[0, baseH + 0.001, 0.42]} receiveShadow>
          <boxGeometry args={[0.65, 0.001, 0.42]} />
          <meshStandardMaterial
            color="#b5b5bd"
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>

        {/* Trackpad border (subtle) */}
        <mesh position={[0, baseH + 0.0008, 0.42]}>
          <boxGeometry args={[0.67, 0.0005, 0.44]} />
          <meshStandardMaterial
            color="#a8a8b0"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* ===================== LID ===================== */}
      {/* Pivot point at the back edge of the base, at the top surface */}
      <group position={[0, baseH, -baseD / 2]}>
        {/* Rotate the lid around X axis (hinge). When angle=0, lid lies flat on base. */}
        <group rotation={[-clampedAngle, 0, 0]} ref={lidRef}>
          {/* The lid panel extends from the hinge toward the front (positive Z in local space) */}
          <mesh position={[0, 0.015, baseD / 2]} castShadow receiveShadow>
            <boxGeometry args={[baseW, 0.025, baseD]} />
            <meshStandardMaterial
              color={aluminumColor}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Apple logo on outer (top) face of lid */}
          <mesh
            position={[0, 0.029, baseD / 2]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.1, 32]} />
            <meshStandardMaterial
              color="#d0d0d8"
              metalness={0.9}
              roughness={0.1}
              emissive={isOn ? "#ffffff" : "#000000"}
              emissiveIntensity={isOn ? 0.3 : 0}
            />
          </mesh>

          {/* Screen bezel (inner face of lid, facing user when open) */}
          <mesh position={[0, -0.001, baseD / 2]}>
            <boxGeometry args={[baseW - 0.06, 0.005, baseD - 0.06]} />
            <meshStandardMaterial color={darkColor} roughness={0.8} />
          </mesh>

          {/* Screen display panel */}
          <mesh position={[0, -0.005, baseD / 2]}>
            <boxGeometry args={[baseW - 0.2, 0.003, baseD - 0.18]} />
            <meshStandardMaterial
              color={isOn ? "#0a0a12" : "#050508"}
              emissive={isOn ? "#111122" : "#000000"}
              emissiveIntensity={isOn ? 0.4 : 0}
              roughness={0.05}
              metalness={0.05}
            />
          </mesh>

          {/* Camera dot at the top of the screen */}
          <mesh position={[0, -0.007, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.015, 16]} />
            <meshStandardMaterial
              color="#222"
              emissive={isOn ? "#00ff00" : "#000000"}
              emissiveIntensity={isOn ? 0.5 : 0}
            />
          </mesh>

          {/* Screen glow when on */}
          {isOn && (
            <pointLight
              position={[0, -0.1, baseD / 2]}
              intensity={0.3}
              color="#6688cc"
              distance={2}
              decay={2}
            />
          )}

          {/* HTML Screen Content */}
          {isOn && openAngle > 0.3 && (
            <Html
              position={[0, -0.008, baseD / 2]}
              rotation={[Math.PI / 2, 0, 0]}
              transform
              distanceFactor={1.17}
              style={{
                width: "680px",
                height: "440px",
                overflow: "hidden",
                borderRadius: "4px",
              }}
              zIndexRange={[10, 0]}
            >
              <div
                style={{
                  width: "680px",
                  height: "440px",
                  background: "#1a1a2e",
                  overflow: "hidden",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                }}
              >
                {screenContent}
              </div>
            </Html>
          )}
        </group>
      </group>
    </group>
  );
}
