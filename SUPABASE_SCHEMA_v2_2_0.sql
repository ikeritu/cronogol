-- CronoGol v2.2.0 — Online Match Start
-- No requiere cambios obligatorios de esquema si ya ejecutaste v2.0.1.
-- La fase playing se guarda en:
--   cronogol_rooms.status = 'playing'
--   cronogol_rooms.state_json.phase = 'playing'
--   cronogol_rooms.state_json.players / score / startedAt
--
-- Índice opcional:
create index if not exists idx_cronogol_rooms_status_updated
on public.cronogol_rooms (status, updated_at desc);
