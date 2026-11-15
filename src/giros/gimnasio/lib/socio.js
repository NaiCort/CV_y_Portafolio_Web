// Estado del área de socio simulada. Solo existe el perfil de ejemplo (Andrea); todo se guarda
// en este navegador y se puede borrar desde el aviso de privacidad.
export const SOCIO_KEY = "brio-socio-v1"
export const INVITADOS_POR_PLAN = { acceso: 1, club: 3, total: 99 }

export const ESTADO_INICIAL = {
  sesion: false,
  membresia: "activa",
  congelada: null,
  invitados: [],
  reloj: false,
  entradas: [],
}

export function cargarSocio(storage) {
  try {
    const datos = JSON.parse(storage?.getItem(SOCIO_KEY) || "null")
    return datos && typeof datos === "object" ? { ...ESTADO_INICIAL, ...datos } : ESTADO_INICIAL
  } catch {
    return ESTADO_INICIAL
  }
}
export function guardarSocio(storage, estado) {
  try {
    storage?.setItem(SOCIO_KEY, JSON.stringify(estado))
  } catch {
    /* Sin almacenamiento la sesión dura mientras la página esté abierta. */
  }
}

// Fecha de renovación de ejemplo: siempre faltan 4 días, para que se vea el aviso que la ley
// pide dar al menos 5 días antes.
export function renovacionDe(ahora) {
  const f = new Date(ahora)
  f.setHours(0, 0, 0, 0)
  f.setDate(f.getDate() + 4)
  return f
}

export function socioReducer(estado, accion) {
  switch (accion.type) {
    case "entrar":
      return { ...estado, sesion: true }
    case "salir":
      return { ...estado, sesion: false }
    case "congelar": {
      const desde = new Date(accion.ahora)
      desde.setHours(0, 0, 0, 0)
      const hasta = new Date(desde)
      hasta.setMonth(hasta.getMonth() + accion.meses)
      return {
        ...estado,
        membresia: "congelada",
        congelada: {
          desde: desde.toISOString(),
          hasta: hasta.toISOString(),
          motivo: accion.motivo,
        },
      }
    }
    case "reactivar":
      return { ...estado, membresia: "activa", congelada: null }
    case "cancelar":
      return { ...estado, membresia: "cancelada", congelada: null }
    case "invitar":
      return {
        ...estado,
        invitados: [
          ...estado.invitados,
          {
            id: `INV-${String(accion.ahora).slice(-4)}`,
            nombre: accion.nombre.trim().slice(0, 40),
            fecha: accion.fecha,
            sucursal: accion.sucursal,
          },
        ],
      }
    case "reloj":
      return { ...estado, reloj: accion.conectado }
    case "entrada":
      return { ...estado, entradas: [...estado.entradas, accion.registro] }
    case "borrar":
      return ESTADO_INICIAL
    default:
      return estado
  }
}

export function invitadosDelMes(invitados, ahora) {
  const d = new Date(ahora)
  return invitados.filter((i) => {
    const f = new Date(i.fecha)
    return f.getMonth() === d.getMonth() && f.getFullYear() === d.getFullYear()
  }).length
}
