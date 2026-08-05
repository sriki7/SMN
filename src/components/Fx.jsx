import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/** FadeIn — whileInView wrapper (spec: once, margin 50px, ease [0.25,0.1,0.25,1]) */
export function FadeIn({ as = 'div', delay = 0, duration = 0.7, x = 0, y = 30, className = '', style, children }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </M>
  )
}

/** Magnet — mouse-following magnetic hover (activates within `padding` of the element) */
export function Magnet({ padding = 150, strength = 3, className = '', children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    let active = false
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const inside =
        e.clientX > r.left - padding && e.clientX < r.right + padding && e.clientY > r.top - padding && e.clientY < r.bottom + padding
      if (inside) {
        if (!active) {
          active = true
          el.style.transition = 'transform 0.3s ease-out'
        }
        el.style.transform = `translate3d(${(e.clientX - cx) / strength}px, ${(e.clientY - cy) / strength}px, 0)`
      } else if (active) {
        active = false
        el.style.transition = 'transform 0.6s ease-in-out'
        el.style.transform = 'translate3d(0,0,0)'
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [padding, strength])
  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}

/** Gradient pill CTA (SMN teal remix of the spec's contact button) */
export function ContactButton({ label = 'Contact Us', href = '#contact' }) {
  return (
    <a className="btn-grad" href={href}>
      {label}
    </a>
  )
}

/** Ghost pill button */
export function GhostButton({ label, href = '#contact' }) {
  return (
    <a className="btn-ghost" href={href}>
      {label}
    </a>
  )
}

function Char({ c, i, n, progress }) {
  const start = i / n
  const end = Math.min(1, start + 1 / n + 0.08)
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  return (
    <motion.span style={{ opacity }} className="an-char">
      {c}
    </motion.span>
  )
}

/** AnimatedText — character-by-character scroll reveal (spec offsets) */
export function AnimatedText({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const chars = [...text]
  return (
    <p ref={ref} className={className} aria-label={text}>
      {chars.map((c, i) => (
        <Char key={i} c={c} i={i} n={chars.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}
