# CronoGol v2.1.3 — Online Turn Authority Draft

Primera capa de autoridad de turnos para el futuro modo online.

## Objetivo

Evitar que los dos dispositivos puedan jugar como si fueran el mismo jugador.

## Regla de autoridad

- Anfitrión / host: controla el Jugador 1.
- Rival / guest: controla el Jugador 2.
- Si el turno actual no pertenece al dispositivo, el botón principal queda bloqueado y se muestra aviso de turno rival.

## Qué sincroniza

El snapshot online incluye ahora un bloque `turnAuthority` con:

- rol local;
- índice del jugador local;
- rol al que pertenece el turno actual;
- si el dispositivo puede actuar.

## Qué no hace todavía

- No aplica automáticamente tiradas remotas en pantalla.
- No resuelve conflictos avanzados.
- No sustituye aún al control completo de partida online.

Esta versión mantiene intacto el modo local, el modo máquina, las reglas rápidas, estadísticas, sonidos y Cloudflare Analytics.
