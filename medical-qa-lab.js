const LAB_KEY='medicalQaLabV31';
const MISSIONS=[
{id:'M01',area:'Access control',title:'¿Qué defecto existe en el control de acceso?',scenario:'Durante el recorrido observó que MR-10022 pertenece a Team B, pero el usuario conectado training.viewer pertenece a Team A y aun así puede abrir el registro. ¿Cuál es el problema principal?',choices:['Falta control de autorización por rol/equipo en backend o API','Solo existe un problema cosmético','No existe defecto porque el usuario conoce la URL','Solo falta agregar un tooltip'],correct:0,req:'SWR-003',risk:'RISK-SEC-01',lesson:'La interfaz no debe ser la única barrera de autorización. El control debe verificarse en backend/API y dejar evidencia de acceso permitido o denegado.'},
{id:'M02',area:'Data integrity',title:'¿Qué problema existe si falta “Acquisition time”?',scenario:'El registro se muestra como procesado, pero el campo Acquisition time aparece como “Not available”. Si el requisito exige trazabilidad temporal, ¿qué debe reportar QA?',choices:['Falta información necesaria para contexto temporal y trazabilidad','Solo falta mejorar el color del campo','No importa si existe un Record ID','Debe ocultarse el campo para evitar confusión'],correct:0,req:'SWR-002',risk:'RISK-DATA-02',lesson:'Los timestamps permiten reconstruir cuándo ocurrieron eventos. Si son parte del requisito, deben estar presentes, ser correctos y auditables.'},
{id:'M03',area:'State validation',title:'¿Qué debe reportar QA cuando dos estados se contradicen?',scenario:'En la misma pantalla se observa “Processed”, pero la respuesta de la fuente indica “500 IMPORT_FAILED”. ¿Cuál es el defecto principal?',choices:['La UI muestra un estado de éxito que no coincide con el resultado real del backend','Existe únicamente un problema de performance','Ambos mensajes representan el mismo estado','Es solamente un problema de idioma'],correct:0,req:'SWR-004',risk:'RISK-STATE-01',lesson:'El estado visible debe corresponder con la fuente confiable y manejar los errores de forma explícita.'},
{id:'M04',area:'Auditability',title:'Después de exportar, ¿qué falta en el Audit log?',scenario:'Se presiona “Export report”, pero el Audit log continúa mostrando solamente VIEW y LOGIN. Si las exportaciones deben ser auditables, ¿qué defecto existe?',choices:['Falta registrar el evento EXPORT con actor, timestamp y referencia','Solo falta una animación al exportar','No es necesario registrar exportaciones','Es un problema exclusivo del navegador'],correct:0,req:'SWR-006',risk:'RISK-AUD-01',lesson:'Cuando una acción debe ser auditable, la prueba debe comprobar que exista evidencia suficiente del evento.'},
{id:'M05',area:'Input validation',title:'¿Qué defecto existe si Record ID vacío devuelve 201 Created?',scenario:'En Create synthetic record se deja Record ID vacío y se presiona Create. El sistema responde 201 Created. ¿Cómo debería clasificarse el problema?',choices:['Falla de validación de entrada e integridad de datos','Solo error visual de UI','Es correcto porque la base puede inventar cualquier ID','Solo debe probarse manualmente, por lo que no es defecto'],correct:0,req:'SWR-001',risk:'RISK-DATA-01',lesson:'Los datos obligatorios deben validarse en la capa adecuada; una respuesta de creación exitosa ante un identificador requerido vacío indica una regla no aplicada.'},
{id:'M06',area:'Traceability',title:'¿Qué falta para demostrar que el control de autorización fue verificado?',scenario:'Existe el requisito SWR-003 y el riesgo RISK-SEC-01 para impedir acceso entre equipos. ¿Qué elemento falta si no hay un test asociado ni evidencia de ejecución?',choices:['Existe un gap de trazabilidad entre control, prueba y evidencia','El requisito por sí solo ya demuestra que funciona','Solo hace falta cambiar el identificador del requisito','El control documentado reemplaza la necesidad de probarlo'],correct:0,req:'SWR-003',risk:'RISK-SEC-01',lesson:'La trazabilidad útil conecta requisito/riesgo con test y evidencia. Un control documentado no demuestra por sí mismo que fue implementado correctamente.'},
{id:'M07',area:'Configuration',title:'¿Qué problema existe si el build actual es 1.4.2 y el reporte dice 1.4.1?',scenario:'La aplicación que se está probando muestra Build 1.4.2, pero el reporte exportado indica MedReview Trainer 1.4.1. ¿Por qué esto es un defecto?',choices:['La evidencia identifica una configuración distinta y dificulta reproducibilidad/auditoría','Es solo un typo sin impacto en evidencia','La versión del reporte nunca importa','La solución correcta es ocultar todas las versiones'],correct:0,req:'SWR-007',risk:'RISK-CFG-01',lesson:'La evidencia debe identificar exactamente la configuración/build que fue verificada.'},
{id:'M08',area:'Problem resolution',title:'¿Es suficiente cerrar DEF-77 con la nota “Fixed”?',scenario:'DEF-77 aparece Closed después de un cambio de código, pero no contiene confirmation test ni evidencia de regresión. ¿Qué debe señalar QA?',choices:['El cierre es insuficiente porque falta evidencia de corrección y retest','Es correcto si desarrollo escribió “Fixed”','Solo falta cambiar una etiqueta del ticket','Nunca se requiere retest después de corregir un defecto'],correct:0,req:'SWR-008',risk:'RISK-PR-01',lesson:'La resolución de problemas debe conservar evidencia apropiada de la corrección, confirmation testing y regresión cuando corresponda.'}
];

