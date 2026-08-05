import { useEffect, useRef } from 'react'

const BLOBS = [
  { c: [168, 205, 240], r: 300, x: 0.85, y: 0.15, sx: 0.00021, sy: 0.00017, ph: 0 },
  { c: [169, 205, 236], r: 280, x: 0.1, y: 0.85, sx: 0.00017, sy: 0.00023, ph: 2.1 },
  { c: [186, 218, 246], r: 200, x: 0.45, y: 0.4, sx: 0.00025, sy: 0.00019, ph: 4.2 },
  { c: [126, 200, 227], r: 230, x: 0.7, y: 0.75, sx: 0.00019, sy: 0.00026, ph: 1.3 },
  { c: [140, 188, 236], r: 260, x: 0.25, y: 0.2, sx: 0.00023, sy: 0.0002, ph: 3.4 },
]
const PARTICLES = 34

/** Fluid, mouse-reactive gradient blobs + drifting particles painted on canvas (hero background). */
export default function FluidCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cv = ref.current
    const ctx = cv.getContext('2d')
    let W = 0
    let H = 0
    let raf = 0
    const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 }

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = cv.offsetWidth
      H = cv.offsetHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()

    const parts = Array.from({ length: PARTICLES }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.25 + 0.06),
      o: Math.random() * 0.35 + 0.12,
    }))

    const onMove = (e) => {
      const r = cv.getBoundingClientRect()
      mouse.tx = e.clientX - r.left
      mouse.ty = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.tx = -1e4
      mouse.ty = -1e4
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H)
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06

      for (const b of BLOBS) {
        let bx = (b.x + Math.sin(t * b.sx + b.ph) * 0.1) * W
        let by = (b.y + Math.cos(t * b.sy + b.ph) * 0.12) * H
        // gentle attraction toward cursor
        const dx = mouse.x - bx
        const dy = mouse.y - by
        const d = Math.hypot(dx, dy) || 1
        if (d < 520) {
          bx += (dx / d) * (520 - d) * 0.1
          by += (dy / d) * (520 - d) * 0.1
        }
        const breathe = b.r * (1 + Math.sin(t * 0.00045 + b.ph) * 0.12)
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, breathe)
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.68)`)
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(bx, by, breathe, 0, 7)
        ctx.fill()
      }

      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) {
          p.y = H + 10
          p.x = Math.random() * W
        }
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, 7)
        ctx.fillStyle = `rgba(58,155,220,${p.o})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', size)
    cv.parentElement.addEventListener('mousemove', onMove)
    cv.parentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      cv.parentElement?.removeEventListener('mousemove', onMove)
      cv.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="fluid" aria-hidden="true" />
}
