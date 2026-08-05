import { useEffect, useRef, useState, useCallback } from 'react'
import { FadeIn, Magnet, AnimatedText, CharHeading } from './Fx.jsx'
import FluidCanvas from './FluidCanvas.jsx'
import Icon from './Icon.jsx'
import { company, services, guide, aboutText } from '../data/content.js'
import consultant from '../assets/consultant.webp'
import portrait from '../assets/consultant-portrait.webp'
import logoNavy from '../assets/logo-mark-navy.png'
import team from '../assets/team.webp'
import techtouch from '../assets/techtouch.webp'
import network from '../assets/network.webp'
import art01 from '../assets/art01.webp'
import art02 from '../assets/art02.webp'
import art03 from '../assets/art03.webp'
import art04 from '../assets/art04.webp'
import art05 from '../assets/art05.webp'
import art06 from '../assets/art06.webp'
import art07 from '../assets/art07.webp'
import art08 from '../assets/art08.webp'
import art09 from '../assets/art09.webp'
import art10 from '../assets/art10.webp'
import art11 from '../assets/art11.webp'
import banner1 from '../assets/banner1.webp'
import banner2 from '../assets/banner2.webp'
import banner3 from '../assets/banner3.webp'
import banner4 from '../assets/banner4.webp'
import banner5 from '../assets/banner5.webp'

/* ─────────────────────────── NAV (floating liquid-glass pill) ─────────────────────────── */
const NAV_LINKS = [
  ['#about', 'About'],
  ['#services', 'Services'],
  ['#verticals', 'Verticals'],
  ['#asha', 'Ask Asha'],
  ['#contact', 'Contact'],
]

export function HeroSection() {
  const [menu, setMenu] = useState(false)
  return (
    <section className="hero3" id="top">
      <FluidCanvas />
      <div className="rise" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <i key={i} style={{ left: `${6 + i * 11}%`, animationDelay: `${-i * 1.9}s`, animationDuration: `${10 + (i % 4) * 3}s` }} />
        ))}
      </div>
      <FadeIn as="nav" y={-16} className="nav3 lg-glass">
        <a className="brand3" href="#top">
          <img src={logoNavy} alt="SMN Phoenix logo" />
          <span>
            SMN <b>Phoenix</b>
          </span>
        </a>
        <div className="nav3-links">
          {NAV_LINKS.map(([h, l]) => (
            <a key={h} href={h}>
              {l}
            </a>
          ))}
        </div>
        <div className="nav3-right">
          <a className="btn-dark" href="#contact">
            Hire Talent
          </a>
          <button className={`burger ${menu ? 'x' : ''}`} aria-label="Menu" onClick={() => setMenu((v) => !v)}>
            <i />
            <i />
          </button>
        </div>
      </FadeIn>
      <div className={`mmenu lg-glass ${menu ? 'open' : ''}`}>
        {NAV_LINKS.map(([h, l], i) => (
          <a key={h} href={h} style={{ transitionDelay: menu ? `${90 + i * 55}ms` : '0ms' }} onClick={() => setMenu(false)}>
            {l}
          </a>
        ))}
      </div>

      {/* living background layer: consultant over fluid canvas */}
      <FadeIn delay={0.5} y={40} className="hero3-person">
        <img src={consultant} alt="SMN Phoenix consultant" />
      </FadeIn>

      {/* four-column meta grid (editorial "face") */}
      <div className="meta3">
        <FadeIn delay={0.15}>
          <h2 className="meta3-h">
            SMN
            <em className="serif-it">Phoenix</em>
          </h2>
          <p className="meta3-blurb">
            * Building People…
            <br />
            Empowering Businesses —
            <br />
            full-spectrum HR partner,
            <br />
            HQ Kalaburagi · PAN-India
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <h2 className="meta3-h">
            TALENT &
            <em className="serif-it">Workforce</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.35}>
          <p className="meta3-label">What we do</p>
          <p className="meta3-body">End-to-end workforce solutions for SMEs and large industrial corporations across India.</p>
        </FadeIn>
        <FadeIn delay={0.45}>
          <p className="meta3-label">Services</p>
          <ul className="meta3-list">
            <li>Permanent Staffing</li>
            <li>Contract Staffing</li>
            <li>Outsourcing</li>
            <li>HR Consulting</li>
            <li>Training & Development</li>
            <li>Payroll & Compliance</li>
          </ul>
        </FadeIn>
      </div>

      <div className="hero3-spacer" />

      {/* bottom composition: giant mixed-font headline + actions */}
      <div className="hero3-bot">
        <CharHeading
          className="hero3-h1"
          lines={[
            { text: 'BUILDING THE' },
            { text: 'people behind', serif: true },
            { text: 'BOLD & GROWING' },
            { text: 'businesses.', serif: true },
          ]}
        />
        <div className="hero3-actions">
          <Magnet padding={80} strength={4}>
            <a className="btn-dark big" href="#contact">
              Hire Talent →
            </a>
          </Magnet>
          <FadeIn delay={0.8} className="asha-mini lg-glass">
            <img src={portrait} alt="Asha" />
            <div>
              <b>Talk with Asha</b>
              <a href="#asha">Ask a question →</a>
            </div>
          </FadeIn>
          <FadeIn delay={1} className="cred3">
            <span>
              <b>LLP</b> ACP-4314
            </span>
            <span>
              <b>GST</b> Registered
            </span>
            <span>
              <b>PAN</b> India
            </span>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={1.2} className="hero3-strip">
        <p>
          Open for staffing mandates — permanent, contract, RPO.{' '}
          <a href="#contact" className="strip-link">
            Schedule a call
          </a>
        </p>
        <p className="strip-right">5 core services • 6 verticals • 7 industries</p>
      </FadeIn>
    </section>
  )
}

