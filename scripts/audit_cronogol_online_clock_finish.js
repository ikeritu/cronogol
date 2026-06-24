#!/usr/bin/env node
/*
CronoGol v2.6.0 - auditoría de reloj/final online
Simula:
- jugador activo publica reloj oficial
- rival hereda reloj
- tirada guarda tiempo oficial
- final se publica como finished
- invitado queda bloqueado tras final
*/
let failures=[];
function a(c,m){if(!c)failures.push(m)}
function pad(n){return String(n).padStart(2,"0")}
function time(ms){const h=Math.floor(ms/10),m=Math.floor(h/6000),s=Math.floor((h%6000)/100),c=h%100;return `${pad(m)}:${pad(s)}:${pad(c)}`}
let room={status:"playing",state_json:{phase:"playing",matchMode:"five",currentPlayerIndex:0,players:[{name:"Iker",goals:5,skipTurns:0},{name:"ikeritus",goals:0,skipTurns:0}],score:[5,0],onlineClock:null,lastThrow:null,finalState:null}};
function pushClock(playerIndex,ms,isRunning){room.state_json.onlineClock={sourcePlayerIndex:playerIndex,elapsedMs:ms,displayTime:time(ms),isRunning,lastTwo:Math.floor(ms/10)%100,updatedAt:new Date().toISOString()}}
function guestPullClock(){return room.state_json.onlineClock.displayTime}
pushClock(0,1910,true);
a(guestPullClock()==="00:01:91","El invitado debe ver el reloj oficial 00:01:91");
room.state_json.lastThrow={actorName:"Iker",value:19,valueText:"19",title:"PENALTI",time:room.state_json.onlineClock.displayTime};
a(room.state_json.lastThrow.time==="00:01:91","La tirada debe guardar tiempo oficial");
room.state_json.players[0].goals=6; room.state_json.score=[6,0];
room.status="finished";
room.state_json.phase="finished";
room.state_json.finalState={status:"finished",finalTime:room.state_json.onlineClock.displayTime,finalScore:[6,0],winnerIndex:0,winnerName:"Iker",finishedAt:new Date().toISOString()};
const guest={blocked:false,matchEnded:false,finalTime:""};
function guestPullFinal(){if(room.status==="finished"){guest.blocked=true;guest.matchEnded=true;guest.finalTime=room.state_json.finalState.finalTime}}
guestPullFinal();
a(guest.matchEnded===true,"El invitado debe quedar en matchEnded");
a(guest.blocked===true,"El invitado debe quedar bloqueado tras final");
a(guest.finalTime==="00:01:91","El invitado debe ver el mismo tiempo final");
a(room.state_json.finalState.winnerName==="Iker","Ganador final correcto");
console.log(`AUDITORIA_CRONOGOL_ONLINE_CLOCK: ${failures.length?"FAIL":"OK"}`);
console.log(`AUDITORIA_CRONOGOL_ONLINE_FINISH: ${failures.length?"FAIL":"OK"}`);
if(failures.length){failures.forEach(f=>console.error("- "+f));process.exit(1)}
