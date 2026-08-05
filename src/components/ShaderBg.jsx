import { useEffect, useRef, useState } from 'react'
import FluidCanvas from './FluidCanvas.jsx'

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}

void main(){
  vec2 p=(gl_FragCoord.xy-.5*u_res)/u_res.y;
  float t=u_time*.10;

  /* gentle mouse attraction */
  vec2 m=u_mouse;
  p+= .05*(m-p)*exp(-3.5*length(p-m));

  /* layered flowing silk */
  vec2 q=p*1.55;
  float n=0.; float amp=.62;
  for(int i=0;i<5;i++){
    n+=amp*sin(q.x*1.35+t+1.6*sin(q.y*1.7-t*.75));
    q=rot(.65)*q*1.45;
    amp*=.55;
  }

  /* keep the bottom-left (headline zone) calm */
  float legib=smoothstep(.12,.85,length(p-vec2(-.72,-.42)));

  vec3 base=vec3(.961,.965,.973);                 /* #f5f6f8 */
  vec3 c1=vec3(.83,.90,.97);                      /* pale sky */
  vec3 c2=vec3(.486,.753,.941);                   /* #7CC0F0 */
  vec3 c3=vec3(.039,.42,.627);                    /* #0A6BA0 */

  float b1=smoothstep(.15,.9,n);
  float b2=smoothstep(.55,1.15,n);
  float b3=smoothstep(.9,1.02,n)*(1.-smoothstep(1.02,1.16,n));

  vec3 col=base;
  col=mix(col,c1,b1*.75*legib);
  col=mix(col,c2,b2*.42*legib);
  col=mix(col,c3,b3*.30*legib);

  /* soft top-right glow */
  col=mix(col,c1,.35*exp(-2.2*length(p-vec2(.75,.42))));

  /* film grain */
  col+=(hash(gl_FragCoord.xy+fract(u_time))-.5)*.012;

  gl_FragColor=vec4(col,1.);
}
`
const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`

/** a3x-style flowing hero background — raw WebGL silk shader in SMN blues.
 *  Falls back to the blob FluidCanvas when WebGL is unavailable. */
export default function ShaderBg() {
  const ref = useRef(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) {
      setFallback(true)
      return
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sh = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
      return s
    }
    let prog
    try {
      prog = gl.createProgram()
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link')
    } catch {
      setFallback(true)
      return
    }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    let W = 0
    let H = 0
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      W = cv.clientWidth * dpr
      H = cv.clientHeight * dpr
      cv.width = W
      cv.height = H
      gl.viewport(0, 0, W, H)
    }
    size()

    const mouse = { x: 0.6, y: 0.2, tx: 0.6, ty: 0.2 }
    const onMove = (e) => {
      const r = cv.getBoundingClientRect()
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * (r.width / r.height)
      mouse.ty = -((e.clientY - r.top) / r.height - 0.5)
    }

    let raf = 0
    let running = true
    const t0 = performance.now()
    const frame = () => {
      if (running) {
        mouse.x += (mouse.tx - mouse.x) * 0.05
        mouse.y += (mouse.ty - mouse.y) * 0.05
        gl.uniform2f(uRes, W, H)
        gl.uniform1f(uTime, (performance.now() - t0) / 1000)
        gl.uniform2f(uMouse, mouse.x, mouse.y)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }
      if (!reduced) raf = requestAnimationFrame(frame)
    }
    frame()
    if (reduced) {
      // single static frame only
    }

    const io = new IntersectionObserver((es) => es.forEach((e) => (running = e.isIntersecting)), { threshold: 0 })
    io.observe(cv)
    const onVis = () => (running = !document.hidden)
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('resize', size)
    cv.parentElement?.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', size)
      cv.parentElement?.removeEventListener('mousemove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  if (fallback) return <FluidCanvas />
  return <canvas ref={ref} className="shader-bg" aria-hidden="true" />
}
