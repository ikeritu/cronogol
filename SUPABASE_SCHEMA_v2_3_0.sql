-- CronoGol v2.3.0 — Online Turn Control
-- No requiere cambios obligatorios de esquema si ya existe cronogol_rooms.
-- Se usan estos campos ya existentes:
--   status = 'playing'
--   state_json.currentPlayerIndex
--   state_json.players
--   state_json.score
--   state_json.lastTurnSyncAt
--
-- Índice opcional:
create index if not exists idx_cronogol_rooms_status_last_seen
on public.cronogol_rooms (status, last_seen_at desc);
