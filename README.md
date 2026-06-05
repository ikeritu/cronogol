# CronoGol v1.8.5 — recuperación estable + inglés seguro

## Problema corregido

Las versiones v1.8.3 y v1.8.4 rompían los botones principales:

- 1 vs Máquina.
- Rápido.
- Empezar partido.

## Causa

La traducción completa modificaba funciones centrales del juego y podía romper la inicialización de eventos.

## Solución

Esta versión vuelve a la base estable v1.8.2 y añade la traducción dinámica como una capa segura posterior:

- No reescribe `setupSegmentedControls`.
- No reescribe `startMatch`.
- No reescribe los listeners principales.
- No toca el flujo de turnos.
- Solo envuelve funciones de texto/presentación.

## Validación

`game.js` pasa `node --check`.

## Pruebas obligatorias

1. ES → 1 vs Máquina → Rápido → Empezar partido.
2. EN → 1 vs Machine → Fast → START MATCH.
3. Verificar que la partida empieza.
4. Verificar que Rules aparece en inglés.
5. Verificar que Share aparece en inglés.
6. Verificar eventos principales en inglés.
