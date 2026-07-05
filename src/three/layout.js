import { SECTIONS, ZONE_ORDER } from '../data/content'

// ── deterministic PRNG so the city is identical every visit ──
export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const WORLD_RADIUS = 112 // player clamp
export const RING_RADIUS = 44 // zone ring
export const PLAZA_RADIUS = 11

// Zones evenly spaced on a ring; index 0 straight ahead (−Z) of spawn.
export const ZONES = ZONE_ORDER.map((id, i) => {
  const angle = (i / ZONE_ORDER.length) * Math.PI * 2
  return {
    id,
    label: SECTIONS[id].label,
    sub: SECTIONS[id].sub,
    accent: SECTIONS[id].accent,
    angle,
    x: Math.sin(angle) * RING_RADIUS,
    z: -Math.cos(angle) * RING_RADIUS,
  }
})

export const zoneById = (id) => ZONES.find((z) => z.id === id)

// distance player must be within to interact
export const ZONE_TRIGGER_RADIUS = 9

// ── procedural city blocks ──────────────────────────────────
// Buildings fill the space outside the zone ring; a distant
// skyline ring fakes an endless city. Deterministic via seed.
export function makeCity() {
  const rand = mulberry32(20261987)
  const buildings = []
  const attempts = 900

  for (let i = 0; i < attempts; i++) {
    const r = 56 + rand() * 50 // 56..106
    const a = rand() * Math.PI * 2
    const x = Math.sin(a) * r
    const z = -Math.cos(a) * r

    // keep clear of zone structures
    let blocked = false
    for (const zn of ZONES) {
      const dx = x - zn.x
      const dz = z - zn.z
      if (dx * dx + dz * dz < 20 * 20) { blocked = true; break }
    }
    if (blocked) continue

    // keep clear of already-placed buildings
    for (const b of buildings) {
      const dx = x - b.x
      const dz = z - b.z
      const min = (b.w + 10) * 0.9
      if (dx * dx + dz * dz < min * min) { blocked = true; break }
    }
    if (blocked) continue

    const w = 5 + rand() * 6
    const d = 5 + rand() * 6
    const tall = rand()
    const h = tall > 0.85 ? 26 + rand() * 26 : 8 + rand() * 16
    buildings.push({ x, z, w, d, h, rotY: Math.floor(rand() * 4) * (Math.PI / 2), neon: rand() })
    if (buildings.length >= 170) break
  }

  // distant unreachable skyline (no colliders needed)
  const skyline = []
  const rand2 = mulberry32(777001)
  for (let i = 0; i < 220; i++) {
    const r = 130 + rand2() * 110
    const a = rand2() * Math.PI * 2
    skyline.push({
      x: Math.sin(a) * r,
      z: -Math.cos(a) * r,
      w: 8 + rand2() * 14,
      d: 8 + rand2() * 14,
      h: 20 + rand2() * 70,
    })
  }

  return { buildings, skyline }
}

export const CITY = makeCity()
