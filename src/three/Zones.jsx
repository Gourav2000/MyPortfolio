import React, { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import { ZONES } from './layout'
import { SECTIONS, PROFILE } from '../data/content'

// shared materials helpers
const glow = (color, opacity = 1) => (
  <meshBasicMaterial color={color} toneMapped={false} transparent={opacity < 1} opacity={opacity} />
)

function FloatingSign({ label, sub, accent, y = 8 }) {
  return (
    <Billboard position={[0, y, 0]}>
      <Text fontSize={1.5} color={accent} anchorX="center" anchorY="middle" letterSpacing={0.12} outlineWidth={0.04} outlineColor="#000000">
        {label}
        <meshBasicMaterial toneMapped={false} color={accent} />
      </Text>
      <Text position={[0, -1.3, 0]} fontSize={0.55} color="#cfe8ff" anchorX="center" anchorY="middle" letterSpacing={0.3}>
        {sub}
      </Text>
    </Billboard>
  )
}

function GroundRing({ accent, pulse = true, radius = 6.5 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current || !pulse) return
    const t = clock.elapsedTime
    ref.current.material.opacity = 0.55 + Math.sin(t * 2.2) * 0.3
  })
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[radius, 48]} />
        <meshStandardMaterial color="#0b0e1e" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
        <ringGeometry args={[radius - 0.3, radius, 64]} />
        <meshBasicMaterial color={accent} toneMapped={false} transparent opacity={0.8} />
      </mesh>
    </>
  )
}

// ── unique structures per zone ──────────────────────────────

function AboutCore({ accent }) {
  const sphere = useRef()
  const r1 = useRef()
  const r2 = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    sphere.current.rotation.y = t * 0.4
    sphere.current.position.y = 3.4 + Math.sin(t * 1.4) * 0.25
    r1.current.rotation.z = t * 0.7
    r2.current.rotation.x = t * 0.5
  })
  return (
    <group>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.6, 2, 1.2, 24]} />
        <meshStandardMaterial color="#131629" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh ref={sphere} position={[0, 3.4, 0]}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshStandardMaterial color="#0b0e1e" emissive={accent} emissiveIntensity={0.7} wireframe />
      </mesh>
      <group position={[0, 3.4, 0]}>
        <mesh ref={r1} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.6, 0.05, 8, 64]} />
          {glow(accent, 0.9)}
        </mesh>
        <mesh ref={r2} rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[3.1, 0.04, 8, 64]} />
          {glow('#ffffff', 0.45)}
        </mesh>
      </group>
      <pointLight position={[0, 3.4, 0]} color={accent} intensity={14} distance={16} />
    </group>
  )
}

function ExperienceTowers({ accent }) {
  const jobs = SECTIONS.experience.jobs
  return (
    <group>
      {[{ x: -2.6, h: 9, name: jobs[0].company }, { x: 2.6, h: 6.5, name: jobs[1].company }].map((t, i) => (
        <group key={i} position={[t.x, 0, 0]}>
          <mesh position={[0, t.h / 2, 0]}>
            <boxGeometry args={[2.6, t.h, 2.6]} />
            <meshStandardMaterial color="#10142a" metalness={0.6} roughness={0.35} />
          </mesh>
          {/* edge neon */}
          {[[-1.32, -1.32], [1.32, -1.32], [-1.32, 1.32], [1.32, 1.32]].map(([ex, ez], j) => (
            <mesh key={j} position={[ex, t.h / 2, ez]}>
              <boxGeometry args={[0.1, t.h, 0.1]} />
              {glow(accent, 0.95)}
            </mesh>
          ))}
          {/* company name on front AND back faces */}
          {[
            { pos: [0, t.h / 2, 1.36], rot: [0, 0, Math.PI / 2] },
            { pos: [0, t.h / 2, -1.36], rot: [0, Math.PI, Math.PI / 2] },
          ].map((f, k) => (
            <Text
              key={k}
              position={f.pos}
              fontSize={0.5}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              rotation={f.rot}
              maxWidth={t.h - 1}
            >
              {t.name.toUpperCase()}
              <meshBasicMaterial toneMapped={false} color="#dff4ff" />
            </Text>
          ))}
          <mesh position={[0, t.h + 0.35, 0]}>
            <boxGeometry args={[2.8, 0.16, 2.8]} />
            {glow(accent, 0.9)}
          </mesh>
        </group>
      ))}
      <pointLight position={[0, 6, 3]} color={accent} intensity={10} distance={16} />
    </group>
  )
}

