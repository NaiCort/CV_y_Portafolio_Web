// El código del pase cambia cada 30 s, como en las apps de gimnasio.
export const PERIODO_PASE = 30

export function codigoDelPase(base, ahora) {
  return `${base}-${Math.floor(ahora / (PERIODO_PASE * 1000))}`
}
