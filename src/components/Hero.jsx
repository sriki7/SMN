import { useEffect } from 'react'
import Icon from './Icon.jsx'
import logoNavy from '../assets/logo-mark-navy.png'

const CHIPS = [
  { cls: 'c1', icon: 'users', title: 'Permanent & Contract Staffing', sub: 'Executive search → bulk hiring' },
  { cls: 'c2', icon: 'shield', title: 'Payroll & Compliance', sub: 'PF · ESI · CLRA · POSH' },
  { cls: 'c3', icon: 'monitor', title: 'Technology-Enabled', sub: 'ATS · HRMS · AI screening' },
  { cls: 'c4', icon: 'target', title: 'HR Consulting & Training', sub: 'Policy · KPIs · Team building' },
]

const NOTES = ['Registered LLP · GST compliant', 'Kalaburagi HQ · Bengaluru Ops', 'Blue collar to CXO']

/** Hero: staggered headline, gradient blobs with gentle scroll parallax, floating glass chips around the phoenix orb. */
export default function Hero() {
  useEffect(() => {
    const blobs = document.querySelectorAll('.blob')
    const onScroll = () => {
      const y = window.scrollY
      blobs.forEach((b, i) => {
        b.style.translate = `0 ${y * (0.06 + i * 0.03)}px`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header id="top">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <svg className="wavelines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <path d="M-100 700 C 300 620, 500 830, 900 720 S 1400 560, 1600 640" stroke="#cfe2ee" strokeWidth="1.4" />
        <path d="M-100 740 C 300 660, 520 870, 920 760 S 1420 600, 1620 680" stroke="#d8ebe9" strokeWidth="1.2" />
        <path d="M-100 780 C 300 700, 540 910, 940 800 S 1440 640, 1640 720" stroke="#cfe2ee" strokeWidth="1" />
      </svg>

      <div className="hero-wrap">
        <div>
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
                <em>Empowering</em>
              </b>
            </span>{' '}
            <span className="w">
              <b style={{ animationDelay: '.54s' }}>
                <em>Businesses.</em>
              </b>
            </span>
          </h1>
          <p className="sub">
            SMN Phoenix Talent Sourcing LLP is your end-to-end workforce partner — permanent &amp; contract staffing,
            payroll, compliance, HR consulting and training, delivered with speed, precision and full statutory
            compliance.
          </p>
          <div className="hero-cta">
            <a href="#contact">
              <button className="cta big">Hire Talent →</button>
            </a>
            <a href="#contact">
              <button className="btn2">I'm Looking for a Job</button>
            </a>
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

        <div className="stage">
          <div className="orb">
            <img src={logoNavy} alt="SMN Phoenix mark" />
          </div>
          {CHIPS.map((c) => (
            <div className={`chip ${c.cls}`} key={c.cls}>
              <div className="ic">
                <Icon name={c.icon} />
              </div>
              <div>
                <b>{c.title}</b>
                <small>{c.sub}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
