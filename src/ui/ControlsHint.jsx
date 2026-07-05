import React, { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { useStore } from '../store'

// Thin veil while the city compiles/loads, replacing the old landing page.
export function EnterVeil() {
  const { active } = useProgress()
  const [show, setShow] = useState(true)
  useEffect(() => {
    if (active) { setShow(true); return }
    const t = setTimeout(() => setShow(false), 700)
    return () => clearTimeout(t)
  }, [active])
  if (!show) return null
  return (
    <div className="veil">
      <div className="veil-text">ENTERING THE NEON DISTRICT…</div>
    </div>
  )
}

const MOVE_CODES = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

// Companion strip to the in-world W/A/S/D ground arrows: the remaining
// controls in white. Both dismiss together (store.hintOn) on first move.
export default function ControlsHint() {
  const on = useStore((s) => s.hintOn)
  const setHintOn = useStore((s) => s.setHintOn)
  const touch = useStore((s) => s.touch)

  useEffect(() => {
    if (!on) return
    const t = setTimeout(() => setHintOn(false), 15000)
    const onKey = (e) => MOVE_CODES.includes(e.code) && setHintOn(false)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [on, setHintOn])

  if (!on) return null
  return (
    <div className="chint2" onClick={() => setHintOn(false)} role="note" aria-label="Controls">
      {touch ? (
        <>Drag the joystick to move</>
      ) : (
        <>
          <span className="wkbd">SHIFT</span> boost&nbsp;&nbsp;·&nbsp;&nbsp;
          <span className="wkbd">E</span> interact&nbsp;&nbsp;·&nbsp;&nbsp;
          <span className="wkbd">M</span> fast travel
        </>
      )}
    </div>
  )
}
