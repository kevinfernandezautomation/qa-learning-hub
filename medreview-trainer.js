(function(){
const actions={exported:false,createdEmpty:false};
document.querySelectorAll('.open-record').forEach(b=>b.addEventListener('click',()=>document.getElementById('medRecord').scrollIntoView({behavior:'smooth'})));
document.getElementById('createMedRecord')?.addEventListener('click',()=>{
 const id=document.getElementById('medRecordId').value;
 document.getElementById('createMedStatus').textContent='201 Created — recordId: '+(id||'""')+' (training API accepted it).';
 if(!id.trim()){actions.createdEmpty=true;updateActionState();}
});
document.getElementById('exportMedReport')?.addEventListener('click',()=>{actions.exported=true;updateActionState();});

const steps=[
 {sel:'#recordOwnerBadge',title:'1A · Identifique el registro',instruction:'Mire el dato resaltado: el registro abierto es MR-10022 y su propietario es “Owner: Team B”.',explain:'Owner indica el equipo responsable del registro. Aquí el dato importante es que el registro pertenece a Team B.'},
 {sel:'#currentUserPanel',title:'1B · Compare con el usuario conectado',instruction:'Ahora observe quién está conectado: “training.viewer · Team A” en la barra izquierda.',explain:'El usuario pertenece a Team A. Si el acceso está restringido por equipo, un usuario de Team A no debería poder abrir directamente un registro de Team B. Esa comparación permite detectar el problema de autorización.'},
 {sel:'.med-grid article:nth-child(2)',title:'2 · Revise el timestamp de adquisición',instruction:'Observe “Acquisition time”. El valor aparece como “Not available”.',explain:'Un timestamp indica cuándo ocurrió un evento. Si el requisito exige trazabilidad temporal, la ausencia de acquisition time impide reconstruir correctamente cuándo se obtuvo el registro.'},
 {sel:'#importStatus',title:'3 · Compare dos estados incompatibles',instruction:'Lea la misma línea completa: la interfaz dice “Processed”, pero la respuesta de la fuente es “500 IMPORT_FAILED”.',explain:'Processed comunica éxito, mientras 500 IMPORT_FAILED comunica error. Ambos estados no pueden representar correctamente el mismo resultado. QA debe verificar cuál fuente es confiable y reportar la inconsistencia.'},
 {sel:'#exportMedReport',title:'4A · Ejecute la acción que quiere auditar',instruction:'Presione “Export report”. Esta acción debería dejar evidencia en el registro de auditoría.',explain:'Audit log es el registro de acciones relevantes del sistema. Primero debe ejecutar la acción para luego comprobar si quedó registrada.',requires:'exported'},
 {sel:'#auditEntries',title:'4B · Compare con el Audit log',instruction:'Después de exportar, revise las entradas actuales del Audit log.',explain:'Solo aparecen VIEW y LOGIN. No existe una entrada EXPORT. Si el requisito exige auditoría de exportaciones, falta evidencia de actor, timestamp, acción y registro afectado.'},
 {sel:'#medRecordId',title:'5A · Prepare el caso de validación',instruction:'Deje el campo Record ID vacío. El objetivo es probar qué hace el sistema ante una entrada inválida.',explain:'La validación de entrada comprueba que los datos cumplan reglas antes de aceptarse. Un identificador requerido no debería aceptarse vacío.'},
 {sel:'#createMedRecord',title:'5B · Ejecute el caso negativo',instruction:'Con Record ID vacío, presione “Create”.',explain:'Este es un caso negativo: se usa un dato inválido para comprobar que el sistema lo rechace correctamente.',requires:'createdEmpty'},
 {sel:'#createMedStatus',title:'5C · Observe el resultado',instruction:'Revise la respuesta generada después de crear el registro vacío.',explain:'El sistema devuelve 201 Created incluso con recordId vacío. Eso indica que la regla de integridad no se está aplicando correctamente.'},
 {sel:'#recordOwnerBadge',title:'6A · Entienda qué significa trazabilidad',instruction:'Vuelva al control de autorización: “Owner: Team B”.',explain:'Trazabilidad significa poder seguir la relación entre un requisito, el riesgo que controla, la prueba que lo verifica y la evidencia obtenida. No basta con decir que existe una regla de acceso.'},
 {sel:'#currentUserPanel',title:'6B · Lleve el concepto a la práctica',instruction:'Compare nuevamente Team B con el usuario Team A y piense qué prueba demostraría que la restricción funciona.',explain:'Una cadena útil sería: SWR-003 (autorizar por rol/scope) → RISK-SEC-01 → test de acceso cruzado → evidencia de respuesta 403/denegada. Si falta el test o la evidencia, existe un gap de trazabilidad.'},
 {sel:'#currentBuildBadge',title:'7A · Identifique el build probado',instruction:'Observe la versión actual de la aplicación: “Build 1.4.2”.',explain:'El build identifica la versión concreta que está siendo probada. Es importante para reproducibilidad y control de configuración.'},
 {sel:'#reportVersionText',title:'7B · Compare con la versión del reporte',instruction:'Ahora mire el reporte exportado: indica “MedReview Trainer 1.4.1”.',explain:'La evidencia declara una versión distinta a la aplicación actual. Esto genera duda sobre qué configuración produjo el resultado.'},
 {sel:'.med-report-preview',title:'7C · Concluya el problema de configuración',instruction:'Compare ambos valores: aplicación 1.4.2 vs reporte 1.4.1.',explain:'QA debería reportar una inconsistencia de configuration identification. La evidencia debe indicar la misma versión/build realmente verificada.'},
 {sel:'.med-defect',title:'8 · Revise el cierre del defecto',instruction:'Observe DEF-77: aparece Closed y solo contiene la nota “Fixed”.',explain:'Problem resolution no termina solo con cambiar el código. Debe existir evidencia de confirmación/retest y, cuando corresponda, regresión para demostrar que la corrección funciona y no afectó otros flujos.'}
];
let idx=0;
const panel=document.getElementById('bugTourPanel'),title=document.getElementById('bugTourTitle'),counter=document.getElementById('bugTourCounter'),instruction=document.getElementById('bugTourInstruction'),explain=document.getElementById('bugTourExplanation');
function clearMark(){document.querySelectorAll('.bug-tour-highlight').forEach(x=>x.classList.remove('bug-tour-highlight'))}
function positionPanel(el){
 if(!el||panel.hidden)return;
 if(matchMedia('(max-width:900px)').matches){panel.style.position='fixed';panel.style.left='12px';panel.style.right='12px';panel.style.bottom='12px';panel.style.top='auto';panel.style.width='auto';return;}
 const r=el.getBoundingClientRect(),w=Math.min(390,window.innerWidth*.31),gap=18;
 panel.style.position='fixed';panel.style.width=w+'px';panel.style.bottom='auto';panel.style.right='auto';
 let left=r.right+gap;if(left+w>window.innerWidth-12)left=Math.max(12,r.left-w-gap);
 let top=Math.min(Math.max(12,r.top),window.innerHeight-panel.offsetHeight-12);
 panel.style.left=left+'px';panel.style.top=top+'px';
}
function updateActionState(){
 const s=steps[idx];if(!s)return;const ok=!s.requires||actions[s.requires];bugTourNext.disabled=!ok;
 if(s.requires&&!ok)bugTourNext.title='Complete primero la acción indicada';else bugTourNext.title='';
}
function render(){
 clearMark();const s=steps[idx];title.textContent=s.title;counter.textContent=`${idx+1} / ${steps.length}`;instruction.textContent=s.instruction;explain.innerHTML=`<strong>Qué significa:</strong> ${s.explain}`;bugTourPrev.disabled=idx===0;bugTourNext.textContent=idx===steps.length-1?'Finalizar recorrido':'Siguiente →';
 const el=document.querySelector(s.sel);if(el){el.classList.add('bug-tour-highlight');el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>positionPanel(el),420);}updateActionState();
}
startBugTour.onclick=()=>{panel.hidden=false;idx=0;render()};
bugTourPrev.onclick=()=>{if(idx>0){idx--;render()}};
bugTourNext.onclick=()=>{if(bugTourNext.disabled)return;if(idx<steps.length-1){idx++;render()}else{clearMark();location.href='medical-qa-lab.html?new=1#mission-panel'}};
window.addEventListener('resize',()=>positionPanel(document.querySelector(steps[idx]?.sel)));
window.addEventListener('scroll',()=>positionPanel(document.querySelector(steps[idx]?.sel)),{passive:true});
})();