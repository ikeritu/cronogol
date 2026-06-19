# CronoGol v2.5.5_ESTABLE_VIBRATION_OK

Versión estable congelada tras confirmar que la vibración física cumple la norma cerrada.

## Base

`CronoGol v2.5.5 — Strict Physical Vibration Gate`

## Confirmado

| Caso | Vibración física |
|---|---:|
| Gol | Fuerte |
| Penalti fallado | Leve |
| Fallo normal | Eliminada |
| Falta fallada | Eliminada |
| Poste/larguero | Eliminada |
| START/STOP | Eliminada |
| Tarjetas | Eliminada |
| Descanso/final | Eliminada |

## Estado técnico

- `haptic()` genérico eliminado.
- `vibrate()` genérico eliminado.
- `navigator.vibrate` solo se usa dentro de `physicalVibration()`.
- `applyPhysicalVibration()` es la única puerta de decisión.
- Cache busting activo: `game.js?v=2.5.5` y `style.css?v=2.5.5`.
- Penalti/falta automática de máquina se mantiene.
- Zaraz/event tracking sigue fuera.

Esta versión debe usarse como base estable para futuras versiones.
