const ISTQB_SYLLABUS_URLS={"CTFL": "https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf", "CTAL-AT":"https://istqb.org/certifications/certified-tester-advanced-level-agile-tester-ctal-at/", "CTAL-TA": "https://www.istqb.org/wp-content/uploads/sdm-uploads/ISTQB-CTAL-TA-Syllabus-v4.0-EN.pdf", "CTAL-TAE": "https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTAL-TAE_Syllabus_v2.0.pdf", "CTAL-TM": "https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTAL-TM_Syllabus_v3.0_zKjKsaN.pdf", "CTAL-TTA": "https://www.istqb.org/wp-content/uploads/2024/11/ISTQB-CTAL-TTA_Syllabus_v4.0.pdf", "CT-AI": "https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf", "CT-MBT": "https://istqb.org/wp-content/uploads/2024/11/ISTQB_CT-MBT_-_Syllabus_Version_v1.1.pdf", "CT-ATLaS": "https://www.istqb.org/wp-content/uploads/2024/11/ISTQB_CT-ATLaS_Syllabus_v2.0.pdf", "CT-GaMe": "https://istqb.org/wp-content/uploads/2024/11/ISTQB_CT_GaMe_Syllabus_v1.0.1_LtrKuyi.pdf"};
const grid=$('#academyGrid'),search=$('#certSearch'),lf=$('#levelFilter'),df=$('#difficultyFilter');
function coursePayLink(name){return `pago.html?course=${encodeURIComponent(name)}`}
function academyCartItems(){try{return JSON.parse(localStorage.getItem('selectedAcademyCourses')||'[]')}catch{return[]}}
function updateAcademyCartCount(){const el=$('#academyCartCount');if(el)el.textContent=academyCartItems().length}
function addAcademyCourseToCart(name){
 const items=academyCartItems();if(!items.includes(name))items.push(name);
 localStorage.setItem('selectedAcademyCourses',JSON.stringify(items));updateAcademyCartCount();window.updateGlobalCart?.();
 const status=$('#academyCartStatus');if(status){status.hidden=false;status.textContent=`${name} agregado al carrito.`}
}

function renderAcademy(){
  const q=(search?.value||'').toLowerCase(),lev=lf?.value||'',dif=df?.value||'';
  const list=window.CERTIFICATIONS.filter(c=>{const levelMatch=!lev||c.level===lev||(lev==='Foundation'&&c.id==='AICS-ASTFC');return levelMatch&&(!dif||c.difficulty===dif)&&(!q||[c.id,c.name,c.focus,c.level].join(' ').toLowerCase().includes(q));});
  if(!grid)return;
  grid.innerHTML=list.map(c=>`<article class="cert-card"><div class="cert-top"><span class="badge">${escapeHtml(c.level)}</span><span class="status">${escapeHtml(c.status)}</span></div><h2>${escapeHtml(c.name)}</h2><p>${escapeHtml(c.focus)}</p><div class="cert-meta"><span><b>Dificultad</b>${escapeHtml(c.difficulty)}</span><span><b>Nivel</b>${escapeHtml(c.k)}</span><span><b>Examen</b>${escapeHtml(c.exam)}</span></div><div class="card-actions"><a class="btn primary small" href="simuladores.html?cert=${encodeURIComponent(c.id)}">Practicar</a><a class="btn secondary small" href="${c.id==='CTFL'?'ctfl-v4.html':'ruta-certificacion.html?cert='+encodeURIComponent(c.id)}">Ver ruta →</a>${c.id.startsWith('AICS')?'':`<a class="btn syllabus-btn small" href="${ISTQB_SYLLABUS_URLS[c.id]||c.url}" target="_blank" rel="noopener">Ver syllabus ↗</a>`}<a class="btn secondary small" href="${c.url}" target="_blank" rel="noopener">Fuente oficial ↗</a><button class="btn secondary small add-cert-cart" type="button" data-course="Preparación ${escapeHtml(c.id)} — ${escapeHtml(c.name)}">Agregar al carrito</button></div></article>`).join('')||'<div class="empty-state"><h2>Sin resultados</h2><p>Cambie los filtros o la búsqueda.</p></div>';
  $$('.add-cert-cart',grid).forEach(b=>b.addEventListener('click',()=>{
    addAcademyCourseToCart(b.dataset.course);
    const status=$('#certCartStatus');if(status){status.hidden=false;status.textContent='Preparación agregada al carrito.'}
  }));
  updateAcademyCartCount();window.applyTranslations?.();
}
[search,lf,df].filter(Boolean).forEach(x=>x.addEventListener('input',renderAcademy));renderAcademy();

