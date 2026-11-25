# Validación de V4.10.2

Entorno: Node 22 y Chromium de Playwright, compilación de producción con `vite preview`. 25 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores.
- **395 pruebas unitarias** en 44 archivos:
  - `tests/themes-routes.test.jsx`, reescrita para los tres temas:
    - un h1;
    - las diez secciones;
    - precios y cédula;
    - ayuda en crisis con teléfono real;
    - cotizador con el identificador del tema;
    - contacto sin texto libre;
    - fotos locales;
    - agenda, reseñas y aviso de privacidad;
    - «Pedir información»;
    - tema guardado inválido o anterior.
  - `tests/v4102-agenda.test.js`, nueva: días sin domingos, sábado de mañana, horarios estables, zonas horarias, validación del contacto y recordatorio.
  - `tests/storage.test.js`, con los nombres nuevos.
  - Se retiraron `reservation.test.jsx` y `contact.test.jsx` junto con los componentes que probaban.
- **Navegador con axe** (`npm run test:browser`, ahora con `DEMO_START_PREVIEW=1` como las demás demos): 16 de 16.
  - Cada tema en 320, 390, 768, 1024 y 1440 px.
  - El recorrido incluye:
    - fotos locales decodificadas;
    - agenda con errores, horario, contacto y recordatorio;
    - primera sesión en línea con zona horaria de Madrid;
    - «Respira conmigo»;
    - «Pedir información» y contacto;
    - WhatsApp simulado y aviso de privacidad;
    - reseñas, crisis, menú del celular y enlace al cotizador.
  - Al final, el cambio de tema con recuerdo al recargar.
- **CV y cotizador** (`npm run test:browser:cv`): 5 de 5, con las variantes nuevas de Psicólogo.
- **Textos encimados** (`npm run audit:encimados -- /psicologo`): 0 casos en el tema que abre por omisión (Sala con luz). Neblina y Cuaderno se revisaron con capturas en 1440 y 390 px.
- **Impeccable** (`detect --no-advisory`): sin hallazgos en Sala con luz.
- **Core Web Vitals** (`npm run audit:cwv -- /psicologo`): LCP de 2.13 s y CLS de 0.000.
- **Fuentes de respaldo:** ancho medido en Chromium contra Times New Roman y Arial (equivalentes métricos Liberation):

  | Fuente | `size-adjust` |
  | --- | --- |
  | Fraunces | 115.1 % |
  | Newsreader | 103.2 % |
  | Literata | 116.1 % |
  | Figtree | 99.1 % |
  | Instrument Sans | 100.6 % |

- **Contraste de la paleta:** todos los pares de texto de la ficha pasan AA, con un mínimo de 5.07:1. Axe no encontró fallos en ningún tema ni diálogo.

## No comprobado

- Teléfono de Ian (Android con Chrome o Edge).
