#!/usr/bin/env node
let failures=[];function a(c,m){if(!c)failures.push(m)}
let guard={active:false,lastMs:0};
function fmt(ms){const h=Math.floor(ms/10),m=Math.floor(h/6000),s=Math.floor((h%6000)/100),c=h%100;return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(c).padStart(2,"0")}`}
function mono(ms){if(!guard.active){guard.active=true;guard.lastMs=ms;return ms}if(ms<guard.lastMs)return guard.lastMs;guard.lastMs=ms;return ms}
a(fmt(mono(10730))==="00:10:73","00:10:73 permitido");
a(fmt(mono(9750))==="00:10:73","00:10:73 -> 00:09:75 debe bloquearse");
a(fmt(mono(10980))==="00:10:98","00:10:98 permitido");
a(fmt(mono(11000))==="00:11:00","00:11:00 permitido");
guard.active=false;guard.lastMs=0;
a(fmt(mono(120))==="00:00:12","cambio de turno / nuevo START resetea guard");
console.log(`AUDITORIA_CRONOGOL_MONOTONIC_TIMER: ${failures.length?"FAIL":"OK"}`);
if(failures.length){failures.forEach(f=>console.error("- "+f));process.exit(1)}
