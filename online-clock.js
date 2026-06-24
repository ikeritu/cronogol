/* CronoGol v2.7.0 - Online Lobby Visual Match (Realtime sync) */
(function(){
"use strict";if(!window.CRONOGOL_DETERMINISTIC_CLOCK_ACTIVE)return;
const VERSION="2.7.0",URL="https://xbrrdkflztxkvnngmdhu.supabase.co",KEY="sb_publishable_Ktw6Eh91X5K0yRjA9qJ6VA_vhxLPu8l",TABLE="cronogol_rooms",LEGACY_POLL_MS=450,FALLBACK_POLL_MS=5000,WATCHDOG_MS=1000;
let state=null,rafId=0,pullBusy=false,pushBusy=false,lastStopId="",stopLockUntil=0;
let legacyPullId=0,fallbackPullId=0,watchdogId=0,realtimeChannel=null,realtimeRoomCode="",reconnectAttempts=0,reconnectTimer=0,lastRealtimeEventAtMs=0;
const CTRL_CHARS_RE=new RegExp("[" + String.fromCharCode(0) + "-" + String.fromCharCode(31) + String.fromCharCode(127) + "]","g");
function cleanName(value){return String(value||"").replace(CTRL_CHARS_RE,"")}

function online(){try{return gameState&&gameState.gameMode==="online"&&gameScreen&&gameScreen.classList.contains("active")&&roomCode()}catch(e){return false}}
function st(){try{return window.CronoGolOnline&&window.CronoGolOnline.getOnlineStatus?window.CronoGolOnline.getOnlineStatus():{}}catch(e){return {}}}
function roomCode(){return String(st().currentRoomCode||"").trim().toUpperCase()} function role(){return String(st().currentRole||"").toLowerCase()} function localIndex(){return role()==="guest"?1:0}
function p2(n){return String(n).padStart(2,"0")} function formatMs(ms){const h=Math.floor(Number(ms||0)/10),m=Math.floor(h/6000),s=Math.floor((h%6000)/100),c=h%100;return `${p2(m)}:${p2(s)}:${p2(c)}`}
function valueFromMs(ms){return Math.floor(Number(ms||0)/10)%100}
function eventClass(t){return t==="goal"?"event-goal":(t==="miss"?"event-miss":"event-special")}
function officialEvent(v,mode){const n=Number(v),m=String(mode||(gameState&&gameState.matchMode)||"classic").toLowerCase(),fast=(m==="five"||m==="fast"||m==="rapido"||m==="rápido");if(fast){if(n===1||n===2)return{eventType:"post",title:"POSTE",eventClass:eventClass("post")};if(n===3||n===4)return{eventType:"crossbar",title:"LARGUERO",eventClass:eventClass("crossbar")};if(n===50)return{eventType:"yellow",title:"AMARILLA",eventClass:eventClass("yellow")};if(n===60)return{eventType:"red",title:"ROJA",eventClass:eventClass("red")};if(n===96||n===97)return{eventType:"free",title:"FALTA PELIGROSA",eventClass:eventClass("free")};if(n%10===9)return{eventType:"penalty",title:"PENALTI",eventClass:eventClass("penalty")};if(n%10===0)return{eventType:"goal",title:"GOL",eventClass:eventClass("goal")};return{eventType:"miss",title:"FALLO",eventClass:eventClass("miss")}} if(n===99)return{eventType:"penalty",title:"PENALTI",eventClass:eventClass("penalty")};if(n===96||n===97)return{eventType:"free",title:"FALTA PELIGROSA",eventClass:eventClass("free")};if(n%11===0)return{eventType:"goal",title:"GOL",eventClass:eventClass("goal")};return{eventType:"miss",title:"FALLO",eventClass:eventClass("miss")}}
async function sf(path,opt={}){const headers=Object.assign({apikey:KEY,Authorization:`Bearer ${KEY}`,"Content-Type":"application/json"},opt.headers||{}),r=await fetch(`${URL}/rest/v1/${path}`,Object.assign({},opt,{headers})),tx=await r.text();let d=null;if(tx){try{d=JSON.parse(tx)}catch(e){d=tx}}if(!r.ok)throw new Error(d&&d.message?d.message:`Supabase HTTP ${r.status}`);return d}
function endpoint(){return `${TABLE}?room_code=eq.${encodeURIComponent(roomCode())}`}
function players(){return (gameState.players||[]).slice(0,2).map((p,i)=>({index:i,name:cleanName(p&&p.name?p.name:`Jugador ${i+1}`).slice(0,24),goals:Number(p&&p.goals||0),skipTurns:Number(p&&p.skipTurns||0)}))}
function score(ps=players()){return [Number(ps[0]&&ps[0].goals||0),Number(ps[1]&&ps[1].goals||0)]}
function remoteTurn(){return state&&Number.isFinite(Number(state.currentPlayerIndex))?Number(state.currentPlayerIndex):Number(gameState.currentPlayerIndex||0)} function myTurn(){return remoteTurn()===localIndex()}
function currentRun(){return state&&state.runningState&&state.runningState.isRunning?state.runningState:null} function runElapsed(rs){return Number(rs.baseMs||0)+Math.max(0,Date.now()-Number(rs.startedAtMs||Date.now()))}
function paintClock(ms){const text=formatMs(ms),v=p2(valueFromMs(ms));if(timerDisplay)timerDisplay.textContent=text;if(lastTwoDisplay)lastTwoDisplay.textContent=v;window.__cronogolDeterministicClockPaint={version:VERSION,text,value:v,ms,at:new Date().toISOString()}}
function clearRaf(){if(rafId){cancelAnimationFrame(rafId);rafId=0}} function frame(){if(!online()){clearRaf();return}const rs=currentRun();if(!rs){clearRaf();return}paintClock(runElapsed(rs));rafId=requestAnimationFrame(frame)} function ensureRaf(){if(!rafId)rafId=requestAnimationFrame(frame)}
function btn(){return typeof mainActionBtn!=="undefined"?mainActionBtn:document.querySelector("#main-action-btn")} function setBtn(txt,dis,stop){const b=btn();if(!b)return;b.textContent=txt;b.disabled=!!dis;b.classList.toggle("stop",!!stop);b.classList.toggle("waiting-turn",txt.indexOf("ESPERANDO")>=0)} function controls(){if(!online())return;const rs=currentRun();if(rs&&Number(rs.playerIndex)===localIndex())return setBtn("STOP",false,true);if(rs)return setBtn("ESPERANDO TURNO",true,false);return myTurn()?setBtn("START",false,false):setBtn("ESPERANDO TURNO",true,false)}
function paintStop(stop){if(!stop)return;clearRaf();if(timerDisplay)timerDisplay.textContent=stop.displayTime||formatMs(stop.elapsedMs||0);if(lastTwoDisplay)lastTwoDisplay.textContent=stop.valueText||p2(stop.value||valueFromMs(stop.elapsedMs||0));if(eventTitle)eventTitle.textContent=stop.title||"--";if(messageLabel)messageLabel.textContent=stop.message||`${stop.actorName||"Jugador"} sacó ${stop.valueText} → ${stop.title}`;if(eventCard)eventCard.className=`event-card ${stop.eventClass||eventClass(stop.eventType)}`;window.__cronogolOfficialStopPaint={version:VERSION,stop,at:new Date().toISOString()}}

function applyState(next){
  if(!next)return;
  const incomingSeq=Number(next.seq||0),currentSeq=Number((state&&state.seq)||0);
  if(incomingSeq>0&&incomingSeq<=currentSeq)return;
  state=next;
  if(Number.isFinite(Number(next.currentPlayerIndex)))gameState.currentPlayerIndex=Number(next.currentPlayerIndex);
  if(Array.isArray(next.players)&&Array.isArray(gameState.players))next.players.slice(0,2).forEach((p,i)=>{if(!gameState.players[i])return;if(typeof p.name==="string")gameState.players[i].name=cleanName(p.name).slice(0,24)||gameState.players[i].name;if(Number.isFinite(Number(p.goals)))gameState.players[i].goals=Number(p.goals);if(Number.isFinite(Number(p.skipTurns)))gameState.players[i].skipTurns=Number(p.skipTurns)});
  try{updateUI()}catch(e){}
  if(currentRun())ensureRaf();else clearRaf();
  if(next.lastStoppedThrow&&next.lastStoppedThrow.stopId!==lastStopId){lastStopId=next.lastStoppedThrow.stopId;paintStop(next.lastStoppedThrow)}
  controls()
}

function build(extra){
  const ps=players(),nextSeq=Number((state&&state.seq)||0)+1;
  return Object.assign({},state||{},{schemaVersion:13,appVersion:VERSION,seq:nextSeq,phase:gameState.matchEnded?"finished":"playing",status:gameState.matchEnded?"finished":"playing",matchMode:gameState.matchMode||"classic",currentPlayerIndex:Number(gameState.currentPlayerIndex||0),players:ps,score:score(ps),updatedBy:role()||"unknown",updatedAtClient:new Date().toISOString()},extra||{})
}

async function patchState(extra){if(!online()||pushBusy)return;pushBusy=true;try{const next=build(extra);state=next;await sf(endpoint(),{method:"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify({status:next.status||"playing",state_json:next,app_version:VERSION,last_seen_at:new Date().toISOString()})})}catch(e){try{console.warn("[v2.7.0 patchState]",e)}catch(_){}}finally{pushBusy=false}}
async function pullState(){if(!online()||pullBusy)return;pullBusy=true;try{const rows=await sf(`${endpoint()}&select=state_json,status,updated_at`,{method:"GET"});if(!Array.isArray(rows)||!rows.length)return;const next=rows[0].state_json||{};if(rows[0].status&&!next.status)next.status=rows[0].status;applyState(next)}catch(e){try{console.warn("[v2.7.0 pullState]",e)}catch(_){}}finally{pullBusy=false}}
async function publishStart(){const rs={runningId:`run-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,isRunning:true,playerIndex:localIndex(),startedAtMs:Date.now(),baseMs:Number.isFinite(Number(currentElapsedMs))?Number(currentElapsedMs):0,sourceRole:role()||"unknown",updatedAt:new Date().toISOString()};state=build({runningState:rs});ensureRaf();await patchState({runningState:rs})}
function baseEvent(v){const title=eventTitle?String(eventTitle.textContent||""):"";if(title&&title!=="--"){let t=/gol/i.test(title)?"goal":/penal/i.test(title)?"penalty":/falta/i.test(title)?"free":/amarilla/i.test(title)?"yellow":/roja/i.test(title)?"red":/poste/i.test(title)?"post":/larguero/i.test(title)?"crossbar":"miss";return{eventType:t,title,eventClass:eventClass(t)}}return officialEvent(v,gameState.matchMode)}
async function publishStop(){if(!online())return;const rs=currentRun(),elapsed=rs?Math.round(runElapsed(rs)):Math.round(Number(currentElapsedMs||0)),v=valueFromMs(elapsed),ev=baseEvent(v),actorIndex=localIndex(),actor=gameState.players&&gameState.players[actorIndex]?gameState.players[actorIndex]:{name:`Jugador ${actorIndex+1}`},ps=players(),stop={stopId:`stop-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,actorIndex,actorName:cleanName(actor.name||`Jugador ${actorIndex+1}`).slice(0,24),elapsedMs:elapsed,displayTime:formatMs(elapsed),value:v,valueText:p2(v),eventType:ev.eventType,title:ev.title,eventClass:ev.eventClass,message:`${actor.name||`Jugador ${actorIndex+1}`} sacó ${p2(v)} → ${ev.title}`,score:score(ps),turnAfter:Number(gameState.currentPlayerIndex||0),createdAt:new Date().toISOString()};stopLockUntil=Date.now()+600;lastStopId=stop.stopId;paintStop(stop);await patchState({runningState:null,lastStoppedThrow:stop,lastThrow:{id:stop.stopId,value:stop.value,valueText:stop.valueText,displayTime:stop.displayTime,elapsedMs:stop.elapsedMs,actorIndex:stop.actorIndex,actorName:stop.actorName,title:stop.title,message:stop.message,eventType:stop.eventType,eventClass:stop.eventClass,createdAt:stop.createdAt},currentPlayerIndex:Number(gameState.currentPlayerIndex||0),players:ps,score:score(ps)})}
function blockStart(){if(!online()||!state)return false;if(Number.isFinite(Number(state.currentPlayerIndex))&&Number(state.currentPlayerIndex)!==localIndex()){controls();return true}return false}

/* --- Realtime sync (sustituye al polling fijo de 450ms) --- */
function hasRealtimeClient(){return !!(window.CronoGolSupabaseClient&&typeof window.CronoGolSupabaseClient.channel==="function")}
function clearLegacyPoll(){if(legacyPullId){clearInterval(legacyPullId);legacyPullId=0}}
function clearFallbackPoll(){if(fallbackPullId){clearInterval(fallbackPullId);fallbackPullId=0}}
function clearReconnectTimer(){if(reconnectTimer){clearTimeout(reconnectTimer);reconnectTimer=0}}

function teardownRealtime(){
  clearReconnectTimer();
  if(realtimeChannel&&window.CronoGolSupabaseClient){try{window.CronoGolSupabaseClient.removeChannel(realtimeChannel)}catch(e){}}
  realtimeChannel=null;realtimeRoomCode="";
}

function scheduleReconnect(){
  teardownRealtime();
  if(!online())return;
  reconnectAttempts++;
  const delay=Math.min(30000,1000*Math.pow(2,reconnectAttempts));
  reconnectTimer=setTimeout(()=>{reconnectTimer=0;if(online())subscribeRealtime()},delay);
}

function handleRealtimeRow(row){
  if(!row)return;
  lastRealtimeEventAtMs=Date.now();
  const next=row.state_json||{};
  if(row.status&&!next.status)next.status=row.status;
  applyState(next)
}

function subscribeRealtime(){
  if(!hasRealtimeClient()||!online())return;
  const code=roomCode();
  if(!code)return;
  if(realtimeChannel&&realtimeRoomCode===code)return;
  teardownRealtime();
  realtimeRoomCode=code;
  realtimeChannel=window.CronoGolSupabaseClient
    .channel(`cronogol_room_${code}`)
    .on("postgres_changes",{event:"UPDATE",schema:"public",table:TABLE,filter:`room_code=eq.${code}`},(payload)=>{handleRealtimeRow(payload&&payload.new)})
    .subscribe((status)=>{
      if(status==="SUBSCRIBED"){reconnectAttempts=0;pullState()}
      else if(status==="CHANNEL_ERROR"||status==="TIMED_OUT"||status==="CLOSED"){scheduleReconnect()}
    });
}

function startFallbackPoll(){
  if(fallbackPullId)return;
  fallbackPullId=setInterval(()=>{
    if(!online()){clearFallbackPoll();return}
    if(Date.now()-lastRealtimeEventAtMs>FALLBACK_POLL_MS)pullState();
  },FALLBACK_POLL_MS);
}

function startLegacyPoll(){if(!legacyPullId)legacyPullId=setInterval(pullState,LEGACY_POLL_MS)}

function stopSync(){teardownRealtime();clearFallbackPoll();clearLegacyPoll()}

function syncWatchdog(){
  if(online()){
    if(hasRealtimeClient()){
      clearLegacyPoll();
      if(!realtimeChannel||realtimeRoomCode!==roomCode())subscribeRealtime();
      startFallbackPoll();
    }else{
      startLegacyPoll();
    }
  }else{
    stopSync();
  }
}

document.addEventListener("visibilitychange",()=>{
  if(document.visibilityState==="visible"&&online()){
    pullState();
    syncWatchdog();
  }
});

if(!watchdogId)watchdogId=setInterval(syncWatchdog,WATCHDOG_MS);
syncWatchdog();

try{const b=startTimer;startTimer=function(){if(blockStart())return;const out=b.apply(this,arguments);if(online())setTimeout(publishStart,10);return out}}catch(e){}
try{const b=stopTimer;stopTimer=function(){const out=b.apply(this,arguments);if(online())setTimeout(publishStop,20);return out}}catch(e){}
try{const b=updateTimerDisplay;updateTimerDisplay=function(ms){if(online()){if(Date.now()<stopLockUntil)return;const rs=currentRun();if(rs&&Number(rs.playerIndex)!==localIndex()){paintClock(runElapsed(rs));return}}return b.apply(this,arguments)}}catch(e){}

window.CronoGolDeterministicOnlineClock=Object.freeze({version:VERSION,formatMs,valueFromMs,officialEvent,pullState,patchState,publishStart,publishStop,applyState,paintStop,paintClock,get state(){return state},get realtimeActive(){return !!realtimeChannel}});
})();
