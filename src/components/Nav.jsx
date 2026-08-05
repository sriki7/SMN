import { useEffect, useRef, useState } from 'react'
import logoNavy from '../assets/logo-mark-navy.png'

const LINKS = [
  ['#services', 'Services'],
  ['#verticals', 'Verticals'],
  ['#tech', 'Digital Edge'],
  ['#guide', 'Ask Asha'],
  ['#process', 'Process'],
  ['#contact', 'Contact'],
]

/** Floating glass pill nav — hides on scroll down, returns on scroll up. */
export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current && y > 340)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={hidden ? 'hide' : ''}>
      <a className="brand" href="#top">
        <img src={logoNavy} alt="SMN Phoenix logo" />
        <div>
          <b>
            SMN <span>PHOENIX</span>
          </b>
          <small>TALENT SOURCING LLP</small>
        </div>
      </a>
      <div className="links">
        {LINKS.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </div>
      <a href="#contact">
        <button className="cta">Hire Talent</button>
      </a>
    </nav>
  )
}
