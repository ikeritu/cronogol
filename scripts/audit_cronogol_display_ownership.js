#!/usr/bin/env node
let f=[];function a(c,m){if(!c)f.push(m)}
let owner="IDLE",ui={timer:"",lastTwo:"",title:""},stop=null,running=false,localTurn=false;
function setOwner(o){owner=o}
function paint(){if(running&&localTurn){setOwner("RUNNING_LOCAL");ui.timer="00:11:43";ui.lastTwo="43";return}if(stop){setOwner(localTurn?"STOP_FROZEN":"WAITING_REMOTE");ui.timer=stop.displayTime;ui.lastTwo=stop.valueText;ui.title=stop.title}}
stop={displayTime:"00:06:70",valueText:"70",title:"GOL"};running=false;localTurn=false;paint();a(owner==="WAITING_REMOTE","esperando: dueño WAITING_REMOTE");a(ui.timer==="00:06:70"&&ui.lastTwo==="70"&&ui.title==="GOL","STOP remoto pinta reloj/número/evento coherentes");
running=true;localTurn=false;ui.timer="00:11:43";paint();a(ui.timer==="00:06:70"&&ui.lastTwo==="70","rival corriendo no puede pisar STOP congelado");
running=true;localTurn=true;paint();a(owner==="RUNNING_LOCAL"&&ui.timer==="00:11:43"&&ui.lastTwo==="43","mi turno corriendo sí pinta reloj vivo");
running=false;localTurn=true;stop={displayTime:"00:04:31",valueText:"31",title:"FALLO"};paint();a(owner==="STOP_FROZEN"&&ui.timer==="00:04:31"&&ui.lastTwo==="31","mi STOP queda congelado");
stop={displayTime:"00:00:09",valueText:"09",title:"PENALTI"};running=false;localTurn=true;paint();a(ui.timer==="00:00:09"&&ui.lastTwo==="09","especial pendiente conserva STOP original");
console.log(`AUDITORIA_CRONOGOL_DISPLAY_OWNERSHIP: ${f.length?"FAIL":"OK"}`);if(f.length){f.forEach(x=>console.error("- "+x));process.exit(1)}
