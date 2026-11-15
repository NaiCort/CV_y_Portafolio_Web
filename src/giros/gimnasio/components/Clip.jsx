import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { MEDIOS } from "../data/medios"

// Medio de una disciplina (docs/FICHA_GIMNASIO.md). En reposo es una imagen fija en blanco y
// negro. Cuando `activo` es verdadero recupera el color y, si hay video, lo reproduce en bucle,
// sin audio, desde donde se quedó. Con movimiento reducido o ahorro de datos solo cambia el color.

const ahorroDeDatos = () =>
  typeof navigator !== "undefined" && Boolean(navigator.connection?.saveData)

export default function Clip({ id, activo = false, decorativa = false, prioridad = false }) {
  const medio = MEDIOS[id]
  const reduced = useReducedMotion()
  const video = useRef(null)
  // El video se pide la primera vez que se activa la tarjeta, no al cargar la página.
  const [cargado, setCargado] = useState(false)
  const [corriendo, setCorriendo] = useState(false)
  const conVideo = Boolean(medio.video) && !reduced && !ahorroDeDatos()
  if (activo && conVideo && !cargado) setCargado(true)
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (activo) v.play()?.catch(() => {})
    else v.pause()
  }, [activo, cargado])
  return (
    <div className={`b-clip${activo ? " is-activo" : ""}`} data-medio={id}>
      <img
        src={`/gimnasio/fotos/${medio.foto}-640.webp`}
        alt={decorativa ? "" : medio.alt}
        loading={prioridad ? "eager" : "lazy"}
        width="640"
        height="480"
      />
      {cargado && (
        <video
          ref={video}
          className={corriendo ? "is-corriendo" : undefined}
          src={medio.video}
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setCorriendo(true)}
        />
      )}
    </div>
  )
}
