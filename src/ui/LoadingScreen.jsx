import React, { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { useStore } from '../store'

export default function LoadingScreen() {
  const { progress, active } = useProgress()
  const phase = useStore((s) => s.phase)
  const setPhase = useStore((s) => s.setPhase)
  const setMode = useStore((s) => s.setMode)
  const touch = useStore((s) => s.touch)
  const [minTimePassed, setMinTimePassed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 900)
    return () => clearTimeout(t)
  }, [])

  // `progress` never reaches 100 when the scene has no queued loads,
  // so also treat "nothing loading" as done
  const ready = minTimePassed && (!active || progress >= 100)
  useEffect(() => {
    if (ready && phase === 'loading') setPhase('ready')
  }, [ready, phase, setPhase])

  if (phase === 'playing') return null

  return (
    <div className={`loading ${phase === 'playing' ? 'hidden' : ''}`}>
      <h2>WELCOME TO THE NEON DISTRICT</h2>
      <h1>GOURAV SARKAR</h1>
      <p className="hint">
        An explorable city built from my resume — walk the streets, find the districts:
        experience towers, a publication archive, a trophy plaza and more.
      </p>
      {phase === 'ready' ? (
        <div className="enter-row">
          <button className="nbtn nbtn--solid" onClick={() => setPhase('playing')}>
            ▶ Enter the city
          </button>
          <button className="nbtn" onClick={() => setMode('2d')}>
            Classic 2D site
          </button>
        </div>
      ) : (
        <div className="bar">
          <div style={{ width: `${progress}%` }} />
        </div>
      )}
      <p className="hint" style={{ fontSize: '0.82rem' }}>
        {touch ? 'Drag the joystick to move · tap VIEW near a district' : 'WASD to move · SHIFT to boost · E to interact · M for map'}
      </p>
    </div>
  )
}
