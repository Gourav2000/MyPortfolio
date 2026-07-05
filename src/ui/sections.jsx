import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { SECTIONS, PROFILE } from '../data/content'

// Section bodies shared by the 3D panel overlay and the 2D fallback site.

function AboutBody() {
  const s = SECTIONS.about
  return (
    <>
      <p className="lead">{s.intro}</p>
      <div className="fact-grid">
        {s.facts.map((f) => (
          <div className="fact" key={f.v}>
            <b>{f.k}</b>
            <span>{f.v}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function ExperienceBody() {
  return (
    <>
      {SECTIONS.experience.jobs.map((j) => (
        <div className="job" key={j.company + j.time}>
          <h3>
            {j.title} · <span style={{ color: 'var(--primary)' }}>{j.company}</span>
          </h3>
          <div className="meta">
            {j.place} · {j.time}
          </div>
          <ul>
            {j.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

function SkillsBody() {
  return (
    <>
      {SECTIONS.skills.groups.map((g) => (
        <div className="chip-group" key={g.name}>
          <h3>{g.name}</h3>
          <div className="chips">
            {g.items.map((i) => (
              <span className="chip" key={i}>{i}</span>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function ProjectsBody() {
  const s = SECTIONS.projects
  return (
    <div className="card-grid">
      {s.featured.map((p) => (
        <article className="card featured" key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="links">
            <a href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </article>
      ))}
      {s.more.map((p) => (
        <article className="card" key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <div className="links">
            <a href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </article>
      ))}
    </div>
  )
}

function PublicationsBody() {
  const s = SECTIONS.publications
  return (
    <>
      {s.papers.map((p) => (
        <div className="paper" key={p.title}>
          <h3>{p.title}</h3>
          <div className="meta">
            {p.authors} · <i>{p.venue}</i>
            <span className={`status ${p.status === 'Accepted' ? 'accepted' : ''}`}>{p.status}</span>
          </div>
        </div>
      ))}
      <a className="nbtn" href={s.scholar} target="_blank" rel="noreferrer" style={{ marginTop: '0.5rem' }}>
        Google Scholar
      </a>
    </>
  )
}

function AchievementsBody() {
  return (
    <>
      {SECTIONS.achievements.items.map((a) => (
        <div className="ach" key={a.title}>
          <div className="big">{a.big}</div>
          <div>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
            <p className="dim" style={{ fontSize: '0.82rem', marginTop: '0.3rem' }}>{a.time}</p>
          </div>
        </div>
      ))}
    </>
  )
}

function CertificationsBody() {
  return (
    <>
      {SECTIONS.certifications.certs.map((c) => (
        <div className="cert" key={c.title}>
          <div>
            <h3>{c.title}</h3>
            <div className="meta">
              {c.issuer} · Issued {c.time} · ID {c.credId}
            </div>
          </div>
          <a className="nbtn" href={c.url} target="_blank" rel="noreferrer">Verify</a>
        </div>
      ))}
    </>
  )
}

function EducationBody() {
  return (
    <>
      {SECTIONS.education.schools.map((e) => (
        <div className="job" key={e.school}>
          <h3>{e.degree}</h3>
          <div className="meta">
            {e.school} · {e.place} · {e.time}
          </div>
          <p className="lead" style={{ color: 'var(--primary)', fontWeight: 700 }}>{e.detail}</p>
        </div>
      ))}
    </>
  )
}

function ContactBody() {
  const form = useRef()
  const [status, setStatus] = useState('')
  const { emailjs: cfg } = SECTIONS.contact

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('Transmitting…')
    emailjs
      .sendForm(cfg.serviceId, cfg.templateId, form.current, { publicKey: cfg.publicKey })
      .then(() => {
        setStatus('Message sent — I will get back to you soon.')
        form.current.reset()
      })
      .catch(() => setStatus('Sending failed — email me directly instead.'))
  }

  return (
    <div className="contact-grid">
      <div className="contact-ways">
        <div className="cway">
          <b>Email</b>
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </div>
        <div className="cway">
          <b>WhatsApp</b>
          <a href={PROFILE.whatsapp} target="_blank" rel="noreferrer">{PROFILE.phone}</a>
        </div>
        {PROFILE.socials.map((s) => (
          <div className="cway" key={s.label}>
            <b>{s.label}</b>
            <a href={s.url} target="_blank" rel="noreferrer">{s.url.replace('https://', '').slice(0, 42)}…</a>
          </div>
        ))}
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="name" placeholder="Your Full Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" rows="7" placeholder="Your Message" required />
        <button type="submit" className="nbtn nbtn--solid">Send Message</button>
        {status && <div className="form-status">{status}</div>}
      </form>
    </div>
  )
}

const BODIES = {
  about: AboutBody,
  experience: ExperienceBody,
  skills: SkillsBody,
  projects: ProjectsBody,
  publications: PublicationsBody,
  achievements: AchievementsBody,
  certifications: CertificationsBody,
  education: EducationBody,
  contact: ContactBody,
}

export function SectionBody({ id }) {
  const Body = BODIES[id]
  return Body ? <Body /> : null
}

export const SECTION_EYEBROWS = {
  about: 'Identity core · Get to know',
  experience: "Career towers · Where I've worked",
  skills: 'Crystal garden · What I work with',
  projects: 'Billboard alley · Things I built',
  publications: 'The archive · Research',
  achievements: 'Trophy plaza · Wins',
  certifications: 'Badge vault · Verified',
  education: 'The academy · Where I studied',
  contact: 'Signal tower · Get in touch',
}
