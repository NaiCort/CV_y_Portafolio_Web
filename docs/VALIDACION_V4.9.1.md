# Validación de V4.9.1

Entorno: Node 22 y Chromium de Playwright, compilación de producción con `vite preview`. 25 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores.
- **382 pruebas unitarias**, 4 nuevas en `tests/v491-volver-cotizador.test.jsx`:
  - aparece en la demo de origen y en sus páginas;
  - no aparece sin la marca, ni en otra demo;
  - la marca se borra en el CV.
- **Recorrido en Chromium:**
  - **Escritorio:**
    - «Ver un ejemplo» abre Patio 12 con el botón «Vuelve al cotizador»;
    - se arrastra de (13, 523) a (392, 308) sin salir de la demo;
    - sigue visible al pasar a `/restaurante/carta`;
    - al pulsarlo vuelve a «Elige tipo» a la misma altura (163 px).
  - **Sin botón:** al entrar a la demo desde el CV (0 botones) y con un enlace directo (0 botones).
  - **Celular (390 px):**
    - el círculo mide 35 × 35 px;
    - tocarlo muestra «¿Volver al cotizador?»;
    - tocar fuera la cierra y deja la demo;
    - tocar dos veces regresa al cotizador.
- **Navegador con axe** (`DEMO_START_PREVIEW=1 npm run test:browser:cv`): 5 de 5, de 320 a 1440 px. Ahora incluye el botón:
  - aparece en la demo de ejemplo;
  - en el celular pide un segundo toque;
  - regresa a «Elige tipo»;
  - no existe con un enlace directo;
  - sin desbordes.

## No comprobado

- Teléfono de Ian.
- Que el lugar inicial no tape algo en todas las páginas de las siete demos: se revisaron Patio 12 y Psicólogo. Si estorba, se arrastra.