const VV=[
{id:'VV-01',type:'Verification',title:'Software Requirements Review',desc:'Revise que cada requisito sea identificable, verificable, no ambiguo y trazable a una necesidad/riesgo cuando corresponda.'},
{id:'VV-02',type:'Verification',title:'Architecture / Interface Review',desc:'Revise UI, API, persistence, audit log e interfaces; documente supuestos y dependencias.'},
{id:'VV-03',type:'Verification',title:'Software System Test Protocol',desc:'Defina prerequisitos, build, datos, pasos, expected result, evidencia y criterios de aceptación.'},
{id:'VV-04',type:'Verification',title:'Risk Control Verification',desc:'Demuestre que controles definidos realmente están implementados y funcionan en condiciones previstas.'},
{id:'VV-05',type:'Validation',title:'User Workflow Validation',desc:'Evalúe el flujo completo con usuarios/escenarios representativos del intended use ficticio.'},
{id:'VV-06',type:'Validation',title:'Validation Summary',desc:'Resuma alcance, configuración, desviaciones, resultados, riesgos pendientes y conclusión del ejercicio.'}
];

const VV_SUPPORT={
 'VV-01':{label:'Apóyese en requisitos + intended use',anchor:'requirements',hint:'Revise SWR-001 a SWR-008, el intended use y las reglas de usuario. Busque ambigüedad, ausencia de criterios verificables o falta de vínculo con riesgos.'},
 'VV-02':{label:'Apóyese en arquitectura + interfaces',anchor:'architecture',hint:'Use el flujo Web UI → API → SQL → Audit log → Export. Identifique dependencias, interfaces y dónde debe aplicarse cada control.'},
 'VV-03':{label:'Apóyese en requisitos + build + datos',anchor:'test-protocol',hint:'Elija un requisito y conviértalo en prerequisitos, datos, pasos, expected result y evidencia reproducible.'},
 'VV-04':{label:'Apóyese en Risk Register',anchor:'risks',hint:'Seleccione un riesgo y compruebe que exista un control verificable, un test asociado y evidencia del resultado.'},
 'VV-05':{label:'Apóyese en Intended Use + roles',anchor:'intended-use',hint:'Piense como usuario representativo del producto ficticio y recorra el flujo completo que satisface su necesidad prevista.'},
 'VV-06':{label:'Apóyese en todo el Evidence Pack',anchor:'summary',hint:'Integre alcance, build, resultados, defectos, desviaciones, riesgos pendientes y una conclusión coherente.'}
};

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
const __params=new URLSearchParams(location.search);
if(__params.get('new')==='1'){
  state.missions={};
  state.vv={};
}else if(__params.get('resume')!=='1'){
  state.missions={};
}

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

