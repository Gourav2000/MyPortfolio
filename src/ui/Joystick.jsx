import React, { useRef, useEffect } from 'react'
import { useStore } from '../store'

// Simple pointer-based virtual joystick for touch devices.
export default function Joystick() {
  const base = useRef()
  const stick = useRef()

  useEffect(() => {
    const el = base.current
    const knob = stick.current
    const setJoy = useStore.getState().setJoy
    let active = null

    const move = (e) => {
      if (active === null) return
      const touch = [...(e.changedTouches || [e])].find((t) => (t.identifier ?? 'mouse') === active)
      if (!touch) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      let dx = (touch.clientX - cx) / (rect.width / 2)
      let dy = (touch.clientY - cy) / (rect.height / 2)
      const len = Math.hypot(dx, dy)
      if (len > 1) { dx /= len; dy /= len }
      knob.style.transform = `translate(${dx * 34}px, ${dy * 34}px)`
      setJoy(dx, -dy) // y up = forward
    }
    const start = (e) => {
      const t = e.changedTouches ? e.changedTouches[0] : e
      active = t.identifier ?? 'mouse'
      move(e)
      e.preventDefault()
    }
    const end = (e) => {
      const t = e.changedTouches ? [...e.changedTouches].find((x) => x.identifier === active) : e
      if (!t && e.type !== 'mouseup') return
      active = null
      knob.style.transform = 'translate(0,0)'
      setJoy(0, 0)
    }

    el.addEventListener('touchstart', start, { passive: false })
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', end)
    el.addEventListener('mousedown', start)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', end)
    return () => {
      el.removeEventListener('touchstart', start)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('touchend', end)
      el.removeEventListener('mousedown', start)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', end)
    }
  }, [])

  return (
    <div className="joystick" ref={base}>
      <div className="stick" ref={stick} />
    </div>
  )
}
