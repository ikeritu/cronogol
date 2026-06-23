#!/usr/bin/env node
const fs=require("fs"),path=require("path");
const root=process.cwd();
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const clock=fs.readFileSync(path.join(root,"online-clock.js"),"utf8");
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
let f=[];function a(c,m){if(!c)f.push(m)}

a(html.includes("@supabase/supabase-js@"),"index.html debe cargar el SDK supabase-js v2 desde CDN");
a(html.indexOf("supabase-client.js")>0&&html.indexOf("supabase-client.js")<html.indexOf("game.js"),"supabase-client.js debe cargar antes de game.js");
a(html.indexOf("online-clock.js")>html.indexOf("game.js"),"online-clock.js debe cargar despues de game.js");

a(clock.includes("postgres_changes"),"online-clock.js debe suscribirse a postgres_changes");
a(clock.includes("SUBSCRIBED"),"online-clock.js debe manejar el estado SUBSCRIBED");
a(clock.includes("CHANNEL_ERROR")||clock.includes("TIMED_OUT"),"online-clock.js debe gestionar errores de canal para reconectar");
a(/seq/.test(clock),"online-clock.js debe implementar el guard de orden por seq en applyState");
a(!/setInterval\(pullState,\s*450\)/.test(clock),"online-clock.js no debe depender del polling fijo de 450ms como via principal");
a(clock.includes("LEGACY_POLL_MS"),"online-clock.js debe degradar a polling legacy si Realtime no esta disponible");

a(sw.includes("online-clock.js"),"sw.js debe precachear online-clock.js");
a(sw.includes("supabase-client.js"),"sw.js debe precachear supabase-client.js");

console.log(`AUDITORIA_CRONOGOL_REALTIME_SYNC: ${f.length?"FAIL":"OK"}`);
if(f.length){f.forEach(x=>console.error("- "+x));process.exit(1)}
