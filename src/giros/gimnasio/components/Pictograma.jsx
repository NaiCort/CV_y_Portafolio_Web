// Dibujos de línea de los productos de la tienda (no hay fotos con licencia libre). Un trazo
// grueso y redondeado, del color de la interfaz.
const TRAZOS = {
  guantes: (
    <>
      <path d="M40 88V54c0-20 12-32 28-32s26 12 26 28v16c0 12-8 20-18 22H40Z" />
      <path d="M40 64c-8-1-12-8-9-14 3-5 10-4 12 2" />
      <rect x="38" y="88" width="42" height="18" rx="4" />
      <path d="M56 88v18" />
    </>
  ),
  vendas: (
    <>
      <circle cx="46" cy="54" r="24" />
      <circle cx="46" cy="54" r="8" />
      <path d="M46 78h52v14H54" />
      <path d="M98 85h8" />
    </>
  ),
  cuerda: (
    <>
      <rect x="20" y="14" width="16" height="34" rx="8" />
      <rect x="84" y="14" width="16" height="34" rx="8" />
      <path d="M28 48c0 70 64 70 64 0" />
    </>
  ),
  bandas: (
    <>
      <ellipse cx="60" cy="42" rx="40" ry="12" />
      <ellipse cx="60" cy="64" rx="40" ry="12" />
      <ellipse cx="60" cy="86" rx="40" ry="12" />
    </>
  ),
  proteina: (
    <>
      <rect x="28" y="28" width="64" height="16" rx="5" />
      <path d="M32 44v52c0 6 4 10 10 10h36c6 0 10-4 10-10V44" />
      <path d="M32 62h56M32 86h56" />
      <path d="M50 74h20" />
    </>
  ),
  barras: (
    <>
      <path d="M22 46h76v24H22zM22 46l-6 4 6 4-6 4 6 4-6 4 6 4M98 46l6 4-6 4 6 4-6 4 6 4-6 4" />
      <path d="M30 82h60v20H30z" />
      <path d="M44 58h32" />
    </>
  ),
  botella: (
    <>
      <path d="M52 16c0-6 16-6 16 0" />
      <rect x="46" y="16" width="28" height="18" rx="5" />
      <rect x="38" y="34" width="44" height="74" rx="14" />
      <path d="M38 58h44" />
    </>
  ),
  toalla: (
    <>
      <path d="M16 30h88" />
      <path d="M32 30v66c0 4 3 7 7 7h42c4 0 7-3 7-7V30" />
      <path d="M44 30v52c0 4 3 7 7 7h37" />
      <path d="M32 74h12M44 74h44" />
    </>
  ),
  playera: (
    <path d="M42 22 20 34l9 21 11-5v54h40V50l11 5 9-21-22-12c-4 9-10 13-18 13s-14-4-18-13Z" />
  ),
  candado: (
    <>
      <path d="M42 56V42c0-12 8-20 18-20s18 8 18 20v14" />
      <rect x="30" y="56" width="60" height="48" rx="9" />
      <circle cx="60" cy="80" r="10" />
      <path d="M60 70v4" />
    </>
  ),
}

export default function Pictograma({ id, className = "" }) {
  return (
    <svg
      className={`b-picto ${className}`}
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {TRAZOS[id]}
    </svg>
  )
}
