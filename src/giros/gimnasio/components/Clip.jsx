import { useContext, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { MEDIOS } from "../data/medios"
import { VideosPausados } from "../lib/videos"

// Videos cortos en bucle (docs/FICHA_GIMNASIO.md): sin audio, solo se reproduce el que está en
// pantalla y un botón visible los detiene todos. Con movimiento reducido o ahorro de datos se
// muestra solo la imagen fija.

const ahorroDeDatos = () =>
  typeof navigator !== "undefined" && Boolean(navigator.connection?.saveData)

export default function Clip({ id, sizes = "33vw", prioridad = false }) {
  const medio = MEDIOS[id]
  const reduced = useReducedMotion()
  const { pausados } = useContext(VideosPausados)
  const video = useRef(null)
  const [visible, setVisible] = useState(false)
  const conVideo = Boolean(medio.video) && !reduced && !ahorroDeDatos()
  useEffect(() => {
    if (!conVideo || typeof IntersectionObserver === "undefined") return undefined
    const observador = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.25,
    })
    observador.observe(video.current)
    return () => observador.disconnect()
  }, [conVideo])
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (visible && !pausados) v.play()?.catch(() => {})
    else v.pause()
  }, [visible, pausados])
  const poster = `/gimnasio/fotos/${medio.foto}`
  if (!conVideo)
    return (
      <img
        className="b-clip"
        src={`${poster}-640.webp`}
        srcSet={`${poster}-640.webp 640w, ${poster}.webp 1280w`}
        sizes={sizes}
        alt={medio.alt}
        loading={prioridad ? "eager" : "lazy"}
        width="640"
        height="360"
      />
    )
  return (
    <video
      ref={video}
      className="b-clip"
      src={medio.video}
      poster={`${poster}-640.webp`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={medio.alt}
      width="640"
      height="360"
    />
  )
}

export function BotonVideos() {
  const { pausados, alternar } = useContext(VideosPausados)
  const reduced = useReducedMotion()
  if (reduced) return null
  return (
    <button type="button" className="b-btn b-btn-videos" aria-pressed={pausados} onClick={alternar}>
      {pausados ? "Reanudar videos" : "Pausar videos"}
    </button>
  )
}
