# Validación de V4.7.20

Entorno: Node 22, Chromium de Playwright; compilación de producción con `vite preview`. 21 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores; **322 pruebas unitarias**; `npm run test:browser:revista`: **5 de 5 escenarios aprobados** con axe.
- Core Web Vitals de laboratorio (390 px a 3×, CPU 4× más lenta, 4G lenta), LCP y CLS:

| Página | V4.7.19 | V4.7.20 |
|---|---|---|
| Prisma, inicio | 3.02 s · 0.001 | 2.38 s · 0.001 |
| Prisma, autor | — | 2.06 s · 0.001 |
| Prisma, marcadores | — | 2.42 s · 0.000 |
| Umbral, inicio | 3.12 s · 0.043 | 2.75 s · 0.043 |
| Umbral, Entre líneas | 3.00 s · 0.019 | 2.94 s · 0.019 |
| Umbral, Otra perspectiva | 3.43 s · 0.003 | 3.48 s · 0.003 |

En Umbral lo que resta es la llegada de las tipografías del cartel (Archivo y Newsreader), que compiten con la foto.

## No comprobado

- Safari, Firefox e iOS: fuera de alcance por decisión de Ian (no los usa por ahora).
