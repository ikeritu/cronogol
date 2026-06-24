-- CronoGol v2.6.8 — Critical Infrastructure Fix
-- Migración idempotente para alinear Supabase con el frontend actual.

alter table public.cronogol_rooms add column if not exists state_json jsonb not null default '{}'::jsonb;
alter table public.cronogol_rooms add column if not exists app_version text not null default '2.6.8';
alter table public.cronogol_rooms add column if not exists last_seen_at timestamptz;
alter table public.cronogol_rooms add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'cronogol_rooms'
      and column_name = 'room_state'
  ) then
    execute 'update public.cronogol_rooms set state_json = room_state where state_json = ''{}''::jsonb and room_state is not null';
  end if;
end $$;

create or replace function public.set_cronogol_rooms_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_cronogol_rooms_updated_at on public.cronogol_rooms;
create trigger set_cronogol_rooms_updated_at
before update on public.cronogol_rooms
for each row
execute function public.set_cronogol_rooms_updated_at();

-- RLS sigue abierta en esta versión por compatibilidad con el prototipo.
-- Endurecimiento con tokens de sala pendiente para fase posterior.
