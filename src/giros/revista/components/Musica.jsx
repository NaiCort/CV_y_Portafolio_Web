import { useEffect, useRef, useState } from "react"
import { PISTAS } from "../data/musica"
import { estadoMusica } from "../lib/musica"

const clave = "revista-musica-v1"

function volumenGuardado() {
  try {
    const v = JSON.parse(localStorage.getItem(clave))?.volumen
    return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.35
  } catch {
    return 0.35
  }
}

function Bocina({ sonando }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="rv-bocina-svg">
      <path d="M4 9.5h3.6L12.5 5v14l-4.9-4.5H4z" fill="currentColor" />
      {sonando ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path className="rv-onda rv-onda-1" d="M15.5 9.2a4 4 0 0 1 0 5.6" />
          <path className="rv-onda rv-onda-2" d="M18 6.8a7.4 7.4 0 0 1 0 10.4" />
        </g>
      ) : (
        <path
          d="m16 9.5 5 5m0-5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

// Bocina transparente abajo a la derecha. Empieza en silencio; al pulsarla suena la pista de
// la revista. Con la música encendida, el volumen se despliega hacia arriba al pasar el cursor
// (o al enfocarla con teclado, o al tocarla en pantallas táctiles) y se oculta al salir.
export default function Musica({ sitio }) {
  const pista = PISTAS[sitio]
  const audio = useRef(null)
  const caja = useRef(null)
  const salida = useRef(null)
  const [volumen, setVolumen] = useState(volumenGuardado)
  const [sonando, setSonando] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const [aviso, setAviso] = useState("")

  useEffect(() => {
    audio.current.volume = volumen
  }, [volumen])

  useEffect(() => {
    const medio = audio.current
    if (estadoMusica.encendida) medio.play().catch(() => (estadoMusica.encendida = false))
    return () => {
      clearTimeout(salida.current)
      medio.pause()
    }
  }, [])

  // En pantallas táctiles el volumen queda abierto hasta tocar fuera.
  useEffect(() => {
    if (!abierto) return undefined
    const fuera = (e) => !caja.current?.contains(e.target) && setAbierto(false)
    const tecla = (e) => e.key === "Escape" && setAbierto(false)
    document.addEventListener("pointerdown", fuera)
    document.addEventListener("keydown", tecla)
    return () => {
      document.removeEventListener("pointerdown", fuera)
      document.removeEventListener("keydown", tecla)
    }
  }, [abierto])

  const abrir = () => {
    clearTimeout(salida.current)
    if (sonando) setAbierto(true)
  }
  const cerrarPronto = () => {
    clearTimeout(salida.current)
    salida.current = setTimeout(() => setAbierto(false), 160)
  }

  function ajustar(v) {
    setVolumen(v)
    try {
      localStorage.setItem(clave, JSON.stringify({ volumen: v }))
    } catch {
      /* Solo durante esta visita. */
    }
  }

  async function alternar(e) {
    const tactil = e.nativeEvent?.pointerType === "touch"
    if (!audio.current.paused) {
      audio.current.pause()
      estadoMusica.encendida = false
      setAbierto(false)
      setAviso("Música en silencio.")
      return
    }
    try {
      if (volumen === 0) ajustar(0.35)
      await audio.current.play()
      estadoMusica.encendida = true
      setAviso(`Suena «${pista.titulo}».`)
      if (tactil || e.currentTarget?.matches?.(":hover, :focus-visible")) setAbierto(true)
    } catch {
      setAviso("El navegador no permitió reproducir la música.")
    }
  }

  return (
    <aside
      ref={caja}
      className="rv-musica"
      data-abierto={abierto && sonando ? "" : undefined}
      aria-label="Música ambiental"
      onPointerEnter={(e) => e.pointerType === "mouse" && abrir()}
      onPointerLeave={(e) => e.pointerType === "mouse" && cerrarPronto()}
      onFocus={(e) => e.target.matches(":focus-visible") && abrir()}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setAbierto(false)}
    >
      <audio
        ref={audio}
        src={pista.src}
        loop
        preload="none"
        onPlaying={() => {
          setSonando(true)
          if (caja.current?.matches(":hover")) setAbierto(true)
        }}
        onPause={() => setSonando(false)}
      />
      <div className="rv-volumen" aria-hidden={!(abierto && sonando)}>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          aria-label="Volumen de la música"
          tabIndex={abierto && sonando ? 0 : -1}
          value={Math.round(volumen * 100)}
          style={{ "--v": `${Math.round(volumen * 100)}%` }}
          onChange={(e) => ajustar(Number(e.target.value) / 100)}
        />
      </div>
      <button
        type="button"
        className="rv-bocina"
        aria-label={sonando ? "Silenciar música" : "Activar música"}
        title={sonando ? `${pista.titulo} · ${pista.autor}` : "Música ambiental"}
        onClick={alternar}
      >
        <Bocina sonando={sonando} />
      </button>
      <span className="rv-oculto" role="status">
        {aviso}
      </span>
    </aside>
  )
}
