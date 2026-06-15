-- CronoGol v2.1.0 — Room Lobby Sync
-- La tabla de v2.0.1 ya sirve para el lobby. Esto solo añade índices útiles.

create index if not exists idx_cronogol_rooms_status on public.cronogol_rooms (status);
create index if not exists idx_cronogol_rooms_last_seen_at on public.cronogol_rooms (last_seen_at desc);
