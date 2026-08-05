import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import { guide } from '../data/content.js'
import portrait from '../assets/consultant-portrait.webp'

/**
 * "Asha" — interactive hiring guide.
 * Real consultant photo (from the company brochure) + typewriter Q&A.
 * While she "speaks", the stage glows faster; each answer gives a gentle bump.
 */
export default function Guide() {
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [activeQ, setActiveQ] = useState(null)
  const [bumpKey, setBumpKey] = useState(0)
  const timer = useRef(null)
  const started = useRef(false)
  const sectionRef = useRef(null)
  const photoRef = useRef(null)

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
    }, 18)
  }, [])

  /* bump animation on demand */
  useEffect(() => {
    if (!bumpKey) return
    const el = photoRef.current
    el?.classList.remove('bump')
    void el?.getBoundingClientRect()
    el?.classList.add('bump')
    const t = setTimeout(() => el?.classList.remove('bump'), 800)
    return () => clearTimeout(t)
  }, [bumpKey])

  /* greet on first reveal */
  useEffect(() => {
    const el = sectionRef.current
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            setBumpKey((k) => k + 1)
            speak(guide.greeting)
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )
    el && io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(timer.current)
    }
  }, [speak])

  /* subtle mouse tilt on the portrait (desktop only) */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = sectionRef.current
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2
        el.style.setProperty('--gx', nx.toFixed(3))
      })
    }
    el?.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      el?.removeEventListener('mousemove', onMove)
    }
  }, [])

  const ask = (q) => {
    setActiveQ(q.id)
    setBumpKey((k) => k + 1)
    speak(q.a)
  }

  return (
    <section id="guide" ref={sectionRef}>
      <div className="split">
        <Reveal>
          <span className="tag">Interactive</span>
          <h2>
            Meet <em>Asha</em> — your hiring guide.
          </h2>
        </Reveal>
        <Reveal as="p" className="lead">
          Asha is our virtual guide. Tap a question — she answers the things clients ask us most.
        </Reveal>
      </div>

      <Reveal className="guide-grid">
        <div className={`guide-stage ${typing ? 'talking' : ''}`}>
          <div className="halo" />
          <div className="ring-slow" />
          <div className="g-photo" ref={photoRef}>
            <img src={portrait} alt="Asha — SMN Phoenix virtual hiring guide" />
          </div>
          <div className="g-base" />
        </div>

        <div className="guide-panel">
          <div className="guide-id">
            <span className="dot-live" />
            <b>{guide.name}</b>
            <small>{guide.role}</small>
          </div>
          <div className="bubble" aria-live="polite">
            <p>
              {text}
              {typing && <span className="caret" />}
            </p>
          </div>
          <div className="guide-qs">
            {guide.questions.map((q) => (
              <button key={q.id} className={`gq ${activeQ === q.id ? 'active' : ''}`} onClick={() => ask(q)}>
                {q.q}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
