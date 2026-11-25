# CV y portafolio web · Ian Habid Aldana Martínez

Sitio personal de Ian Habid Aldana Martínez, ingeniero en Sistemas Computacionales en Xalapa, Veracruz. Reúne:
- su **CV web**;
- un **portafolio de siete demos interactivas**, una por giro de negocio;
- un **cotizador**, todavía provisional.

- Sitio: https://cv-y-portafolio-web.vercel.app/ (el dominio anterior, `multiples-demos.vercel.app`, redirige aquí)
- Repositorio: https://github.com/NaiCort/CV_y_Portafolio_Web (antes `Multiples_Demos`)

## Qué hay

| Ruta | Contenido |
| --- | --- |
| `/` | CV web y portafolio: identidad y contacto, CV, lista de demos. La portada se prerenderiza al compilar. |
| `/psicologo` | Consultorio de psicología, en cuatro temas |
| `/restaurante` | Patio 12: carta, pedido con seguimiento y reservas |
| `/cafe` | Ladera: café de altura con pedido para recoger |
| `/gimnasio` | Brío: clases con reserva, planes, área de socio y tienda |
| `/taller` | Rosales y Vértice: citas, presupuesto por partida, «Mi garaje» |
| `/despacho` | Cotejo: despacho contable con expediente y herramientas fiscales |
| `/revista` | Rubor, Prisma y Umbral: tres revistas digitales |
| `/cotizador` | Cotizador provisional; reconoce la demo de origen con `?demo=<id>` |

Los negocios de las demos son ficticios y sus acciones son simulaciones declaradas. Los canales de contacto con Ian son reales.

## Desarrollo

Requiere Node 22.12 o posterior.

```bash
npm ci
npm run dev
```

`npm run build` compila la aplicación y prerenderiza la portada (`scripts/prerender.mjs`).

Comprobaciones antes de subir:

```bash
npm run lint
npm run format:check
npm test
npm run build
```

Las pruebas de navegador van con `DEMO_START_PREVIEW=1 npm run test:browser:cv` (y `:restaurante`, `:cafe`, `:gimnasio`, `:taller`, `:despacho`, `:revista`). La de Psicólogo es `npm run test:browser`, con un servidor en el puerto 5173.

## Documentación

- `CLAUDE.md`: reglas de trabajo, estado de cada demo y pendientes.
- `docs/PLAN_V4.8.md`: plan de la fase actual.
- `docs/FICHA_*.md`: fichas de identidad visual (`FICHA_CV.md` para la portada).
- `docs/ESTADO_V*.md` y `docs/VALIDACION_V*.md`: qué se hizo y cómo se comprobó en cada versión.
- `CHANGELOG.md`: resumen de cambios por versión.

Stack: React, Vite, Tailwind CSS, Framer Motion y React Router. Pruebas con Vitest, Playwright y axe. Se despliega en Vercel.
