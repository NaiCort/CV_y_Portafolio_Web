# Validación de V4.7.17

Entorno: Node 22, Chromium de Playwright 1.63; compilación de producción con `vite preview`. 21 de noviembre de 2026.

## PDF

Revisados con pikepdf: los dos tienen `MarkInfo`, árbol de estructura (en el N.º 24: 1 H1, 9 H2, 26 párrafos, 3 listas, 1 tabla con 4 filas, 4 figuras), `Lang` = `es` e índice (`Outlines`). Cinco páginas carta cada uno.

## Core Web Vitals de laboratorio

390 × 844 a 3×, CPU 4× más lenta y 4G lenta (`cwv4199.cjs`). LCP en segundos y CLS:

| Página | Antes | Después |
|---|---|---|
| Entrada | 2.71 · 0.002 | 2.77 · 0.002 |
| Rubor, portada | 3.70 · 0.052 | 2.65 · 0.009 |
| Rubor, cuenta | 3.78 · 0.015 | 2.53 · 0.001 |
| Rubor, detrás de cámaras | 2.12 · **0.356** | 2.28 · 0.001 |
| Prisma, inicio | 3.04 · 0.004 | 3.02 · 0.001 |
| Prisma, ficha N.º 24 | 2.29 · 0.002 | 2.31 · 0.002 |
| Prisma, áreas | 2.19 · 0.018 | 2.26 · 0.000 |
| Umbral, inicio | 4.82 · 0.045 | 3.12 · 0.043 |
| Umbral, Entre líneas | 5.00 · 0.036 | 3.00 · 0.019 |
| Umbral, Otra perspectiva | 4.02 · **0.128** | 3.43 · 0.003 |
| Umbral, Agua | 2.83 · 0.029 | 2.40 · 0.027 |
| Umbral, créditos | 4.10 · **0.144** | 2.10 · 0.005 |

CLS bueno (< 0.1) en todas. LCP bueno (< 2.5 s) o cercano; Prisma, Umbral y «Otra perspectiva» quedan entre 3.0 y 3.4 s en estas condiciones exigentes: el código de la revista se carga aparte al entrar y la foto principal se descubre después.

## Pruebas

ESLint, Prettier y compilación sin errores; **322 pruebas unitarias** aprobadas; `npm run test:browser:revista`: **5 de 5 escenarios aprobados** (320 a 1440 px) con axe.

## No comprobado

- Medición de campo (usuarios reales) y teléfono físico.
