# CronoGol v1.9.6 — Secondary Actions NAV Fix

## Objetivo

Corregir definitivamente el layout de botones secundarios. La versión anterior intentaba sustituir un `div`, pero el bloque real era un `nav`.

## Layout correcto

```text
[ Reglas ] [ Modos ] [ Historia ]
[ Compartir ] [ Copiar enlace ] [ Feedback ]
[              ☕ Apoya CronoGol              ]
```

## Cambios aplicados

- Sustituido correctamente el bloque `<nav class="setup-links">`.
- Añadida clase específica `secondary-actions-v196`.
- Forzado CSS sobre `nav.setup-links.secondary-actions-v196`.
- `Apoya CronoGol` ocupa toda la fila inferior.
- Se mantiene rejilla de 3 columnas en móvil y escritorio.

## No se ha tocado

- Lógica del juego.
- START/STOP.
- Reglas.
- Turnos.
- Máquina.
- Modo rápido.
- Penalti/falta.
- Historial.
- Estadísticas.
- Bizum/PayPal.

## QA recomendado

1. Abrir home.
2. Verificar:
   - Reglas / Modos / Historia.
   - Compartir / Copiar enlace / Feedback.
   - Apoya CronoGol a ancho completo.
3. Probar cada botón.
4. Probar Empezar partido.
