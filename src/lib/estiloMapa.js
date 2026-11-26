// Correcciones a los estilos de mapa de OpenFreeMap (V4.10.5). Sin ellas, la consola del navegador
// se llena de advertencias de MapLibre aunque el mapa se vea bien:
// - Las capas de escudos de carretera filtran con `["<=", ["get", "ref_length"], 6]`. En las calles
//   sin número, `ref_length` no existe, y MapLibre avisa «Expected value to be of type number, but
//   found null» antes de tratarlo como falso. Aquí se pide un número con 99 de respaldo: mismo
//   resultado (no se dibuja el escudo) y sin aviso.
// - El estilo oscuro pide la textura «wood-pattern», que su paquete de íconos no trae. Se entrega
//   una imagen transparente de 1 px, como indica la documentación de MapLibre.
// Lo usa el mapa de Psicólogo; los de Patio 12, Brío y Taller lo adoptan en su entrega de V4.10.

const LARGO = JSON.stringify(["get", "ref_length"])
const LARGO_SEGURO = JSON.stringify(["number", ["get", "ref_length"], 99])

export function corregirEstilo(estilo) {
  return {
    ...estilo,
    layers: estilo.layers.map((capa) => {
      if (!capa.filter) return capa
      const filtro = JSON.stringify(capa.filter)
      if (!filtro.includes(LARGO)) return capa
      return { ...capa, filter: JSON.parse(filtro.replaceAll(LARGO, LARGO_SEGURO)) }
    }),
  }
}

export function completarImagenes(map) {
  map.on("styleimagemissing", ({ id }) => {
    if (!map.hasImage(id)) map.addImage(id, { width: 1, height: 1, data: new Uint8Array(4) })
  })
}
