# CronoGol v2.6.2 — Usuario mejoras

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

`v2.1.0 — Private Rooms Backend Draft`

- Elegir backend: Supabase o Cloudflare Workers + Durable Objects.
- Crear esquema de sala.
- Probar sincronización básica de marcador en una sala privada.
- Mantener fallback local si falla la conexión.


## v2.0.1 — Supabase Private Rooms Draft

Backend configurado:
- Supabase URL: https://xbrrdkflztxkvnngmdhu.supabase.co
- Tabla esperada: `cronogol_rooms`
- Clave usada: anon/publishable public key

Estado:
- Crear sala: guarda una sala real en Supabase si la tabla existe.
- Unirse a sala: busca una sala real por código.
- Sincronización de marcador/turnos: pendiente de v2.1.x.
- Login: no incluido.
- Rankings públicos: no incluidos.


## v2.1.1 — Lobby Guardrails

Objetivo:
Evitar pruebas engañosas donde el mismo navegador aparece como anfitrión e invitado.

Cambios:
- Bloquea auto-unirse a la sala activa del anfitrión.
- Bloquea invitado con el mismo nombre que el anfitrión.
- Bloquea un segundo invitado distinto si ya hay uno.
- Mantiene polling y refresco manual.

Pendiente:
- Inicio de partida compartido.
- Sincronización de turnos, tiradas, marcador y final.
