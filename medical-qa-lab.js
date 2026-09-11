const LAB_KEY='medicalQaLabV31';
const MISSIONS=[
{id:'M01',area:'Access control',title:'Rol incorrecto puede abrir registros restringidos',scenario:'Un usuario con rol Viewer abre directamente la URL de un registro asignado a otro equipo y la pantalla carga el detalle.',choices:['Defecto de autorización: falta control server-side por rol/alcance','Solo un problema cosmético','No es defecto si conoce la URL','Debe resolverse agregando un tooltip'],correct:0,req:'SWR-003',risk:'RISK-SEC-01',lesson:'La UI no debe ser la única barrera de autorización. El control debe verificarse también en API/backend y quedar evidenciado.'},
{id:'M02',area:'Data integrity',title:'Registro sin timestamp de adquisición',scenario:'La pantalla muestra un registro sintético procesado pero no indica cuándo fue adquirido ni cuándo fue procesado.',choices:['Falta de información crítica de contexto y trazabilidad','Solo falta diseño visual','No importa si existe ID','Se arregla cambiando el color'],correct:0,req:'SWR-002',risk:'RISK-DATA-02',lesson:'Datos sin contexto temporal pueden inducir interpretación incorrecta. El requisito debe definir qué timestamps son visibles y auditables.'},
{id:'M03',area:'Validation',title:'Estado “Processed” aunque la importación falló',scenario:'La API responde error al importar el archivo sintético, pero la UI mantiene el badge Processed.',choices:['Inconsistencia de estado: resultado mostrado no corresponde con backend','Problema de performance','Comportamiento esperado','Solo bug de traducción'],correct:0,req:'SWR-004',risk:'RISK-STATE-01',lesson:'El estado mostrado debe derivarse de una fuente confiable y manejar errores/rollback de forma explícita.'},
{id:'M04',area:'Auditability',title:'Exportación sin evento de auditoría',scenario:'Un revisor exporta un reporte del registro ficticio. El archivo se genera, pero no existe evento en audit log.',choices:['Defecto de auditabilidad / evidencia','Solo falta una animación','No se debe registrar ninguna exportación','Únicamente un problema del navegador'],correct:0,req:'SWR-006',risk:'RISK-AUD-01',lesson:'Si el proceso requiere registro de acciones relevantes, la prueba debe verificar evento, actor, timestamp y referencia.'},
{id:'M05',area:'Boundary',title:'API acepta identificador vacío',scenario:'Una solicitud POST de prueba permite crear un registro con recordId vacío y devuelve 201.',choices:['Falla de validación de entrada y requisito de integridad','Solo error de UI','No es problema si SQL genera ID interno','Debe probarse únicamente manualmente'],correct:0,req:'SWR-001',risk:'RISK-DATA-01',lesson:'Las reglas críticas deben validarse en capas apropiadas; no dependa exclusivamente de required en HTML.'},
{id:'M06',area:'Traceability',title:'Risk control sin test asociado',scenario:'La matriz contiene un control para impedir acceso no autorizado, pero la columna Test está vacía.',choices:['Gap de trazabilidad: falta evidencia de verificación del control','No importa si el control está documentado','Solo hay que cambiar el ID','El control reemplaza la prueba'],correct:0,req:'SWR-003',risk:'RISK-SEC-01',lesson:'Un control documentado necesita evidencia de que fue implementado y verificado según el plan aplicable.'},
{id:'M07',area:'Configuration',title:'Reporte muestra versión distinta al build probado',scenario:'El sistema bajo prueba es build 1.4.2, pero el reporte exportado indica 1.4.1.',choices:['Problema de configuration identification y reproducibilidad','Solo typo irrelevante','No afecta evidencia','Debe ocultarse la versión'],correct:0,req:'SWR-007',risk:'RISK-CFG-01',lesson:'La evidencia debe identificar la configuración realmente verificada para que el resultado sea reproducible y auditable.'},
{id:'M08',area:'Problem resolution',title:'Defecto crítico cerrado sin evidencia de retest',scenario:'El ticket aparece Closed después del cambio de código, pero no contiene resultado de confirmación ni regresión relacionada.',choices:['Cierre insuficiente: falta evidencia de resolución/verificación','Correcto si el developer lo cerró','Solo falta una etiqueta','No se requiere retest nunca'],correct:0,req:'SWR-008',risk:'RISK-PR-01',lesson:'Problem resolution debe dejar evidencia suficiente del análisis, corrección y verificación apropiada antes del cierre.'}
];

