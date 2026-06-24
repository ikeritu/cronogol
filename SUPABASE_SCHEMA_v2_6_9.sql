-- CronoGol v2.6.9 — Server Millisecond Clock Sync
-- Añade una función RPC para devolver hora de servidor en milisegundos.

create or replace function public.cronogol_server_time_ms()
returns bigint
language sql
stable
as $$
  select floor(extract(epoch from clock_timestamp()) * 1000)::bigint;
$$;

grant execute on function public.cronogol_server_time_ms() to anon;
