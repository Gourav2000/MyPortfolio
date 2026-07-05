import { create } from 'zustand'

// coarse pointer = phone/tablet; a touchscreen laptop still counts as desktop
export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export const useStore = create((set) => ({
  // 'loading' → 'ready' (enter button shown) → 'playing'
  phase: 'loading',
  setPhase: (phase) => set({ phase }),

  // '3d' | '2d'
  mode: '3d',
  setMode: (mode) => set({ mode }),

  // zone id the player is standing near (null = none)
  nearZone: null,
  setNearZone: (nearZone) => set({ nearZone }),

  // zone id whose panel is open (null = closed)
  openPanel: null,
  setOpenPanel: (openPanel) => set({ openPanel }),

  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),

  // teleport request: { x, z } consumed by Player
  teleport: null,
  requestTeleport: (x, z) => set({ teleport: { x, z, t: Date.now() } }),
  clearTeleport: () => set({ teleport: null }),

  soundOn: false,
  setSoundOn: (soundOn) => set({ soundOn }),

  touch: isTouchDevice(),

  // joystick vector written by the UI joystick, read by Player each frame
  joy: { x: 0, y: 0 },
  setJoy: (x, y) => set({ joy: { x, y } }),

  // live player position for the minimap (throttled writes)
  playerPos: { x: 0, z: 0, rot: 0 },
  setPlayerPos: (playerPos) => set({ playerPos }),
}))

// debug/automation handle
if (typeof window !== 'undefined') window.__store = useStore
