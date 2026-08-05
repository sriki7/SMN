import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn, Magnet, ContactButton, GhostButton, AnimatedText } from './Fx.jsx'
import Icon from './Icon.jsx'
import { company, industries, services, verticalCards, guide, aboutText } from '../data/content.js'
import consultant from '../assets/consultant.webp'
import portrait from '../assets/consultant-portrait.webp'
import markTeal from '../assets/logo-mark-white.png'
import markNavy from '../assets/logo-mark-navy.png'
import orbTeal from '../assets/orb-teal.png'
import orbBlue from '../assets/orb-blue.png'
import team from '../assets/team.webp'
import techtouch from '../assets/techtouch.webp'
import network from '../assets/network.webp'

/* ─────────────────────────── HERO ─────────────────────────── */
export function HeroSection() {
  return (
    <section className="hero2" id="top">
      <FadeIn as="nav" y={-20} className="nav2">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#verticals">Verticals</a>
        <a href="#asha">Ask Asha</a>
        <a href="#contact">Contact</a>
      </FadeIn>

      <div className="hero2-head">
        <FadeIn as="h1" delay={0.15} y={40} className="hero-heading">
          SMN&nbsp;PHOENIX
        </FadeIn>
      </div>

      <Magnet padding={150} strength={3} className="hero2-portrait">
        <FadeIn delay={0.6} y={30}>
          <img src={consultant} alt="SMN Phoenix consultant" />
        </FadeIn>
      </Magnet>

      <div className="hero2-bottom">
        <FadeIn as="p" delay={0.35} y={20} className="hero2-tag">
          Your strategic HR partner for end-to-end workforce solutions across India
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton label="Hire Talent" />
        </FadeIn>
      </div>
    </section>
  )
}