function SkillCrystals({ accent }) {
  const groups = SECTIONS.skills.groups
  const colors = ['#00e5ff', '#b44dff', '#ffd24d', '#4dff9d']
  const refs = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    refs.current.forEach((g, i) => {
      if (!g) return
      g.rotation.y = t * (0.4 + i * 0.12)
      g.position.y = 2.6 + Math.sin(t * 1.3 + i * 1.7) * 0.3
    })
  })
  return (
    <group>
      {groups.map((grp, i) => {
        const a = (i / groups.length) * Math.PI * 2
        const x = Math.sin(a) * 3.4
        const z = Math.cos(a) * 3.4
        return (
          <group key={grp.name} position={[x, 0, z]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.9, 1.1, 0.8, 6]} />
              <meshStandardMaterial color="#131629" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh ref={(el) => (refs.current[i] = el)} position={[0, 2.6, 0]}>
              <octahedronGeometry args={[1.1, 0]} />
              <meshStandardMaterial
                color="#0b0e1e"
                emissive={colors[i]}
                emissiveIntensity={1.6}
                metalness={0.4}
                roughness={0.2}
              />
            </mesh>
            <Billboard position={[0, 4.6, 0]}>
              <Text fontSize={0.42} color="#ffffff" anchorX="center">
                {grp.name}
                <meshBasicMaterial toneMapped={false} color="#eaf6ff" />
              </Text>
            </Billboard>
          </group>
        )
      })}
      <pointLight position={[0, 4, 0]} color={accent} intensity={10} distance={16} />
    </group>
  )
}

function ProjectBillboards({ accent }) {
  const feats = SECTIONS.projects.featured
  return (
    <group>
      {feats.map((p, i) => {
        const x = i === 0 ? -3 : 3
        const rot = i === 0 ? 0.35 : -0.35
        return (
          <group key={p.title} position={[x, 0, 0]} rotation={[0, rot, 0]}>
            {[-2.1, 2.1].map((px) => (
              <mesh key={px} position={[px, 2.4, 0]}>
                <cylinderGeometry args={[0.09, 0.09, 4.8, 8]} />
                <meshStandardMaterial color="#1a1f38" metalness={0.7} roughness={0.4} />
              </mesh>
            ))}
            <mesh position={[0, 4, 0]}>
              <boxGeometry args={[4.6, 2.6, 0.18]} />
              <meshStandardMaterial color="#080a16" metalness={0.4} roughness={0.5} />
            </mesh>
            <mesh position={[0, 4, 0.02]}>
              <boxGeometry args={[4.75, 2.75, 0.14]} />
              {glow(accent, 0.55)}
            </mesh>
            <Text position={[0, 4.55, 0.14]} fontSize={0.6} color="#ffffff" anchorX="center" letterSpacing={0.06}>
              {p.title}
              <meshBasicMaterial toneMapped={false} color="#ffffff" />
            </Text>
            <Text
              position={[0, 3.7, 0.14]}
              fontSize={0.26}
              color="#bfe3ff"
              anchorX="center"
              maxWidth={4.1}
              textAlign="center"
            >
              {p.tags.join('  ·  ')}
            </Text>
          </group>
        )
      })}
      <pointLight position={[0, 5, 3]} color={accent} intensity={9} distance={15} />
    </group>
  )
}

