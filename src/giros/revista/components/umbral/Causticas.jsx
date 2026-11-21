import { useEffect, useRef } from "react"

// Reflejos de agua (cáusticas) en WebGL, escritos para esta demo. Solo se dibujan con el cartel
// en pantalla, la pestaña visible y sin movimiento reducido; si no hay WebGL, el cartel conserva
// su capa de reflejos fija en CSS.
const VERTICE = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`
const FRAGMENTO = `
precision mediump float;
uniform float t;
uniform vec2 r;
float causticas(vec2 p, float t) {
  float v = 0.0;
  for (int k = 0; k < 4; k++) {
    float f = float(k);
    p += vec2(sin(p.y * 1.7 + t * 0.55 + f), cos(p.x * 1.3 - t * 0.45 + f * 1.7)) * 0.55;
    v += abs(sin(p.x + p.y * 0.6 + t * 0.8));
  }
  return pow(1.0 - v / 4.0, 7.0);
}
void main() {
  vec2 uv = gl_FragCoord.xy / r.y * 5.0;
  float c = causticas(uv, t) * 1.6 + causticas(uv * 1.9 + 3.1, t * 1.3) * 0.7;
  c = clamp(c, 0.0, 1.0);
  gl_FragColor = vec4(vec3(1.0, 0.92, 0.78) * c, c);
}`

export default function Causticas({ className = "" }) {
  const lienzo = useRef(null)
  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined
    let gl
    try {
      gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false })
    } catch {
      gl = null
    }
    if (!gl) return undefined
    const sombreador = (tipo, fuente) => {
      const s = gl.createShader(tipo)
      gl.shaderSource(s, fuente)
      gl.compileShader(s)
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
    }
    const vs = sombreador(gl.VERTEX_SHADER, VERTICE)
    const fs = sombreador(gl.FRAGMENT_SHADER, FRAGMENTO)
    if (!vs || !fs) return undefined
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const p = gl.getAttribLocation(prog, "p")
    gl.enableVertexAttribArray(p)
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0)
    const ut = gl.getUniformLocation(prog, "t")
    const ur = gl.getUniformLocation(prog, "r")
    canvas.dataset.webgl = "activo"

    let cuadro = 0
    let visible = false
    const inicio = performance.now()
    const ajusta = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr * 0.75))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr * 0.75))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const dibuja = (ahora) => {
      gl.uniform1f(ut, (ahora - inicio) / 1000)
      gl.uniform2f(ur, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      cuadro = visible && !document.hidden ? requestAnimationFrame(dibuja) : 0
    }
    const arranca = () => {
      if (!cuadro && visible && !document.hidden) cuadro = requestAnimationFrame(dibuja)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      arranca()
    })
    const ro = new ResizeObserver(ajusta)
    io.observe(canvas)
    ro.observe(canvas)
    document.addEventListener("visibilitychange", arranca)
    ajusta()
    return () => {
      cancelAnimationFrame(cuadro)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener("visibilitychange", arranca)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])
  return <canvas ref={lienzo} className={`um-causticas ${className}`} aria-hidden="true" />
}
