// Imagen de data/medios.js servida desde el sitio, con carga diferida y medidas para no mover
// la página al cargar.
export default function Foto({ f, sizes }) {
  return (
    <img
      src={f.src}
      srcSet={f.srcSet}
      sizes={sizes}
      width={f.ancho}
      height={f.alto}
      alt={f.alt}
      loading="lazy"
      decoding="async"
    />
  )
}
