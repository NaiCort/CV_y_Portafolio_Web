# Validación de V4.7.5 · Umbral: apertura de «Entre líneas»

20 de noviembre de 2026. Registro original de Codex, con la sección de límites separada.

## Comprobaciones

Compilación de producción y 31 pruebas de Revista aprobadas. Inspección de capturas de la apertura en Chromium a 390 y 1440 px y navegación desde la portada a la sección de lectura. Pendiente revisión en teléfono físico.

## Nota posterior

El 21 de noviembre de 2026 (V4.7.12) se encontró que el recorrido de navegador completo (`npm run test:browser:revista`) fallaba en `main` después de V4.7.11 por contraste en el interior de «Entre líneas»; las validaciones de V4.7.5 a V4.7.11 fueron recorridos parciales. Desde V4.7.12 el recorrido completo pasa en cada entrega.