function renderLearningPaths(){
 const el=$('#learningPathGrid');if(!el)return;
 const paths=(window.LEARNING_PATHS||[]).map(x=>({...x,_kind:'learning'}));
 const competencies=(window.QA_COMPETENCY_PATHS||[]).map(x=>({...x,duration:x.duration||'Autodirigido',_kind:'competency'}));
 const all=[...paths,...competencies,...STACK_LEARNING.map(x=>({...x,_kind:'stack',duration:'Autodirigido'}))];
 el.innerHTML=all.map(x=>{
   if(x._kind==='stack'){
     return `<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Stack QA</span><span class="status">${escapeHtml(x.level)}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>Autodirigido</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions"><a class="btn primary small" href="stack-detalle.html?id=${encodeURIComponent(x.id)}">Aprender más →</a><a class="btn secondary small" href="simuladores.html?mode=stack&stack=${encodeURIComponent(x.id)}">Practicar</a></div></article>`;
   }
   if(x._kind==='competency'){
     const href='competencia.html?id='+encodeURIComponent(x.id);
     return `<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Competencia QA</span><span class="status">${escapeHtml(x.level)}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>${escapeHtml(x.duration)}</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions"><a class="btn primary small" href="${href}">Aprender más →</a></div></article>`;
   }
   const game=x.id==='game-qa',virtuoso=x.id==='virtuoso-qa',utest=x.id==='utest-academy',academybugs=x.id==='academybugs-practice',visual=x.id==='visual-ai',english=x.id==='english-qa',robotics=x.id==='robotics-qa',aviation=x.id==='aviation-qa',auditor=x.id==='software-auditor',contentqa=x.id==='content-marketing-qa',paymentqa=x.id==='payment-gateway-qa',processqa=x.id==='qa-process-improvement';
   let cta,status='US$5 + IVA';
   if(game){cta=`<a class="btn primary small" href="https://frecuenciagamer.com/nuestros-cursos/qa-testing-para-videojuegos/" target="_blank" rel="noopener">Ir a Frecuencia Gamer ↗</a>`;status='Recurso externo';}
   else if(virtuoso){cta=`<a class="btn primary small" href="https://training.virtuosoqa.com/library/" target="_blank" rel="noopener">Abrir Virtuoso Training ↗</a>`;status='Training oficial';}
   else if(utest){cta=`<a class="btn primary small" href="https://www.utest.com/academy" target="_blank" rel="noopener">Abrir uTest Academy ↗</a>`;status='Gratis · externo';}
   else if(academybugs){cta=`<a class="btn primary small" href="https://academybugs.com/" target="_blank" rel="noopener">Abrir AcademyBugs ↗</a>`;status='Gratis · práctica externa';}
   else if(visual){cta=`<a class="btn primary small" href="qa-imagenes-ia.html">Aprender más →</a>`;status='Ruta interna';}
   else if(english){cta=`<a class="btn primary small" href="ingles-qa.html">Aprender más →</a>`;status='Gratis';}
   else if(robotics){cta=`<a class="btn primary small" href="qa-robotica.html">Aprender más →</a>`;status='Gratis';}
   else if(aviation){cta=`<a class="btn primary small" href="qa-aviacion.html">Aprender más →</a>`;status='Gratis';}
   else if(auditor){cta=`<a class="btn primary small" href="qa-auditor-software.html">Aprender más →</a>`;status='Gratis';}
   else if(contentqa){cta=`<a class="btn primary small" href="qa-contenido-marketing.html">Aprender más →</a>`;status='Gratis';}
   else if(paymentqa){cta=`<a class="btn primary small" href="qa-pasarelas-pago.html">Aprender más →</a>`;status='Gratis';}
   else if(processqa){cta=`<a class="btn primary small" href="qa-mejora-procesos.html">Aprender más →</a>`;status='Gratis';}
   else cta=`<button class="btn primary small add-academy-cart" type="button" data-course="${escapeHtml(x.name)}">Agregar al carrito</button>`;
   return `<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Learning Path</span><span class="status">${status}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>${escapeHtml(x.duration)}</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions">${cta}</div></article>`;
 }).join('');
 window.applyTranslations?.();
}

