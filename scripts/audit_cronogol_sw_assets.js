#!/usr/bin/env node
const fs=require("fs"),path=require("path");
const root=process.cwd();
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
let f=[];function a(c,m){if(!c)f.push(m)}
a(!sw.includes("./logo-cronogol.png"),"sw.js must not cache missing logo-cronogol.png");
a(sw.includes("Promise.allSettled"),"sw.js install should not fail all-or-nothing on one asset");
a(fs.existsSync(path.join(root,"logo-cronogol-horizontal.png")),"logo-cronogol-horizontal.png exists");
console.log(`AUDITORIA_CRONOGOL_SW_ASSETS: ${f.length?"FAIL":"OK"}`);
if(f.length){f.forEach(x=>console.error("- "+x));process.exit(1)}
