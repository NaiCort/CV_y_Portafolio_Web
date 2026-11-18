const pesos = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 })

export const precioTexto = (precio) => `$${pesos.format(precio)}`