const VV=[
{id:'VV-01',type:'Verification',title:'Software Requirements Review',desc:'Revise que cada requisito sea identificable, verificable, no ambiguo y trazable a una necesidad/riesgo cuando corresponda.'},
{id:'VV-02',type:'Verification',title:'Architecture / Interface Review',desc:'Revise UI, API, persistence, audit log e interfaces; documente supuestos y dependencias.'},
{id:'VV-03',type:'Verification',title:'Software System Test Protocol',desc:'Defina prerequisitos, build, datos, pasos, expected result, evidencia y criterios de aceptación.'},
{id:'VV-04',type:'Verification',title:'Risk Control Verification',desc:'Demuestre que controles definidos realmente están implementados y funcionan en condiciones previstas.'},
{id:'VV-05',type:'Validation',title:'User Workflow Validation',desc:'Evalúe el flujo completo con usuarios/escenarios representativos del intended use ficticio.'},
{id:'VV-06',type:'Validation',title:'Validation Summary',desc:'Resuma alcance, configuración, desviaciones, resultados, riesgos pendientes y conclusión del ejercicio.'}
];

const TRACE=[
{id:'SWR-001',req:'Cada registro debe tener identificador no vacío.',risk:'RISK-DATA-01 · Integridad',test:'TC-API-001',evidence:'API test result',ok:true},
{id:'SWR-002',req:'Mostrar acquisition y processing timestamp.',risk:'RISK-DATA-02 · Contexto',test:'TC-UI-004',evidence:'Screenshot + API response',ok:true},
{id:'SWR-003',req:'Autorizar acceso por rol y scope.',risk:'RISK-SEC-01 · Acceso',test:'',evidence:'',ok:false},
{id:'SWR-004',req:'Mostrar estado consistente con backend.',risk:'RISK-STATE-01 · Estado',test:'TC-E2E-009',evidence:'Video + log',ok:true},
{id:'SWR-006',req:'Registrar exportaciones en audit log.',risk:'RISK-AUD-01 · Auditoría',test:'TC-AUD-003',evidence:'',ok:false},
{id:'SWR-007',req:'Identificar build en reporte.',risk:'RISK-CFG-01 · Configuración',test:'TC-REP-002',evidence:'Report header',ok:true}
];

const RELEASE=[
{id:'R1',text:'Todos los requirements seleccionados tienen test/evidencia trazable.'},
{id:'R2',text:'Risk controls críticos tienen verification evidence.'},
{id:'R3',text:'Defectos críticos/altos están resueltos o justificados formalmente.'},
{id:'R4',text:'Build/configuration de la evidencia coincide con el release candidate.'},
{id:'R5',text:'Regression scope fue definido a partir del impacto de cambios.'},
{id:'R6',text:'Validation summary documenta desviaciones y riesgos pendientes.'}
];

function loadState(){try{return JSON.parse(localStorage.getItem(LAB_KEY)||'{}')}catch{return{}}}
let state=Object.assign({missions:{},vv:{},trace:{},release:{},decision:'',justification:''},loadState());
function save(){localStorage.setItem(LAB_KEY,JSON.stringify(state));updateSummary()}