function PublicationArchive({ accent }) {
  const pages = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    pages.current.forEach((p, i) => {
      if (!p) return
      const a = t * 0.45 + (i / 3) * Math.PI * 2
      p.position.set(Math.sin(a) * 2.4, 3.4 + Math.sin(t * 1.2 + i) * 0.3, Math.cos(a) * 2.4)
      p.rotation.y = a + Math.PI / 2
    })
  })
  return (
    <group>
      {/* ring of columns */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <group key={i} position={[Math.sin(a) * 4.4, 0, Math.cos(a) * 4.4]}>
            <mesh position={[0, 2.4, 0]}>
              <cylinderGeometry args={[0.32, 0.4, 4.8, 12]} />
              <meshStandardMaterial color="#141833" metalness={0.5} roughness={0.4} />
            </mesh>
            <mesh position={[0, 4.9, 0]}>
              <boxGeometry args={[0.9, 0.2, 0.9]} />
              {glow(accent, 0.9)}
            </mesh>
          </group>
        )
      })}
      {/* central plinth */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 1.4, 24]} />
        <meshStandardMaterial color="#131629" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* orbiting glowing papers */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} ref={(el) => (pages.current[i] = el)}>
          <planeGeometry args={[1.1, 1.5]} />
          <meshBasicMaterial color="#dffcf0" toneMapped={false} side={THREE.DoubleSide} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* venue labels — always face the camera */}
      {SECTIONS.publications.papers.map((p, i) => {
        const a = (i / 3) * Math.PI * 2
        const venue = p.venue.split('·')[0].trim()
        return (
          <Billboard key={venue} position={[Math.sin(a) * 4.4, 6.1, Math.cos(a) * 4.4]}>
            <Text fontSize={0.46} color={accent} anchorX="center" letterSpacing={0.08} outlineWidth={0.015} outlineColor="#000000">
              {venue}
              <meshBasicMaterial toneMapped={false} color={accent} />
            </Text>
            <Text position={[0, -0.55, 0]} fontSize={0.28} color="#cdeee0" anchorX="center" letterSpacing={0.12}>
              {p.status.toUpperCase()}
            </Text>
          </Billboard>
        )
      })}
      <pointLight position={[0, 4, 0]} color={accent} intensity={12} distance={16} />
    </group>
  )
}

function TrophyPlaza({ accent }) {
  const cup = useRef()
  useFrame(({ clock }) => {
    cup.current.rotation.y = clock.elapsedTime * 0.5
  })
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2, 2.4, 1, 6]} />
        <meshStandardMaterial color="#131629" metalness={0.7} roughness={0.3} />
      </mesh>
      <group ref={cup} position={[0, 1, 0]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.22, 0.4, 1.4, 12]} />
          <meshStandardMaterial color="#a87b17" metalness={1} roughness={0.25} emissive="#ffd24d" emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0, 1.9, 0]}>
          <cylinderGeometry args={[1.05, 0.35, 1.4, 20]} />
          <meshStandardMaterial color="#c9961e" metalness={1} roughness={0.2} emissive="#ffd24d" emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[0, 2.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.02, 0.09, 10, 40]} />
          <meshStandardMaterial color="#ffd24d" metalness={1} roughness={0.15} emissive="#ffd24d" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <Billboard position={[0, 5.3, 0]}>
        <Text fontSize={0.7} color={accent} anchorX="center">
          2nd / 1,862 TEAMS
          <meshBasicMaterial toneMapped={false} color={accent} />
        </Text>
      </Billboard>
      {/* light beams */}
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (i / 4) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.sin(a) * 3.2, 4, Math.cos(a) * 3.2]}>
            <coneGeometry args={[0.5, 8, 12, 1, true]} />
            <meshBasicMaterial color={accent} transparent opacity={0.12} toneMapped={false} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        )
      })}
      <pointLight position={[0, 3.5, 0]} color="#ffd24d" intensity={14} distance={18} />
    </group>
  )
}

function BadgeVault({ accent }) {
  const badges = useRef([])
  const certs = SECTIONS.certifications.certs
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    badges.current.forEach((b, i) => {
      if (!b) return
      b.rotation.y = t * 0.6 + i
      b.position.y = 3 + i * 0.2 + Math.sin(t * 1.4 + i * 2) * 0.25
    })
  })
  return (
    <group>
      {certs.map((c, i) => {
        const x = (i - 1) * 3.2
        return (
          <group key={c.title} position={[x, 0, 0]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.8, 1, 0.8, 6]} />
              <meshStandardMaterial color="#131629" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh ref={(el) => (badges.current[i] = el)} position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.15, 1.15, 0.16, 6]} />
              <meshStandardMaterial
                color="#0d1124"
                emissive={i === 2 ? '#4d7dff' : accent}
                emissiveIntensity={1.2}
                metalness={0.6}
                roughness={0.25}
              />
            </mesh>
            <Billboard position={[0, 4.8, 0]}>
              <Text fontSize={0.34} color="#ffffff" anchorX="center" maxWidth={3} textAlign="center">
                {c.issuer}
                <meshBasicMaterial toneMapped={false} color="#eaf6ff" />
              </Text>
            </Billboard>
          </group>
        )
      })}
      <pointLight position={[0, 4, 2]} color={accent} intensity={9} distance={15} />
    </group>
  )
}

