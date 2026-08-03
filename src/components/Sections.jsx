import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { industries, services, spectrum, verticals, techStack, processSteps } from '../data/content.js'
import logoWhite from '../assets/logo-mark-white.png'

/* tilt-on-hover for cards (same behaviour as approved mockup) */
function tiltMove(e) {
  const c = e.currentTarget
  const r = c.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  c.style.transform = `translateY(-10px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`
}
function tiltLeave(e) {
  e.currentTarget.style.transform = ''
}

export function IndustriesMarquee() {
  const items = [...industries, ...industries]
  return (
    <div className="marq" aria-hidden="true">
      <div className="track">
        {items.map((n, i) => (
          <span key={i}>{n}</span>
        ))}
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services">
      <div className="split">
        <Reveal>
          <span className="tag">Core Services</span>
          <h2>
            The complete employee lifecycle, <em>one partner.</em>
          </h2>
        </Reveal>
        <Reveal as="p" className="lead">
          From hiring to training, compliance to consulting — a comprehensive portfolio designed for SMEs and large
          industrial corporations alike.
        </Reveal>
      </div>
      <div className="grid5">
        {services.map((s, i) => (
          <Reveal className="card" key={s.num} delay={(i % 3) * 90} onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
            <span className="num">{s.num}</span>
            <div className="ic">
              <Icon name={s.icon} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
        <Reveal className="card dark-card" delay={180}>
          <span className="num">＋</span>
          <h3>Full-Spectrum Portfolio</h3>
          <p>
            Payroll · Compliance (PF, ESI, PT, CLRA, POSH) · RPO · Background Verification · Executive Search · HR Legal
            Documentation · HRMS Implementation.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Spectrum() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="split">
        <Reveal>
          <span className="tag">Beyond Staffing</span>
          <h2>A truly self-sufficient, one-stop HR partner.</h2>
        </Reveal>
      </div>
      <Reveal className="chips">
        {spectrum.map((s) => (
          <span className="pill" key={s}>
            <Icon name="check" strokeWidth={2.2} />
            {s}
          </span>
        ))}
      </Reveal>
    </section>
  )
}

export function Verticals() {
  return (
    <section id="verticals" style={{ paddingTop: 20 }}>
      <div className="split">
        <Reveal>
          <span className="tag">Specialized Verticals</span>
          <h2>Where we lead.</h2>
        </Reveal>
        <Reveal as="p" className="lead">
          Dedicated practice areas with sector-specific expertise, deep talent networks, and command of each vertical's
          regulatory nuances.
        </Reveal>
      </div>
      <div className="vgrid">
        {verticals.map((v, i) => (
          <Reveal className="vt" key={v.title} delay={(i % 3) * 90} onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
            <span className="em">{v.em}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function DigitalEdge() {
  return (
    <Reveal className="darkband" id="tech">
      <div className="dark">
        <div className="glow" />
        <span className="tag">Technology Stack</span>
        <h2>
          Technology-enabled HR.
          <br />
          Our digital edge.
        </h2>
        <p className="lead">
          Technology integration from Day 1 — faster, more accurate, more transparent HR services at scale.
        </p>
        <div className="tgrid">
          {techStack.map((t) => (
            <div className="tk" key={t.title}>
              <span className="dot" />
              <b>{t.title}</b>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export function Process() {
  return (
    <section id="process" style={{ paddingTop: 0 }}>
      <div className="split">
        <Reveal>
          <span className="tag">How We Work</span>
          <h2>From brief to deployed workforce.</h2>
        </Reveal>
      </div>
      <div className="steps">
        {processSteps.map((p, i) => (
          <Reveal className="st" key={p.title} delay={i * 90}>
            <b>{p.title}</b>
            <p>{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function CtaBand() {
  return (
    <Reveal className="ctawrap">
      <div className="ctaband">
        <img src={logoWhite} alt="" />
        <h2>Hire one leader or deploy a thousand workers.</h2>
        <p>Whatever the workforce challenge, SMN Phoenix is your trusted partner. Let's build your team, together.</p>
        <a href="#contact">
          <button className="btnw">Partner With Us →</button>
        </a>
      </div>
    </Reveal>
  )
}
