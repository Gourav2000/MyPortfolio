import React, { useMemo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { CITY, ZONES, RING_RADIUS, PLAZA_RADIUS, mulberry32 } from './layout'

// ── canvas-generated window texture (no external assets) ────
function makeWindowTexture(seed, cols, rows, litChance, palette) {
  const rand = mulberry32(seed)
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 256
  const g = c.getContext('2d')
  g.fillStyle = '#0a0d18'
  g.fillRect(0, 0, c.width, c.height)
  const cw = c.width / cols
  const ch = c.height / rows
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (rand() < litChance) {
        g.fillStyle = palette[Math.floor(rand() * palette.length)]
        g.globalAlpha = 0.55 + rand() * 0.45
        g.fillRect(i * cw + cw * 0.22, j * ch + ch * 0.25, cw * 0.56, ch * 0.5)
      }
    }
  }
  g.globalAlpha = 1
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

const dummy = new THREE.Object3D()
const tmpColor = new THREE.Color()

function InstancedBuildings({ list, texture, emissiveIntensity = 1, tint = ['#7fb8d8', '#c88be0', '#8fd8c8'] }) {
  const ref = useRef()
  useEffect(() => {
    const mesh = ref.current
    const rand = mulberry32(4242)
    list.forEach((b, i) => {
      dummy.position.set(b.x, b.h / 2, b.z)
      dummy.rotation.set(0, b.rotY || 0, 0)
      dummy.scale.set(b.w, b.h, b.d)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      tmpColor.set(tint[Math.floor(rand() * tint.length)])
      mesh.setColorAt(i, tmpColor)
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [list, tint])

  return (
    <instancedMesh ref={ref} args={[null, null, list.length]} frustumCulled={false}>
      <boxGeometry />
      <meshStandardMaterial
        color="#131629"
        emissive="#ffffff"
        emissiveMap={texture}
        emissiveIntensity={emissiveIntensity}
        map={texture}
        roughness={0.85}
        metalness={0.2}
      />
    </instancedMesh>
  )
}

// glowing vertical neon strips on some buildings
function NeonStrips() {
  const strips = useMemo(() => {
    const rand = mulberry32(90909)
    const out = []
    const colors = ['#00e5ff', '#ff2d95', '#b44dff', '#ffd24d', '#4dff9d']
    CITY.buildings.forEach((b) => {
      if (b.neon > 0.55) return
      const color = colors[Math.floor(rand() * colors.length)]
      const side = rand() > 0.5 ? 1 : -1
      out.push({
        x: b.x + side * (b.w / 2 + 0.12),
        z: b.z,
        h: b.h * (0.55 + rand() * 0.35),
        color,
      })
    })
    return out
  }, [])
  const ref = useRef()
  useEffect(() => {
    const mesh = ref.current
    strips.forEach((s, i) => {
      dummy.position.set(s.x, s.h / 2, s.z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(0.18, s.h, 0.18)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, tmpColor.set(s.color))
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [strips])
  return (
    <instancedMesh ref={ref} args={[null, null, strips.length]} frustumCulled={false}>
      <boxGeometry />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

// ── ground, plaza and radial roads ──────────────────────────
function Ground() {
  const gridTex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const g = c.getContext('2d')
    g.fillStyle = '#06070f'
    g.fillRect(0, 0, 256, 256)
    g.strokeStyle = 'rgba(77,181,255,0.16)'
    g.lineWidth = 1
    for (let i = 0; i <= 256; i += 32) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 256); g.stroke()
      g.beginPath(); g.moveTo(0, i); g.lineTo(256, i); g.stroke()
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(60, 60)
    return tex
  }, [])

  return (
    <>
      {/* base ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[260, 64]} />
        <meshStandardMaterial map={gridTex} color="#39415f" roughness={0.95} metalness={0} />
      </mesh>

      {/* plaza disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[PLAZA_RADIUS, 48]} />
        <meshStandardMaterial color="#0b0e1e" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[PLAZA_RADIUS - 0.35, PLAZA_RADIUS, 64]} />
        <meshBasicMaterial color="#4db5ff" toneMapped={false} transparent opacity={0.9} />
      </mesh>

      {/* radial roads to each zone */}
      {ZONES.map((z) => {
        const len = RING_RADIUS - PLAZA_RADIUS + 6
        const mid = PLAZA_RADIUS + len / 2 - 1
        return (
          <group key={z.id} rotation={[0, -z.angle, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, -mid]}>
              <planeGeometry args={[6, len]} />
              <meshStandardMaterial color="#0b0e1e" roughness={0.55} metalness={0.4} />
            </mesh>
            {/* neon edge lines */}
            {[-3.1, 3.1].map((off) => (
              <mesh key={off} rotation={[-Math.PI / 2, 0, 0]} position={[off, 0.025, -mid]}>
                <planeGeometry args={[0.16, len]} />
                <meshBasicMaterial color={z.accent} toneMapped={false} transparent opacity={0.85} />
              </mesh>
            ))}
          </group>
        )
      })}
    </>
  )
}

// street lamps along the roads
function Lamps() {
  const lamps = useMemo(() => {
    const out = []
    ZONES.forEach((z) => {
      for (let d = 18; d < RING_RADIUS - 6; d += 12) {
        const side = 4.2
        out.push({ angle: z.angle, dist: d, off: side })
        out.push({ angle: z.angle, dist: d + 6, off: -side })
      }
    })
    return out
  }, [])
  const poleRef = useRef()
  const bulbRef = useRef()
  useEffect(() => {
    lamps.forEach((l, i) => {
      const x = Math.sin(l.angle) * l.dist + Math.cos(l.angle) * l.off
      const z = -Math.cos(l.angle) * l.dist + Math.sin(l.angle) * l.off
      dummy.position.set(x, 1.9, z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(0.12, 3.8, 0.12)
      dummy.updateMatrix()
      poleRef.current.setMatrixAt(i, dummy.matrix)
      dummy.position.set(x, 3.9, z)
      dummy.scale.set(0.14, 0.14, 0.14)
      dummy.updateMatrix()
      bulbRef.current.setMatrixAt(i, dummy.matrix)
    })
    poleRef.current.instanceMatrix.needsUpdate = true
    bulbRef.current.instanceMatrix.needsUpdate = true
  }, [lamps])
  return (
    <>
      <instancedMesh ref={poleRef} args={[null, null, lamps.length]} frustumCulled={false}>
        <boxGeometry />
        <meshStandardMaterial color="#1a1f38" roughness={0.6} metalness={0.6} />
      </instancedMesh>
      <instancedMesh ref={bulbRef} args={[null, null, lamps.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#9adcff" toneMapped={false} />
      </instancedMesh>
    </>
  )
}

export default function City({ quality = 'high' }) {
  const texA = useMemo(() => makeWindowTexture(11, 6, 18, 0.34, ['#9adcff', '#ffd9a0', '#e0b3ff']), [])
  const texB = useMemo(() => makeWindowTexture(22, 5, 12, 0.42, ['#ffd9a0', '#9adcff', '#a0ffd9']), [])

  const tall = useMemo(() => CITY.buildings.filter((b) => b.h > 24), [])
  const low = useMemo(() => CITY.buildings.filter((b) => b.h <= 24), [])

  return (
    <>
      <Ground />
      <InstancedBuildings list={tall} texture={texA} emissiveIntensity={1.15} />
      <InstancedBuildings list={low} texture={texB} emissiveIntensity={1} />
      {quality === 'high' && <NeonStrips />}
      {quality === 'high' && <Lamps />}
      {/* distant skyline silhouettes */}
      <SkylineRing />
    </>
  )
}

function SkylineRing() {
  const ref = useRef()
  useEffect(() => {
    const mesh = ref.current
    CITY.skyline.forEach((b, i) => {
      dummy.position.set(b.x, b.h / 2, b.z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(b.w, b.h, b.d)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[null, null, CITY.skyline.length]} frustumCulled={false}>
      <boxGeometry />
      <meshStandardMaterial color="#0d1124" roughness={1} metalness={0} />
    </instancedMesh>
  )
}