function Academy({ accent }) {
  return (
    <group>
      {[-2.6, 2.6].map((x) => (
        <mesh key={x} position={[x, 2.6, 0]}>
          <boxGeometry args={[1.1, 5.2, 1.1]} />
          <meshStandardMaterial color="#10142a" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 5.4, 0]}>
        <boxGeometry args={[7, 0.7, 1.4]} />
        <meshStandardMaterial color="#131629" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 5.4, 0.72]}>
        <boxGeometry args={[7.1, 0.75, 0.06]} />
        {glow(accent, 0.5)}
      </mesh>
      <Text position={[0, 5.4, 0.85]} fontSize={0.52} color="#ffffff" anchorX="center" letterSpacing={0.1}>
        CGPA 9.39 / 10
        <meshBasicMaterial toneMapped={false} color="#ffffff" />
      </Text>
      {/* floating graduation cap */}
      <FloatingCap accent={accent} />
      <pointLight position={[0, 4, 3]} color={accent} intensity={9} distance={15} />
    </group>
  )
}

function FloatingCap({ accent }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.position.y = 3 + Math.sin(t * 1.5) * 0.3
    ref.current.rotation.y = t * 0.6
  })
  return (
    <group ref={ref} position={[0, 3, 0]}>
      <mesh>
        <cylinderGeometry args={[0.75, 0.85, 0.5, 16]} />
        <meshStandardMaterial color="#10142a" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2.4, 0.12, 2.4]} />
        <meshStandardMaterial color="#131629" emissive={accent} emissiveIntensity={0.5} metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}

function SignalTower({ accent }) {
  const beacon = useRef()
  const waves = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    beacon.current.material.color.setScalar(1)
    beacon.current.material.color.set(accent)
    beacon.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15)
    waves.current.forEach((w, i) => {
      if (!w) return
      const p = ((t * 0.5 + i / 3) % 1)
      w.position.y = 1 + p * 8
      w.scale.setScalar(1 + p * 1.5)
      w.material.opacity = 0.5 * (1 - p)
    })
  })
  return (
    <group>
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.18, 0.65, 9, 6]} />
        <meshStandardMaterial color="#141833" metalness={0.8} roughness={0.3} />
      </mesh>
      {[2.2, 4.4, 6.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55 - i * 0.1, 0.03, 8, 24]} />
          {glow(accent, 0.8)}
        </mesh>
      ))}
      <mesh ref={beacon} position={[0, 9.4, 0]}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} ref={(el) => (waves.current[i] = el)} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.4, 1.55, 40]} />
          <meshBasicMaterial color={accent} toneMapped={false} transparent opacity={0.4} depthWrite={false} />
        </mesh>
      ))}
      <pointLight position={[0, 9.4, 0]} color={accent} intensity={16} distance={22} />
    </group>
  )
}

