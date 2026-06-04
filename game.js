const $ = (id) => document.getElementById(id);

const setupScreen = $("setup-screen");
const gameScreen = $("game-screen");
const modalScreen = $("modal-screen");
const sideMenu = $("side-menu");

const player1Input = $("player1-name");
const player2Input = $("player2-name");
const gameModeSelect = $("game-mode");
const machineLevelSelect = $("machine-level");
const machineLevelLabel = $("machine-level-label");
const matchModeSelect = $("match-mode");
const forceEventsInput = $("force-events");
const soundEnabledInput = $("sound-enabled");

const startMatchBtn = $("start-match-btn");
const mainActionBtn = $("main-action-btn");
const resetBtn = $("reset-btn");
const menuResetBtn = $("menu-reset-btn");
const menuBtn = $("menu-btn");
const closeMenuBtn = $("close-menu-btn");

const rulesBtn = $("rules-btn");
const menuRulesBtn = $("menu-rules-btn");
const supportBtn = $("support-btn");
const menuSupportBtn = $("menu-support-btn");
const shareBtn = $("share-btn");
const menuShareBtn = $("menu-share-btn");
const copyLinkBtn = $("copy-link-btn");
const menuCopyBtn = $("menu-copy-btn");

const p1Label = $("p1-label"), p2Label = $("p2-label"), p1Score = $("p1-score"), p2Score = $("p2-score");
const p1Sanction = $("p1-sanction"), p2Sanction = $("p2-sanction");
const team0 = $("team-0"), team1 = $("team-1");
const halfLabel = $("half-label");
const timerDisplay = $("timer-display"), lastTwoDisplay = $("last-two-display");
const eventCard = $("event-card"), eventTitle = $("event-title"), messageLabel = $("message-label");
const turnLabel = $("turn-label");
const statTurns = $("stat-turns"), statGoals = $("stat-goals"), statWoodwork = $("stat-woodwork"), statCards = $("stat-cards"), statSpecials = $("stat-specials");
const matchClockLabel = $("match-clock-label"), localMatchesCount = $("local-matches-count");
const gameLog = $("game-log");

const specialPanel = $("special-panel"), specialLabel = $("special-label"), specialStartBtn = $("special-start-btn");
const shootoutPanel = $("shootout-panel"), shootoutP1Name = $("shootout-p1-name"), shootoutP2Name = $("shootout-p2-name"), shootoutP1 = $("shootout-p1"), shootoutP2 = $("shootout-p2");
const debugBox = $("debug-box"), debugValueInput = $("debug-value"), debugThrowBtn = $("debug-throw-btn");

const modalTitle = $("modal-title"), modalText = $("modal-text"), modalExtra = $("modal-extra"), modalActions = $("modal-actions");

const CRONOGOL_CONFIG = {
  siteUrl:"https://ikeritu.github.io/cronogol/",
  whatsappText: "Estoy jugando a CronoGol, el juego del cronómetro Casio ⚽⌚\n\nPruébalo aquí:\nhttps://cronogol.netlify.app/",
  paypalUrl: "https://paypal.me/ikeritus",
  bizumPhone: "+34615717190",
  bizumConcept: "CronoGol",
  contactEmail: "ikeritu@hotmail.com"
};


const I18N = {
  es: {
    labelMode:"Modo",
    labelDuration:"Duración",
    labelDifficulty:"Dificultad",
    labelPlayer1:"Jugador 1",
    labelPlayer2:"Jugador 2 / Máquina",
    modeLocal:"1 vs 1",
    modeMachine:"1 vs Máquina",
    durationClassic:"Clásico",
    durationFast:"Rápido",
    startMatch:"EMPEZAR PARTIDO",
    forceMachine:"Forzar descanso/final contra máquina",
    sound:"Sonido",
    rules:"Reglas",
    share:"Compartir",
    copyLink:"Copiar enlace",
    feedback:"Feedback",
    supportShort:"Apoya",
    inDevelopment:"En desarrollo",
    onlineSoon:"Modo online próximamente",
    onlineSoonText:"Crea una sala privada y juega en tiempo real con un amigo.",
    sponsorSpace:"Espacio de patrocinador",
    sponsorText:"Visible solo fuera del partido. Nunca interrumpe la jugada.",
    lastThrow:"ÚLTIMA TIRADA",
    turnOf:"TURNO DE",
    stats:"Estadísticas",
    matchHistory:"Historial del partido",
    resetMatch:"Reiniciar partido",
    menu:"Menú",
    supportFull:"Apoya CronoGol"
  },
  en: {
    labelMode:"Mode",
    labelDuration:"Duration",
    labelDifficulty:"Difficulty",
    labelPlayer1:"Player 1",
    labelPlayer2:"Player 2 / Machine",
    modeLocal:"1 vs 1",
    modeMachine:"1 vs Machine",
    durationClassic:"Classic",
    durationFast:"Fast",
    startMatch:"START MATCH",
    forceMachine:"Force half/full time vs machine",
    sound:"Sound",
    rules:"Rules",
    share:"Share",
    copyLink:"Copy link",
    feedback:"Feedback",
    supportShort:"Support",
    inDevelopment:"In development",
    onlineSoon:"Online mode coming soon",
    onlineSoonText:"Create a private room and play live with a friend.",
    sponsorSpace:"Sponsor space",
    sponsorText:"Visible only outside the match. Never interrupts play.",
    lastThrow:"LAST THROW",
    turnOf:"TURN OF",
    stats:"Stats",
    matchHistory:"Match history",
    resetMatch:"Restart match",
    menu:"Menu",
    supportFull:"Support CronoGol"
  }
};

