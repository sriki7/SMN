import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import FluidCanvas from './FluidCanvas.jsx'
import { Magnetic } from './Ambient.jsx'
import logoNavy from '../assets/logo-mark-navy.png'
import consultant from '../assets/consultant.webp'

const CHIPS = [
  { cls: 'c1', icon: 'users', title: 'Permanent & Contract Staffing', sub: 'Executive search → bulk hiring' },
  { cls: 'c2', icon: 'shield', title: 'Payroll & Compliance', sub: 'PF · ESI · CLRA · POSH' },
  { cls: 'c3', icon: 'monitor', title: 'Technology-Enabled', sub: 'ATS · HRMS · AI screening' },
  { cls: 'c4', icon: 'target', title: 'HR Consulting & Training', sub: 'Policy · KPIs · Team building' },
]

const NOTES = ['Registered LLP · GST compliant', 'Kalaburagi HQ · Bengaluru Ops', 'Blue collar to CXO']

/* rotating word — all values factual (tagline + industries served) */
const ROTATE = ['Businesses.', 'Healthcare.', 'Manufacturing.', 'IT Teams.', 'Enterprises.']

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATE.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="rot-box">
      <em className="rot-word" key={i}>
        {ROTATE[i]}
      </em>
    </span>
  )
}

/**
 * Hero — layered, mouse-parallax scene around a real consultant photo
 * (image sourced from the company's own brochure), with continuous
 * ambient motion: fluid canvas, flowing lines, rings, particles, rotator.
 */
export default function Hero() {
  const heroRef = useRef(null)

  /* mouse-driven depth parallax: sets --px / --py in [-1, 1] */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = heroRef.current
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const px = ((e.clientX - r.left) / r.width - 0.5) * 2
        const py = ((e.clientY - r.top) / r.height - 0.5) * 2
        el.style.setProperty('--px', px.toFixed(3))
        el.style.setProperty('--py', py.toFixed(3))
      })
    }
    const onLeave = () => {
      el.style.setProperty('--px', 0)
      el.style.setProperty('--py', 0)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <header id="top" ref={heroRef}>
      <FluidCanvas />
      <svg className="wavelines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <path className="wl wl1" d="M-100 700 C 300 620, 500 830, 900 720 S 1400 560, 1600 640" stroke="#b9d7e8" strokeWidth="1.6" />
        <path className="wl wl2" d="M-100 740 C 300 660, 520 870, 920 760 S 1420 600, 1620 680" stroke="#bfe3e0" strokeWidth="1.4" />
        <path className="wl wl3" d="M-100 780 C 300 700, 540 910, 940 800 S 1440 640, 1640 720" stroke="#b9d7e8" strokeWidth="1.2" />
      </svg>

      <div className="hero-wrap">
        <div className="hero-copy">
          <span className="kicker">
            <i />
            Strategic HR Partner · PAN-India
          </span>
          <h1>
            <span className="w">
              <b style={{ animationDelay: '.15s' }}>Building</b>
            </span>{' '}
            <span className="w">
              <b style={{ animationDelay: '.26s' }}>People.</b>
            </span>
            <br />
            <span className="w">
              <b style={{ animationDelay: '.4s' }}>
                <em className="shimmer">Empowering</em>
              </b>
            </span>
            <br />
            <span className="w">
              <b style={{ animationDelay: '.54s' }}>
                <RotatingWord />
              </b>
            </span>
          </h1>
          <p className="sub">
            SMN Phoenix Talent Sourcing LLP is your end-to-end workforce partner — permanent &amp; contract staffing,
            payroll, compliance, HR consulting and training, delivered with speed, precision and full statutory
            compliance.
          </p>
          <div className="hero-cta">
            <Magnetic>
              <a href="#contact">
                <button className="cta big">Hire Talent →</button>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#contact">
                <button className="btn2">I'm Looking for a Job</button>
              </a>
            </Magnetic>
          </div>
          <div className="hero-note">
            {NOTES.map((n) => (
              <span key={n}>
                <Icon name="check" strokeWidth={2.4} />
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* layered parallax scene */}
        <div className="scene">
          <div className="layer l-glow" />
          <img className="layer l-mark" src={logoNavy} alt="" />
          <div className="layer l-ring r-dash" />
          <div className="layer l-ring r-pulse p1" />
          <div className="layer l-ring r-pulse p2" />
          <div className="rise" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ left: `${8 + i * 9}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${9 + (i % 4) * 3}s` }} />
            ))}
          </div>
          <div className="layer l-person">
            <img src={consultant} alt="SMN Phoenix HR consultant" />
          </div>
          <div className="layer l-platform" />
          {CHIPS.map((c) => (
            <div className={`layer cw ${c.cls}`} key={c.cls}>
              <div className="chip">
                <div className="ic">
                  <Icon name={c.icon} />
                </div>
                <div>
                  <b>{c.title}</b>
                  <small>{c.sub}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <i />
        Scroll
      </div>
    </header>
  )
}
