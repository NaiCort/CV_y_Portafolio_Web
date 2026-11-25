# Validación de V4.8.6

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción (`npm run build`, que ya incluye el prerenderizado) servida por `vite preview`. 25 de noviembre de 2026.

- **Revisiones automáticas:**
  - ESLint, Prettier y compilación sin errores.
  - **342 pruebas unitarias**, 2 nuevas en `tests/v486-prerender.test.jsx`:
    - el HTML del servidor trae el h1, las secciones del CV y los enlaces a las siete demos;
    - los datos estructurados `Person` usan el dominio nuevo, LinkedIn, GitHub, Xalapa y los idiomas del CV.
- **HTML inicial sin JavaScript:**
  - `/` trae el CV completo, la URL canónica y los datos estructurados;
  - `/cafe`, `/revista/rubor`, `/cotizador` y una ruta inexistente llegan con la raíz vacía (`app.html`);
  - con JavaScript desactivado, la captura muestra la portada completa.
- **Hidratación:** se compiló en modo desarrollo para leer el aviso completo de React y se corrigieron dos diferencias:
  - el `Suspense` de `App.jsx`, que faltaba en el render del servidor;
  - la precarga de la foto que React 19 antepone al HTML, que ahora va en la cabecera.

  Después, sin errores ni avisos a 1440 y 390 px.
- **Core Web Vitals** (`npm run audit:cwv -- /`, teléfono, CPU 4× y red lenta): LCP 1.12 s (antes 1.87 s) y CLS 0.000.
- **Pruebas de navegador con axe** (`DEMO_START_PREVIEW=1`):
  - CV: 5 de 5. Ahora también comprueba el HTML inicial de `/` y de `/cafe`, y que no haya errores de hidratación.
  - Patio 12: 12 de 12.
  - Ladera, Brío, Taller y Cotejo: 5 de 5 cada una.
  - Revista: 5 de 5.
  - Psicólogo: 16 combinaciones y 2 recorridos del selector.
    - Sus recorridos del selector volvían a la portada y buscaban el enlace a la demo como en el directorio viejo, previo a V4.8.2; esta suite no se había vuelto a correr desde entonces.
    - Ahora esperan el CV y, en celular, abren primero el desplegable «Demos».

## No comprobado

- El despliegue en Vercel con `vercel.json` nuevo: se comprobará en la vista previa del PR, donde la portada debe llegar con el CV y `/cafe` debe abrir Ladera sin mostrar el CV.
- Teléfono de Ian.
