#!/usr/bin/env node
const fs=require("fs"),path=require("path");
const root=process.cwd();
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"style.css"),"utf8");
const js=fs.readFileSync(path.join(root,"online-foundation.js"),"utf8");
let f=[];function a(c,m){if(!c)f.push(m)}
["cg-online-create-btn","cg-online-refresh-btn","cg-online-room-code","cg-online-host-name","cg-online-guest-name","cg-online-room-state","cg-online-join-code","cg-online-join-btn","cg-online-clear-btn","cg-online-status"].forEach(id=>a(html.includes(`id="${id}"`),`Falta ID ${id}`));
a(html.includes("cg-online-copy-btn"),"Debe existir botón copiar");
a(css.includes("Online Lobby Safe Layout"),"Debe existir CSS safe layout");
a(js.includes("cg-online-copy-btn"),"Debe existir lógica mínima de copiar");
a(!html.includes("online-clock.js"),"No debe añadirse online-clock.js");
a(!html.includes("supabase-client.js"),"No debe añadirse supabase-client.js");
console.log(`AUDITORIA_CRONOGOL_ONLINE_LOBBY_SAFE_LAYOUT: ${f.length?"FAIL":"OK"}`);
if(f.length){f.forEach(x=>console.error("- "+x));process.exit(1)}
