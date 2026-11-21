import { useEffect, useRef, useState } from "react"

const clave = "revista-musica-v1"
function preferencias() {
  try {
    const p = JSON.parse(localStorage.getItem(clave))
    return {
      activar: p?.activar === true,
      volumen: Number.isFinite(p?.volumen) ? Math.max(0, Math.min(1, p.volumen)) : 0.3,
    }
  } catch {
    return { activar: false, volumen: 0.3 }
  }
}
export default function Musica() {
  const audio = useRef(null)
  const [pref, setPref] = useState(preferencias)
  const [sonando, setSonando] = useState(false)
  const [aviso, setAviso] = useState("")
  function guardar(cambio) {
    const valor = { ...pref, ...cambio }
    setPref(valor)
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
    } catch {
      /* La preferencia dura esta visita. */
    }
  }
  useEffect(() => {
    audio.current.volume = pref.volumen
  }, [pref.volumen])
  useEffect(() => {
    const medio = audio.current
    let vigente = true
    if (preferencias().activar)
      medio.play().catch(() => {
        if (vigente) setAviso("Pulsa activar para reanudar la música.")
      })
    return () => {
      vigente = false
      if (!medio.paused) medio.pause()
    }
  }, [])
  async function alternar() {
    if (!audio.current.paused) {
      audio.current.pause()
      guardar({ activar: false })
      setAviso("")
      return
    }
    try {
      await audio.current.play()
      guardar({ activar: true })
      setAviso("")
    } catch {
      setAviso("No se pudo iniciar el audio. Vuelve a intentarlo.")
    }
  }
  return (
    <aside className="rv-musica" aria-label="Música ambiental">
      <audio
        ref={audio}
        src="/revista/audio/lectura.mp3"
        loop
        preload="none"
        onPlaying={() => setSonando(true)}
        onPause={() => setSonando(false)}
      />
      <button type="button" aria-pressed={sonando} onClick={alternar}>
        {sonando ? "Pausar música" : "Activar música"}
      </button>
      <label>
        Volumen{" "}
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(pref.volumen * 100)}
          onChange={(e) => guardar({ volumen: Number(e.target.value) / 100 })}
        />
      </label>
      {aviso && <span role="status">{aviso}</span>}
    </aside>
  )
}
