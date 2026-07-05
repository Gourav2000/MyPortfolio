import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import { useStore } from '../store'

// Game-style onboarding: pulsing white arrows on the ground around the
// character at spawn (front/back/left/right) labelled W/S/A/D.
// The spawn camera yaw is fixed (π), so a static group is correct until
// the hint is dismissed on first movement.

// d = distance from the character, tuned per direction: front must clear
// the character on screen, back must stay inside the camera frustum
// Flat ground arrows for left/right/back. The front direction gets a
// floating upright arrow instead — a flat one ahead of the character is
// always occluded by the character from the over-the-shoulder camera.
const DIRS = [
  // back label kept LOW so on screen it sits over its own arrow near the
  // bottom edge instead of overlapping the character
  { a: Math.PI, key: 'S', d: 2.1, ly: 0.45, lz: 0.9 },
  { a: Math.PI / 2, key: 'A', d: 2.9, ly: 1.05, lz: 0.4 }, // screen left
  { a: -Math.PI / 2, key: 'D', d: 2.9, ly: 1.05, lz: 0.4 }, // screen right
]

export default function MoveArrows() {
  const on = useStore((s) => s.hintOn)
  const touch = useStore((s) => s.touch)
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.9,
        toneMapped: false,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  )
  const [geo, geoUp] = useMemo(() => {
    // full arrow (head + tail), tip up
    const s = new THREE.Shape()
    s.moveTo(0, 0.8)
    s.lineTo(0.5, -0.15)
    s.lineTo(0.2, -0.15)
    s.lineTo(0.2, -0.8)
    s.lineTo(-0.2, -0.8)
    s.lineTo(-0.2, -0.15)
    s.lineTo(-0.5, -0.15)
    s.closePath()
    const up = new THREE.ShapeGeometry(s) // upright, tip up (front indicator)
    const flat = new THREE.ShapeGeometry(s)
    flat.rotateX(-Math.PI / 2) // lie flat; tip now points -z
    flat.rotateY(Math.PI) // tip points +z (outward from the character)
    return [flat, up]
  }, [])

  useFrame(({ clock }) => {
    mat.opacity = 0.55 + Math.sin(clock.elapsedTime * 3) * 0.35
  })

  if (!on || touch) return null
  return (
    <group position={[0, 0, 14]} rotation={[0, Math.PI, 0]}>
      {/* front: floating upright arrow (up = forward) with W above it */}
      <Billboard position={[0, 3.1, 4.2]}>
        <mesh geometry={geoUp} material={mat} />
        <Text position={[0, 1.35, 0]} fontSize={0.55} anchorX="center" outlineWidth={0.035} outlineColor="#000000">
          W
          <meshBasicMaterial toneMapped={false} color="#ffffff" />
        </Text>
      </Billboard>
      {DIRS.map(({ a, key, d, ly, lz }) => (
        <group key={key} rotation={[0, a, 0]}>
          <mesh geometry={geo} material={mat} position={[0, 0.08, d]} />
          <Billboard position={[0, ly, d + lz]}>
            <Text fontSize={0.55} anchorX="center" outlineWidth={0.035} outlineColor="#000000">
              {key}
              <meshBasicMaterial toneMapped={false} color="#ffffff" />
            </Text>
          </Billboard>
        </group>
      ))}
    </group>
  )
}
