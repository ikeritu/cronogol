# CronoGol v1.9.5 — Secondary Actions Final Layout Fix

## Objetivo

Corregir definitivamente la distribución de botones secundarios de la pantalla inicial.

## Layout correcto

```text
[ Reglas ] [ Modos ] [ Historia ]
[ Compartir ] [ Copiar enlace ] [ Feedback ]
[              ☕ Apoya CronoGol              ]
```

## Cambios aplicados

- Reordenados los botones en el HTML en el orden exacto solicitado.
- Añadida clase específica `secondary-actions-v195`.
- Añadido CSS con mayor especificidad para evitar que reglas antiguas pisen el layout.
- `Apoya CronoGol` ocupa toda la fila inferior.
- Se mantiene estructura de 3 columnas también en móvil.

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

1. Abrir la home.
2. Confirmar:
   - Reglas / Modos / Historia.
   - Compartir / Copiar enlace / Feedback.
   - Apoya a ancho completo.
3. Probar cada botón secundario.
4. Probar Empezar partido.