const STACK_LEARNING=[
 {id:"manual",name:"QA Manual Web & Mobile",level:"Inicial",modules:["Requisitos y criterios","Caja negra","Exploración","Web responsive y mobile"],desc:"Pruebas funcionales y exploratorias de aplicaciones web y móviles."},
 {id:"webauto",name:"Playwright / Cypress / Selenium",level:"Intermedio",modules:["Locators","Assertions","Page Objects","Cross-browser y CI/CD"],desc:"Automatización web mantenible con frameworks actuales."},
 {id:"api",name:"API Quality Engineering",level:"Intermedio",modules:["HTTP y contratos","Auth","Negativos","Automatización y CI"],desc:"Pruebas de servicios y reglas de negocio a nivel API."},
 {id:"performance",name:"JMeter + k6 · Performance QA",level:"Intermedio",modules:["Modelo de carga","JMeter Test Plans","k6 tests-as-code","Percentiles y throughput","Thresholds","CI/CD y observabilidad"],desc:"Ruta unificada de Performance QA con JMeter y k6 para carga, estrés, endurance, métricas y quality gates."},
 {id:"data",name:"SQL Server + PL/SQL",level:"Intermedio",modules:["SQL","Integridad","Transacciones","Procedimientos"],desc:"QA de datos y persistencia en SQL Server y Oracle."},
 {id:"devops",name:"Azure DevOps / TFS + Git + CI/CD",level:"Intermedio",modules:["Work items","Repositorios","Pipelines","Quality gates"],desc:"Integración de QA con entrega continua y trazabilidad."},
 {id:"mobile",name:"Appium + BrowserStack",level:"Intermedio",modules:["Dispositivos","Permisos","Gestos","Cloud testing"],desc:"Testing móvil automatizado y matrices de dispositivos."},
 {id:"accessibility",name:"WCAG + Accessibility Testing",level:"Intermedio",modules:["Teclado","Semántica","Contraste","Automatización asistida"],desc:"Detección de barreras de accesibilidad con validación humana."},
 {id:"salesforce",name:"Salesforce QA",level:"Intermedio–Avanzado",modules:["CRM, objetos y metadata","Sandboxes y datos","Roles, perfiles y permission sets","Flows y automatizaciones","Apex tests","LWC + Jest","APIs e integraciones","UAT, releases y regresión"],desc:"Ruta completa para comprender Salesforce y probar configuración, seguridad, automatizaciones, Apex, Lightning y procesos de negocio."},
 {id:"aiqa",name:"AI-assisted QA & Agents",level:"Intermedio–Avanzado",modules:["Prompts","Generación de pruebas","Evidencia visual","Agentes y Human-in-the-Loop"],desc:"Uso responsable de IA para potenciar Quality Engineering."},
 {id:"jira-confluence",name:"Jira + Confluence para QA",level:"Inicial–Intermedio",modules:["Jira: work items, boards y workflows","Bugs y trazabilidad","Confluence: documentación y evidencias","Filtros, reportes y colaboración"],desc:"Ruta para gestionar defectos, trabajo de pruebas, trazabilidad y documentación QA con Atlassian."},
 {id:"oracle-apex",name:"Oracle APEX QA",level:"Inicial–Intermedio",modules:["Qué es Oracle APEX","App Builder y Page Designer","SQL Workshop y datos","Autenticación y autorización","Validaciones y procesos","UI, accesibilidad y responsive","APIs e integraciones","Regresión y despliegues"],desc:"Ruta para comprender Oracle APEX y diseñar pruebas funcionales, de datos, seguridad, accesibilidad e integración."}
];
function renderStackLearning(){
 const el=$('#stackLearningGrid');if(!el)return;
 el.innerHTML=STACK_LEARNING.map(x=>`<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Stack QA</span><span class="status">${escapeHtml(x.level)}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>Autodirigido</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions"><a class="btn primary small" href="stack-detalle.html?id=${encodeURIComponent(x.id)}">Aprender más →</a><a class="btn secondary small" href="simuladores.html?mode=stack&stack=${encodeURIComponent(x.id)}">Practicar</a></div></article>`).join('');
}