function HallOfAllies({ accent }) {
  const reviews = SECTIONS.testimonials.reviews
  // manual (non-suspending) texture load — avoids wedging the whole
  // scene's Suspense if a texture promise misbehaves in dev
  const [textures, setTextures] = useState([])
  useEffect(() => {
    let alive = true
    const loader = new THREE.TextureLoader()
    Promise.all(reviews.map((r) => loader.loadAsync(r.avatar))).then((loaded) => {
      if (!alive) return
      loaded.forEach((t) => (t.colorSpace = THREE.SRGBColorSpace))
      setTextures(loaded)
    })
    return () => { alive = false }
  }, [reviews])
  const carousel = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    carousel.current.rotation.y = t * 0.28
    carousel.current.children.forEach((card, i) => {
      card.position.y = 3.1 + Math.sin(t * 1.3 + i * 1.6) * 0.22
    })
  })
  return (
    <group>
      {/* central pillar */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 2.2, 12]} />
        <meshStandardMaterial color="#131629" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.35, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        {glow(accent, 0.95)}
      </mesh>
      {/* orbiting holographic portrait cards */}
      <group ref={carousel}>
        {textures.map((tex, i) => {
          const a = (i / textures.length) * Math.PI * 2
          const x = Math.sin(a) * 3.2
          const z = Math.cos(a) * 3.2
          return (
            <group key={i} position={[x, 3.1, z]} rotation={[0, a, 0]}>
              <mesh>
                <planeGeometry args={[1.7, 1.7]} />
                <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
              </mesh>
              <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[1.9, 1.9]} />
                <meshBasicMaterial color={accent} toneMapped={false} transparent opacity={0.55} side={THREE.DoubleSide} />
              </mesh>
            </group>
          )
        })}
      </group>
      <pointLight position={[0, 4, 0]} color={accent} intensity={11} distance={16} />
    </group>
  )
}

const STRUCTURES = {
  about: AboutCore,
  testimonials: HallOfAllies,
  experience: ExperienceTowers,
  skills: SkillCrystals,
  projects: ProjectBillboards,
  publications: PublicationArchive,
  achievements: TrophyPlaza,
  certifications: BadgeVault,
  education: Academy,
  contact: SignalTower,
}

// ── hero plaza: name hologram at world center ───────────────
export function HeroPlaza() {
  const holo = useRef()
  const beam = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    holo.current.rotation.y = t * 0.25
    beam.current.material.opacity = 0.06 + Math.sin(t * 1.8) * 0.03
  })
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2.2, 2.7, 1, 32]} />
        <meshStandardMaterial color="#0d1124" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* light column */}
      <mesh ref={beam} position={[0, 16, 0]}>
        <cylinderGeometry args={[2.1, 2.4, 30, 24, 1, true]} />
        <meshBasicMaterial color="#4db5ff" transparent opacity={0.07} toneMapped={false} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <group ref={holo}>
        {/* same text on both faces so the rotating hologram never goes blank */}
        {[0, Math.PI].map((flip) => (
          <group key={flip} rotation={[0, flip, 0]}>
            <Text position={[0, 5.2, 0.02]} fontSize={1.35} color="#ffffff" anchorX="center" letterSpacing={0.14} outlineWidth={0.03} outlineColor="#4db5ff">
              {PROFILE.name}
              <meshBasicMaterial toneMapped={false} color="#eaf7ff" />
            </Text>
            <Text position={[0, 3.9, 0.02]} fontSize={0.52} color="#4db5ff" anchorX="center" letterSpacing={0.24}>
              {PROFILE.role.toUpperCase()}
              <meshBasicMaterial toneMapped={false} color="#4db5ff" />
            </Text>
            <Text position={[0, 3.05, 0.02]} fontSize={0.36} color="#9fd4ff" anchorX="center" letterSpacing={0.3}>
              {PROFILE.tagline.toUpperCase()}
              {/* explicit front-side material: troika's default is double-sided,
                  which garbles against the mirrored back copy */}
              <meshBasicMaterial toneMapped={false} color="#9fd4ff" />
            </Text>
          </group>
        ))}
      </group>
      <pointLight position={[0, 6, 0]} color="#4db5ff" intensity={18} distance={24} />
    </group>
  )
}

// ── all zones assembled ─────────────────────────────────────
export default function Zones() {
  return (
    <group>
      <HeroPlaza />
      {ZONES.map((z) => {
        const Structure = STRUCTURES[z.id]
        return (
          // -angle so each structure's +z face points back at the plaza
          <group key={z.id} position={[z.x, 0, z.z]} rotation={[0, -z.angle, 0]}>
            <GroundRing accent={z.accent} />
            {/* experience towers are 9 units tall — lift its sign clear of them */}
            <FloatingSign label={z.label} sub={z.sub} accent={z.accent} y={z.id === 'experience' ? 12 : 8} />
            <Structure accent={z.accent} />
          </group>
        )
      })}
    </group>
  )
}