/* ─────────────────── MARQUEE — 14 unique cards, scroll-driven ─────────────────── */
const ROW1 = [
  ['Healthcare & Life Sciences', 'Hospitals, diagnostics, pharma', 'heart', team],
  ['Technology & IT', 'IT, ITES, AI, cloud, cybersecurity', 'chip', art01],
  ['Industrial & Manufacturing', 'Automobile, aerospace, FMCG', 'factory', techtouch],
  ['Infrastructure & Logistics', 'Construction, warehousing, e-commerce', 'truck', art02],
  ['Financial Services', 'Banking, insurance, NBFCs', 'bank', art03],
  ['Public Sector & Social', 'Government projects, NGOs, education', 'flag', art04],
  ['Consumer & Retail', 'Retail, hospitality, customer service', 'cart', art05],
]
const ROW2 = [
  ['PAN-India Hiring', 'Recruitment & placement nationwide', 'map', network],
  ['Campus Recruitment', 'Engineering, MBA, ITI, nursing colleges', 'grad', art06],
  ['Executive Search', 'CXO & leadership hiring', 'search', art07],
  ['Payroll & Compliance', 'PF · ESI · CLRA · POSH', 'shield', art08],
  ['HR Consulting', 'Policy, KPIs, HR audits', 'pen', art09],
  ['Training & Development', 'Soft skills & leadership programs', 'book', art10],
  ['Background Verification', 'Police, employment, education checks', 'check', art11],
]
export function MarqueeSection() {
  const secRef = useRef(null)
  const r1 = useRef(null)
  const r2 = useRef(null)
  /* continuous drift + scroll-driven offset — rows never sit still */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const t0 = performance.now()
    const loop = (t) => {
      const drift = (t - t0) * 0.018
      const top = secRef.current?.offsetTop ?? 0
      const off = (window.scrollY - top + window.innerHeight) * 0.3
      if (r1.current) r1.current.style.transform = `translateX(${-((off + drift) % 1200) - 60}px)`
      if (r2.current) r2.current.style.transform = `translateX(${((off + drift) % 1200) - 1260}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  const row = (arr) =>
    [...arr, ...arr].map(([label, desc, icon, img], i) => (
      <div className="tile3" key={i} style={{ backgroundImage: `url(${img})` }}>
        <div className="t3-ic">
          <Icon name={icon} />
        </div>
        <img className="t3-mark" src={logoNavy} alt="" />
        <div className="t3-txt">
          <span>{label}</span>
          <small>{desc}</small>
        </div>
      </div>
    ))
  return (
    <section className="marq3" ref={secRef} aria-label="Industries and services">
      <div className="mrow3" ref={r1}>
        {row(ROW1)}
      </div>
      <div className="mrow3" ref={r2}>
        {row(ROW2)}
      </div>
    </section>
  )
}

/* ─────────────────── ABOUT — soft-tint overlap section (Drift pattern) ─────────────────── */
export function AboutSection() {
  return (
    <section className="about3" id="about">
      <FadeIn as="p" className="about3-lede">
        We don't just supply manpower — we become your strategic HR partner, ensuring your operations run without
        interruption.
      </FadeIn>
      <FadeIn delay={0.15} className="about3-btns">
        <a className="pill-dark" href={`tel:${company.phones[0].replace(/\s/g, '')}`}>
          <span className="pill-ic">
            <Icon name="phone" />
          </span>
          Call us
        </a>
        <a className="pill-soft" href={`mailto:${company.email}`}>
          <span className="pill-ic">
            <Icon name="mail" />
          </span>
          Email us
        </a>
      </FadeIn>
      <div className="about3-divider" aria-hidden="true">
        <i />
        <span />
        <i />
      </div>
      <div className="about3-bottom">
        <FadeIn className="about3-mark">
          <img src={logoNavy} alt="SMN Phoenix" />
          <small>
            Building
            <br />
            People
          </small>
        </FadeIn>
        <AnimatedText className="about3-big" text={aboutText} />
      </div>
    </section>
  )
}

/* ─────────── SERVICES — sticky left rail + scrolling glass cards ─────────── */
const BANNERS = [banner1, banner2, banner3, banner4, banner5]
export function ServicesSection() {
  const [active, setActive] = useState(0)
  const cardRefs = useRef([])
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i))
        }),
      { threshold: 0.6 },
    )
    cardRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])
  const goTo = (i) => cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  return (
    <section className="svc3" id="services">
      <div className="svc3-grid">
        <div className="svc3-rail">
          <FadeIn as="h2" className="h2-3">
            The complete employee lifecycle, <em className="serif-it">one partner.</em>
          </FadeIn>
          <div className="svc3-nav">
            {services.map((s, i) => (
              <button key={s.num} className={active === i ? 'on' : ''} onClick={() => goTo(i)}>
                <span>{s.num}</span> {s.title}
              </button>
            ))}
          </div>
          <FadeIn className="svc3-railfoot">
            <p>From hiring to training, compliance to consulting.</p>
            <a className="btn-dark" href="#contact">
              Hire Talent
            </a>
          </FadeIn>
        </div>
        <div className="svc3-cards">
          {services.map((s, i) => (
            <FadeIn key={s.num} x={64} y={0} className="svc3-card lg-glass">
              <div ref={(el) => (cardRefs.current[i] = el)} data-i={i}>
                <div className="svc3-banner" style={{ backgroundImage: `url(${BANNERS[i]})` }}>
                  <img src={logoNavy} alt="" />
                </div>
                <div className="svc3-body">
                  <span className="mono-line">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── VERTICALS — Apple bento (text glass tiles) ─────────────────── */
const VERTS = [
  ['Healthcare Staffing', 'Doctors, nurses, lab technicians, radiographers, pharmacists, OT technicians.'],
  ['IT Staffing', 'Software, AI, cybersecurity, cloud, data science, SAP & ERP for tech and GCCs.'],
  ['Manufacturing', 'Machine operators, quality engineers, production, maintenance, stores & purchase.'],
  ['Government Projects', 'Data entry operators, health workers, district coordinators, survey teams.'],
  ['Campus Recruitment', 'Engineering, MBA, ITI, diploma, nursing and paramedical colleges.'],
  ['International', 'Middle East, Africa, Singapore, Malaysia — subject to licensing requirements.'],
]
export function VerticalsSection() {
  return (
    <section className="vert3" id="verticals">
      <FadeIn as="h2" className="h2-3 center">
        Where we <em className="serif-it">lead.</em>
      </FadeIn>
      <div className="vert3-grid">
        {VERTS.map(([t, d], i) => (
          <FadeIn key={t} delay={(i % 3) * 0.1} className="vert3-tile lg-glass">
            <img src={logoNavy} alt="" />
            <h3>{t}</h3>
            <p>{d}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────── ASK ASHA (light) ─────────────────────── */
export function AshaSection() {
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [activeQ, setActiveQ] = useState(null)
  const timer = useRef(null)
  const started = useRef(false)
  const secRef = useRef(null)
  const speak = useCallback((full) => {
    clearInterval(timer.current)
    setText('')
    setTyping(true)
    let i = 0
    timer.current = setInterval(() => {
      i += 2
      setText(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(timer.current)
        setTyping(false)
      }
    }, 16)
  }, [])
  useEffect(() => {
    const el = secRef.current
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            speak(guide.greeting)
            io.disconnect()
          }
        }),
      { threshold: 0.4 },
    )
    el && io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(timer.current)
    }
  }, [speak])
  const ask = (q) => {
    setActiveQ(q.id)
    speak(q.a)
  }
  return (
    <section className="asha3" id="asha" ref={secRef}>
      <div className={`asha3-photo ${typing ? 'talking' : ''}`}>
        <div className="halo3" />
        <img src={portrait} alt="Asha — virtual hiring guide" />
      </div>
      <div className="asha3-panel">
        <FadeIn as="h2" className="h2-3">
          Meet <em className="serif-it">Asha.</em>
        </FadeIn>
        <p className="mono-line dim">
          {guide.name} · {guide.role}
        </p>
        <div className="asha3-bubble lg-glass">
          <p>
            {text}
            {typing && <span className="caret3" />}
          </p>
        </div>
        <div className="asha3-qs">
          {guide.questions.map((q) => (
            <button key={q.id} className={activeQ === q.id ? 'active' : ''} onClick={() => ask(q)}>
              {q.q}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── CONTACT + FOOTER (light glass) ─────────────────────── */
const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
export function ContactSection() {
  return (
    <section className="contact3" id="contact">
      <FadeIn as="h2" className="h2-3 center">
        Let's build your team, <em className="serif-it">together.</em>
      </FadeIn>
      <div className="c3-grid">
        <FadeIn className="c3-card lg-glass" delay={0}>
          <div className="c3-ic">
            <Icon name="phone" />
          </div>
          <h3>Call us</h3>
          <a href={`tel:${company.phones[0].replace(/\s/g, '')}`}>{company.phones[0]}</a>
          <a href={`tel:${company.phones[1].replace(/\s/g, '')}`}>{company.phones[1]}</a>
          <small>{company.leadership.map((l) => `${l.name} · ${l.role}`).join(' — ')}</small>
        </FadeIn>
        <FadeIn className="c3-card lg-glass" delay={0.1}>
          <div className="c3-ic">
            <Icon name="mail" />
          </div>
          <h3>Email</h3>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <small>Tell us your roles, volumes and timelines.</small>
        </FadeIn>
        <FadeIn className="c3-card lg-glass" delay={0.2}>
          <div className="c3-ic">
            <Icon name="pin" />
          </div>
          <h3>Head Office — Kalaburagi</h3>
          <p>{company.offices.hq}</p>
          <a className="dir3" href={maps(`${company.offices.hq}, Karnataka`)} target="_blank" rel="noreferrer">
            Get directions →
          </a>
        </FadeIn>
        <FadeIn className="c3-card lg-glass" delay={0.3}>
          <div className="c3-ic">
            <Icon name="pin" />
          </div>
          <h3>Operations — Bengaluru North</h3>
          <p>{company.offices.ops}</p>
          <a className="dir3" href={maps(`${company.offices.ops}, Karnataka`)} target="_blank" rel="noreferrer">
            Get directions →
          </a>
        </FadeIn>
      </div>
      <footer className="foot3">
        <img src={logoNavy} alt="SMN Phoenix" />
        <b>
          SMN <span>Phoenix</span> Talent Sourcing LLP
        </b>
        <p>
          © 2026 · LLP No: {company.llp} · GST: {company.gst}
        </p>
        <p className="foot3-tag">{company.tagline}</p>
      </footer>
    </section>
  )
}
