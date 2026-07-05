import React from 'react'
import { useStore } from '../store'
import { PROFILE, SECTIONS, ZONE_ORDER } from '../data/content'
import { SectionBody, SECTION_EYEBROWS } from './sections'

// Full classic one-page site — used as a fallback for devices
// without WebGL and for visitors who prefer scrolling.
export default function Site2D({ webglOk }) {
  const setMode = useStore((s) => s.setMode)
  const setPhase = useStore((s) => s.setPhase)

  return (
    <div className="site2d">
      <div className="wrap">
        <div className="hero2d">
          <h5 className="eyebrow" style={{ letterSpacing: '0.4em', color: 'var(--text-dim)' }}>
            HELLO, I AM
          </h5>
          <h1>{PROFILE.name}</h1>
          <h3>{PROFILE.role}</h3>
          <p className="dim" style={{ marginTop: '0.5rem', letterSpacing: '0.2em' }}>{PROFILE.tagline}</p>
          <div className="row">
            {webglOk && (
              <button
                className="nbtn nbtn--solid"
                onClick={() => {
                  setPhase('ready')
                  setMode('3d')
                }}
              >
                ▶ Explore the 3D city
              </button>
            )}
            <a className="nbtn" href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
            {PROFILE.socials.slice(0, 2).map((s) => (
              <a key={s.label} className="nbtn" href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {ZONE_ORDER.map((id) => (
          <section key={id} id={id} className="section-2d">
            <h5 className="eyebrow">{SECTION_EYEBROWS[id]}</h5>
            <h2 className="title" style={{ color: SECTIONS[id].accent }}>
              {SECTIONS[id].label}
            </h2>
            <SectionBody id={id} />
          </section>
        ))}

        <footer>
          © {new Date().getFullYear()} {PROFILE.name} · Built with React Three Fiber
        </footer>
      </div>
    </div>
  )
}
