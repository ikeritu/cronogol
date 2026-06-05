# CronoGol v1.8.6 — Boot Fix

## Diagnóstico

La app estaba rota porque desde v1.8.2 se perdió la llamada final de inicialización:

`setupSegmentedControls(); setupLanguageSelector(); updateSetupVisibility(); loadLocal();`

Sin esa llamada:

- `1 vs Máquina` no cambiaba el selector interno.
- `Rápido` no cambiaba el selector interno.
- El selector de idioma no terminaba de inicializarse.
- La app parecía cargada, pero los controles principales no estaban conectados correctamente.

## Corrección

Se añade `bootCronoGol()` al final de `game.js`.

Este boot:

- Reconecta los botones segmentados.
- Reconecta `Empezar partido`.
- Reconecta menú, reglas, support, compartir y copiar.
- Inicializa idioma.
- Ejecuta `updateSetupVisibility()`.
- Ejecuta `loadLocal()`.
- Aplica la capa i18n sin tocar el flujo principal del juego.

## Validación

`game.js` pasa:

`node --check game.js`

## Pruebas obligatorias

1. ES → 1 vs Máquina → Rápido → Empezar partido.
2. EN → 1 vs Machine → Fast → START MATCH.
3. Verificar que cambia a pantalla de partido.
4. Verificar que se actualiza historial.
5. Verificar que se actualizan estadísticas.
