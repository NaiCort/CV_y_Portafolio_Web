import { borrarMarcadores, reiniciarCache } from "./marcadores"
import { apagarMusica } from "./musica"

export function borrarDatosRevista() {
  borrarMarcadores()
  apagarMusica()
  let persistente = true
  try {
    for (const k of Object.keys(window.localStorage))
      if (k.startsWith("revista-")) window.localStorage.removeItem(k)
    window.localStorage.setItem("revista-reset", String(Date.now()))
  } catch {
    persistente = false
  }
  reiniciarCache()
  return persistente
}
