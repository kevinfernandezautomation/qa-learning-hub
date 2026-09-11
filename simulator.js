(function(){
'use strict';
const DIFFICULTY_TIME={Principiante:null,'Fácil':60,'Medio':45,'Difícil':30};
const MIXED={id:'MIX-CTFL-ASTFC',name:'Práctica comparativa CTFL v4.0 + AICS ASTFC',level:'Comparativa',difficulty:'Inicial',k:'Fundamentos',focus:'Conceptos compartidos de fundamentos de testing, SDLC, técnicas, defectos, riesgo y gestión básica.',url:'proveedores.html'};
const ROLE_TOPICS={
 'QA Jr Manual':['fundamentos de testing','diseño de casos','reporte de defectos','regresión','prioridad y severidad','pruebas exploratorias','criterios de aceptación','evidencia de prueba'],
 'QA Jr Automatización':['fundamentos de automatización','locators','assertions','Page Objects','Git','CI básico','Playwright/Selenium','datos de prueba'],
 'QA Mid Manual':['estrategia de pruebas','riesgo de producto','técnicas de diseño','pruebas exploratorias','SQL para validación','métricas','coordinación con desarrollo','release readiness'],
 'QA Mid Automatización':['arquitectura de automatización','Playwright/Selenium','API automation','CI/CD','mantenibilidad','flaky tests','datos de prueba','paralelización'],
 'QA Sr Manual':['estrategia basada en riesgo','estimación','calidad de requisitos','mentoría','métricas','release readiness','stakeholders','mejora de procesos'],
 'QA Sr Automatización':['frameworks escalables','testability','CI/CD avanzado','observabilidad','performance','arquitectura','quality gates','estrategia de automatización'],
 'QA Lead Manual':['estrategia QA','liderazgo','planificación','riesgos','KPIs','mejora de procesos','gestión de equipo','comunicación ejecutiva'],
 'QA Lead Automatización':['estrategia de automatización','ROI','arquitectura','gobernanza','CI/CD','quality gates','estándares','coaching técnico']
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
 const btn=el('startExam'),input=el('candidateName');
 if(!btn||!input)return;
 const ok=validFullName(input.value);
 btn.disabled=!ok;
 btn.setAttribute('aria-disabled',String(!ok));
 btn.title=ok?'':'Ingrese nombre y apellidos para comenzar.';
}
function stackModeConfig(){
 const raw=(dif?.value||'Básico|0').split('|');
 return {level:raw[0]||'Básico',minutes:Number(raw[1]||0)};
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
 const params=new URLSearchParams(location.search);
 const requested=params.get('cert');
 if(requested&&window.CERTIFICATIONS.some(c=>c.id===requested))provider.value=requested.startsWith('AICS-')?'AICS':'ISTQB';
 fillCerts(requested);
 let user=null;try{user=JSON.parse(localStorage.getItem('academyUser')||'null')}catch{}
 const savedName=localStorage.getItem('candidateName');el('candidateName').value=(savedName&&savedName!=='Participante'?savedName:(user?.name&&user.name!=='Participante'?user.name:''));
 mode.addEventListener('change',changeMode);
 provider.addEventListener('change',()=>fillCerts());
 simCert.addEventListener('change',updateCert);
 role.addEventListener('change',updateCert);
 simStack.addEventListener('change',updateCert);
 dif.addEventListener('change',updatePracticeMeta);
 examLang.addEventListener('change',updatePracticeMeta);
 el('startExam').addEventListener('click',start);el('candidateName').addEventListener('input',updateStartState);
 el('nextQ').addEventListener('click',nextQuestion);
 el('prevQ').addEventListener('click',prevQuestion);
 el('retryExam').addEventListener('click',retry);
 el('downloadCertificate').addEventListener('click',certificate);
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
 showEl(el('officialExamReadiness'),mode.value==='cert');
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
 list=window.CERTIFICATIONS.filter(c=>kind==='AICS'?c.id.startsWith('AICS-'):!c.id.startsWith('AICS-'));
 simCert.innerHTML='';list.forEach(c=>simCert.add(new Option(`${c.id} — ${c.name}`,c.id)));
 if(preselect&&list.some(c=>c.id===preselect))simCert.value=preselect;updateCert();
}


function updateSimulationHeading(){
 const h=document.querySelector('.page-hero h1');
 const p=document.querySelector('.page-hero p');
 if(!h||!currentCert)return;
 if(mode.value==='stack')h.textContent=`Simulación para ${currentCert.name}`;
 else if(mode.value==='interview')h.textContent=`Entrevista práctica · ${currentCert.name}`;
 else h.textContent=`Simulación para ${currentCert.name}`;
 if(p)p.textContent='Responda 40 preguntas del banco seleccionado y revise su resultado al finalizar.';
}

function updateCert(){
 if(mode.value==='interview'){
   currentCert={id:`JOB-${slug(role.value)}`,name:role.value,level:'Entrevista laboral',difficulty:'Por seniority',k:'Competencias del puesto',focus:(ROLE_TOPICS[role.value]||[]).join(', '),url:'empleos.html'};
   el('certMeta').innerHTML=`<b>${escapeHtml(role.value)}</b><span>Simulación de entrevista laboral</span><p>${escapeHtml(currentCert.focus)}</p>`;showEl(el('certMeta'),true);
   const link=el('officialExamLink');if(link){showEl(link,true);link.href='empleos.html';link.target='';link.textContent='Preparación de empleo';}updateSimulationHeading();updatePracticeMeta();return;
 }
 if(mode.value==='stack'){
   const st=window.QA_STACKS?.[simStack.value];currentCert={id:`STACK-${simStack.value}`,name:st?.name||'Stack QA',url:'academia.html#stacks'};
   el('certMeta').innerHTML=`<b>${escapeHtml(st?.name||'Stack QA')}</b><span>Evaluación de conocimientos del stack</span><p>${escapeHtml((st?.topics||[]).join(', '))}</p>`;showEl(el('certMeta'),true);
   const link=el('officialExamLink');if(link)showEl(link,false);updateSimulationHeading();updatePracticeMeta();return;
 }
 const baseCert=provider.value==='MIX'?MIXED:window.CERTIFICATIONS.find(c=>c.id===simCert.value);if(!baseCert)return;currentCert=baseCert;
 el('certMeta').innerHTML=`<b>${escapeHtml(currentCert.level)} · ${escapeHtml(currentCert.difficulty)}</b><span>${escapeHtml(currentCert.k||'')}</span><p>${escapeHtml(currentCert.focus)}</p>`;showEl(el('certMeta'),true);
 const link=el('officialExamLink');if(link){showEl(link,true);link.href=currentCert.url||'proveedores.html';link.target=currentCert.url?.startsWith('http')?'_blank':'';link.textContent=provider.value==='AICS'?'Información AICS ↗':provider.value==='MIX'?'Fuentes de certificación':'Material oficial ↗';}updateSimulationHeading();updatePracticeMeta();
}

function ctflSelected(){return mode.value==='cert' && provider.value==='ISTQB' && currentCert?.id==='CTFL';}
function ctalAtSelected(){return mode.value==='cert' && provider.value==='ISTQB' && currentCert?.id==='CTAL-AT';}
function advancedSyllabusSelected(){return mode.value==='cert' && ['CTAL-TA','CTAL-TAE','CTAL-TM','CTAL-TTA'].includes(currentCert?.id);}
function buildCtflBank(){
 const full=window.buildCtflSyllabusBank?.()||[];
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
 const full=window.buildCtalAtSyllabusBank?.()||[];
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
 const full=window.buildAdvancedSyllabusBank?.(currentCert.id)||[];
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

function buildCertificationBank(){
 if(ctflSelected())return buildCtflBank();
 if(ctalAtSelected())return buildCtalAtBank();
 if(advancedSyllabusSelected())return buildUploadedAdvancedBank();
 if(provider.value==='MIX'){const a=window.buildExamQuestionBank(window.CERTIFICATIONS.find(c=>c.id==='CTFL'),dif.value)||[];const b=window.buildExamQuestionBank(window.CERTIFICATIONS.find(c=>c.id==='AICS-ASTFC'),dif.value)||[];return localizeBank(shuffle(a).slice(0,60).concat(shuffle(b).slice(0,60)),examLang.value,currentCert);}
 const bank=window.buildExamQuestionBank(currentCert,dif.value)||[];return localizeBank(bank,examLang.value,currentCert);
}
function roleSeed(){return /Automatización/.test(role.value)?AUTO_Q:MANUAL_Q;}
function buildInterviewBank(){
 const seed=roleSeed(),topics=ROLE_TOPICS[role.value]||[],out=[],seen=new Set();
 for(let round=0;out.length<120;round++){
   const base=seed[round%seed.length],topic=topics[round%topics.length],scenario=SCENARIOS[Math.floor(round/seed.length)%SCENARIOS.length];
   let q=base[0];
   if(round>=seed.length){const lead=/Lead/.test(role.value),sr=/Sr|Lead/.test(role.value);const suffix=lead?' ¿Qué decisión permitiría al equipo mantener calidad y trazabilidad?':sr?' ¿Qué respuesta sería más sólida considerando riesgo y evidencia?':' ¿Cuál opción sería más adecuada?';q=`${q.replace(/\?$/,'')} ${scenario}${suffix}`;}
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
 if(mode.value==='stack'){
   const cfg=stackModeConfig(),stackTiming=cfg.minutes?`${cfg.minutes} min`:'sin cronómetro';
   el('practiceMeta').innerHTML=`<strong>Formato de práctica</strong><span>Banco: ${currentBankSize} preguntas · intento: 40 aleatorias · ${escapeHtml(cfg.level)} · ${stackTiming}</span>`;showEl(el('practiceMeta'),true);
   return;
 }
 const mins=DIFFICULTY_TIME[dif.value],timing=mins?`${mins} min`:'sin cronómetro';
 el('practiceMeta').innerHTML=`<strong>Formato de práctica</strong><span>Banco: ${currentBankSize}+ preguntas · intento: 40 aleatorias · ${timing}</span>`;showEl(el('practiceMeta'),true);
}

function start(){
 clearInterval(tick);updateCert();
 const name=el('candidateName').value.trim();if(!validFullName(name)){updateStartState();return;}localStorage.setItem('candidateName',name);
 let bank=[];try{bank=buildBank()}catch(err){console.error(err);}
 const unique=[...new Map((bank||[]).map(q=>[q.q,q])).values()];
 const minRequired=mode.value==='stack'?40:100;
 if(unique.length<minRequired){el('practiceMeta').textContent=`No fue posible cargar un banco mínimo de ${minRequired} preguntas diferentes.`;return;}
 let pick=shuffle(unique).slice(0,40);
 const key=`lastExam:${currentCert.id}:${dif.value}:${examLang.value}`,last=sessionStorage.getItem(key);let sig=pick.map(q=>q.q).join('|');
 if(last===sig){pick=shuffle(unique).slice(0,40);sig=pick.map(q=>q.q).join('|');}
 sessionStorage.setItem(key,sig);qs=pick;responses=Array(40).fill(null);idx=0;examLocked=false;
 showEl(el('simConfig'),false);showEl(el('simResult'),false);showEl(el('simQuiz'),true);
 const minutes=mode.value==='stack'?stackModeConfig().minutes:DIFFICULTY_TIME[dif.value];
 if(minutes){left=minutes*60;renderTimer();tick=setInterval(()=>{if(examLocked)return;left--;renderTimer();if(left<=0){left=0;renderTimer();finish(true)}},1000);}
 else el('timer').textContent='Sin cronómetro';
 show();
}
function renderTimer(){const m=Math.floor(left/60),s=left%60;el('timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
function scoreNow(){return responses.reduce((sum,r,i)=>sum+(r===qs[i]?.c?1:0),0);}
function show(){
 const q=qs[idx];if(!q){finish(false);return;}const response=responses[idx];
 el('qCounter').textContent=`Pregunta ${idx+1} / 40`;el('liveScore').textContent=`${scoreNow()} correctas`;el('qDifficulty').textContent=q.d||dif.value;el('qText').textContent=q.q;el('quizProgress').style.width=`${((idx+1)/40)*100}%`;
 el('answers').innerHTML=q.a.map((a,i)=>`<button type="button" class="answer-btn" data-i="${i}">${String.fromCharCode(65+i)}. ${escapeHtml(a)}</button>`).join('');
 const buttons=[...document.querySelectorAll('.answer-btn')];buttons.forEach(b=>b.addEventListener('click',()=>answer(Number(b.dataset.i))));
 if(response!==null){buttons.forEach(b=>b.disabled=true);buttons[q.c]?.classList.add('correct');if(response!==q.c)buttons[response]?.classList.add('wrong');el('feedback').textContent=response===q.c?'Correcto.':`Respuesta correcta: ${String.fromCharCode(65+q.c)}.`;}else el('feedback').textContent='';
 el('prevQ').disabled=idx===0;el('nextQ').disabled=response===null;el('nextQ').textContent=idx===39?'Finalizar':'Siguiente →';
 if(mode.value!=='stack'&&DIFFICULTY_TIME[dif.value])renderTimer();
}
function answer(i){if(examLocked||left<0||responses[idx]!==null)return;responses[idx]=i;show();}
function nextQuestion(){if(examLocked||responses[idx]===null)return;if(idx>=39)finish(false);else{idx++;show();}}
function prevQuestion(){if(examLocked)return;if(idx>0){idx--;show();}}
function finish(timeout){
 if(examLocked&&el('simResult')&&!el('simResult').hidden)return;
 examLocked=true;clearInterval(tick);
 document.querySelectorAll('.answer-btn,#nextQ,#prevQ').forEach(b=>{b.disabled=true});
 showEl(el('simQuiz'),false);showEl(el('simResult'),true);
 const score=scoreNow(),pct=Math.round(score/40*100),passed=pct>=70;el('resultScore').textContent=`${score}/40 · ${pct}%`;
 let advice=timeout?'El tiempo finalizó. Revise sus áreas de mejora y vuelva a practicar.':passed?'Buen resultado de práctica. Continúe contrastando con fuentes oficiales o requisitos reales del puesto.':'Revise los temas con más errores antes del siguiente intento.';
 if(mode.value==='cert'&&dif.value==='Difícil'){const key=`readiness:${currentCert.id}`;let hist=[];try{hist=JSON.parse(localStorage.getItem(key)||'[]')}catch{}hist.push({score:pct,date:new Date().toISOString()});hist=hist.slice(-50);localStorage.setItem(key,JSON.stringify(hist));const strong=hist.filter(x=>x.score>=90).length;advice+=` Meta interna antes de pagar: ${Math.min(strong,11)}/11 intentos Difícil con 90% o más.`;}
 if(mode.value==='stack')advice=`Resultado del stack ${currentCert.name} · nivel ${dif.value}. Use las áreas con errores como guía de estudio.`;
 el('resultAdvice').textContent=advice;el('downloadCertificate').hidden=!passed;el('simResult')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function retry(){examLocked=false;clearInterval(tick);showEl(el('simResult'),false);showEl(el('simQuiz'),false);showEl(el('simConfig'),true);updatePracticeMeta();updateStartState();}
function certificate(){
 const name=el('candidateName').value.trim(),score=scoreNow(),pct=Math.round(score/40*100);if(pct<70)return;
 const title='Certificado de aprovechamiento';
 const activity=mode.value==='interview'?`Simulación de entrevista laboral ${role.value}`:mode.value==='stack'?`Simulación de conocimientos · ${currentCert.name}`:`Simulación de examen · ${currentCert.name}`;
 if(typeof window.downloadStyledCertificatePdf==='function')window.downloadStyledCertificatePdf(`certificado-${slug(name)}.pdf`,{title,name,activity,result:`Resultado obtenido: ${score}/40 · ${pct}%`,date:new Date()});
 else downloadSimplePdf(`certificado-${slug(name)}.pdf`,[title,name,activity,`Resultado: ${score}/40`,new Date().toLocaleDateString()]);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
