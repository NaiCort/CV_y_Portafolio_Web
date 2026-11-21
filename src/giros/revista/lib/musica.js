// Si la música está encendida en esta visita. No se guarda: al recargar, la revista empieza
// en silencio. Al pasar de una revista a otra con la música encendida, sigue sonando con la
// pista de la nueva revista.
export const estadoMusica = { encendida: false }
export const apagarMusica = () => {
  estadoMusica.encendida = false
}
