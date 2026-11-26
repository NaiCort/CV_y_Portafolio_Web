# Inventario de licencias

Regla GEN-013 del Digital Development Handbook (adopción en `HANDBOOK.md`). Actualizado el 25/11/2026, en V4.10.3.

**Cómo está organizado:** cada demo conserva su registro detallado (origen, autor, licencia, cambios y huella SHA-256 de cada archivo). Este documento los reúne y dice dónde está cada uno.

**Al agregar un recurso:**
1. Se anota en el registro de su demo.
2. Si llega un tipo de licencia nuevo, se agrega aquí.

## Fotos y videos

| Dónde | Origen y licencia | Registro | Atribución visible |
| --- | --- | --- | --- |
| CV | Foto de Ian y capturas de las propias demos | — | — |
| Psicólogo | Unsplash, licencia de Unsplash (6 fotos en dos tamaños; la del bosque, en tres desde V4.10.5) | `public/psicologo/medios-origen.json` (nuevo en V4.10.3) | Pie de la página |
| Patio 12 | Unsplash, licencia de Unsplash | `public/restaurante/fotos-origen-v4.2.1.json`, `-v4.2.4.json` y `-v4.2.5.json`; `docs/RECURSOS_RESTAURANTE.md` | `public/restaurante/creditos-fotos.html` |
| Ladera | Wikimedia Commons: CC0, dominio público, CC BY 3.0 y CC BY-SA 2.0, 3.0 y 4.0 | `public/cafe/fotos/fotos-origen.json`; `docs/RECURSOS_CAFE.md` | `/cafe/creditos` |
| Brío | Wikimedia Commons, fotos y videos: CC BY 3.0, CC BY-SA 4.0 y dominio público | `public/gimnasio/medios-origen.json` | Créditos de la demo |
| Rosales y Vértice | Wikimedia Commons: CC BY-SA 4.0 y CC BY 3.0 | `public/taller/medios-origen.json` | `/taller/creditos` |
| Cotejo | Unsplash (licencia de Unsplash) y Wikimedia Commons (CC0 y CC BY-SA 4.0) | `public/despacho/medios-origen.json` | `/despacho/creditos` |
| Revista | Unsplash (110), Pexels (28) y CC BY 3.0 (3) | `public/revista/medios-origen.json` | Colofón de cada revista |

**Qué permite cada licencia:**
- **Unsplash y Pexels:** permiten usar las fotos sin atribución obligatoria. No permiten venderlas sin cambios ni armar con ellas un servicio de imágenes.
- **CC BY y CC BY-SA:** exigen atribución, que va en las páginas de créditos.

Para un cliente real, las fotos de banco se cambian por fotos propias del negocio.

## Música

- **Pistas:** «Night on the Docks» (Rubor), «Clean Soul» (Prisma) y «Gymnopédie n.º 1» (Umbral), de Kevin MacLeod, con licencia CC BY 3.0.
- **Registro:** `public/revista/audio/LICENCIA.txt`.
- **Atribución:** en cada revista.

## Tipografías

Todas con licencia SIL Open Font License 1.1, con su archivo `LICENSE-*.txt` junto a la fuente:

| Dónde | Familias |
| --- | --- |
| `public/cv/fuentes/` | Bricolage Grotesque, Source Serif 4 |
| `public/psicologo/fuentes/` | Fraunces, Figtree, Instrument Sans, Newsreader, Literata, Caveat |
| `public/restaurante/` | Bitter, DM Sans |
| `public/cafe/` | Archivo, Source Serif 4 |
| `public/gimnasio/` | Anybody, Public Sans |
| `public/taller/` | Saira, Figtree, IBM Plex Mono |
| `public/despacho/` | Literata, Instrument Sans |
| `public/revista/fuentes/` | Newsreader, Space Grotesk, Bodoni Moda, Archivo, Mrs Saint Delafield |

## Mapas

- **Fuente:** MapLibre GL (BSD-3-Clause) con mapas de OpenFreeMap y datos de OpenStreetMap (ODbL).
- **Atribución:** el control de atribución de cada mapa.
- **Licencias de MapLibre y del código QR:** copia en `public/restaurante/licencias/`.

## Bibliotecas que llegan al sitio publicado

| Paquete | Versión | Licencia |
| --- | --- | --- |
| react, react-dom | 19.2.7 | MIT |
| react-router-dom | 7.18.2 | MIT |
| framer-motion | 12.42.2 | MIT |
| lucide-react | 1.24.0 | ISC |
| maplibre-gl | 6.14.0 | BSD-3-Clause |
| qrcode | 1.5.4 | MIT |

Las herramientas de desarrollo (Vite, Vitest, Playwright, ESLint, Prettier, Tailwind, axe) no se publican. Sus licencias están en `node_modules`.

## Herramientas de Claude Code del proyecto

- `.claude/skills/` y `.claude/agents/`: Apache 2.0 y MIT.
- Origen y versión de cada una en `.claude/README.md`.
