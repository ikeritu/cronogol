# CronoGol v2.1.7 — Online Remote Action UX

## Objetivo

Mejorar la experiencia visual cuando un dispositivo recibe una acción online publicada por el rival.

## Cambios incluidos

- Añadido aviso flotante de acción remota.
- El aviso muestra jugador, número obtenido, resultado y próximo turno.
- El panel V2 Online hace un pulso suave al recibir acción remota.
- Se mantiene la actualización de marcador, turno, parte y última acción online de v2.1.6.
- Se evita duplicar eventos remotos ya aplicados.
- Respeta `prefers-reduced-motion`.

## Sin cambios

- No cambia reglas del juego.
- No cambia modo local.
- No cambia modo máquina.
- No cambia las reglas rápidas.
- No cambia configuración Supabase.
- No añade login.

## Estado

Sigue siendo una fase de sincronización online progresiva. El online real requiere configurar Supabase.
