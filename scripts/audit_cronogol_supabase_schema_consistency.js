#!/usr/bin/env node
const fs=require("fs"), path=require("path");
const sql=fs.readFileSync(path.join(process.cwd(),"SUPABASE_PRIVATE_ROOMS_SETUP.sql"),"utf8");
let f=[];function a(c,m){if(!c)f.push(m)}
a(sql.includes("state_json jsonb"),"SQL must define state_json jsonb");
a(sql.includes("app_version text"),"SQL must define app_version");
a(sql.includes("last_seen_at timestamptz"),"SQL must define last_seen_at");
a(!/room_state jsonb/.test(sql),"SQL must not use obsolete room_state as primary state column");
console.log(`AUDITORIA_CRONOGOL_SUPABASE_SCHEMA_CONSISTENCY: ${f.length?"FAIL":"OK"}`);
if(f.length){f.forEach(x=>console.error("- "+x));process.exit(1)}
