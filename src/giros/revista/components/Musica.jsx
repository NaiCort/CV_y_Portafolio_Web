import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

const clave = "revista-musica-v1"
function volumenGuardado() {
  try {
    const v = JSON.parse(localStorage.getItem(clave))?.volumen
    return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.3
  } catch {
    return 0.3
  }
}
export default function Musica() {
  const audio = useRef(null),
    control = useRef(null)
  const [volumen, setVolumen] = useState(volumenGuardado)
  const [sonando, setSonando] = useState(false)
  const [modo, setModo] = useState("")
  const [aviso, setAviso] = useState("")
  useEffect(() => {
    audio.current.volume = volumen
  }, [volumen])
  useEffect(() => {
    if (modo !== "touch") return
    const fuera = (e) => {
      if (!control.current?.contains(e.target)) setModo("")
    }
    document.addEventListener("pointerdown", fuera)
    return () => document.removeEventListener("pointerdown", fuera)
  }, [modo])
  function ajustar(v) {
    setVolumen(v)
    try {
      localStorage.setItem(clave, JSON.stringify({ volumen: v }))
    } catch {
      /* Solo durante esta visita. */
    }
  }
  async function alternar() {
    if (!audio.current.paused) {
      audio.current.pause()
      return
    }
    try {
      if (volumen === 0) ajustar(0.3)
      await audio.current.play()
      setAviso("")
    } catch {
      setAviso("No se pudo reproducir la música.")
    }
  }
  const Icono = sonando && volumen > 0 ? Volume2 : VolumeX
  return (
    <aside
      ref={control}
      className="rv-musica"
      aria-label="Música ambiental"
      data-modo={modo}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setModo("raton")
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") setModo("raton")
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setModo("")
      }}
      onPointerDown={(e) => setModo(e.pointerType === "touch" ? "touch" : "raton")}
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setModo((m) => (m === "touch" ? m : "teclado"))
      }}
      onKeyDown={() => setModo("teclado")}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setModo("")
      }}
    >
      <audio
        ref={audio}
        src="/revista/audio/lectura.mp3"
        loop
        preload="none"
        onPlaying={() => setSonando(true)}
        onPause={() => setSonando(false)}
      />
      <button
        type="button"
        aria-label={sonando ? "Pausar música" : "Activar música"}
        onClick={alternar}
      >
        <Icono size={23} aria-hidden="true" />
      </button>
      {sonando && modo && (
        <div className="rv-volumen">
          <input
            aria-label="Volumen"
            type="range"
            min="0"
            max="100"
            value={Math.round(volumen * 100)}
            onChange={(e) => ajustar(Number(e.target.value) / 100)}
          />
        </div>
      )}
      {aviso && (
        <span className="rv-oculto" role="status">
          {aviso}
        </span>
      )}
    </aside>
  )
}
