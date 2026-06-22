#!/usr/bin/env node
let f=[];function a(c,m){if(!c)f.push(m)}function fmt(ms){const h=Math.floor(ms/10),m=Math.floor(h/6000),s=Math.floor((h%6000)/100),c=h%100;return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(c).padStart(2,"0")}`}function elapsed(start,now,base){return Number(base||0)+Math.max(0,Number(now)-Number(start))}
a(elapsed(1000,2750,0)===1750,"RUNNING_REMOTE calcula elapsed");a(fmt(elapsed(1000,2750,0))==="00:01:75","pinta 00:01:75");a(fmt(elapsed(1000,4000,500))==="00:03:50","respeta baseMs");
console.log(`AUDITORIA_CRONOGOL_RUNNING_REMOTE_DISPLAY: ${f.length?"FAIL":"OK"}`);if(f.length){f.forEach(x=>console.error("- "+x));process.exit(1)}
