import { useEffect } from 'react'
import Lenis from 'lenis'
import { HeroSection, MarqueeSection, AboutSection, ServicesSection, VerticalsSection, AshaSection, ContactSection } from './components/Site.jsx'

export default function App() {
  /* buttery inertial scrolling + smooth anchor navigation */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.05 })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: 0, duration: 1.3 })
    }
    document.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="site2">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <VerticalsSection />
      <AshaSection />
      <ContactSection />
    </main>
  )
}