function renderIndustry(){const el=$('#industryGrid');if(!el)return;el.innerHTML=window.INDUSTRY_PATHS.map(x=>`<article class="industry-card"><h3>${escapeHtml(x.sector)}</h3><p><b>Lenguajes:</b> ${escapeHtml(x.languages)}</p><p><b>Herramientas:</b> ${escapeHtml(x.tools)}</p><p><b>Enfoque:</b> ${escapeHtml(x.focus)}</p><a class="text-link" href="${x.url}" target="_blank" rel="noopener">Referencia ↗</a></article>`).join('');window.applyTranslations?.();}
function resourceCard(x){return `<article class="resource-card"><span class="badge">${escapeHtml(x.type)}</span><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.desc)}</p><a class="btn ghost small" href="${x.url}" target="_blank" rel="noopener">Abrir recurso ↗</a></article>`}
function renderLibrary(){if($('#ebookGrid'))$('#ebookGrid').innerHTML=window.EBOOKS.map(resourceCard).join('');if($('#magazineGrid'))$('#magazineGrid').innerHTML=window.MAGAZINES.map(resourceCard).join('');if($('#researchGrid'))$('#researchGrid').innerHTML=(window.RESEARCH_REPOSITORIES||[]).map(resourceCard).join('');window.applyTranslations?.();}
renderLearningPaths();renderIndustry();renderLibrary();

window.addEventListener('languagechange',()=>{renderAcademy();renderLearningPaths();renderIndustry();renderLibrary();});


function renderExternalCertifications(){
 const el=$('#externalCertGrid');if(!el)return;
 const baseIds=new Set((window.CERTIFICATIONS||[]).map(c=>c.id));
 const items=(window.PRO_CREDENTIAL_PATHS||[]).filter(x=>{
   const text=(x.name||'').toUpperCase();
   return ![...baseIds].some(id=>text.includes(id.toUpperCase()));
 });
 el.innerHTML=items.map(x=>`<article class="cert-card credential-card"><div class="cert-top"><span class="badge">Certificación externa</span><span class="status">${escapeHtml(x.provider)}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="cert-meta"><span><b>Nivel</b>${escapeHtml(x.level)}</span><span><b>Modalidad</b>${escapeHtml(x.duration)}</span><span><b>Áreas</b>${x.modules.length}</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions"><a class="btn primary small" href="${x.url}" target="_blank" rel="noopener">Ver certificación ↗</a><button class="btn secondary small add-external-cert-cart" type="button" data-course="Preparación ${escapeHtml(x.name)}">Agregar al carrito</button></div></article>`).join('');
 const externalCertCartHandlers=true;
 $$('.add-external-cert-cart',el).forEach(b=>b.addEventListener('click',()=>{
   addAcademyCourseToCart(b.dataset.course);
   const status=$('#certCartStatus');if(status){status.hidden=false;status.textContent='Preparación agregada al carrito.'}
 }));

}
renderExternalCertifications();