let vvIndex=0;
function vvStateFor(id){return state.vv[id]||{}}
function currentVVReady(){
 const s=vvStateFor(VV[vvIndex].id);
 return Boolean(s.objective?.trim() && s.evidence?.trim() && s.conclusion?.trim());
}
function persistCurrentVV(){
 const v=VV[vvIndex],s=state.vv[v.id]||{};
 s.objective=document.getElementById('vvObjective').value;
 s.source=document.getElementById('vvSource').value;
 s.setup=document.getElementById('vvSetup').value;
 s.procedure=document.getElementById('vvProcedure').value;
 s.evidence=document.getElementById('vvEvidence').value;
 s.conclusion=document.getElementById('vvConclusion').value;
 const ready=Boolean(s.objective.trim()&&s.evidence.trim()&&s.conclusion.trim());
 s.done=Boolean(s.assessment?.score>=80);
 state.vv[v.id]=s;save();
}
function evaluateVVState(s){
 const checks=[
  {key:'objective',label:'Objetivo claro y verificable',points:15,ok:(s.objective||'').trim().length>=20,tip:'Indique qué debe verificarse y una condición observable de éxito.'},
  {key:'source',label:'Requirement / riesgo / fuente identificable',points:15,ok:/\b(SWR|REQ|RISK|URS|CR|ID)[-_ ]?\w+/i.test(s.source||'')||(s.source||'').trim().length>=12,tip:'Referencie un ID o fuente concreta que permita rastrear por qué existe esta verificación.'},
  {key:'setup',label:'Ambiente, build y datos definidos',points:15,ok:(s.setup||'').trim().length>=25,tip:'Incluya build, ambiente, rol o usuario, datos y precondiciones relevantes.'},
  {key:'procedure',label:'Procedimiento reproducible',points:20,ok:(s.procedure||'').trim().length>=45||/\b1[.)]|\b2[.)]/.test(s.procedure||''),tip:'Describa pasos suficientes para que otra persona pueda repetir la actividad sin adivinar.'},
  {key:'evidence',label:'Evidencia observada concreta',points:20,ok:(s.evidence||'').trim().length>=30&&/result|log|captura|screenshot|api|response|eviden|observ|registro|dato/i.test(s.evidence||''),tip:'Describa el resultado y cite una evidencia verificable: log, API, captura, registro o dato.'},
  {key:'conclusion',label:'Conclusión con estado y siguiente acción',points:15,ok:(s.conclusion||'').trim().length>=25&&/pass|fail|aprobad|rechaz|riesgo|retest|acción|accion|correg|bloque|acept/i.test(s.conclusion||''),tip:'Declare PASS/FAIL o equivalente, riesgo pendiente y qué debe ocurrir después.'}
 ];
 const score=checks.reduce((n,c)=>n+(c.ok?c.points:0),0);
 return {score,checks,status:score>=80?'Cumple':score>=60?'Parcial':'Insuficiente'};
}
function renderVVAssessment(s){
 const a=s.assessment||evaluateVVState(s);
 const badge=document.getElementById('vvScoreBadge'),bar=document.getElementById('vvScoreBar'),list=document.getElementById('vvCriteria');
 if(badge)badge.textContent=`${a.score}% · ${a.status}`;
 if(bar)bar.style.width=`${a.score}%`;
 if(list)list.innerHTML=a.checks.map(c=>`<li class="${c.ok?'criterion-ok':'criterion-missing'}"><span>${c.ok?'✓':'○'}</span><span>${c.label}</span><strong>${c.ok?c.points:0}/${c.points}</strong></li>`).join(''); const advice=document.getElementById('vvAssessmentAdvice'); if(advice){const missing=a.checks.filter(c=>!c.ok); advice.innerHTML=missing.length?`<strong>Para mejorar este artefacto:</strong><ul>${missing.map(c=>`<li>${c.tip}</li>`).join('')}</ul><p>Meta del laboratorio: <strong>80% o más</strong>. Un 100% indica que los seis criterios mínimos están presentes; no sustituye una revisión regulatoria profesional.</p>`:`<strong>100% de criterios mínimos presentes.</strong><p>Revise coherencia, exactitud y calidad de la evidencia antes de considerar el artefacto listo.</p>`;}
}
function evaluateCurrentVV(){
 persistCurrentVV();
 const v=VV[vvIndex],s=state.vv[v.id]||{};
 const a=evaluateVVState(s);s.assessment=a;s.done=a.score>=80;state.vv[v.id]=s;save();renderVV();updateSummary();
}
function renderVV(){
 const v=VV[vvIndex],s=vvStateFor(v.id);
 document.getElementById('vvNumber').textContent=`Artefacto ${vvIndex+1} de ${VV.length}`;
 document.getElementById('vvType').textContent=v.type;
 document.getElementById('vvTitle').textContent=v.title;
 document.getElementById('vvDescription').textContent=v.desc;
 const sup=VV_SUPPORT[v.id];const support=document.getElementById('vvSupportHint');if(support&&sup){support.innerHTML=`<strong>${sup.label}</strong><p>${sup.hint}</p><a class="btn ghost small" href="medical-vv-support.html#${sup.anchor}" target="_blank" rel="noopener">Abrir material de apoyo ↗</a>`;}
 document.getElementById('vvObjective').value=s.objective||'';
 document.getElementById('vvSource').value=s.source||'';
 document.getElementById('vvSetup').value=s.setup||'';
 document.getElementById('vvProcedure').value=s.procedure||'';
 document.getElementById('vvEvidence').value=s.evidence||'';
 document.getElementById('vvConclusion').value=s.conclusion||'';
 const ready=Boolean(s.objective?.trim()&&s.evidence?.trim()&&s.conclusion?.trim());
 renderVVAssessment(s);
 document.getElementById('vvReadyHint').textContent=ready?'Puede ejecutar la evaluación de cumplimiento.':'Complete al menos objetivo, evidencia y conclusión antes de evaluar.';
 document.getElementById('vvPrev').disabled=vvIndex===0;
 document.getElementById('vvNext').textContent=vvIndex===VV.length-1?'Ir a Trazabilidad →':'Siguiente →';
 const completed=VV.filter(x=>state.vv[x.id]?.done).length;
 document.getElementById('vvProgress').textContent=`${completed} / ${VV.length} completados`;
 document.getElementById('vvProgressBar').style.width=`${completed/VV.length*100}%`;
 window.applyTranslations?.(localStorage.getItem('lang')||'es');
 window.dispatchEvent(new CustomEvent('qa-content-rendered'));
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
document.getElementById('downloadEvidenceTxt')?.addEventListener('click',()=>{const p=evidencePack();download('medical-qa-lab-summary.txt',`MEDICAL DEVICE / SaMD QA LAB — SIMULATED PORTFOLIO PROJECT\nGenerated: ${p.generatedAt}\n\nDISCLAIMER\n${p.disclaimer}\n\nMISSIONS\n${p.missions.map(x=>`${x.id} | ${x.area} | ${x.completed?'DONE':'PENDING'} | ${x.requirement} | ${x.risk}`).join('\n')}\n\nV&V\n${p.vv.map(x=>`${x.id} | ${x.type} | ${x.title} | ${x.completed?'DONE':'PENDING'} | ${x.conclusion||''}`).join('\n')}\n\nRELEASE DECISION\n${p.release.decision||'Pending'}\n${p.release.justification||''}`)});
document.getElementById('downloadTraceCsv')?.addEventListener('click',()=>{const rows=[['ID','Requirement','Risk-Control','Test','Evidence','Status'],...TRACE.map(r=>[r.id,r.req,r.risk,r.test,r.evidence,(r.ok||state.trace[r.id]?.fixed)?'TRACEABLE':'GAP'])];download('medical-qa-traceability.csv',rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n'),'text/csv')});

function syncVVReadiness(){
 const v=VV[vvIndex],s=state.vv[v.id]||{};
 renderVVAssessment(s);
}
['vvObjective','vvSource','vvSetup','vvProcedure','vvEvidence','vvConclusion'].forEach(id=>{
 document.getElementById(id)?.addEventListener('input',()=>{
   const v=VV[vvIndex],s=state.vv[v.id]||{done:false};
   const map={vvObjective:'objective',vvSource:'source',vvSetup:'setup',vvProcedure:'procedure',vvEvidence:'evidence',vvConclusion:'conclusion'};
   s[map[id]]=document.getElementById(id).value;
   s.assessment=evaluateVVState(s);s.done=false;
   state.vv[v.id]=s;localStorage.setItem(LAB_KEY,JSON.stringify(state));syncVVReadiness();updateSummary();
 });
});
document.getElementById('vvEvaluate')?.addEventListener('click',evaluateCurrentVV);
document.getElementById('vvPrev')?.addEventListener('click',()=>{persistCurrentVV();if(vvIndex>0){vvIndex--;renderVV();document.getElementById('vv-panel').scrollIntoView({behavior:'smooth',block:'start'});}});
document.getElementById('vvNext')?.addEventListener('click',()=>{persistCurrentVV();if(vvIndex<VV.length-1){vvIndex++;renderVV();document.getElementById('vv-panel').scrollIntoView({behavior:'smooth',block:'start'});}else document.querySelector('[data-target="trace-panel"]')?.click();});

document.getElementById('missionPrev')?.addEventListener('click',()=>{if(missionIndex>0){missionIndex--;renderMissions();}});
document.getElementById('missionNext')?.addEventListener('click',()=>{const m=MISSIONS[missionIndex],saved=state.missions[m.id];if(saved?.answer===undefined)return;if(missionIndex<MISSIONS.length-1){missionIndex++;renderMissions();document.getElementById('mission-panel').scrollIntoView({behavior:'smooth',block:'start'});}else document.querySelector('[data-target="vv-panel"]')?.click();});
document.querySelectorAll('.lab-tab').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.lab-panel').forEach(p=>p.hidden=true);
 document.querySelectorAll('.lab-tab').forEach(b=>{b.classList.remove('primary','active');b.classList.add('ghost')});
 document.getElementById(btn.dataset.target).hidden=false;btn.classList.remove('ghost');btn.classList.add('primary','active');
 document.getElementById(btn.dataset.target).scrollIntoView({behavior:'smooth',block:'start'});
}));
renderMissions();renderVV();renderTrace();renderRelease();updateSummary();