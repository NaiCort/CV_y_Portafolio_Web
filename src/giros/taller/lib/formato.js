const pesos = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 })
const miles = new Intl.NumberFormat("es-MX")

export const precioTexto = (precio) => `$${pesos.format(precio)}`
export const kmTexto = (km) => `${miles.format(km)} km`

// Precio de un servicio en la lista: cifra, «Sin costo» o el texto que da el taller.
export function precioServicio(servicio) {
  if (!servicio) return "Sin costo"
  if (servicio.sinPrecio) return servicio.sinPrecio
  return precioTexto(servicio.precio)
}