/* ─────────────────── MARQUEE (scroll-driven rows) ─────────────────── */
const TILES = [...industries, 'PAN-India Hiring', 'Campus Recruitment', 'Executive Search', 'Payroll & Compliance']
export function MarqueeSection() {
  const secRef = useRef(null)
  const r1 = useRef(null)
  const r2 = useRef(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const top = secRef.current?.offsetTop ?? 0
        const off = (window.scrollY - top + window.innerHeight) * 0.3
        if (r1.current) r1.current.style.transform = `translateX(${off - 200}px)`
        if (r2.current) r2.current.style.transform = `translateX(${-(off - 200)}px)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const row = (arr, imgs) =>
    [...arr, ...arr, ...arr].map((n, i) => (
      <div className="mtile" key={i} style={imgs && imgs[i % arr.length] ? { backgroundImage: `url(${imgs[i % arr.length]})` } : undefined}>
        <span>{n}</span>
      </div>
    ))

  const imgsA = [techtouch, null, team, null, network, null]
  const imgsB = [null, network, null, techtouch, null, team]
  return (
    <section className="marq2" ref={secRef}>
      <div className="mrow" ref={r1}>
        {row(TILES.slice(0, 6), imgsA)}
      </div>
      <div className="mrow" ref={r2}>
        {row(TILES.slice(5), imgsB)}
      </div>
    </section>
  )
}

/* ─────────────────────────── ABOUT ─────────────────────────── */
export function AboutSection() {
  return (
    <section className="about2" id="about">
      <FadeIn className="deco d-tl" delay={0.1} x={-80} y={0} duration={0.9}>
        <img src={markTeal} alt="" />
      </FadeIn>
      <FadeIn className="deco d-bl" delay={0.25} x={-80} y={0} duration={0.9}>
        <img src={orbTeal} alt="" />
      </FadeIn>
      <FadeIn className="deco d-tr" delay={0.15} x={80} y={0} duration={0.9}>
        <img src={orbBlue} alt="" />
      </FadeIn>
      <FadeIn className="deco d-br" delay={0.3} x={80} y={0} duration={0.9}>
        <img src={markTeal} alt="" style={{ transform: 'scaleX(-1)' }} />
      </FadeIn>

      <FadeIn as="h2" y={40} className="hero-heading giant">
        About us
      </FadeIn>
      <AnimatedText className="about2-text" text={aboutText} />
      <ContactButton label="Partner With Us" />
    </section>
  )
}

/* ─────────────────────── SERVICES (white) ─────────────────────── */
export function ServicesSection() {
  return (
    <section className="services2" id="services">
      <FadeIn as="h2" y={40} className="giant dark-head">
        Services
      </FadeIn>
      <div className="svc-list">
        {services.map((s, i) => (
          <FadeIn className="svc-item" key={s.num} delay={i * 0.1}>
            <span className="svc-num">{s.num}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ─────────────── VERTICALS (sticky stacking cards) ─────────────── */
function StackCard({ v, index, total, progress, range, targetScale }) {
  const scale = useTransform(progress, range, [1, targetScale])
  return (
    <div className="stack-slot" style={{ top: `${index * 28}px` }}>
      <motion.div className="stack-card" style={{ scale }}>
        <div className="sc-top">
          <span className="svc-num light">{v.num}</span>
          <div className="sc-meta">
            <small>{v.cat}</small>
            <h3>{v.title}</h3>
          </div>
          <GhostButton label="Hire Talent" />
        </div>
        <p className="sc-desc">{v.text}</p>
        <div className="sc-imgs">
          <div className="sc-col1">
            <img src={v.imgs[0]} alt="" loading="lazy" />
            <img src={v.imgs[1]} alt="" loading="lazy" />
          </div>
          <div className="sc-col2">
            <img src={v.imgs[2]} alt="" loading="lazy" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function VerticalsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const cards = verticalCards.map((v, i) => ({ ...v, imgs: [ [team, techtouch, network], [techtouch, network, team], [network, team, techtouch] ][i % 3] }))
  return (
    <section className="stack2" id="verticals" ref={ref}>
      <FadeIn as="h2" y={40} className="hero-heading giant">
        Verticals
      </FadeIn>
      {cards.map((v, i) => (
        <StackCard
          key={v.num}
          v={v}
          index={i}
          total={cards.length}
          progress={scrollYProgress}
          range={[i / cards.length, 1]}
          targetScale={1 - (cards.length - 1 - i) * 0.03}
        />
      ))}
    </section>
  )
}

/* ─────────────────────── ASK ASHA (dark) ─────────────────────── */
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
    <section className="asha2" id="asha" ref={secRef}>
      <div className={`asha2-photo ${typing ? 'talking' : ''}`}>
        <img src={portrait} alt="Asha — virtual hiring guide" />
      </div>
      <div className="asha2-panel">
        <FadeIn as="h2" y={30} className="hero-heading med">
          Ask Asha
        </FadeIn>
        <p className="asha2-sub">
          {guide.name} · {guide.role}
        </p>
        <div className="asha2-bubble">
          <p>
            {text}
            {typing && <span className="caret" />}
          </p>
        </div>
        <div className="asha2-qs">
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

/* ─────────────────────── CONTACT + FOOTER ─────────────────────── */
const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
export function ContactSection() {
  return (
    <section className="contact2" id="contact">
      <FadeIn as="h2" y={40} className="hero-heading giant">
        Contact
      </FadeIn>
      <div className="c2-grid">
        <FadeIn className="c2-card" delay={0}>
          <div className="c2-ic">
            <Icon name="phone" />
          </div>
          <h3>Call us</h3>
          <a href={`tel:${company.phones[0].replace(/\s/g, '')}`}>{company.phones[0]}</a>
          <a href={`tel:${company.phones[1].replace(/\s/g, '')}`}>{company.phones[1]}</a>
          <small>{company.leadership.map((l) => `${l.name} · ${l.role}`).join(' — ')}</small>
        </FadeIn>
        <FadeIn className="c2-card" delay={0.1}>
          <div className="c2-ic">
            <Icon name="mail" />
          </div>
          <h3>Email</h3>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <small>Tell us your roles, volumes and timelines — we take it from there.</small>
        </FadeIn>
        <FadeIn className="c2-card" delay={0.2}>
          <div className="c2-ic">
            <Icon name="pin" />
          </div>
          <h3>Head Office — Kalaburagi</h3>
          <p>{company.offices.hq}</p>
          <a className="dir2" href={maps(`${company.offices.hq}, Karnataka`)} target="_blank" rel="noreferrer">
            Get directions →
          </a>
        </FadeIn>
        <FadeIn className="c2-card" delay={0.3}>
          <div className="c2-ic">
            <Icon name="pin" />
          </div>
          <h3>Operations — Bengaluru North</h3>
          <p>{company.offices.ops}</p>
          <a className="dir2" href={maps(`${company.offices.ops}, Karnataka`)} target="_blank" rel="noreferrer">
            Get directions →
          </a>
        </FadeIn>
      </div>
      <FadeIn className="c2-cta" delay={0.15}>
        <ContactButton label="Call Now" href={`tel:${company.phones[0].replace(/\s/g, '')}`} />
        <GhostButton label="Write To Us" href={`mailto:${company.email}`} />
      </FadeIn>
      <footer className="foot2">
        <img src={markNavy} alt="" className="foot2-mark" />
        <p>
          © 2026 {company.name} · LLP No: {company.llp} · GST: {company.gst}
        </p>
        <p className="foot2-tag">{company.tagline}</p>
      </footer>
    </section>
  )
}