let missionIndex=0;
function renderMissions(){
 const m=MISSIONS[missionIndex];if(!m)return;
 const saved=state.missions[m.id]||{};
 document.getElementById('missionNumber').textContent=`Misión ${missionIndex+1} de ${MISSIONS.length}`;
 document.getElementById('missionArea').textContent=m.area;
 document.getElementById('missionTitle').textContent=m.title;
 document.getElementById('missionScenario').textContent=m.scenario;
 const opts=document.getElementById('missionOptions');
 opts.innerHTML=m.choices.map((c,i)=>{
   let cls='answer-btn';
   if(saved.answer!==undefined){if(i===m.correct)cls+=' answer-correct';if(i===saved.answer && saved.answer!==m.correct)cls+=' answer-wrong';}
   return `<button type="button" class="${cls}" data-i="${i}" ${saved.answer!==undefined?'disabled':''}>${String.fromCharCode(65+i)}. ${c}</button>`;
 }).join('');
 opts.querySelectorAll('[data-i]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.i);state.missions[m.id]={answer:i,correct:i===m.correct,completedAt:new Date().toISOString()};save();renderMissions();}));
 const f=document.getElementById('missionFeedback');
 if(saved.answer!==undefined){f.innerHTML=saved.correct?`<strong>Correcto.</strong> ${m.lesson}`:`<strong>Respuesta incorrecta.</strong> La opción correcta es <b>${String.fromCharCode(65+m.correct)}</b>. ${m.lesson}`;}else f.textContent='Seleccione una opción para ver retroalimentación.';
 document.getElementById('missionPrev').disabled=missionIndex===0;
 document.getElementById('missionNext').disabled=saved.answer===undefined;
 document.getElementById('missionNext').textContent=missionIndex===MISSIONS.length-1?'Ir a V&V →':'Siguiente →';
 const answered=Object.values(state.missions).filter(x=>x?.answer!==undefined).length;
 const correct=Object.values(state.missions).filter(x=>x?.correct).length;
 document.getElementById('missionProgress').textContent=`${answered} / ${MISSIONS.length} respondidas · ${correct} correctas`;
 document.getElementById('missionProgressBar').style.width=`${answered/MISSIONS.length*100}%`;
}

function renderVV(){
 const box=document.getElementById('vvArtifacts');if(!box)return;
 box.innerHTML=VV.map((v,i)=>{const st=state.vv[v.id]||{};const ready=Boolean(st.objective?.trim() && st.evidence?.trim() && st.conclusion?.trim());return `<article class="vv-card guided-vv-card"><div class="vv-card-head"><span class="badge">${v.type}</span><strong>${v.id}</strong></div><h3>${v.title}</h3><p>${v.desc}</p><div class="guided-vv-form"><label><span>1. Objetivo</span><textarea data-vv-field="${v.id}" data-field="objective" rows="2" placeholder="¿Qué quiere demostrar?">${st.objective||''}</textarea></label><label><span>2. Requirement / risk / fuente</span><input data-vv-field="${v.id}" data-field="source" value="${st.source||''}" placeholder="Ej.: SWR-003 / RISK-SEC-01"></label><label><span>3. Ambiente, build y datos</span><textarea data-vv-field="${v.id}" data-field="setup" rows="2" placeholder="Build, ambiente, rol, datos sintéticos…">${st.setup||''}</textarea></label><label><span>4. Procedimiento / pasos</span><textarea data-vv-field="${v.id}" data-field="procedure" rows="3" placeholder="Cómo ejecutaría o revisaría la actividad…">${st.procedure||''}</textarea></label><label><span>5. Evidencia observada</span><textarea data-vv-field="${v.id}" data-field="evidence" rows="3" placeholder="Resultado, log, screenshot, review notes…">${st.evidence||''}</textarea></label><label><span>6. Conclusión</span><textarea data-vv-field="${v.id}" data-field="conclusion" rows="3" placeholder="Pass/fail, desviación, riesgo pendiente…">${st.conclusion||''}</textarea></label><label class="check-row"><input type="checkbox" data-vv-done="${v.id}" ${st.done?'checked':''} ${ready?'':'disabled'}> Marcar artefacto como completado</label><small class="muted-note">${ready?'Ya puede marcarlo como completado.':'Complete al menos objetivo, evidencia y conclusión.'}</small></div></article>`;}).join('');
 box.querySelectorAll('[data-vv-field]').forEach(el=>el.addEventListener('change',()=>{const id=el.dataset.vvField,field=el.dataset.field;state.vv[id]=state.vv[id]||{done:false};state.vv[id][field]=el.value;if(!(state.vv[id].objective?.trim()&&state.vv[id].evidence?.trim()&&state.vv[id].conclusion?.trim()))state.vv[id].done=false;save();renderVV();}));
 box.querySelectorAll('[data-vv-done]').forEach(c=>c.addEventListener('change',()=>{const id=c.dataset.vvDone;state.vv[id]=state.vv[id]||{};state.vv[id].done=c.checked;save();updateSummary();}));
}

function renderTrace(){
 const body=document.getElementById('traceBody');if(!body)return;
 body.innerHTML=TRACE.map(r=>{const fixed=state.trace[r.id]?.fixed;const ok=r.ok||fixed;return `<tr><td><strong>${r.id}</strong></td><td>${r.req}</td><td>${r.risk}</td><td>${ok&& !r.test?(r.id==='SWR-003'?'TC-SEC-005':'TC-'+r.id):r.test||'<em>Falta</em>'}</td><td>${ok&& !r.evidence?(r.id==='SWR-003'?'API auth evidence':'Audit log evidence'):r.evidence||'<em>Falta</em>'}</td><td>${ok?'<span class="trace-ok">Trazable</span>':`<button class="btn small secondary fix-trace" data-trace="${r.id}">Corregir gap</button>`}</td></tr>`}).join('');
 body.querySelectorAll('[data-trace]').forEach(b=>b.addEventListener('click',()=>{state.trace[b.dataset.trace]={fixed:true,fixedAt:new Date().toISOString()};save();renderTrace()}));
}

function renderRelease(){
 const box=document.getElementById('releaseChecklist');if(!box)return;
 box.innerHTML=RELEASE.map(x=>`<label class="release-item"><input type="checkbox" data-release="${x.id}" ${state.release[x.id]?'checked':''}><span>${x.text}</span></label>`).join('');
 box.querySelectorAll('[data-release]').forEach(c=>c.addEventListener('change',()=>{state.release[c.dataset.release]=c.checked;save()}));
 const d=document.getElementById('releaseDecision'),j=document.getElementById('releaseJustification');
 d.value=state.decision||'';j.value=state.justification||'';
 d.addEventListener('change',()=>{state.decision=d.value;save()});
 j.addEventListener('input',()=>{state.justification=j.value;save()});
}

function updateSummary(){
 const md=Object.values(state.missions).filter(x=>x?.correct).length;
 const vv=Object.values(state.vv).filter(x=>x?.done).length;
 const tr=TRACE.filter(x=>x.ok||state.trace[x.id]?.fixed).length;
 document.getElementById('portfolioMissions').textContent=`${md}/${MISSIONS.length}`;
 document.getElementById('portfolioVV').textContent=`${vv}/${VV.length}`;
 document.getElementById('portfolioTrace').textContent=`${tr}/${TRACE.length}`;
 document.getElementById('portfolioRelease').textContent=state.decision||'Pendiente';
}

function evidencePack(){
 return {
  project:'Medical Device / SaMD QA Lab — simulated educational project',
  disclaimer:'Not professional regulated experience, not a certification, not a real medical device.',
  generatedAt:new Date().toISOString(),
  frameworkContext:['IEC 62304 lifecycle concepts','ISO 13485 QMS concepts','SaMD / intended-use concepts','V&V','traceability','problem resolution','release readiness'],
  missions:MISSIONS.map(m=>({id:m.id,area:m.area,requirement:m.req,risk:m.risk,completed:!!state.missions[m.id]?.correct})),
  vv:VV.map(v=>({id:v.id,type:v.type,title:v.title,completed:!!state.vv[v.id]?.done,...(state.vv[v.id]||{})})),
  traceability:TRACE.map(r=>({...r,status:(r.ok||state.trace[r.id]?.fixed)?'TRACEABLE':'GAP'})),
  release:{checklist:RELEASE.map(r=>({id:r.id,text:r.text,checked:!!state.release[r.id]})),decision:state.decision||'',justification:state.justification||''}
 };
}
function download(name,text,type='text/plain'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
document.getElementById('downloadEvidenceJson')?.addEventListener('click',()=>download('medical-qa-lab-evidence.json',JSON.stringify(evidencePack(),null,2),'application/json'));
document.getElementById('downloadEvidenceTxt')?.addEventListener('click',()=>{const p=evidencePack();download('medical-qa-lab-summary.txt',`MEDICAL DEVICE / SaMD QA LAB — SIMULATED PORTFOLIO PROJECT\nGenerated: ${p.generatedAt}\n\nDISCLAIMER\n${p.disclaimer}\n\nMISSIONS\n${p.missions.map(x=>`${x.id} | ${x.area} | ${x.completed?'DONE':'PENDING'} | ${x.requirement} | ${x.risk}`).join('\n')}\n\nV&V\n${p.vv.map(x=>`${x.id} | ${x.type} | ${x.title} | ${x.completed?'DONE':'PENDING'} | ${x.note}`).join('\n')}\n\nRELEASE DECISION\n${p.release.decision||'Pending'}\n${p.release.justification||''}`)});
document.getElementById('downloadTraceCsv')?.addEventListener('click',()=>{const rows=[['ID','Requirement','Risk-Control','Test','Evidence','Status'],...TRACE.map(r=>[r.id,r.req,r.risk,r.test,r.evidence,(r.ok||state.trace[r.id]?.fixed)?'TRACEABLE':'GAP'])];download('medical-qa-traceability.csv',rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n'),'text/csv')});

document.getElementById('missionPrev')?.addEventListener('click',()=>{if(missionIndex>0){missionIndex--;renderMissions();}});
document.getElementById('missionNext')?.addEventListener('click',()=>{const m=MISSIONS[missionIndex],saved=state.missions[m.id];if(saved?.answer===undefined)return;if(missionIndex<MISSIONS.length-1){missionIndex++;renderMissions();document.getElementById('mission-panel').scrollIntoView({behavior:'smooth',block:'start'});}else document.querySelector('[data-target="vv-panel"]')?.click();});
document.querySelectorAll('.lab-tab').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.lab-panel').forEach(p=>p.hidden=true);
 document.querySelectorAll('.lab-tab').forEach(b=>{b.classList.remove('primary','active');b.classList.add('ghost')});
 document.getElementById(btn.dataset.target).hidden=false;btn.classList.remove('ghost');btn.classList.add('primary','active');
 document.getElementById(btn.dataset.target).scrollIntoView({behavior:'smooth',block:'start'});
}));
renderMissions();renderVV();renderTrace();renderRelease();updateSummary();