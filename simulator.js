(function(){
'use strict';
const DIFFICULTY_TIME={Principiante:null,'Fácil':60,'Medio':45,'Difícil':30};
const MIXED={id:'MIX-CTFL-ASTFC',name:'Práctica comparativa CTFL v4.0 + AICS ASTFC',level:'Comparativa',difficulty:'Inicial',k:'Fundamentos',focus:'Conceptos compartidos de fundamentos de testing, SDLC, técnicas, defectos, riesgo y gestión básica.',url:'proveedores.html'};
const ROLE_TOPICS={
 'QA Manual · Evaluación de nivel (Jr–Lead)':['fundamentos de testing','criterios de aceptación','técnicas de diseño','defectos y evidencia','regresión','testing exploratorio','riesgo de producto','test planning','métricas y release readiness','stakeholders','mentoría','estrategia QA','mejora de procesos','liderazgo y comunicación'],
 'QA Automation · Evaluación de nivel (Jr–Lead)':['fundamentos de automatización','locators y assertions','Page Objects y arquitectura','Git y code review','API automation','CI/CD','datos y ambientes','flaky tests','paralelización','observabilidad','performance','quality gates','ROI y estrategia','gobernanza','mentoría y liderazgo técnico']
};
const MANUAL_Q=[
 ['Un requisito indica que el sistema debe ser “rápido”. ¿Cuál sería la mejor acción de QA?',['Solicitar un criterio medible y verificable antes de diseñar la prueba','Aceptar el término sin aclaración','Registrar un defecto sin ejecutar pruebas','Definir un tiempo arbitrario'],0],
 ['¿Qué información hace más reproducible un reporte de defecto?',['Pasos, ambiente, datos, resultado esperado, resultado obtenido y evidencia','Solo una captura','Solo la severidad','Solo el nombre del módulo'],0],
 ['¿Qué diferencia describe mejor severidad y prioridad?',['Severidad mide impacto y prioridad indica urgencia de atención','Son siempre equivalentes','Prioridad depende solo de QA','Severidad indica el orden de ejecución'],0],
 ['¿Cuándo resulta especialmente útil una tabla de decisión?',['Cuando varias condiciones combinadas determinan distintos resultados','Cuando solo existe una entrada simple','Solo para pruebas de carga','Cuando no hay reglas de negocio'],0],
 ['¿Qué busca el análisis de valores límite?',['Comprobar valores en y alrededor de fronteras relevantes','Probar únicamente valores promedio','Evitar datos inválidos','Sustituir la partición de equivalencia'],0],
 ['¿Qué caracteriza una buena sesión de testing exploratorio?',['Tiene objetivo, alcance, aprendizaje, evidencia y registro de hallazgos','No documenta nada','Solo repite casos existentes','Evita investigar comportamientos inesperados'],0],
 ['Una corrección fue desplegada. ¿Qué prueba confirma específicamente el arreglo?',['Prueba de confirmación','Prueba de volumen','Prueba de instalación','Prueba de portabilidad'],0],
 ['¿Qué objetivo principal tiene una regresión después de un cambio?',['Detectar efectos no deseados en áreas relacionadas','Confirmar únicamente el defecto original','Medir solo usabilidad','Evitar analizar impacto'],0],
 ['¿Qué debería revisarse antes de recomendar una liberación?',['Resultados, riesgos abiertos, defectos, cobertura y evidencia','Solo el número total de casos','Solo la fecha comprometida','Solo la opinión del equipo'],0],
 ['¿Qué hace útil un criterio de aceptación?',['Que sea claro, observable y verificable','Que dependa de interpretación personal','Que no tenga resultado esperado','Que use términos ambiguos'],0],
 ['¿Qué aporta una revisión estática temprana?',['Detectar defectos y ambigüedades antes de ejecutar el software','Eliminar todas las pruebas dinámicas','Medir rendimiento de producción','Sustituir los requisitos'],0],
 ['¿Cómo debería priorizar pruebas cuando el tiempo es limitado?',['Según riesgo, impacto, probabilidad y criticidad del negocio','Por orden alfabético','Ejecutando solo casos positivos','Dando la misma prioridad a todo'],0],
 ['¿Cuál es una evidencia apropiada para validar persistencia de datos?',['Comparar el resultado visible con los datos almacenados cuando el acceso esté autorizado','Asumir que guardar siempre funciona','Revisar solo el color del botón','Usar una captura sin contexto'],0],
 ['¿Qué debería hacer QA ante un requisito ambiguo?',['Solicitar aclaración y convertirlo en criterios verificables','Inventar el comportamiento esperado','Omitir la funcionalidad','Reportar un defecto antes de probar'],0],
 ['¿Cómo se maneja mejor un desacuerdo sobre un defecto?',['Volviendo a evidencia, requisito, impacto y comportamiento observable','Escalando sin conversar','Cerrando el defecto de inmediato','Cambiando el resultado esperado'],0],
 ['¿Qué significa aplicar testing basado en riesgo?',['Ajustar cobertura y esfuerzo según probabilidad e impacto','Probar solo lo más fácil','Omitir escenarios negativos','Ejecutar todos los casos con la misma prioridad'],0],
 ['¿Qué debería contener un buen caso de prueba manual?',['Precondiciones, datos, pasos, resultado esperado y trazabilidad cuando aplique','Solo un título','Únicamente una captura','Solo el resultado obtenido'],0],
 ['¿Cuándo conviene usar partición de equivalencia?',['Cuando las entradas pueden agruparse en clases con comportamiento equivalente','Solo en performance','Únicamente sin requisitos','Solo cuando los datos son numéricos'],0],
 ['¿Qué técnica aplica cuando el comportamiento depende de estados y eventos?',['Transición de estados','Solo valores límite','Solo revisión informal','Prueba de volumen'],0],
 ['¿Qué es un oráculo de prueba?',['Una referencia para decidir si el resultado observado es correcto','Una herramienta de CI','Un servidor de base de datos','Un tipo de defecto'],0]
];
const AUTO_Q=[
 ['¿Qué criterio ayuda a decidir si un caso debe automatizarse?',['Frecuencia, riesgo, estabilidad, valor y costo de mantenimiento','Automatizar todo sin análisis','Elegir solo pruebas visuales','Evitar regresiones'],0],
 ['¿Qué ventaja ofrece Page Object Model?',['Centraliza interacción con la interfaz y reduce duplicación','Elimina la necesidad de assertions','Garantiza cero fallos','Sustituye CI/CD'],0],
 ['¿Qué característica hace más robusto un locator?',['Basarse en atributos estables y semánticos','Depender de posiciones absolutas','Usar selectores generados y largos sin necesidad','Depender del texto más cambiante'],0],
 ['Una prueba automatizada es flaky. ¿Qué debe investigarse primero?',['Sincronización, datos, ambiente, dependencias y estabilidad del producto','Reejecutarla hasta que pase','Ignorarla siempre','Marcar automáticamente un defecto del producto'],0],
 ['¿Qué aporta ejecutar automatización en CI/CD?',['Feedback temprano y repetible sobre los cambios','Garantía de cero defectos','Eliminación total de pruebas manuales','Ausencia de mantenimiento'],0],
 ['¿Qué debería hacer una assertion?',['Verificar de forma clara un resultado esperado relevante','Esperar un tiempo fijo','Crear datos de producción','Ocultar errores'],0],
 ['¿Qué práctica mejora mantenibilidad de una suite?',['Separar datos, lógica de negocio, páginas y configuración','Copiar código entre pruebas','Usar sleeps fijos en todas partes','Guardar credenciales en scripts'],0],
 ['¿Qué riesgo tienen los waits fijos excesivos?',['Aumentan tiempo y pueden seguir siendo inestables','Siempre mejoran confiabilidad','Eliminan condiciones de carrera','Hacen innecesarios los locators'],0],
 ['¿Qué debería validar una prueba automatizada de API?',['Contrato, autenticación, datos, códigos y errores esperados','Solo que responda 200','Solo la interfaz web','Únicamente el tiempo total'],0],
 ['¿Qué valor aporta paralelizar pruebas cuando el entorno lo permite?',['Reducir tiempo de feedback controlando aislamiento y recursos','Eliminar la necesidad de datos independientes','Evitar revisar fallos','Garantizar orden idéntico de ejecución'],0],
 ['¿Qué práctica protege secretos en automatización?',['Usar variables seguras o gestores de secretos fuera del repositorio','Guardar claves en el código','Compartir credenciales en logs','Incluir tokens en capturas'],0],
 ['¿Qué representa un quality gate automatizado útil?',['Un criterio objetivo ligado a riesgo y evidencia antes de avanzar','Un bloqueo arbitrario','Una regla sin métricas','Un paso que siempre aprueba'],0],
 ['¿Por qué conviene aislar datos de prueba?',['Para reducir dependencias y hacer ejecuciones reproducibles','Para impedir ejecución paralela','Para evitar assertions','Para usar datos reales siempre'],0],
 ['¿Qué debería ocurrir cuando una prueba automatizada falla en CI?',['Conservar evidencia y distinguir fallo del producto, script o entorno','Borrar el resultado','Reintentar indefinidamente','Marcar siempre el producto como defectuoso'],0],
 ['¿Qué beneficio tiene versionar código de pruebas con Git?',['Trazabilidad, colaboración, revisión y control de cambios','Evitar code review','Eliminar ramas','Sustituir la documentación'],0],
 ['¿Qué criterio favorece una buena arquitectura de automatización?',['Bajo acoplamiento, responsabilidades claras y extensibilidad','Duplicación frecuente','Dependencias ocultas','Configuración fija por máquina'],0],
 ['¿Cuándo es útil un test runner como TestNG o Pytest?',['Para organizar, parametrizar, ejecutar y reportar pruebas de forma estructurada','Para sustituir el navegador','Para diseñar UX','Para almacenar credenciales'],0],
 ['¿Qué debería medirse para conocer la salud de una suite automatizada?',['Duración, estabilidad, tasa de fallos, cobertura útil y mantenimiento','Solo cantidad de scripts','Solo número de commits','Únicamente tamaño del repositorio'],0],
 ['¿Qué ventaja ofrece parametrizar casos automatizados?',['Reutilizar lógica con distintos datos manteniendo claridad','Duplicar el mismo script','Eliminar assertions','Impedir pruebas negativas'],0],
 ['¿Qué criterio ayuda a decidir entre UI y API para automatizar una validación?',['Usar el nivel más estable y eficiente que cubra adecuadamente el riesgo','Elegir siempre UI','Elegir siempre API','Evitar considerar el riesgo'],0]
];
const SCENARIOS=[
 'durante la revisión de una historia de usuario','antes de una liberación de alto impacto','después de corregir un defecto crítico','al preparar una regresión para el siguiente sprint','cuando existe poco tiempo para probar','al recibir una nueva versión del sistema','durante una sesión de refinamiento','al analizar un cambio con dependencias','cuando un resultado no coincide con lo esperado','al preparar evidencia para una decisión de release','cuando cambia una regla de negocio','al validar una funcionalidad en un ambiente nuevo'
];

let simCert,provider,dif,mode,role,examLang,simStack,qs=[],idx=0,tick=null,left=0,currentCert=null,currentBankSize=0,responses=[],examLocked=false;
const el=id=>document.getElementById(id);
const showEl=(node,show=true)=>{if(!node)return;node.hidden=!show;node.style.display=show?'':'';};

function validFullName(value){
 const cleaned=(value||'').trim().replace(/\s+/g,' ');
 if(cleaned.length<5)return false;
 const parts=cleaned.split(' ').filter(Boolean);
 return parts.length>=2 && parts.every(p=>/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'’-]{2,}$/.test(p));
}
function updateStartState(){
 const btn=el('startExam'),name=el('candidateName'),email=el('candidateEmail');
 if(!btn||!name||!email)return;
 const nameOk=validFullName(name.value);
 const emailOk=/^\S+@\S+\.\S+$/.test((email.value||'').trim());
 const ok=nameOk&&emailOk;
 btn.disabled=!ok;
 btn.setAttribute('aria-disabled',String(!ok));
 btn.title=ok?'':!nameOk?'Ingrese nombre y apellidos para comenzar.':'Ingrese un correo válido para recibir el resultado/certificado.';
}
function saveConfigDraft(){
 const payload={name:(el('candidateName')?.value||'').trim(),email:(el('candidateEmail')?.value||'').trim(),mode:mode?.value||'cert',provider:provider?.value||'ISTQB',cert:simCert?.value||'',role:role?.value||'',stack:simStack?.value||'',difficulty:dif?.value||'',language:examLang?.value||'es'};
 sessionStorage.setItem('qaExamConfigDraft',JSON.stringify(payload));
}
function recommendationsLink(){return `<a id="examRecommendationsLink" class="btn secondary small" href="preparacion-examen.html">Recomendaciones antes de iniciar el examen →</a>`;}
function stackModeConfig(){
 const raw=(dif?.value||'Básico|0').split('|');
 return {level:raw[0]||'Básico',minutes:Number(raw[1]||0)};
}


function activateExamIntegrity(){
 document.body.classList.add('exam-active');
}
function deactivateExamIntegrity(){
 document.body.classList.remove('exam-active');
}
function selectedActivityName(){
 if(mode?.value==='interview')return role?.value||'Entrevista laboral QA';
 if(mode?.value==='stack')return window.QA_STACKS?.[simStack?.value]?.name||simStack?.value||'Stack QA';
 return currentCert?.name||simCert?.selectedOptions?.[0]?.textContent||'Simulación QA';
}

function shuffle(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
function certDifficultyOptions(){return `<option value="Principiante">Principiante · sin cronómetro</option><option value="Fácil">Fácil · 60 minutos</option><option value="Medio">Medio · 45 minutos</option><option value="Difícil">Difícil · 30 minutos</option>`}
function stackDifficultyOptions(){return `
<option value="Básico|0">Básico · sin cronómetro</option>
<option value="Básico|60">Básico · 60 minutos</option>
<option value="Intermedio|45">Intermedio · 45 minutos</option>
<option value="Avanzado|30">Avanzado · 30 minutos</option>`}

function boot(){
 simCert=el('simCert');provider=el('simProvider');dif=el('simDifficulty');mode=el('simMode');role=el('simRole');examLang=el('simExamLanguage');simStack=el('simStack');
 if(!simCert||!provider||!dif||!mode||!role||!examLang||!simStack||!el('startExam'))return;
 if(!Array.isArray(window.CERTIFICATIONS)||typeof window.buildExamQuestionBank!=='function'){el('simConfig').innerHTML='<h2>No fue posible cargar el banco de preguntas</h2>';return;}
 // Mantenga el selector sincronizado con todos los stacks disponibles.
 simStack.innerHTML=Object.entries(window.QA_STACKS||{}).map(([id,st])=>`<option value="${escapeHtml(id)}">${escapeHtml(st.name||id)}</option>`).join('');
 const params=new URLSearchParams(location.search);
 const requested=params.get('cert');
 if(params.get('mode')==='external' && (window.PRO_CREDENTIAL_PATHS||[]).some(c=>c.id===requested))provider.value='EXTERNAL';
 else if(requested&&window.CERTIFICATIONS.some(c=>c.id===requested))provider.value=requested.startsWith('AICS-')?'AICS':'ISTQB';
 fillCerts(requested);
 let user=null;try{user=JSON.parse(localStorage.getItem('academyUser')||'null')}catch{}
 let draft=null;const returningFromGuide=sessionStorage.getItem('qaExamReturnPending')==='1';
 if(returningFromGuide){try{draft=JSON.parse(sessionStorage.getItem('qaExamConfigDraft')||'null')}catch{}sessionStorage.removeItem('qaExamReturnPending');}
 el('candidateName').value=user?.name&&user.name!=='Participante'?user.name:(returningFromGuide?(draft?.name||''):'');
 el('candidateEmail').value=user?.email?user.email:(returningFromGuide?(draft?.email||''):'');
 mode.addEventListener('change',changeMode);
 provider.addEventListener('change',()=>fillCerts());
 simCert.addEventListener('change',updateCert);
 role.addEventListener('change',updateCert);
 simStack.addEventListener('change',updateCert);
 dif.addEventListener('change',updatePracticeMeta);
 examLang.addEventListener('change',updatePracticeMeta);
 el('startExam').addEventListener('click',start);
 el('candidateName').addEventListener('input',()=>{updateStartState();saveConfigDraft()});
 el('candidateEmail').addEventListener('input',()=>{updateStartState();saveConfigDraft()});
 el('nextQ').addEventListener('click',nextQuestion);
 el('prevQ').addEventListener('click',prevQuestion);
 el('retryExam').addEventListener('click',retry);
 el('downloadCertificate').addEventListener('click',certificate);
 el('reviewExam')?.addEventListener('click',toggleExamReview);
 if(params.get('mode')==='stack'){
   mode.value='stack';
   if(params.get('stack')&&window.QA_STACKS?.[params.get('stack')])simStack.value=params.get('stack');
 }else if(params.get('mode')==='interview'){
   mode.value='interview';
 }
 changeMode();updateStartState();window.applyTranslations?.();
}

function changeMode(){
 const interview=mode.value==='interview', stackMode=mode.value==='stack';
 showEl(el('providerWrap'),!interview&&!stackMode);
 showEl(el('certWrap'),!interview&&!stackMode);
 showEl(el('roleWrap'),interview);
 showEl(el('stackWrap'),stackMode);
 showEl(el('examProvidersLink'),mode.value==='cert');
 const difficultyLabel=el('difficultyLabel');if(difficultyLabel)difficultyLabel.textContent=stackMode?'Dificultad y tiempo':'Dificultad';
 simCert.disabled=interview||stackMode;provider.disabled=interview||stackMode;
 el('certWrap')?.classList.toggle('field-disabled',interview||stackMode);
 el('providerWrap')?.classList.toggle('field-disabled',interview||stackMode);
 if(stackMode){
   if(!dif.value.includes('|'))dif.innerHTML=stackDifficultyOptions();
 }else{
   if(dif.value.includes('|'))dif.innerHTML=certDifficultyOptions();
 }
 updateCert();updateStartState();
}

function fillCerts(preselect){
 const kind=provider.value;let list=[];
 if(kind==='MIX'){simCert.innerHTML='';simCert.add(new Option(MIXED.name,MIXED.id));currentCert=MIXED;updateCert();return;}
 if(kind==='EXTERNAL')list=(window.PRO_CREDENTIAL_PATHS||[]);else list=window.CERTIFICATIONS.filter(c=>kind==='AICS'?c.id.startsWith('AICS-'):!c.id.startsWith('AICS-'));
 simCert.innerHTML='';list.forEach(c=>simCert.add(new Option(c.name,c.id)));
 if(preselect&&list.some(c=>c.id===preselect))simCert.value=preselect;updateCert();
}


function updateSimulationHeading(){
 const h=document.querySelector('.page-hero h1');
 const p=document.querySelector('.page-hero p');
 if(!h||!currentCert)return;
 if(mode.value==='stack')h.textContent=`Simulación para ${currentCert.name}`;
 else if(mode.value==='interview')h.textContent=`Entrevista práctica · ${currentCert.name}`;
 else h.textContent=`Simulación para ${currentCert.name}`;
 if(p)p.textContent=`Responda ${attemptQuestionCount()} preguntas y revise su resultado al finalizar.`;
}

function updateCert(){
 if(mode.value==='interview'){
   currentCert={id:`JOB-${slug(role.value)}`,name:role.value,level:'Entrevista laboral',difficulty:(/Evaluación de nivel/.test(role.value)?'Diagnóstico Jr–Lead':'Por seniority'),k:'Competencias del puesto',focus:(ROLE_TOPICS[role.value]||[]).join(', '),url:'empleos.html'};
   el('certMeta').innerHTML=`<b>${escapeHtml(role.value)}</b><span>Simulación de entrevista laboral</span><p>${escapeHtml(currentCert.focus)}</p>`;showEl(el('certMeta'),true);
   const link=el('officialExamLink');if(link){showEl(link,true);link.href='empleos.html';link.target='';link.textContent='Preparación de empleo';}updateSimulationHeading();updatePracticeMeta();return;
 }
 if(mode.value==='stack'){
   const st=window.QA_STACKS?.[simStack.value];currentCert={id:`STACK-${simStack.value}`,name:st?.name||'Stack QA',url:'academia.html#stacks'};
   el('certMeta').innerHTML=`<b>${escapeHtml(st?.name||'Stack QA')}</b><span>Evaluación de conocimientos del stack</span><p>${escapeHtml((st?.topics||[]).join(', '))}</p>`;showEl(el('certMeta'),true);
   const link=el('officialExamLink');if(link)showEl(link,false);updateSimulationHeading();updatePracticeMeta();return;
 }
 const baseCert=provider.value==='MIX'?MIXED:provider.value==='EXTERNAL'?(window.PRO_CREDENTIAL_PATHS||[]).find(c=>c.id===simCert.value):window.CERTIFICATIONS.find(c=>c.id===simCert.value);if(!baseCert)return;currentCert=baseCert;
 el('certMeta').innerHTML=`<b>${escapeHtml(currentCert.level)} · ${escapeHtml(currentCert.difficulty)}</b><span>${escapeHtml(currentCert.k||'')}</span><p>${escapeHtml(currentCert.focus)}</p>`;showEl(el('certMeta'),true);
 const link=el('officialExamLink');if(link){showEl(link,true);link.href=currentCert.url||'proveedores.html';link.target=currentCert.url?.startsWith('http')?'_blank':'';link.textContent=provider.value==='AICS'?'Información AICS ↗':provider.value==='MIX'?'Fuentes de certificación':provider.value==='EXTERNAL'?'Información de certificación ↗':'Material oficial ↗';}updateSimulationHeading();updatePracticeMeta();
}

function ctflSelected(){return mode.value==='cert' && provider.value==='ISTQB' && currentCert?.id==='CTFL';}
function ctalAtSelected(){return mode.value==='cert' && provider.value==='ISTQB' && currentCert?.id==='CTAL-AT';}
function advancedSyllabusSelected(){return mode.value==='cert' && ['CTAL-TA','CTAL-TAE','CTAL-TM','CTAL-TTA'].includes(currentCert?.id);}
function buildCtflBank(){
 const full=[...(window.buildCtflSyllabusBank?.()||[]),...(window.CTFL_SAMPLE_STYLE_BANK||[]),...(window.buildIstqbLogicBank?.(currentCert,dif.value)||[])];
 const weight={Principiante:{Básico:.65,Intermedio:.30,Avanzado:.05},Fácil:{Básico:.50,Intermedio:.40,Avanzado:.10},Medio:{Básico:.25,Intermedio:.50,Avanzado:.25},Difícil:{Básico:.10,Intermedio:.35,Avanzado:.55}}[dif.value]||{Básico:.34,Intermedio:.33,Avanzado:.33};
 const grouped={Básico:shuffle(full.filter(q=>q.d==='Básico')),Intermedio:shuffle(full.filter(q=>q.d==='Intermedio')),Avanzado:shuffle(full.filter(q=>q.d==='Avanzado'))};
 const out=[],used=new Set();
 for(const level of ['Básico','Intermedio','Avanzado']){
   const count=Math.round(120*weight[level]);
   for(let i=0;i<count&&i<grouped[level].length;i++){out.push(grouped[level][i]);used.add(grouped[level][i].uid);}
 }
 for(const q of shuffle(full)){if(out.length>=120)break;if(!used.has(q.uid)){used.add(q.uid);out.push(q)}}
 return out;
}
function buildCtalAtBank(){
 const full=[...(window.buildCtalAtSyllabusBank?.()||[]),...(window.buildIstqbLogicBank?.(currentCert,dif.value)||[])];
 const weight={Principiante:{Básico:.55,Intermedio:.35,Avanzado:.10},Fácil:{Básico:.40,Intermedio:.45,Avanzado:.15},Medio:{Básico:.20,Intermedio:.50,Avanzado:.30},Difícil:{Básico:.10,Intermedio:.35,Avanzado:.55}}[dif.value]||{Básico:.34,Intermedio:.33,Avanzado:.33};
 const grouped={Básico:shuffle(full.filter(q=>q.d==='Básico')),Intermedio:shuffle(full.filter(q=>q.d==='Intermedio')),Avanzado:shuffle(full.filter(q=>q.d==='Avanzado'))};
 const out=[],used=new Set();
 for(const level of ['Básico','Intermedio','Avanzado']){
   const count=Math.round(120*weight[level]);
   for(let i=0;i<count&&i<grouped[level].length;i++){out.push(grouped[level][i]);used.add(grouped[level][i].uid);}
 }
 for(const q of shuffle(full)){if(out.length>=120)break;if(!used.has(q.uid)){used.add(q.uid);out.push(q)}}
 return out;
}

function buildUploadedAdvancedBank(){
 const full=[...(window.buildAdvancedSyllabusBank?.(currentCert.id)||[]),...(window.buildIstqbLogicBank?.(currentCert,dif.value)||[])];
 const weight={Principiante:{Básico:.55,Intermedio:.35,Avanzado:.10},Fácil:{Básico:.40,Intermedio:.45,Avanzado:.15},Medio:{Básico:.20,Intermedio:.50,Avanzado:.30},Difícil:{Básico:.10,Intermedio:.35,Avanzado:.55}}[dif.value]||{Básico:.34,Intermedio:.33,Avanzado:.33};
 const grouped={Básico:shuffle(full.filter(q=>q.d==='Básico')),Intermedio:shuffle(full.filter(q=>q.d==='Intermedio')),Avanzado:shuffle(full.filter(q=>q.d==='Avanzado'))};
 const out=[],used=new Set();
 for(const level of ['Básico','Intermedio','Avanzado']){
  const count=Math.round(120*weight[level]);
  for(let i=0;i<count&&i<grouped[level].length;i++){out.push(grouped[level][i]);used.add(grouped[level][i].uid)}
 }
 for(const q of shuffle(full)){if(out.length>=120)break;if(!used.has(q.uid)){out.push(q);used.add(q.uid)}}
 return out;
}

function buildExternalCertificationBank(){
 const cert=currentCert||{},modules=cert.modules||['Fundamentos'];
 const scenarios=['durante una implementación real','antes de liberar un cambio','cuando aparece un fallo intermitente','al preparar una solución mantenible','durante una revisión técnica','al investigar un riesgo','cuando se necesita evidencia reproducible','al integrar la herramienta en CI/CD'];
 const templates=[
 (m,sc)=>({q:`${sc}, ¿qué enfoque demuestra mejor dominio de ${m}?`,a:[`Aplicar ${m} con un objetivo verificable, evidencia y revisión del resultado`,`Usar ${m} sin validar el resultado`,`Evitar documentar decisiones`,`Depender únicamente de valores por defecto`],c:0}),
 (m,sc)=>({q:`¿Cuál práctica es más sólida al trabajar con ${m} ${sc}?`,a:[`Relacionar configuración, objetivo, riesgo y resultado observable`,`Priorizar velocidad aunque no exista evidencia`,`Copiar una configuración sin comprenderla`,`Omitir escenarios negativos`],c:0}),
 (m,sc)=>({q:`${sc}, ¿qué evidencia sería más útil para evaluar ${m}?`,a:[`Resultado reproducible, configuración relevante y criterio esperado`,`Solo una impresión subjetiva`,`Una captura sin contexto`,`La cantidad de archivos del proyecto`],c:0}),
 (m,sc)=>({q:`¿Qué decisión reduce mejor el riesgo relacionado con ${m} ${sc}?`,a:[`Validar supuestos críticos y usar comprobaciones repetibles cuando aporten valor`,`Ignorar casos límite`,`Cambiar varias variables sin registrar evidencia`,`Asumir que una ejecución exitosa cubre todos los escenarios`],c:0})];
 const out=[];let n=0;for(let round=0;out.length<120;round++){const m=modules[round%modules.length],sc=scenarios[Math.floor(round/modules.length)%scenarios.length],q=templates[round%templates.length](m,sc);q.n=++n;q.d=dif.value;q.topic=m;q.uid=`EXT-${cert.id}-${n}`;out.push(q)}return localizeBank(out,examLang.value,currentCert);
}

function buildCertificationBank(){
 if(provider.value==='EXTERNAL')return buildExternalCertificationBank();
 if(ctflSelected())return buildCtflBank();
 if(ctalAtSelected())return buildCtalAtBank();
 if(advancedSyllabusSelected())return buildUploadedAdvancedBank();
 if(provider.value==='MIX'){const a=window.buildExamQuestionBank(window.CERTIFICATIONS.find(c=>c.id==='CTFL'),dif.value)||[];const b=window.buildExamQuestionBank(window.CERTIFICATIONS.find(c=>c.id==='AICS-ASTFC'),dif.value)||[];return localizeBank(shuffle(a).slice(0,60).concat(shuffle(b).slice(0,60)),examLang.value,currentCert);}
 const bank=window.buildExamQuestionBank(currentCert,dif.value)||[];return localizeBank(bank,examLang.value,currentCert);
}
function roleSeed(){return /Automatización|Automation/i.test(role.value)?AUTO_Q:MANUAL_Q;}
function buildInterviewBank(){
 const seed=roleSeed(),topics=ROLE_TOPICS[role.value]||[],out=[],seen=new Set();
 for(let round=0;out.length<120;round++){
   const base=seed[round%seed.length],topic=topics[round%topics.length],scenario=SCENARIOS[Math.floor(round/seed.length)%SCENARIOS.length];
   let q=base[0];
   if(round>=seed.length){const prompts=[' ¿Cómo lo abordaría y qué evidencia usaría para justificar su decisión?',' ¿Qué pasos seguiría para investigar el caso y comunicar el riesgo?',' ¿Qué información revisaría antes de decidir el siguiente paso?',' ¿Cómo priorizaría la situación y qué criterio utilizaría?',' ¿Qué haría primero y cómo comprobaría que la acción fue efectiva?',' ¿Cómo explicaría su recomendación al equipo y al Product Owner?',' ¿Qué riesgos consideraría y cómo los validaría?',' ¿Cómo convertiría este escenario en una decisión de pruebas defendible?'];const suffix=prompts[round%prompts.length];q=`${q.replace(/\?$/,'')} ${scenario}${suffix}`;}
   q=q.replace(/Caso\s*\d+/gi,'').trim();
   if(seen.has(q))continue;seen.add(q);out.push({q,a:[...base[1]],c:base[2],d:dif.value,n:out.length+1,topic});
 }
 return localizeBank(out,examLang.value,currentCert);
}
function buildStackBank(){const cfg=stackModeConfig();return window.buildStackQuestions?.(simStack.value,cfg.level)||[];}

function localizeBank(bank,lang,cert){
 if(lang==='es'||ctflSelected()||ctalAtSelected()||advancedSyllabusSelected()||mode.value==='stack')return bank;
 const en=lang==='en';
 const contexts=en?['during requirement review','before a high-risk release','after a critical defect fix','while planning regression','when evidence is incomplete','during sprint refinement','when a result is unexpected','when prioritizing limited test time','while assessing release readiness','when a business rule changes','while reviewing test coverage','when a dependency changes']:['durante a revisão de requisitos','antes de uma liberação de alto risco','após corrigir um defeito crítico','ao planejar regressão','quando a evidência está incompleta','durante o refinamento do sprint','quando um resultado é inesperado','ao priorizar tempo limitado de teste','ao avaliar prontidão para release','quando uma regra de negócio muda','ao revisar a cobertura de testes','quando uma dependência muda'];
 const stems=en?['Which action best supports reliable testing','What should QA prioritize','Which option provides the strongest evidence','Which response best reduces product risk','What is the most appropriate testing decision','Which practice best improves traceability','What should be verified first','Which approach best supports a defensible quality decision','Which option is most consistent with sound QA practice','What would be the best next step']:['Qual ação melhor apoia testes confiáveis','O que QA deve priorizar','Qual opção fornece a evidência mais forte','Qual resposta reduz melhor o risco do produto','Qual é a decisão de teste mais adequada','Qual prática melhora melhor a rastreabilidade','O que deve ser verificado primeiro','Qual abordagem apoia melhor uma decisão de qualidade defensável','Qual opção é mais consistente com boas práticas de QA','Qual seria o melhor próximo passo'];
 const answers=en?['Use objectives, risk, evidence and a verifiable expected result','Make assumptions without validation','Ignore context and traceability','Treat every unexpected result as a confirmed product defect']:['Usar objetivos, risco, evidência e resultado esperado verificável','Fazer suposições sem validação','Ignorar contexto e rastreabilidade','Tratar todo resultado inesperado como defeito confirmado do produto'];
 return bank.map((q,i)=>({q:`${stems[i%stems.length]} ${contexts[Math.floor(i/stems.length)%contexts.length]} for ${q.topic||cert.name}?`,a:[...answers],c:0,d:q.d,n:q.n,topic:q.topic,uid:q.uid||`${cert.id}-${i}`}));
}

function buildBank(){
 if(mode.value==='interview')return buildInterviewBank();
 if(mode.value==='stack')return buildStackBank();
 return buildCertificationBank();
}

function updatePracticeMeta(){
 if(!currentCert)return;let bank=[];try{bank=buildBank()}catch{}
 currentBankSize=bank.length;
 let summary='';
 if(mode.value==='stack'){
   const cfg=stackModeConfig(),stackTiming=cfg.minutes?`${cfg.minutes} min`:'sin cronómetro';
   summary=`<strong>Formato de práctica</strong><span>Banco: ${currentBankSize} preguntas · intento: 40 aleatorias · ${escapeHtml(cfg.level)} · ${stackTiming}</span>`;
 }else{
   const mins=DIFFICULTY_TIME[dif.value],timing=mins?`${mins} min`:'sin cronómetro';
   summary=`<strong>Formato de práctica</strong><span>Banco: ${currentBankSize}+ preguntas · intento: ${attemptQuestionCount()} aleatorias · ${timing}</span>`;
 }
 const meta=el('certMeta');
 if(meta){
   meta.querySelector('.practice-meta-unified')?.remove();
   meta.insertAdjacentHTML('beforeend',`<div class="practice-meta-unified">${summary}<div class="practice-guide-action">${recommendationsLink()}</div></div>`);
   showEl(meta,true);
 }
 showEl(el('practiceMeta'),false);
 el('examRecommendationsLink')?.addEventListener('click',()=>{saveConfigDraft();sessionStorage.setItem('qaExamReturnPending','1')});
 updateStartState();
}

function shuffleQuestionOptions(q){
 const indexed=(q.a||[]).map((text,i)=>({text,i}));
 const shuffled=shuffle(indexed);
 const correct=Array.isArray(q.c)?q.c:[q.c];
 const mapped=correct.map(old=>shuffled.findIndex(x=>x.i===old)).sort((a,b)=>a-b);
 return {...q,a:shuffled.map(x=>x.text),c:Array.isArray(q.c)?mapped:mapped[0]};
}
function questionKey(q){return String(q?.q||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function attemptQuestionCount(){return 40;}
function manualSeniorityFromPct(pct){if(pct<55)return 'Jr';if(pct<72)return 'Mid';if(pct<86)return 'Sr';return 'Lead';}
function automationSeniorityFromPct(pct){return pct<55?'Jr':pct<75?'Mid':pct<90?'Sr':'Lead';}
function start(){
 clearInterval(tick);updateCert();
 const name=el('candidateName').value.trim(),email=(el('candidateEmail').value||'').trim();if(!validFullName(name)||!/^\S+@\S+\.\S+$/.test(email)){updateStartState();return;}saveConfigDraft();
 let bank=[];try{bank=buildBank()}catch(err){console.error(err);}
 const unique=[...new Map((bank||[]).map(q=>[questionKey(q),q])).values()];
 const targetCount=attemptQuestionCount(),minRequired=targetCount;
 if(unique.length<minRequired){el('practiceMeta').innerHTML=`<strong>No fue posible iniciar</strong><span>El banco seleccionado contiene ${unique.length} preguntas únicas y se requieren al menos ${minRequired}.</span>${recommendationsLink()}`;return;}
 let pick=shuffle(unique).slice(0,targetCount).map(shuffleQuestionOptions);
 const key=`examHistory:${currentCert.id}:${dif.value}:${examLang.value}`;let history=[];try{history=JSON.parse(localStorage.getItem(key)||'[]')}catch{};const used=new Set(history.flat());const fresh=unique.filter(q=>!used.has(questionKey(q)));const pool=fresh.length>=targetCount?fresh:unique;pick=shuffle(pool).slice(0,targetCount).map(shuffleQuestionOptions);const keys=pick.map(questionKey);history.push(keys);if(history.length>5)history=history.slice(-5);localStorage.setItem(key,JSON.stringify(history));qs=pick;responses=Array(targetCount).fill(null);idx=0;examLocked=false;
 showEl(el('simConfig'),false);showEl(el('simResult'),false);showEl(el('simQuiz'),true);activateExamIntegrity();
 const minutes=mode.value==='stack'?stackModeConfig().minutes:DIFFICULTY_TIME[dif.value];
 if(minutes){left=minutes*60;renderTimer();tick=setInterval(()=>{if(examLocked)return;left--;renderTimer();if(left<=0){left=0;renderTimer();finish(true)}},1000);}
 else el('timer').textContent='Sin cronómetro';
 show();
}
function renderTimer(){const m=Math.floor(left/60),s=left%60;el('timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
function sameAnswer(response,correct){
 const ca=Array.isArray(correct)?[...correct].sort((a,b)=>a-b):[correct];
 const ra=Array.isArray(response)?[...response].sort((a,b)=>a-b):(response===null||response===undefined?[]:[response]);
 return ca.length===ra.length&&ca.every((v,i)=>v===ra[i]);
}
function answered(response,correct){const need=Array.isArray(correct)?correct.length:1;return Array.isArray(response)?response.length===need:response!==null&&response!==undefined;}
function scoreNow(){return responses.reduce((sum,r,i)=>sum+(sameAnswer(r,qs[i]?.c)?1:0),0);}
function show(){
 const q=qs[idx];if(!q){finish(false);return;}
 const response=responses[idx];
 el('qCounter').textContent=`Pregunta ${idx+1} / ${qs.length}`;
 el('liveScore').textContent=`${responses.filter(x=>x!==null).length} respondidas`;
 const qd=el('qDifficulty');
 const hideDifficulty=(mode.value==='cert'&&dif.value==='Difícil')||(mode.value==='stack'&&stackModeConfig().minutes===30);
 if(qd){qd.textContent=q.d||dif.value;showEl(qd,!hideDifficulty);}
 el('qText').textContent=q.q;
 el('quizProgress').style.width=`${((idx+1)/qs.length)*100}%`;
 const selected=Array.isArray(response)?response:(response===null?[]:[response]);
 el('answers').innerHTML=q.a.map((a,i)=>`<button type="button" class="answer-btn ${selected.includes(i)?'selected':''}" data-i="${i}" aria-pressed="${selected.includes(i)?'true':'false'}">${String.fromCharCode(65+i)}. ${escapeHtml(a)}</button>`).join('');
 [...document.querySelectorAll('.answer-btn')].forEach(b=>b.addEventListener('click',()=>answer(Number(b.dataset.i))));
 const feedback=el('feedback');if(feedback){feedback.textContent='';feedback.hidden=true;}
 el('prevQ').disabled=idx===0;
 el('nextQ').disabled=!answered(response,q.c);
 el('nextQ').textContent=idx===qs.length-1?'Finalizar':'Siguiente →';
 if(mode.value!=='stack'&&DIFFICULTY_TIME[dif.value])renderTimer();
}
function answer(i){
 if(examLocked||left<0)return;
 const q=qs[idx];
 if(Array.isArray(q.c)){
   const max=q.c.length;let arr=Array.isArray(responses[idx])?[...responses[idx]]:[];
   if(arr.includes(i))arr=arr.filter(x=>x!==i);else if(arr.length<max)arr.push(i);else arr=[...arr.slice(1),i];
   responses[idx]=arr.length?arr:null;
 }else responses[idx]=i;
 show();
}
function nextQuestion(){
 if(examLocked)return;
 if(!answered(responses[idx],qs[idx]?.c))return;
 if(idx<qs.length-1){idx++;show();document.getElementById('simQuiz')?.scrollIntoView({behavior:'smooth',block:'start'});}
 else finish(false);
}
function prevQuestion(){
 if(examLocked)return;
 if(idx>0){idx--;show();document.getElementById('simQuiz')?.scrollIntoView({behavior:'smooth',block:'start'});}
}
function questionExplanation(q){
 if(q.explanation)return q.explanation;
 const ci=Array.isArray(q.c)?q.c:[q.c];
 const correct=ci.map(i=>q.a?.[i]).filter(Boolean).join(' / ');
 return `${correct} responde directamente al criterio evaluado en la pregunta.`;
}
function answerLabel(q,value){
 const arr=Array.isArray(value)?value:(value===null||value===undefined?[]:[value]);
 return arr.length?arr.map(i=>`${String.fromCharCode(65+i)}. ${escapeHtml(q.a[i])}`).join(' · '):'Sin respuesta';
}
function renderExamReview(){
 const review=el('examReview');if(!review)return;
 const rows=qs.map((q,i)=>({q,i,chosen:responses[i],correct:sameAnswer(responses[i],q.c)}));
 const correctCount=rows.filter(x=>x.correct).length;
 review.innerHTML=`<div class="section-heading compact"><div><span class="eyebrow">Revisión final</span><h2>Preguntas y respuestas del intento</h2><p>${correctCount} correctas de ${rows.length}. Revise únicamente las respuestas que necesite reforzar.</p></div></div>`+
 rows.map(({q,i,chosen,correct})=>`<article class="exam-review-item ${correct?'review-correct':'review-wrong'}">
   <div class="review-head"><span class="badge">Pregunta ${i+1}</span><span class="review-state">${correct?'Correcta ✓':'Revisar'}</span></div>
   <h3>${escapeHtml(q.q)}</h3>
   <p><strong>Su respuesta:</strong> ${answerLabel(q,chosen)}</p>
   <p><strong>Respuesta correcta:</strong> ${answerLabel(q,q.c)}</p>
   <p class="review-why"><strong>Por qué:</strong> ${escapeHtml(questionExplanation(q))}</p>
 </article>`).join('');
 review.hidden=true;
 const btn=el('reviewExam');if(btn){btn.textContent='Revisar preguntas y respuestas';btn.setAttribute('aria-expanded','false');}
}
function toggleExamReview(){
 const review=el('examReview'),btn=el('reviewExam');if(!review||!btn)return;
 const show=review.hidden;
 review.hidden=!show;
 btn.textContent=show?'Ocultar revisión':'Revisar preguntas y respuestas';
 btn.setAttribute('aria-expanded',String(show));
 if(show)review.scrollIntoView({behavior:'smooth',block:'start'});
}
function finish(timeout=false){
 if(examLocked)return;
 examLocked=true;clearInterval(tick);deactivateExamIntegrity();
 const score=scoreNow(),pct=Math.round(score/Math.max(qs.length,1)*100),passThreshold=mode.value==='cert'?75:70,passed=pct>=passThreshold;
 showEl(el('simQuiz'),false);showEl(el('simConfig'),false);showEl(el('simResult'),true);
 el('resultScore').textContent=`${score}/${qs.length} · ${pct}%`;
 if(mode.value==='interview'&&/QA Manual · Evaluación/.test(role.value)){const level=manualSeniorityFromPct(pct);el('resultAdvice').innerHTML=`<strong>Nivel orientativo: ${level}</strong> · ${pct}%. ${level==='Jr'?'Fortalezca fundamentos, diseño de pruebas, evidencia y defectos.':level==='Mid'?'Consolide riesgo, planificación, API/mobile, métricas y release readiness.':level==='Sr'?'Profundice estrategia, estimación, mentoring, stakeholders y mejora de procesos.':'Su resultado refleja dominio amplio; contraste liderazgo, estrategia, métricas y decisiones de calidad con experiencia real.'} Esta clasificación es educativa y debe complementarse con experiencia y entrevista.`;}else if(mode.value==='interview'&&/QA Automation · Evaluación/.test(role.value)){const level=automationSeniorityFromPct(pct);el('resultAdvice').innerHTML=`<strong>Nivel orientativo de automatización: ${level}</strong> · ${pct}%. ${level==='Jr'?'Fortalezca locators, assertions, Page Objects, Git y ejecución estable.':level==='Mid'?'Consolide arquitectura, API automation, CI/CD, datos, paralelización y diagnóstico de flaky tests.':level==='Sr'?'Profundice observabilidad, performance, quality gates, testability y arquitectura escalable.':'Su resultado refleja dominio amplio; contraste ROI, gobernanza, estándares, mentoring y liderazgo técnico con experiencia real.'} Esta clasificación es educativa y no sustituye una evaluación profesional.`;}else{el('resultAdvice').textContent=timeout?`El tiempo finalizó. ${passed?'Aprobó la simulación.':'Revise las respuestas y vuelva a practicar los temas con mayor dificultad.'}`:(passed?'Aprobó la simulación. Revise el detalle de respuestas para consolidar el aprendizaje.':`No alcanzó ${passThreshold}%. Revise las preguntas falladas y vuelva a practicar antes de un nuevo intento.`);}
 renderExamReview();showEl(el('reviewExam'),true);showEl(el('downloadCertificate'),passed);if(passed)attemptAutomaticCertificateEmail(score,pct);
 el('simResult')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function retry(){examLocked=false;clearInterval(tick);deactivateExamIntegrity();showEl(el('simResult'),false);showEl(el('simQuiz'),false);showEl(el('simConfig'),true);updatePracticeMeta();updateStartState();el('simConfig')?.scrollIntoView({behavior:'smooth',block:'start'});}
function certificate(){
 const name=(el('candidateName')?.value||'').trim()||'Participante';
 const score=scoreNow(),pct=Math.round(score/Math.max(qs.length,1)*100);
 const activity=selectedActivityName();
 const payload={name,activity,score,total:qs.length,pct,date:new Date().toISOString(),title:`Certificado de aprovechamiento ${activity}`};
 localStorage.setItem('qaCertificatePreview',JSON.stringify(payload));
 const params=new URLSearchParams({name,activity,score:String(score),total:String(qs.length),pct:String(pct),date:payload.date});
 window.open(`certificado.html?${params.toString()}`,'_blank');
}
window.addEventListener('pageshow',()=>{if(el('simConfig')&&!el('simConfig').hidden){updateStartState();updatePracticeMeta();}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();

function examSpeechLang(){return examLang.value==='en'?'en-US':examLang.value==='pt'?'pt-BR':'es-ES'}
function speakCurrentQuestion(){if(!('speechSynthesis'in window)||!qs[idx])return;window.speechSynthesis.cancel();const q=qs[idx];const instruction=examLang.value==='en'?'Choose the letter of the answer you consider correct.':examLang.value==='pt'?'Escolha a letra da resposta que considera correta.':'Escoja la letra de la respuesta que considera correcta.';const text=[`Pregunta ${idx+1}. ${q.q}`,...q.a.map((a,i)=>`${String.fromCharCode(65+i)}. ${a}`),instruction].join('. ');const u=new SpeechSynthesisUtterance(text);u.lang=examSpeechLang();window.speechSynthesis.speak(u)}
function recognizeAnswer(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition,status=el('examVoiceStatus');if(!SR){if(status)status.textContent='Reconocimiento de voz no disponible en este navegador.';return}const r=new SR();r.lang=examSpeechLang();r.interimResults=false;r.maxAlternatives=3;if(status)status.textContent='Escuchando… diga la letra A, B, C o D.';r.onresult=e=>{const variants=[...e.results[0]].map(x=>x.transcript.toLowerCase().trim());const normalize=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();const words={a:0,b:1,c:2,d:3,ah:0,be:1,ve:1,ce:2,se:2,de:3,'uno':0,'una':0,'dos':1,'tres':2,'cuatro':3,one:0,two:1,three:2,four:3};let n;let heard=variants[0]||'';for(const v of variants){const h=normalize(v);const phrases=h.match(/(?:opcion|option|letra|letter)\s+([abcd])/);if(phrases){n={a:0,b:1,c:2,d:3}[phrases[1]];heard=v;break}if(words[h]!==undefined){n=words[h];heard=v;break}for(const t of h.split(' ')){if(words[t]!==undefined){n=words[t];heard=v;break}}if(n!==undefined)break;}if(n===undefined){const h=normalize(heard);n=qs[idx].a.findIndex(a=>{const x=normalize(a);return h.length>3&&(x.includes(h)||h.includes(x))});}if(Number.isInteger(n)&&n>=0&&n<qs[idx].a.length){answer(n);if(status)status.textContent=`Respuesta registrada: ${String.fromCharCode(65+n)}.`}else if(status)status.textContent=`No se reconoció una letra válida: “${heard}”. Intente decir, por ejemplo, “letra B”.`;};r.onerror=()=>{if(status)status.textContent='No fue posible reconocer la respuesta.'};try{r.start()}catch{if(status)status.textContent='El reconocimiento de voz ya está activo.'}}
el('readQuestion')?.addEventListener('click',speakCurrentQuestion);el('voiceAnswer')?.addEventListener('click',recognizeAnswer);

})();