let currentLang = "es";


function updateLanguageLinks(){
  document.querySelectorAll('a[href^="feedback.html"]').forEach((a)=>{
    a.href = `feedback.html?lang=${currentLang}`;
  });
}


function applyLanguage(lang){
  currentLang = I18N[lang] ? lang : "es";

  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el)=>{
    const key = el.dataset.i18n;
    const value = I18N[currentLang][key];
    if(value) el.textContent = value;
  });

  document.querySelectorAll(".lang-btn").forEach((btn)=>{
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  updateLanguageLinks();
  try { localStorage.setItem("cronogol_lang", currentLang); } catch(e) {}
}


const MODAL_TEXTS = {
  es: {
    rulesTitle: "REGLAS",
    rulesIntro: "Se usan los dos últimos dígitos del cronómetro.",
    rulesHtml: `<div class="donation-item">
      <strong>Modo clásico</strong><br>
      <strong>00</strong> = Gol.<br>
      <strong>01-02</strong> = Poste. Repite el mismo jugador.<br>
      <strong>03-04</strong> = Larguero. Repite el mismo jugador.<br>
      <strong>45</strong> = Descanso. Se resetea el cronómetro y cambia el turno.<br>
      <strong>50</strong> = Amarilla. Termina el turno y pierde el siguiente.<br>
      <strong>60</strong> = Roja. Termina el turno y pierde dos turnos.<br>
      <strong>90</strong> = Final del partido.<br>
      <strong>96-97</strong> = Falta peligrosa. Hay una tirada especial: si sale de <strong>00 a 20</strong>, es gol; si sale de <strong>21 a 99</strong>, falla.<br>
      <strong>98-99</strong> = Penalti. Hay una tirada especial: si sale número <strong>par</strong>, es gol; si sale <strong>impar</strong>, falla.<br>
      <strong>Otros números</strong> = Fallo y cambia el turno.
    </div>
    <div class="donation-item">
      <strong>Modo rápido</strong><br>
      Todo número terminado en <strong>0</strong> es gol: 00, 10, 20, 30, 40, 50, 60, 70, 80 y 90.<br>
      Todo número terminado en <strong>9</strong> es penalti: 09, 19, 29, 39, 49, 59, 69, 79, 89 y 99.<br>
      En el penalti, se hace una tirada especial: <strong>par = gol</strong>, <strong>impar = fallo</strong>.<br>
      Gana el primero que llegue a <strong>6 goles con 2 de ventaja</strong>. Ejemplo: 6-4 gana; 6-5 no gana; hay que llegar a 7-5.
    </div>`,
    close: "CERRAR",
    supportTitle: "APOYA CRONOGOL",
    supportIntro: "CronoGol es gratis y lo seguirá siendo.",
    bizumButton: "Abrir Bizum",
    paypalButton: "Abrir PayPal",
    concept: "Concepto"
  },
  en: {
    rulesTitle: "RULES",
    rulesIntro: "The game uses the last two digits of the stopwatch.",
    rulesHtml: `<div class="donation-item">
      <strong>Classic mode</strong><br>
      <strong>00</strong> = Goal.<br>
      <strong>01-02</strong> = Post. Same player repeats.<br>
      <strong>03-04</strong> = Crossbar. Same player repeats.<br>
      <strong>45</strong> = Half-time. Stopwatch resets and turn changes.<br>
      <strong>50</strong> = Yellow card. Turn ends and the player skips the next turn.<br>
      <strong>60</strong> = Red card. Turn ends and the player skips two turns.<br>
      <strong>90</strong> = Full-time.<br>
      <strong>96-97</strong> = Dangerous free kick. Special throw: <strong>00 to 20</strong> is a goal; <strong>21 to 99</strong> is a miss.<br>
      <strong>98-99</strong> = Penalty. Special throw: <strong>even = goal</strong>; <strong>odd = miss</strong>.<br>
      <strong>Any other number</strong> = Miss and turn changes.
    </div>
    <div class="donation-item">
      <strong>Fast mode</strong><br>
      Any number ending in <strong>0</strong> is a goal: 00, 10, 20, 30, 40, 50, 60, 70, 80 and 90.<br>
      Any number ending in <strong>9</strong> is a penalty: 09, 19, 29, 39, 49, 59, 69, 79, 89 and 99.<br>
      Penalty special throw: <strong>even = goal</strong>, <strong>odd = miss</strong>.<br>
      The first player to reach <strong>6 goals with a 2-goal lead</strong> wins. Example: 6-4 wins; 6-5 does not; you need 7-5.
    </div>`,
    close: "CLOSE",
    supportTitle: "SUPPORT CRONOGOL",
    supportIntro: "CronoGol is free and will remain free.",
    bizumButton: "Open Bizum",
    paypalButton: "Open PayPal",
    concept: "Concept"
  }
};

function modalLang(){
  return MODAL_TEXTS[currentLang] ? currentLang : "es";
}


function setupLanguageSelector(){
  document.querySelectorAll(".lang-btn").forEach((btn)=>{
    btn.addEventListener("click",()=>applyLanguage(btn.dataset.lang));
  });

  try {
    applyLanguage(localStorage.getItem("cronogol_lang") || "es");
  } catch(e) {
    applyLanguage("es");
  }
}


let timerInterval = null, matchClockInterval = null, timerStartTime = 0, currentElapsedMs = 0, stopwatchBaseMs = 0, matchStartTime = 0;
let machineTurnTimeout = null, machineStopTimeout = null, machineSpecialTurnTimeout = null, machineSpecialStopTimeout = null;
let pendingSpecial = null, penaltyShootout = null, audioCtx = null, versionTaps = 0;

const gameState = {
  players: [{name:"Jugador 1",goals:0,skipTurns:0},{name:"Jugador 2",goals:0,skipTurns:0}],
  currentPlayerIndex:0, half:1, isRunning:false, gameMode:"local", machineLevel:"normal", matchMode:"classic", forceEvents:true, soundEnabled:true, matchEnded:false,
  totalTurns:0, firstHalfTurns:0, secondHalfTurns:0, machineForceHalfAt:null, machineForceEndAt:null, log:[],
  stats:{goals:0,woodwork:0,cards:0,specials:0,penalties:0,freeKicks:0,misses:0},
  lastFinalText:""
};

startMatchBtn.onclick = startMatch;
mainActionBtn.onclick = handleMainAction;
if(resetBtn) resetBtn.onclick = confirmReset;
menuResetBtn.onclick = () => { sideMenu.classList.add("hidden"); confirmReset(); };
specialStartBtn.onclick = handleSpecialButton;
debugThrowBtn.onclick = forceDebugThrow;
gameModeSelect.onchange = () => {
  if(gameModeSelect.value==="machine" && player2Input.value==="Jugador 2") player2Input.value="Máquina";
  if(gameModeSelect.value==="local" && player2Input.value==="Máquina") player2Input.value="Jugador 2";
  updateSetupVisibility();
};
rulesBtn.onclick = showRulesModal; menuRulesBtn.onclick = () => { sideMenu.classList.add("hidden"); showRulesModal(); };
supportBtn.onclick = showSupportModal; menuSupportBtn.onclick = () => { sideMenu.classList.add("hidden"); showSupportModal(); };
shareBtn.onclick = shareCronoGol; menuShareBtn.onclick = () => { sideMenu.classList.add("hidden"); shareCronoGol(); };
copyLinkBtn.onclick = copyCronoGolLink; menuCopyBtn.onclick = () => { sideMenu.classList.add("hidden"); copyCronoGolLink(); };
menuBtn.onclick = () => sideMenu.classList.remove("hidden");
closeMenuBtn.onclick = () => sideMenu.classList.add("hidden");
$("version-tap-target").onclick = () => { versionTaps++; if(versionTaps>=5){ debugBox.classList.remove("hidden"); showToast("Debug activado"); } };



function setupSegmentedControls(){
  document.querySelectorAll(".segment-btn").forEach((btn)=>{
    btn.addEventListener("click",()=>{
      const targetId = btn.dataset.target;
      const value = btn.dataset.value;
      const select = document.getElementById(targetId);
      if(!select) return;

      select.value = value;

      document
        .querySelectorAll(`.segment-btn[data-target="${targetId}"]`)
        .forEach((item)=>item.classList.toggle("active", item.dataset.value === value));

      select.dispatchEvent(new Event("change"));
    });
  });
}


function closeMenuAndRun(fn){
  sideMenu.classList.add("hidden");
  setTimeout(fn, 0);
}


function clearMachineTimers(){
  clearTimeout(machineTurnTimeout);
  clearTimeout(machineStopTimeout);
  clearTimeout(machineSpecialTurnTimeout);
  clearTimeout(machineSpecialStopTimeout);
  machineTurnTimeout = null;
  machineStopTimeout = null;
  machineSpecialTurnTimeout = null;
  machineSpecialStopTimeout = null;
}

function resetRuntimeState(){
  clearMachineTimers();
  clearInterval(timerInterval);
  clearInterval(matchClockInterval);
  timerInterval = null;
  matchClockInterval = null;
  pendingSpecial = null;
  penaltyShootout = null;
  currentElapsedMs = 0;
  stopwatchBaseMs = 0;
  gameState.isRunning = false;
  gameState.matchEnded = true;

  if(mainActionBtn){
    mainActionBtn.disabled = false;
    mainActionBtn.textContent = "START";
    mainActionBtn.classList.remove("stop");
  }

  if(specialStartBtn){
    specialStartBtn.disabled = false;
    specialStartBtn.textContent = "TIRADA ESPECIAL";
  }

  if(specialPanel) specialPanel.classList.add("hidden");
  if(shootoutPanel) shootoutPanel.classList.add("hidden");
}



function updateSetupVisibility(){
  machineLevelLabel.classList.toggle("is-hidden", gameModeSelect.value !== "machine");
}
function loadLocal(){ try{ player1Input.value = localStorage.getItem("cronogol_player1") || player1Input.value; player2Input.value = localStorage.getItem("cronogol_player2") || player2Input.value; localMatchesCount.textContent = localStorage.getItem("cronogol_matches_played") || "0"; }catch(e){} }
function saveLocal(p1,p2){ try{ localStorage.setItem("cronogol_player1",p1); localStorage.setItem("cronogol_player2",p2); }catch(e){} }
function incrementMatches(){ try{ const n=Number(localStorage.getItem("cronogol_matches_played")||"0")+1; localStorage.setItem("cronogol_matches_played",String(n)); localMatchesCount.textContent=n; }catch(e){} }

function startMatch(){
  clearMachineTimers();
  const p1 = player1Input.value.trim() || "Jugador 1";
  const p2Default = gameModeSelect.value === "machine" ? "Máquina" : "Jugador 2";
  const p2 = player2Input.value.trim() || p2Default;
  saveLocal(p1,p2);

  Object.assign(gameState,{
    players:[{name:p1,goals:0,skipTurns:0},{name:p2,goals:0,skipTurns:0}],
    currentPlayerIndex:0, half:1, isRunning:false, gameMode:gameModeSelect.value, machineLevel:machineLevelSelect.value, matchMode:matchModeSelect.value,
    forceEvents:forceEventsInput.checked, soundEnabled:soundEnabledInput.checked, matchEnded:false,totalTurns:0,firstHalfTurns:0,secondHalfTurns:0,
    machineForceHalfAt:randomInt(20,30),machineForceEndAt:randomInt(20,30),log:[],stats:{goals:0,woodwork:0,cards:0,specials:0,penalties:0,freeKicks:0,misses:0},lastFinalText:""
  });
  pendingSpecial=null; penaltyShootout=null; currentElapsedMs=0; stopwatchBaseMs=0; matchStartTime=Date.now();
  setupScreen.classList.remove("active"); gameScreen.classList.add("active"); closeModal(); sideMenu.classList.add("hidden");
  timerDisplay.textContent="00:00:00"; lastTwoDisplay.textContent="--"; setEvent("--", currentLang === "en" ? "Press START to begin." : "Pulsa START para comenzar.","neutral");
  startMatchClock(); updateUI(); addLog("Comienza el partido."); vibrate([30]); maybeMachineTurn();
}

function handleMainAction(){ if(gameState.matchEnded||pendingSpecial) return; gameState.isRunning ? stopTimerAndEvaluate() : startTimer(); }
function startTimer(){
  gameState.isRunning=true; timerStartTime=performance.now(); mainActionBtn.textContent="STOP"; mainActionBtn.classList.add("stop"); playSound("beep"); vibrate([20]);
  timerInterval=setInterval(()=>{ currentElapsedMs=stopwatchBaseMs+(performance.now()-timerStartTime); updateTimerDisplay(currentElapsedMs); },16);
}
function stopTimerAndEvaluate(forcedValue=null){
  stopTimer(); const value = forcedValue ?? getLastTwoDigits(currentElapsedMs); lastTwoDisplay.textContent=pad(value);
  if(penaltyShootout){ evaluateShootoutPenalty(value); return; }
  gameState.totalTurns++; if(gameState.half===1) gameState.firstHalfTurns++; else gameState.secondHalfTurns++;
  applyNormalResult(value,evaluateThrow(value));
}
function stopTimer(){ gameState.isRunning=false; clearInterval(timerInterval); timerInterval=null; stopwatchBaseMs=currentElapsedMs; mainActionBtn.textContent="START"; mainActionBtn.classList.remove("stop"); playSound("stop"); }
function getLastTwoDigits(ms){ return Math.floor(ms/10)%100; }
function updateTimerDisplay(ms){ const h=Math.floor(ms/10),m=Math.floor(h/6000),s=Math.floor((h%6000)/100),c=h%100; timerDisplay.textContent=`${pad(m)}:${pad(s)}:${pad(c)}`; lastTwoDisplay.textContent=pad(c); }


function isFastMode() {
  return gameState.matchMode === "five";
}

function hasFastModeWinner() {
  const a = gameState.players[0].goals;
  const b = gameState.players[1].goals;
  return (a >= 6 || b >= 6) && Math.abs(a - b) >= 2;
}

function evaluateFastThrow(v) {
  // Modo rápido:
  // - Todo número terminado en 0 es gol: 00, 10, 20... 90.
  // - Todo número terminado en 9 es penalti: 09, 19, 29...
  // - Gana el primero en llegar a 6 goles con 2 de ventaja.
  if (v % 10 === 0) return {type:"goal",msg:"⚽ GOOOL",cls:"goal"};
  if (v % 10 === 9) return {type:"penalty",msg:"PENALTI",cls:"special",special:"penalty"};
  return {type:"miss",msg:"FALLO",cls:"neutral"};
}


function evaluateThrow(v){
  if(isFastMode()) return evaluateFastThrow(v);
  if(v===0) return {type:"goal",msg:"⚽ GOOOL",cls:"goal"};
  if(v===1||v===2) return {type:"post",msg:"POSTE",cls:"special",repeat:true};
  if(v===3||v===4) return {type:"crossbar",msg:"LARGUERO",cls:"special",repeat:true};
  if(v===45) return {type:"half_time",msg:"DESCANSO",cls:"special"};
  if(v===50) return {type:"yellow",msg:"🟨 AMARILLA",cls:"yellow"};
  if(v===60) return {type:"red",msg:"🟥 ROJA",cls:"red"};
  if(v===90) return {type:"full_time",msg:"FINAL",cls:"special"};
  if(v===96||v===97) return {type:"free_kick",msg:"FALTA PELIGROSA",cls:"special",special:"free_kick"};
  if(v===98||v===99) return {type:"penalty",msg:"PENALTI",cls:"special",special:"penalty"};
  return {type:"miss",msg:"FALLO",cls:"neutral"};
}
function applyNormalResult(v,r){
  const p=currentPlayer(); setEvent(r.msg,`${p.name} sacó ${pad(v)} → ${r.msg}`,r.cls); addLog(`${clockSec()}  ${p.name} — ${pad(v)} — ${r.msg}`); playSound(r.type);
  if(r.type==="goal"){ p.goals++; gameState.stats.goals++; vibrate([90,40,90]); if(isFastMode() && hasFastModeWinner()){ endMatch(); } else { switchTurn(); } }
  else if(r.type==="post"||r.type==="crossbar"){ gameState.stats.woodwork++; vibrate([50,30,50]); messageLabel.textContent+=". Repite."; }
  else if(r.type==="half_time"){ if(gameState.half===1) showHalfTime(); else switchTurn(); }
  else if(r.type==="yellow"){ p.skipTurns++; gameState.stats.cards++; vibrate([120]); switchTurn(); }
  else if(r.type==="red"){ p.skipTurns+=2; gameState.stats.cards++; vibrate([160,60,160]); switchTurn(); }
  else if(r.type==="full_time"){ endMatch(); }
  else if(r.special){ gameState.stats.specials++; if(r.special==="free_kick")gameState.stats.freeKicks++; if(r.special==="penalty")gameState.stats.penalties++; pendingSpecial=r.special; specialPanel.classList.remove("hidden"); specialLabel.textContent=r.special==="free_kick"?`${p.name}: 00-20 es gol.`:`${p.name}: par es gol.`; mainActionBtn.disabled=true; vibrate([80,40,80]); maybeMachineSpecialTurn(); }
  else { gameState.stats.misses++; switchTurn(); }
  updateUI(); if(!gameState.matchEnded&&!pendingSpecial&&!penaltyShootout) maybeMachineTurn();
}
function handleSpecialButton(){ if(!pendingSpecial) return; if(gameState.gameMode==="machine" && gameState.currentPlayerIndex===1) return; if(!gameState.isRunning){ startTimer(); specialStartBtn.textContent="STOP ESPECIAL"; } else { stopTimer(); evaluateSpecialThrow(getLastTwoDigits(currentElapsedMs)); } }
function evaluateSpecialThrow(v){
  const p=currentPlayer(); let goal=false,msg="";
  if(pendingSpecial==="free_kick"){ goal=v>=0&&v<=20; msg=goal?"GOL DE FALTA":"FALTA FALLADA"; }
  if(pendingSpecial==="penalty"){ goal=v%2===0; msg=goal?"GOL DE PENALTI":"PENALTI FALLADO"; }
  if(goal){ p.goals++; gameState.stats.goals++; } else gameState.stats.misses++;
  setEvent(msg,`${pad(v)} → ${msg}`,goal?"goal":"neutral"); addLog(`${clockSec()}  ${p.name} — ${pad(v)} — ${msg}`); pendingSpecial=null; specialPanel.classList.add("hidden"); specialStartBtn.textContent="TIRADA ESPECIAL"; mainActionBtn.disabled=false; specialStartBtn.disabled=false; if(isFastMode() && goal && hasFastModeWinner()){ endMatch(); } else { switchTurn(); updateUI(); maybeMachineTurn(); }
}
function showHalfTime(){ gameState.half=2; currentElapsedMs=0; stopwatchBaseMs=0; timerDisplay.textContent="00:00:00"; lastTwoDisplay.textContent="--"; switchTurn(); showModal("DESCANSO",scoreText(),"<p>Se resetea el cronómetro y comienza la segunda parte.</p>",[{text:"CONTINUAR",action:()=>{closeModal();maybeMachineTurn();}}]); }
function endMatch(){ gameState.matchEnded=true; clearInterval(matchClockInterval); if(gameState.isRunning) stopTimer(); if(gameState.players[0].goals===gameState.players[1].goals){ showModal("FINAL",`${scoreText()}. Empate.`,finalHtml(),[{text:"IR A PENALTIS",action:startPenaltyShootout},{text:"TERMINAR EN EMPATE",action:()=>showFinal(false)}]); } else showFinal(false); }
function startPenaltyShootout(){ closeModal(); gameState.matchEnded=false; penaltyShootout={currentPlayerIndex:0,shots:[[],[]],goals:[0,0]}; gameState.currentPlayerIndex=0; shootoutPanel.classList.remove("hidden"); setEvent("PENALTIS","Par = gol, impar = fallo.","special"); updateUI(); maybeMachineTurn(); }
function evaluateShootoutPenalty(v){ const idx=penaltyShootout.currentPlayerIndex, goal=v%2===0; penaltyShootout.shots[idx].push(goal); if(goal){gameState.players[idx].goals++;gameState.stats.goals++;}else gameState.stats.misses++; addLog(`${clockSec()}  ${gameState.players[idx].name} — ${pad(v)} — ${goal?"Gol penalti":"Penalti fallado"}`); setEvent(goal?"GOL":"FALLO",pad(v),goal?"goal":"neutral"); if(isShootoutFinished()){ gameState.matchEnded=true; showFinal(true); updateUI(); return; } penaltyShootout.currentPlayerIndex=idx===0?1:0; gameState.currentPlayerIndex=penaltyShootout.currentPlayerIndex; updateUI(); maybeMachineTurn(); }
function isShootoutFinished(){ const a=penaltyShootout.shots[0],b=penaltyShootout.shots[1]; return a.length>=5&&b.length>=5&&a.length===b.length&&gameState.players[0].goals!==gameState.players[1].goals; }
function showFinal(pens){ incrementMatches(); let text=scoreText(); if(gameState.players[0].goals>gameState.players[1].goals) text+=`. Gana ${gameState.players[0].name}.`; else if(gameState.players[1].goals>gameState.players[0].goals) text+=`. Gana ${gameState.players[1].name}.`; else text+=". Empate final."; if(pens) text+=" Resuelto en penaltis."; gameState.lastFinalText=formattedFinalResult(); showModal("FINAL DEL PARTIDO",text,finalHtml(),[{text:"REVANCHA",action:restartSameMatch},{text:"COMPARTIR RESULTADO",action:shareResult},{text:"COPIAR RESULTADO",action:copyResult},{text:"NUEVA PARTIDA",action:resetToSetup}]); }
function finalHtml(){ return `<div class="donation-item"><strong>Resumen</strong><br>Tiradas: ${gameState.totalTurns}<br>Goles: ${gameState.stats.goals}<br>Postes/Largueros: ${gameState.stats.woodwork}<br>Tarjetas: ${gameState.stats.cards}<br>Especiales: ${gameState.stats.specials}</div><div class="donation-item"><strong>☕ CronoGol es gratis</strong><br><button class="bizum-direct-btn" onclick="openBizum()">Abrir Bizum</button><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">PayPal</a></div>`; }
function restartSameMatch(){ closeModal(); player1Input.value=gameState.players[0].name; player2Input.value=gameState.players[1].name; startMatch(); }
function switchTurn(){ gameState.currentPlayerIndex=gameState.currentPlayerIndex===0?1:0; processSkippedTurns(); }
function processSkippedTurns(){ let safe=0; while(currentPlayer().skipTurns>0&&safe<4){ const p=currentPlayer(); p.skipTurns--; addLog(`${clockSec()}  ${p.name} pierde turno por sanción`); gameState.currentPlayerIndex=gameState.currentPlayerIndex===0?1:0; safe++; } }

function maybeMachineSpecialTurn(){
  clearTimeout(machineSpecialTurnTimeout);
  clearTimeout(machineSpecialStopTimeout);

  if(gameState.gameMode!=="machine") return;
  if(gameState.currentPlayerIndex!==1) return;
  if(!pendingSpecial) return;
  if(gameState.matchEnded) return;
  if(!gameScreen.classList.contains("active")) return;

  mainActionBtn.disabled=true;
  specialStartBtn.disabled=true;

  machineSpecialTurnTimeout=setTimeout(()=>{
    if(gameState.matchEnded || gameState.gameMode!=="machine" || gameState.currentPlayerIndex!==1 || !pendingSpecial || !gameScreen.classList.contains("active")) return;

    startTimer();

    machineSpecialStopTimeout=setTimeout(()=>{
      if(gameState.matchEnded || gameState.gameMode!=="machine" || gameState.currentPlayerIndex!==1 || !pendingSpecial || !gameScreen.classList.contains("active")) return;

      stopTimer();

      let value = getLastTwoDigits(currentElapsedMs);

      if(gameState.machineLevel==="hard"){
        const roll = Math.random();
        if(pendingSpecial==="penalty" && roll < 0.58) value = randomInt(0,49) * 2;
        if(pendingSpecial==="free_kick" && roll < 0.42) value = randomInt(0,20);
      }

      evaluateSpecialThrow(value);
      mainActionBtn.disabled=false;
      specialStartBtn.disabled=false;
    }, getMachineStopDelay());
  }, randomInt(600,1200));
}

function maybeMachineTurn(){ if(gameState.gameMode!=="machine"||gameState.currentPlayerIndex!==1||gameState.matchEnded||pendingSpecial) return; mainActionBtn.disabled=true; specialStartBtn.disabled=true; setTimeout(()=>{ startTimer(); setTimeout(()=>{ stopTimerAndEvaluate(getMachineForcedValue()); mainActionBtn.disabled=false; specialStartBtn.disabled=false; },getMachineStopDelay()); },randomInt(500,1100)); }
function getMachineStopDelay(){ return gameState.machineLevel==="easy"?randomInt(600,1800):gameState.machineLevel==="hard"?randomInt(900,3200):randomInt(800,2500); }
function getMachineForcedValue(){ if(isFastMode()) return null; if(gameState.forceEvents){ if(gameState.half===1&&gameState.firstHalfTurns>=gameState.machineForceHalfAt) return 45; if(gameState.half===2&&gameState.secondHalfTurns>=gameState.machineForceEndAt) return 90; } if(gameState.machineLevel==="hard"){ const r=Math.random(); if(r<.025)return 0; if(r<.055)return [96,97,98,99][randomInt(0,3)]; } return null; }
function startMatchClock(){ clearInterval(matchClockInterval); matchClockInterval=setInterval(()=>{ const sec=Math.floor((Date.now()-matchStartTime)/1000); matchClockLabel.textContent=`${pad(Math.floor(sec/60))}:${pad(sec%60)}`; /* En modo rápido v1.6.1 no hay límite de 5 minutos: gana quien llega a 6 con 2 de ventaja. */ },1000); }
function updateUI(){ p1Label.textContent=gameState.players[0].name.toUpperCase(); p2Label.textContent=gameState.players[1].name.toUpperCase(); p1Score.textContent=gameState.players[0].goals; p2Score.textContent=gameState.players[1].goals; p1Sanction.textContent=gameState.players[0].skipTurns?`Sanción: ${gameState.players[0].skipTurns}`:""; p2Sanction.textContent=gameState.players[1].skipTurns?`Sanción: ${gameState.players[1].skipTurns}`:""; halfLabel.textContent=isFastMode()?"MODO RÁPIDO":(gameState.half===1?"1ª PARTE":"2ª PARTE"); turnLabel.textContent=currentPlayer().name; team0.classList.toggle("active",gameState.currentPlayerIndex===0); team1.classList.toggle("active",gameState.currentPlayerIndex===1); statTurns.textContent=gameState.totalTurns; statGoals.textContent=gameState.stats.goals; statWoodwork.textContent=gameState.stats.woodwork; statCards.textContent=gameState.stats.cards; statSpecials.textContent=gameState.stats.specials; updateShootoutUI(); renderLog(); }
function updateShootoutUI(){ if(!penaltyShootout){shootoutPanel.classList.add("hidden");return;} shootoutPanel.classList.remove("hidden"); shootoutP1Name.textContent=gameState.players[0].name; shootoutP2Name.textContent=gameState.players[1].name; shootoutP1.textContent=icons(penaltyShootout.shots[0]); shootoutP2.textContent=icons(penaltyShootout.shots[1]); }
function icons(shots){ const i=shots.map(s=>s?"✅":"❌"); while(i.length<5)i.push("⬜"); return i.join(" "); }
function setEvent(title,msg,cls){ eventTitle.textContent=title; messageLabel.textContent=msg; eventCard.className=`event-card event-${cls}`; }
function addLog(t){ gameState.log.unshift(t); if(gameState.log.length>50) gameState.log.pop(); renderLog(); }
function renderLog(){ gameLog.innerHTML=""; gameState.log.forEach(x=>{ const li=document.createElement("li"); li.textContent=x; gameLog.appendChild(li); }); }
function confirmReset(){ showModal("Reiniciar partido","¿Seguro que quieres reiniciar?", "", [{text:"SÍ, REINICIAR",action:resetToSetup},{text:"CANCELAR",action:closeModal}]); }
function resetToSetup(){ clearInterval(timerInterval); clearInterval(matchClockInterval); currentElapsedMs=0; stopwatchBaseMs=0; setupScreen.classList.add("active"); gameScreen.classList.remove("active"); closeModal(); sideMenu.classList.add("hidden"); }
function showModal(t,txt,html,actions){ modalTitle.textContent=t; modalText.textContent=txt; modalExtra.innerHTML=html||""; modalActions.innerHTML=""; actions.forEach(a=>{ const b=document.createElement("button"); b.textContent=a.text; b.onclick=a.action; modalActions.appendChild(b); }); modalScreen.classList.remove("hidden"); }
function closeModal(){ modalScreen.classList.add("hidden"); modalExtra.innerHTML=""; }
function showRulesModal(){
  if(currentLang === "en"){
    showModal(
      "RULES",
      "The game uses the last two digits of the stopwatch.",
      `<div class="donation-item">
        <strong>Classic mode</strong><br>
        <strong>00</strong> = Goal.<br>
        <strong>01-02</strong> = Post. Same player repeats.<br>
        <strong>03-04</strong> = Crossbar. Same player repeats.<br>
        <strong>45</strong> = Half-time. Stopwatch resets and turn changes.<br>
        <strong>50</strong> = Yellow card. Turn ends and player skips the next turn.<br>
        <strong>60</strong> = Red card. Turn ends and player skips two turns.<br>
        <strong>90</strong> = Full-time.<br>
        <strong>96-97</strong> = Dangerous free kick. Special throw: <strong>00 to 20</strong> is a goal; <strong>21 to 99</strong> is a miss.<br>
        <strong>98-99</strong> = Penalty. Special throw: <strong>even = goal</strong>; <strong>odd = miss</strong>.<br>
        <strong>Any other number</strong> = Miss and turn changes.
      </div>
      <div class="donation-item">
        <strong>Fast mode</strong><br>
        Any number ending in <strong>0</strong> is a goal: 00, 10, 20, 30, 40, 50, 60, 70, 80 and 90.<br>
        Any number ending in <strong>9</strong> is a penalty: 09, 19, 29, 39, 49, 59, 69, 79, 89 and 99.<br>
        Penalty special throw: <strong>even = goal</strong>, <strong>odd = miss</strong>.<br>
        First player to reach <strong>6 goals with a 2-goal lead</strong> wins. Example: 6-4 wins; 6-5 does not; you need 7-5.
      </div>`,
      [{text:"CLOSE",action:closeModal}]
    );
    return;
  }

  showModal(
    "REGLAS",
    "Se usan los dos últimos dígitos del cronómetro.",
    `<div class="donation-item">
      <strong>Modo clásico</strong><br>
      <strong>00</strong> = Gol.<br>
      <strong>01-02</strong> = Poste. Repite el mismo jugador.<br>
      <strong>03-04</strong> = Larguero. Repite el mismo jugador.<br>
      <strong>45</strong> = Descanso. Se resetea el cronómetro y cambia el turno.<br>
      <strong>50</strong> = Amarilla. Termina el turno y pierde el siguiente.<br>
      <strong>60</strong> = Roja. Termina el turno y pierde dos turnos.<br>
      <strong>90</strong> = Final del partido.<br>
      <strong>96-97</strong> = Falta peligrosa. Hay una tirada especial: si sale de <strong>00 a 20</strong>, es gol; si sale de <strong>21 a 99</strong>, falla.<br>
      <strong>98-99</strong> = Penalti. Hay una tirada especial: si sale número <strong>par</strong>, es gol; si sale <strong>impar</strong>, falla.<br>
      <strong>Otros números</strong> = Fallo y cambia el turno.
    </div>
    <div class="donation-item">
      <strong>Modo rápido</strong><br>
      Todo número terminado en <strong>0</strong> es gol: 00, 10, 20, 30, 40, 50, 60, 70, 80 y 90.<br>
      Todo número terminado en <strong>9</strong> es penalti: 09, 19, 29, 39, 49, 59, 69, 79, 89 y 99.<br>
      En el penalti, se hace una tirada especial: <strong>par = gol</strong>, <strong>impar = fallo</strong>.<br>
      Gana el primero que llegue a <strong>6 goles con 2 de ventaja</strong>. Ejemplo: 6-4 gana; 6-5 no gana; hay que llegar a 7-5.
    </div>`,
    [{text:"CERRAR",action:closeModal}]
  );
}
function showSupportModal(){ showModal("APOYA CRONOGOL","CronoGol es gratis y lo seguirá siendo.",`<div class="donation-data"><div class="donation-item"><strong>Bizum</strong><br>${CRONOGOL_CONFIG.bizumPhone} · Concepto: ${CRONOGOL_CONFIG.bizumConcept}<button class="bizum-direct-btn" onclick="openBizum()">Abrir Bizum</button></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">Abrir PayPal</a></div></div>`,[{text:"CERRAR",action:closeModal}]); }
async function copyBizumData(){ return copyText(`${CRONOGOL_CONFIG.bizumPhone} · Concepto: ${CRONOGOL_CONFIG.bizumConcept}`,"Datos de Bizum copiados"); }
async function openBizum(){
  await copyBizumData();
  showToast("Datos de Bizum copiados. Abriendo tu app bancaria...");
  window.location.href=`bizum://send?phone=${encodeURIComponent(CRONOGOL_CONFIG.bizumPhone)}&concept=${encodeURIComponent(CRONOGOL_CONFIG.bizumConcept)}`;
  setTimeout(()=>showToast(`Bizum: ${CRONOGOL_CONFIG.bizumPhone} · Concepto: ${CRONOGOL_CONFIG.bizumConcept}`),1200);
}
function whatsappShareUrl(){ return `https://wa.me/?text=${encodeURIComponent(CRONOGOL_CONFIG.whatsappText)}`; }
async function shareCronoGol(){
  const text = currentLang === "en"
    ? `I'm playing CronoGol ⚽⌚
${CRONOGOL_CONFIG.siteUrl}`
    : `Estoy jugando a CronoGol ⚽⌚
${CRONOGOL_CONFIG.siteUrl}`;

  try{
    if(navigator.share){
      await navigator.share({
        title:"CronoGol",
        text: currentLang === "en" ? "I'm playing CronoGol ⚽⌚" : "Estoy jugando a CronoGol ⚽⌚",
        url: CRONOGOL_CONFIG.siteUrl
      });
      return;
    }
  }catch(e){}

  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,"_blank","noopener");
}

