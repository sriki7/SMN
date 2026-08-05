import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import { guide } from '../data/content.js'

/**
 * "Asha" — original SVG businesswoman character.
 * Eyes track the cursor, she blinks, waves, and "speaks" via the typewriter bubble.
 */
function Character({ talking, waveKey }) {
  const headRef = useRef(null)
  const pupilL = useRef(null)
  const pupilR = useRef(null)
  const lidsRef = useRef(null)
  const armRef = useRef(null)
  const svgRef = useRef(null)

  /* eye + head tracking */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = svgRef.current?.getBoundingClientRect()
        if (!r) return
        const cx = r.left + r.width * 0.5
        const cy = r.top + r.height * 0.26
        const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 0.9)))
        const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 0.9)))
        const t = `translate(${(nx * 3.4).toFixed(2)} ${(ny * 2.2).toFixed(2)})`
        pupilL.current?.setAttribute('transform', t)
        pupilR.current?.setAttribute('transform', t)
        headRef.current?.setAttribute('transform', `rotate(${(nx * 3.5).toFixed(2)} 180 160)`)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  /* blinking */
  useEffect(() => {
    let t
    const blink = () => {
      lidsRef.current?.classList.add('blink')
      setTimeout(() => lidsRef.current?.classList.remove('blink'), 150)
      t = setTimeout(blink, 2600 + Math.random() * 2600)
    }
    t = setTimeout(blink, 1800)
    return () => clearTimeout(t)
  }, [])

  /* wave on demand */
  useEffect(() => {
    if (!waveKey) return
    const el = armRef.current
    el?.classList.remove('waving')
    void el?.getBoundingClientRect()
    el?.classList.add('waving')
    const t = setTimeout(() => el?.classList.remove('waving'), 2000)
    return () => clearTimeout(t)
  }, [waveKey])

  const skin = '#C98E63'
  const skinD = '#BB7F55'
  const hair = '#241A16'
  const navy = '#0E3A5F'
  const navyD = '#0A2C49'

  return (
    <svg
      ref={svgRef}
      className={`asha ${talking ? 'talking' : ''}`}
      viewBox="0 0 360 470"
      role="img"
      aria-label="Illustration of Asha, the SMN Phoenix virtual hiring guide"
    >
      <ellipse cx="180" cy="452" rx="118" ry="13" fill="rgba(6,44,74,.10)" />
      <g className="figure">
        {/* ── waving arm (behind torso) ── */}
        <g ref={armRef} className="arm">
          <path d="M232 210 C252 214 264 228 268 246 L246 254 C242 236 238 222 230 212 Z" fill="#0C3252" />
          <path d="M268 246 C276 224 278 198 274 178 L252 174 C255 198 251 226 246 252 Z" fill="#12456E" />
          <rect x="250" y="168" width="25" height="9" rx="4" fill="#2FB3AE" transform="rotate(8 262 172)" />
          <g fill={skin}>
            <ellipse cx="263" cy="152" rx="12.5" ry="15" />
            <ellipse cx="252" cy="162" rx="5.5" ry="8.5" transform="rotate(24 252 162)" />
            <ellipse cx="255" cy="137" rx="3.4" ry="7" transform="rotate(-14 255 137)" />
            <ellipse cx="262" cy="134" rx="3.4" ry="8" transform="rotate(-4 262 134)" />
            <ellipse cx="269" cy="136" rx="3.2" ry="7.4" transform="rotate(7 269 136)" />
            <ellipse cx="275" cy="141" rx="3" ry="6.2" transform="rotate(18 275 141)" />
          </g>
        </g>

        {/* ── torso ── */}
        <path d="M146 188 C160 178 200 178 214 188 L224 262 L136 262 Z" fill="#2FB3AE" />
        <path d="M170 182 L180 214 L190 182 Z" fill="#27968F" />
        <path
          d="M112 220 C116 198 134 187 152 184 L172 196 L166 468 L96 468 C96 396 102 302 112 220 Z"
          fill={navy}
        />
        <path
          d="M248 220 C244 198 226 187 208 184 L188 196 L194 468 L264 468 C264 396 258 302 248 220 Z"
          fill="#104066"
        />
        <path d="M152 184 L172 196 L160 262 L146 250 C144 224 146 202 152 184 Z" fill={navyD} />
        <path d="M208 184 L188 196 L200 262 L214 250 C216 224 214 202 208 184 Z" fill={navyD} />
        <path d="M126 274 L141 267 L139 284 Z" fill="#7FD6D2" />

        {/* ── tablet arm ── */}
        <path d="M110 220 C100 262 102 302 112 320 L156 344 L162 322 L126 302 C120 274 122 244 128 220 Z" fill="#0C3252" />
        <g transform="rotate(-7 196 350)">
          <rect x="142" y="318" width="106" height="66" rx="9" fill="#0B2C47" />
          <rect x="149" y="325" width="92" height="52" rx="5" fill="#EAF6F9" />
          <circle cx="166" cy="342" r="8" fill="#2FB3AE" opacity=".85" />
          <rect x="180" y="336" width="52" height="4.5" rx="2" fill="#9DC4D8" />
          <rect x="180" y="345" width="40" height="4.5" rx="2" fill="#C6D8E4" />
          <rect x="156" y="358" width="76" height="4.5" rx="2" fill="#C6D8E4" />
          <rect x="156" y="366" width="60" height="4.5" rx="2" fill="#DCE9F1" />
        </g>
        <ellipse cx="158" cy="336" rx="11" ry="9" fill={skin} transform="rotate(-18 158 336)" />

        {/* ── head ── */}
        <g ref={headRef} className="head">
          <circle cx="180" cy="52" r="21" fill={hair} />
          <path d="M158 56 C158 44 202 44 202 56 L198 64 L162 64 Z" fill="#3A2C24" />
          <ellipse cx="180" cy="112" rx="57" ry="58" fill={hair} />
          <path d="M124 116 C120 168 130 192 146 202 L148 148 Z" fill={hair} />
          <path d="M236 116 C240 168 230 192 214 202 L212 148 Z" fill={hair} />
          <ellipse cx="134" cy="128" rx="7" ry="10" fill={skin} />
          <ellipse cx="226" cy="128" rx="7" ry="10" fill={skin} />
          <g className="earring">
            <circle cx="134" cy="143" r="3.6" fill="#2FB3AE" />
          </g>
          <g className="earring e2">
            <circle cx="226" cy="143" r="3.6" fill="#2FB3AE" />
          </g>
          <path d="M168 158 L168 184 Q180 192 192 184 L192 158 Z" fill={skinD} />
          <ellipse cx="180" cy="120" rx="45" ry="50" fill={skin} />
          <path d="M180 72 C152 72 136 94 133 120 C140 98 156 86 180 84 Z" fill={hair} />
          <path d="M180 72 C208 72 224 94 227 120 C220 98 204 86 180 84 Z" fill={hair} />
          <ellipse cx="180" cy="163" rx="13" ry="5" fill="rgba(0,0,0,.10)" />

          {/* face */}
          <circle cx="180" cy="96" r="2.6" fill="#B23A48" />
          <path d="M145 102 Q157 95 168 100" stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M192 100 Q203 95 215 102" stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none" />
          <g>
            <ellipse cx="157" cy="115" rx="10.5" ry="7" fill="#FDFDFD" />
            <ellipse cx="203" cy="115" rx="10.5" ry="7" fill="#FDFDFD" />
            <g ref={pupilL}>
              <circle cx="157" cy="115" r="4.6" fill="#33241C" />
              <circle cx="157" cy="115" r="2.1" fill="#140D09" />
              <circle cx="155.4" cy="113.4" r="1.2" fill="#FFF" />
            </g>
            <g ref={pupilR}>
              <circle cx="203" cy="115" r="4.6" fill="#33241C" />
              <circle cx="203" cy="115" r="2.1" fill="#140D09" />
              <circle cx="201.4" cy="113.4" r="1.2" fill="#FFF" />
            </g>
            <g ref={lidsRef} className="lids">
              <ellipse cx="157" cy="115" rx="11" ry="7.5" fill={skin} />
              <ellipse cx="203" cy="115" rx="11" ry="7.5" fill={skin} />
            </g>
          </g>
          <path d="M180 124 C178 131 176 135 180 138" stroke="rgba(0,0,0,.16)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <ellipse cx="147" cy="137" rx="7" ry="4" fill="rgba(226,122,95,.30)" />
          <ellipse cx="213" cy="137" rx="7" ry="4" fill="rgba(226,122,95,.30)" />
          <g className="mouth">
            <path className="m-smile" d="M164 148 Q180 160 196 148" stroke="#A34A3E" strokeWidth="4" strokeLinecap="round" fill="none" />
            <ellipse className="m-open" cx="180" cy="151" rx="6.6" ry="4.4" fill="#7E3A31" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default function Guide() {
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [activeQ, setActiveQ] = useState(null)
  const [waveKey, setWaveKey] = useState(0)
  const timer = useRef(null)
  const started = useRef(false)
  const sectionRef = useRef(null)

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

  /* greet on first reveal */
  useEffect(() => {
    const el = sectionRef.current
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            setWaveKey((k) => k + 1)
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

  const ask = (q) => {
    setActiveQ(q.id)
    if (q.gesture === 'wave') setWaveKey((k) => k + 1)
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
          Asha is our virtual guide. Her eyes follow you, she waves back — and she answers the questions clients ask us
          most.
        </Reveal>
      </div>

      <Reveal className="guide-grid">
        <div className="guide-stage">
          <div className="halo" />
          <div className="ring-slow" />
          <Character talking={typing} waveKey={waveKey} />
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
              <button
                key={q.id}
                className={`gq ${activeQ === q.id ? 'active' : ''}`}
                onClick={() => ask(q)}
              >
                {q.q}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
