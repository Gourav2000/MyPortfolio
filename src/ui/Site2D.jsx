import React, { useEffect, useRef } from 'react'
import { useStore } from '../store'
import { PROFILE, SECTIONS, ZONE_ORDER } from '../data/content'
import { SectionBody, SECTION_EYEBROWS } from './sections'

const NAV_LINKS = ['about', 'experience', 'skills', 'projects', 'publications', 'contact']

const SOCIAL_ICONS = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.12c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>
  ),
  'Google Scholar': (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 1 9l4.06 2.58A6.98 6.98 0 0 1 12 8.5c2.83 0 5.27 1.68 6.38 4.09L23 9.6 12 2zm0 8.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/></svg>
  ),
  HackerRank: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5 3 6.7v10.6l9 5.2 9-5.2V6.7L12 1.5zm3.2 15.3h-1.6v-3.6H10.4v3.6H8.8V7.2h1.6v3.7h3.2V7.2h1.6v9.6z"/></svg>
  ),
}

// adds .visible to .reveal elements as they scroll into view
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { root, threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])
}

export default function Site2D({ webglOk }) {
  const setMode = useStore((s) => s.setMode)
  const setPhase = useStore((s) => s.setPhase)
  const scroller = useRef()
  useReveal(scroller)

  return (
    <div className="site2d" ref={scroller}>
      <nav className="nav2d">
        <a className="nav2d-brand" href="#top">
          GS<span>_</span>
        </a>
        <div className="nav2d-links">
          {NAV_LINKS.map((id) => (
            <a key={id} href={`#${id}`}>
              {SECTIONS[id].label}
            </a>
          ))}
        </div>
        {webglOk && (
          <button
            className="nbtn nbtn--solid nav2d-3d"
            onClick={() => {
              setPhase('ready')
              setMode('3d')
            }}
          >
            ▶ 3D CITY
          </button>
        )}
      </nav>

      <div className="wrap" id="top">
        <div className="hero2d">
          <div className="hero2d-photo reveal">
            <img src={PROFILE.photo} alt="Gourav Sarkar" />
          </div>
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
          </div>
          <div className="hero2d-socials">
            {PROFILE.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}>
                {SOCIAL_ICONS[s.label]}
              </a>
            ))}
          </div>
        </div>

        {ZONE_ORDER.map((id) => (
          <section key={id} id={id} className="section-2d reveal">
            <h5 className="eyebrow">{SECTION_EYEBROWS[id]}</h5>
            <h2 className="title" style={{ color: SECTIONS[id].accent }}>
              {SECTIONS[id].label}
            </h2>
            <SectionBody id={id} />
          </section>
        ))}

        <footer>
          <div className="hero2d-socials" style={{ marginBottom: '1rem' }}>
            {PROFILE.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}>
                {SOCIAL_ICONS[s.label]}
              </a>
            ))}
          </div>
          © {new Date().getFullYear()} {PROFILE.name} · Built with React Three Fiber
        </footer>
      </div>
    </div>
  )
}
