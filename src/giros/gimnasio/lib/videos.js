import { createContext } from "react"

// Estado compartido del botón que pausa todos los videos de Brío.
export const VideosPausados = createContext({ pausados: false, alternar: () => {} })
export const VIDEOS_KEY = "brio-videos-pausados-v1"
