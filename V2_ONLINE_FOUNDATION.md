# CronoGol v2.0.0 — Online Foundation

Esta versión inicia la rama V2 sin activar todavía multijugador real.

## Objetivo

Preparar el modelo mínimo para futuras salas privadas manteniendo intacto el juego local.

## Componentes añadidos

- `online-foundation.js`
- `window.CronoGolOnline`
- `createRoomDraft()`
- `normalizeRoomCode()`
- `isValidRoomCode()`
- `createMatchSnapshot()`

## Decisión de seguridad

`backendEnabled` permanece en `false`. Los botones de sala solo guardan borradores locales en `localStorage`.

## Siguiente fase recomendada

`v2.1.1 — Private Rooms Backend Draft`

- Elegir backend: Supabase o Cloudflare Workers + Durable Objects.
- Crear esquema de sala.
- Probar sincronización básica de marcador en una sala privada.
- Mantener fallback local si falla la conexión.
