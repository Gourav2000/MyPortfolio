import React, { useEffect } from 'react'
import { useStore } from '../store'
import { SECTIONS } from '../data/content'
import { SectionBody, SECTION_EYEBROWS } from './sections'

export default function Panel() {
  const openPanel = useStore((s) => s.openPanel)
  const setOpenPanel = useStore((s) => s.setOpenPanel)

  useEffect(() => {
    if (!openPanel) return
    const onKey = (e) => {
      if (e.code === 'Escape') setOpenPanel(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openPanel, setOpenPanel])

  if (!openPanel) return null
  const section = SECTIONS[openPanel]

  return (
    <div className="panel-backdrop" onClick={(e) => e.target === e.currentTarget && setOpenPanel(null)}>
      <div className="panel" role="dialog" aria-label={section.label}>
        <button className="panel-close" onClick={() => setOpenPanel(null)} aria-label="Close">
          ✕
        </button>
        <h5 className="eyebrow">{SECTION_EYEBROWS[openPanel]}</h5>
        <h2 className="title" style={{ color: section.accent }}>{section.label}</h2>
        <SectionBody id={openPanel} />
      </div>
    </div>
  )
}
