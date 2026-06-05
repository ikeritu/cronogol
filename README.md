# CronoGol v1.9.7 — Secondary Actions CSS-only Final Fix

## Objetivo

Corregir definitivamente la distribución visual de los botones secundarios sin modificar funciones del juego.

## Layout final

```text
[ Reglas ] [ Modos ] [ Historia ]
[ Compartir ] [ Copiar enlace ] [ Feedback ]
[              ☕ Apoya CronoGol              ]
```

## Cambios aplicados

- Reordenado el bloque visual `nav.setup-links`.
- Añadida clase `secondary-actions-final`.
- Añadidos atributos `data-slot` para fijar posiciones por CSS.
- Añadido CSS con alta especificidad sobre `#setup-screen nav.setup-links.secondary-actions-final`.
- Forzadas 3 columnas exactas.
- `Apoya CronoGol` ocupa toda la tercera fila.

## No se ha tocado

- Funciones JavaScript.
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
2. Confirmar layout exacto:
   - Reglas / Modos / Historia.
   - Compartir / Copiar enlace / Feedback.
   - Apoya CronoGol a ancho completo.
3. Probar cada botón.
4. Probar Empezar partido.
