# CronoGol v2.1.1 — Supabase Realtime Room Status

Esta fase añade estado Realtime básico a las salas privadas.

## Qué debe ocurrir

1. Jugador A selecciona Online y crea una sala.
2. Jugador B introduce el código y se une.
3. La sala pasa de `waiting` a `ready` en Supabase.
4. El navegador de Jugador A recibe el cambio sin recargar y muestra que el rival está conectado.

## Límite de esta versión

Todavía no sincroniza marcador, turnos ni tiradas. Eso queda para v2.1.2.

## Requisito Supabase

La tabla `public.cronogol_rooms` debe estar incluida en la publicación `supabase_realtime`. El SQL incluido lo intenta activar automáticamente.
