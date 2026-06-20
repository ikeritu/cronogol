#!/usr/bin/env node
let failures=[];function a(c,m){if(!c)failures.push(m)}
let ui={timer:"",lastTwo:"",title:""};function stop(v,t,title){ui.timer=t;ui.lastTwo=String(v).padStart(2,"0");ui.title=title}function remote(t,v){}
stop(83,"00:06:83","FALLO");remote("00:00:09",9);a(ui.timer==="00:06:83","STOP 83 no retrocede a 09");a(ui.lastTwo==="83","lastTwo 83");
stop(9,"00:00:09","PENALTI");remote("00:06:83",83);a(ui.timer==="00:00:09","PENALTI 09 no cambia a 83");a(ui.lastTwo==="09","lastTwo 09");
stop(96,"00:00:96","FALTA PELIGROSA");remote("00:01:20",20);a(ui.timer==="00:00:96","FALTA 96 no cambia");a(ui.lastTwo==="96","lastTwo 96");
console.log(`AUDITORIA_CRONOGOL_STOP_TIME_SYNC: ${failures.length?"FAIL":"OK"}`);if(failures.length){failures.forEach(f=>console.error("- "+f));process.exit(1)}
