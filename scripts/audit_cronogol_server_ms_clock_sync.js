#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const game = fs.readFileSync(path.join(root, "game.js"), "utf8");
const schema = fs.readFileSync(path.join(root, "SUPABASE_SCHEMA_v2_6_9.sql"), "utf8");

let failures = [];
function a(cond, msg){ if(!cond) failures.push(msg); }

a(game.includes('const VERSION="2.6.9"'), "Deterministic clock debe estar etiquetado como 2.6.9");
a(game.includes("cronogol_server_time_ms"), "game.js debe llamar al RPC cronogol_server_time_ms");
a(game.includes("applyServerClockSample"), "game.js debe calcular offset con muestra de servidor");
a(game.includes("const midpoint=(Number(t0)+Number(t1))/2"), "game.js debe usar punto medio t0/t1 tipo NTP");
a(game.includes("await syncServerClock(true);const rs="), "publishStart debe sincronizar antes de publicar START");
a(game.includes('clockSource:serverOffsetReady?"server-ms":"local-fallback"'), "runningState debe registrar clockSource");
a(game.includes("http-date-fallback"), "Debe existir fallback por cabecera Date");
a(schema.includes("create or replace function public.cronogol_server_time_ms()"), "SQL v2.6.9 debe crear RPC de hora servidor");
a(schema.includes("grant execute on function public.cronogol_server_time_ms() to anon"), "SQL v2.6.9 debe conceder ejecución a anon");

console.log(`AUDITORIA_CRONOGOL_SERVER_MS_CLOCK_SYNC: ${failures.length ? "FAIL" : "OK"}`);
if(failures.length){
  failures.forEach((f)=>console.error("- " + f));
  process.exit(1);
}
