import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { keys } from '../utils/keys'
import { resolveCollisions } from './colliders'
import { ZONES, ZONE_TRIGGER_RADIUS } from './layout'
import { useStore } from '../store'

const WALK = 8
const RUN = 14

const v = new THREE.Vector3()
const camTarget = new THREE.Vector3()
const camPos = new THREE.Vector3()

export default function Player() {
  const group = useRef()
  const body = useRef()
  const engine = useRef()
  const engineLight = useRef()
  const { camera } = useThree()

  const state = useMemo(
    () => ({
      pos: new THREE.Vector3(0, 0, 14),
      vel: new THREE.Vector3(),
      yaw: Math.PI, // facing the center hologram at spawn
      camYaw: Math.PI,
      speed: 0,
      storeAcc: 1, // accumulated dt since last minimap write (starts due)
      lastNear: undefined,
    }),
    []
  )

  // initial camera placement
  useEffect(() => {
    camera.position.set(0, 5.5, 23)
    camera.lookAt(0, 2.5, 10)
  }, [camera])

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime
    const s = useStore.getState()
    dt = Math.min(dt, 0.05)

    // consume teleport requests from the menu
    if (s.teleport) {
      const { x, z } = s.teleport
      const away = Math.hypot(x, z) || 1
      // land slightly outside the zone, facing its structure
      state.pos.set(x + (x / away) * 6, 0, z + (z / away) * 6)
      state.yaw = Math.atan2(x - state.pos.x, z - state.pos.z)
      state.camYaw = state.yaw
      state.vel.set(0, 0, 0)
      s.clearTeleport()
    }

    const inputBlocked = s.openPanel || s.menuOpen || s.phase !== 'playing'

    // gather input (keyboard + touch joystick), camera-relative
    let ix = 0
    let iz = 0
    if (!inputBlocked) {
      if (keys.forward) iz -= 1
      if (keys.back) iz += 1
      if (keys.left) ix -= 1
      if (keys.right) ix += 1
      if (s.touch) {
        ix += s.joy.x
        iz -= s.joy.y
      }
    }
    const inputLen = Math.hypot(ix, iz)
    const maxSpeed = keys.run ? RUN : WALK

    if (inputLen > 0.05) {
      const n = Math.min(inputLen, 1)
      // rotate input by camera yaw so screen-up is always away from camera:
      // forward = camera dir (sinθ, cosθ), right = (-cosθ, sinθ)
      const sin = Math.sin(state.camYaw)
      const cos = Math.cos(state.camYaw)
      const wx = -iz * sin - ix * cos
      const wz = -iz * cos + ix * sin
      v.set(wx, 0, wz).normalize().multiplyScalar(maxSpeed * n)
      state.vel.lerp(v, 1 - Math.pow(0.0001, dt))
      // face movement direction
      const targetYaw = Math.atan2(state.vel.x, state.vel.z)
      let dYaw = targetYaw - state.yaw
      while (dYaw > Math.PI) dYaw -= Math.PI * 2
      while (dYaw < -Math.PI) dYaw += Math.PI * 2
      state.yaw += dYaw * Math.min(1, dt * 10)
    } else {
      state.vel.lerp(v.set(0, 0, 0), 1 - Math.pow(0.001, dt))
    }

    state.speed = state.vel.length()
    state.pos.addScaledVector(state.vel, dt)
    resolveCollisions(state.pos)

    // hover-bot animation
    const g = group.current
    g.position.set(state.pos.x, 0, state.pos.z)
    g.rotation.y = state.yaw
    const bob = Math.sin(t * 3.2) * 0.09
    body.current.position.y = 1.25 + bob + state.speed * 0.008
    body.current.rotation.x = THREE.MathUtils.lerp(body.current.rotation.x, state.speed * 0.045, dt * 6)
    body.current.rotation.z = Math.sin(t * 2.1) * 0.03
    const flare = 0.7 + state.speed * 0.09 + Math.sin(t * 12) * 0.08
    engine.current.scale.setScalar(flare)
    engineLight.current.intensity = 4 + state.speed * 0.7

    // third-person camera: yaw eases toward player facing while moving
    if (state.speed > 0.6) {
      let dYaw = state.yaw - state.camYaw
      while (dYaw > Math.PI) dYaw -= Math.PI * 2
      while (dYaw < -Math.PI) dYaw += Math.PI * 2
      state.camYaw += dYaw * Math.min(1, dt * 1.6)
    }
    const camDist = 8.5 + state.speed * 0.18
    camPos.set(
      state.pos.x - Math.sin(state.camYaw) * camDist,
      4.6 + state.speed * 0.06,
      state.pos.z - Math.cos(state.camYaw) * camDist
    )
    camera.position.lerp(camPos, 1 - Math.pow(0.0002, dt))
    camTarget.set(
      state.pos.x + Math.sin(state.camYaw) * 3,
      2.3,
      state.pos.z + Math.cos(state.camYaw) * 3
    )
    camera.lookAt(camTarget)

    // zone proximity → interaction prompt
    let near = null
    let best = ZONE_TRIGGER_RADIUS * ZONE_TRIGGER_RADIUS
    for (const zn of ZONES) {
      const dx = state.pos.x - zn.x
      const dz = state.pos.z - zn.z
      const d2 = dx * dx + dz * dz
      if (d2 < best) { best = d2; near = zn.id }
    }
    // central hologram → exit to the classic 2D site
    if (!near && state.pos.x * state.pos.x + state.pos.z * state.pos.z < best) near = 'hero'
    if (near !== state.lastNear) {
      state.lastNear = near
      s.setNearZone(near)
    }

    // minimap position (throttled to ~10 Hz; dt-based so a clock
    // reset across remounts can never wedge the updates)
    state.storeAcc += dt
    if (state.storeAcc > 0.1) {
      state.storeAcc = 0
      s.setPlayerPos({ x: state.pos.x, z: state.pos.z, rot: state.yaw })
    }
    if (typeof window !== 'undefined') window.__pos = state.pos
  })

  return (
    <group ref={group}>
      <group ref={body} position={[0, 1.25, 0]}>
        {/* torso */}
        <mesh castShadow>
          <capsuleGeometry args={[0.42, 0.7, 6, 16]} />
          <meshStandardMaterial color="#3a4a8c" metalness={0.75} roughness={0.28} emissive="#16204a" emissiveIntensity={0.7} />
        </mesh>
        {/* visor */}
        <mesh position={[0, 0.42, 0.3]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.5, 0.18, 0.24]} />
          <meshBasicMaterial color="#00e5ff" toneMapped={false} />
        </mesh>
        {/* chest light */}
        <mesh position={[0, 0.05, 0.42]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color="#4db5ff" toneMapped={false} />
        </mesh>
        {/* side fins */}
        {[-1, 1].map((sd) => (
          <mesh key={sd} position={[sd * 0.52, -0.05, -0.08]} rotation={[0, 0, sd * -0.5]}>
            <boxGeometry args={[0.34, 0.1, 0.5]} />
            <meshStandardMaterial color="#33407e" metalness={0.7} roughness={0.3} emissive="#101838" emissiveIntensity={0.8} />
          </mesh>
        ))}
        {/* engine glow */}
        <mesh ref={engine} position={[0, -0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.3, 20]} />
          <meshBasicMaterial color="#66d9ff" toneMapped={false} transparent opacity={0.85} depthWrite={false} />
        </mesh>
      </group>
      <pointLight ref={engineLight} position={[0, 1, 0]} color="#4db5ff" intensity={4} distance={9} />
      {/* soft ground glow under the bot */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 24]} />
        <meshBasicMaterial color="#164a6e" transparent opacity={0.5} depthWrite={false} />
      </mesh>
    </group>
  )
}
