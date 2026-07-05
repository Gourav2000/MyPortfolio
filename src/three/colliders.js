import { CITY, ZONES, WORLD_RADIUS } from './layout'

// circle colliders: { x, z, r }
const colliders = CITY.buildings.map((b) => ({
  x: b.x,
  z: b.z,
  r: Math.max(b.w, b.d) * 0.72,
}))

// zone structures (approximated as circles at each zone center)
const WIDE_ZONES = new Set(['experience', 'projects', 'education', 'certifications'])
for (const z of ZONES) {
  colliders.push({ x: z.x, z: z.z, r: WIDE_ZONES.has(z.id) ? 4.2 : 2.8 })
}
// hero hologram pedestal at world center
colliders.push({ x: 0, z: 0, r: 3 })

export function addCollider(x, z, r) {
  colliders.push({ x, z, r })
}

const PLAYER_RADIUS = 0.9

// push `pos` (THREE.Vector3) out of any collider + clamp to world edge
export function resolveCollisions(pos) {
  for (const c of colliders) {
    const dx = pos.x - c.x
    const dz = pos.z - c.z
    const min = c.r + PLAYER_RADIUS
    const d2 = dx * dx + dz * dz
    if (d2 < min * min && d2 > 1e-6) {
      const d = Math.sqrt(d2)
      pos.x = c.x + (dx / d) * min
      pos.z = c.z + (dz / d) * min
    }
  }
  const rd = Math.hypot(pos.x, pos.z)
  if (rd > WORLD_RADIUS) {
    pos.x = (pos.x / rd) * WORLD_RADIUS
    pos.z = (pos.z / rd) * WORLD_RADIUS
  }
  return pos
}
