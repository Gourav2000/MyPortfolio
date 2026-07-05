import React, { useEffect, useRef } from 'react'
import { useStore } from '../store'
import { ZONES, WORLD_RADIUS, zoneById } from '../three/layout'
import { SECTIONS, PROFILE } from '../data/content'
import { onInteract } from '../utils/keys'
import { startAmbient, stopAmbient } from '../audio'
import Joystick from './Joystick'

function Minimap() {
  const canvas = useRef()
  useEffect(() => {
    const c = canvas.current
    const g = c.getContext('2d')
    const SIZE = 140
    const scale = (SIZE / 2 - 8) / WORLD_RADIUS
    let raf
    const draw = () => {
      const { playerPos, nearZone } = useStore.getState()
      g.clearRect(0, 0, SIZE, SIZE)
      const cx = SIZE / 2
      // ring road
      g.strokeStyle = 'rgba(77,181,255,0.25)'
      g.lineWidth = 1
      g.beginPath()
      g.arc(cx, cx, 44 * scale, 0, Math.PI * 2)
      g.stroke()
      // zones
      for (const z of ZONES) {
        g.fillStyle = z.id === nearZone ? '#ffffff' : z.accent
        g.beginPath()
        g.arc(cx + z.x * scale, cx + z.z * scale, z.id === nearZone ? 4 : 3, 0, Math.PI * 2)
        g.fill()
      }
      // center hologram
      g.fillStyle = '#4db5ff'
      g.fillRect(cx - 1.5, cx - 1.5, 3, 3)
      // player arrow
      const px = cx + playerPos.x * scale
      const pz = cx + playerPos.z * scale
      g.save()
      g.translate(px, pz)
      g.rotate(-playerPos.rot + Math.PI)
      g.fillStyle = '#ffffff'
      g.beginPath()
      g.moveTo(0, -5)
      g.lineTo(3.5, 4)
      g.lineTo(-3.5, 4)
      g.closePath()
      g.fill()
      g.restore()
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={canvas} className="minimap" width={140} height={140} />
}

export default function HUD() {
  const nearZone = useStore((s) => s.nearZone)
  const openPanel = useStore((s) => s.openPanel)
  const setOpenPanel = useStore((s) => s.setOpenPanel)
  const menuOpen = useStore((s) => s.menuOpen)
  const setMenuOpen = useStore((s) => s.setMenuOpen)
  const soundOn = useStore((s) => s.soundOn)
  const setSoundOn = useStore((s) => s.setSoundOn)
  const setMode = useStore((s) => s.setMode)
  const requestTeleport = useStore((s) => s.requestTeleport)
  const touch = useStore((s) => s.touch)

  // keyboard interactions (E / Esc / M)
  useEffect(() => {
    return onInteract((type) => {
      const s = useStore.getState()
      if (type === 'interact') {
        if (s.openPanel) return
        if (s.nearZone === 'hero') s.setMode('2d')
        else if (s.nearZone) s.setOpenPanel(s.nearZone)
      } else if (type === 'escape') {
        if (s.openPanel) s.setOpenPanel(null)
        else if (s.menuOpen) s.setMenuOpen(false)
      } else if (type === 'menu') {
        s.setMenuOpen(!s.menuOpen)
      }
    })
  }, [])

  const toggleSound = () => {
    if (soundOn) stopAmbient()
    else startAmbient()
    setSoundOn(!soundOn)
  }

  const near =
    nearZone === 'hero'
      ? { id: 'hero', label: 'GOURAV SARKAR', accent: '#4db5ff', action: 'view the classic 2D site' }
      : nearZone
        ? zoneById(nearZone)
        : null

  return (
    <div className="hud">
      <div className="hud-top">
        <div className="hud-brand">
          GOURAV<span>_</span>SARKAR<span> // NEON DISTRICT</span>
        </div>
        <div className="hud-actions">
          <a className="hud-icon-btn" href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
            RESUME
          </a>
          <button className={`hud-icon-btn ${soundOn ? 'active' : ''}`} onClick={toggleSound}>
            {soundOn ? 'SOUND ON' : 'SOUND OFF'}
          </button>
          <button className={`hud-icon-btn ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            MAP [M]
          </button>
        </div>
      </div>

      <Minimap />

      {menuOpen && (
        <div className="menu">
          <h4>FAST TRAVEL</h4>
          {ZONES.map((z) => (
            <button
              key={z.id}
              className="zone-link"
              onClick={() => {
                requestTeleport(z.x, z.z)
                setMenuOpen(false)
                useStore.getState().setHintOn(false) // arrows are spawn-anchored
              }}
            >
              {SECTIONS[z.id].label}
              <span className="dot" style={{ background: z.accent, boxShadow: `0 0 8px ${z.accent}` }} />
            </button>
          ))}
          <div className="menu-footer">
            <button className="hud-icon-btn" onClick={() => setMode('2d')}>
              VIEW CLASSIC 2D SITE
            </button>
          </div>
        </div>
      )}

      {near && !openPanel && (
        <div className="hud-prompt" style={{ borderColor: near.accent }}>
          <b style={{ color: near.accent }}>{near.label}</b>
          <small>
            {touch ? (
              `tap VIEW to ${near.action || 'open'}`
            ) : (
              <>
                press <span className="kbd">E</span> to {near.action || 'open'}
              </>
            )}
          </small>
        </div>
      )}

      {!touch && !openPanel && (
        <div className="hud-controls-hint">WASD / ARROWS — move · SHIFT — boost · E — interact · M — map</div>
      )}

      {touch && !openPanel && (
        <>
          <Joystick />
          {near && (
            <button
              className="touch-interact"
              onClick={() => (near.id === 'hero' ? setMode('2d') : setOpenPanel(near.id))}
            >
              VIEW
            </button>
          )}
        </>
      )}
    </div>
  )
}
