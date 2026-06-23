/* CronoGol v2.7.0 — Shared Supabase client (Realtime + REST) */
(function(){
"use strict";
const cfg=window.CRONOGOL_SUPABASE_CONFIG||{};
if(!cfg.enabled||!cfg.url||!cfg.anonKey||!window.supabase||typeof window.supabase.createClient!=="function"){
  window.CronoGolSupabaseClient=null;
  return;
}
try{
  window.CronoGolSupabaseClient=window.supabase.createClient(cfg.url,cfg.anonKey,{
    realtime:{params:{eventsPerSecond:10}}
  });
}catch(e){
  window.CronoGolSupabaseClient=null;
}
})();