function resultText(includeUrl=true){
  const final = gameState.lastFinalText && gameState.lastFinalText.includes("Penaltis:")
    ? gameState.lastFinalText
    : formattedFinalResult();
  const challenge = currentLang === "en" ? "Do you dare?" : "¿Te atreves?";
  const base = `⚽ CronoGol
${final}

${challenge}`;
  return includeUrl ? `${base}
${CRONOGOL_CONFIG.siteUrl}` : base;
}
async function shareResult(){
  try{
    if(navigator.share){
      await navigator.share({
        title:"Resultado CronoGol",
        text:resultText(false),
        url:CRONOGOL_CONFIG.siteUrl
      });
      return;
    }
  }catch(e){}
  window.open(`https://wa.me/?text=${encodeURIComponent(resultText(true))}`,"_blank","noopener");
}
function copyCronoGolLink(){
  copyText(
    CRONOGOL_CONFIG.siteUrl,
    currentLang === "en" ? "Link copied" : "Enlace copiado"
  );
}

function showSupportModal(){
  const t = MODAL_TEXTS[modalLang()];
  showModal(
    t.supportTitle,
    t.supportIntro,
    `<div class="donation-data"><div class="donation-item"><strong>Bizum</strong><br>${CRONOGOL_CONFIG.bizumPhone} · ${t.concept}: ${CRONOGOL_CONFIG.bizumConcept}<button class="bizum-direct-btn" onclick="openBizum()">${t.bizumButton}</button></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">${t.paypalButton}</a></div></div>`,
    [{text:t.close, action:closeModal}]
  );
}


