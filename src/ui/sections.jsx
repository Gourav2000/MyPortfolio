import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { SECTIONS, PROFILE } from '../data/content'

// Section bodies shared by the 3D panel overlay and the 2D fallback site.

function AboutBody() {
  const s = SECTIONS.about
  return (
    <>
      <div className="about-flex">
        <div className="about-photo">
          <img src={PROFILE.aboutPhoto} alt="Gourav Sarkar" />
        </div>
        <p className="lead">{s.intro}</p>
      </div>
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
    <>
      <div className="pcard-featured-grid">
        {s.featured.map((p) => (
          <article className="pcard pcard--featured" key={p.title}>
            <div className="pcard-img">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="pcard-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="links">
                <a className="nbtn" href={p.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="pcard-grid">
        {s.more.map((p) => (
          <article className="pcard" key={p.title}>
            <div className="pcard-img">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="pcard-overlay">
                <a className="nbtn" href={p.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
            <div className="pcard-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

const LinkedInMark = () => (
  <svg className="testi-li-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
)

function TestimonialsBody() {
  return (
    <div className="testi-grid">
      {SECTIONS.testimonials.reviews.map((r, i) => {
        const Card = r.linkedin ? 'a' : 'div'
        const linkProps = r.linkedin
          ? { href: r.linkedin, target: '_blank', rel: 'noreferrer', title: `${r.name} on LinkedIn` }
          : {}
        return (
          <Card className="testi" key={i} {...linkProps}>
            <div className="testi-avatar">
              <img src={r.avatar} alt={r.name} loading="lazy" />
            </div>
            <blockquote>“{r.review}”</blockquote>
            <div className="testi-caption">
              <span className="testi-name">
                {r.name}
                {r.linkedin && <LinkedInMark />}
              </span>
              {r.title && <span className="testi-title">{r.title}</span>}
            </div>
          </Card>
        )
      })}
    </div>
  )
}

function PublicationsBody() {
  const s = SECTIONS.publications
  return (
    <>
      {s.papers.map((p) => (
        <div className="paper" key={p.title}>
          <h3>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.title} <span className="paper-link-icon">↗</span>
              </a>
            ) : (
              p.title
            )}
          </h3>
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
          <div className="cert-main">
            <img className="cert-badge" src={c.image} alt={c.issuer} loading="lazy" />
            <div>
              <h3>{c.title}</h3>
              <div className="meta">
                {c.issuer} · Issued {c.time} · ID {c.credId}
              </div>
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
        <div className="job" key={e.degree}>
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
  testimonials: TestimonialsBody,
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
  testimonials: 'Hall of allies · What people say',
  certifications: 'Badge vault · Verified',
  education: 'The academy · Where I studied',
  contact: 'Signal tower · Get in touch',
}