// ===== v1.8.2 overrides: share/support language fix =====
async function shareCronoGol(){
  const nativeText = currentLang === "en" ? "I'm playing CronoGol ⚽⌚" : "Estoy jugando a CronoGol ⚽⌚";
  const fullText = `${nativeText}\n${CRONOGOL_CONFIG.siteUrl}`;

  try{
    if(navigator.share){
      await navigator.share({
        title:"CronoGol",
        text:nativeText,
        url:CRONOGOL_CONFIG.siteUrl
      });
      return;
    }
  }catch(e){}

  window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`,"_blank","noopener");
}

function copyCronoGolLink(){
  copyText(CRONOGOL_CONFIG.siteUrl, currentLang === "en" ? "Link copied" : "Enlace copiado");
}

function showSupportModal(){
  const t = MODAL_TEXTS[modalLang()];
  showModal(
    t.supportTitle,
    t.supportIntro,
    `<div class="donation-data"><div class="donation-item"><strong>Bizum</strong><br>${CRONOGOL_CONFIG.bizumPhone} · ${t.concept}: ${CRONOGOL_CONFIG.bizumConcept}<button class="bizum-direct-btn" onclick="openBizum()">${t.bizumButton}</button></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">${t.paypalButton}</a></div></div>`,
    [{text:t.close, action:closeModal}]
  );
}
