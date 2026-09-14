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
  grid.innerHTML=list.map(c=>`<article class="cert-card"><div class="cert-top"><span class="badge">${escapeHtml(c.level)}</span><span class="status">${escapeHtml(c.status)}</span></div><h2>${escapeHtml(c.name)}</h2><p>${escapeHtml(c.focus)}</p><div class="cert-meta cert-meta-compact"><span><b>Dificultad</b>${escapeHtml(c.difficulty)}</span><span><b>Examen</b>${escapeHtml(c.exam)}</span></div><div class="card-actions"><a class="btn primary small" href="simuladores.html?cert=${encodeURIComponent(c.id)}">Practicar</a><a class="btn secondary small" href="ruta-certificacion.html?cert=${encodeURIComponent(c.id)}">Capacitación →</a>${c.id.startsWith('AICS')?`<a class="btn secondary small" href="${c.url}" target="_blank" rel="noopener">Fuente oficial ↗</a>`:`<a class="btn syllabus-btn small" href="${ISTQB_SYLLABUS_URLS[c.id]||c.url}" target="_blank" rel="noopener">Ver syllabus ↗</a>`}<button class="btn secondary small add-cert-cart" type="button" data-course="Preparación ${escapeHtml(c.id)} — ${escapeHtml(c.name)}">Agregar al carrito</button></div></article>`).join('')||'<div class="empty-state"><h2>Sin resultados</h2><p>Cambie los filtros o la búsqueda.</p></div>';
  $$('.add-cert-cart',grid).forEach(b=>b.addEventListener('click',()=>{addAcademyCourseToCart(b.dataset.course);const status=$('#certCartStatus');if(status){status.hidden=true;status.textContent=''}}));
  updateAcademyCartCount();window.applyTranslations?.();
}
[search,lf,df].filter(Boolean).forEach(x=>x.addEventListener('input',renderAcademy));renderAcademy();

function renderLearningPaths(){
 const el=$('#learningPathGrid');if(!el)return;
 const paths=(window.LEARNING_PATHS||[]).filter(x=>x.id!=='academybugs-practice').map(x=>({...x,_kind:'learning'}));
 const competencies=(window.QA_COMPETENCY_PATHS||[]).filter(x=>x.id!=='medical-device-samd').map(x=>({...x,duration:x.duration||'Autodirigido',_kind:'competency'}));
 const all=[...paths,...competencies,...STACK_LEARNING.map(x=>({...x,_kind:'stack',duration:'Autodirigido'}))];
 el.innerHTML=all.map(x=>{
   if(x._kind==='stack'){
     return `<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Stack QA</span><span class="status">${escapeHtml(x.level)}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>Autodirigido</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions"><a class="btn primary small" href="${x.id==='data'?'qa-bases-datos.html':`stack-detalle.html?id=${encodeURIComponent(x.id)}`}">Aprender más →</a><a class="btn secondary small" href="simuladores.html?mode=stack&stack=${encodeURIComponent(x.id)}">Practicar</a></div></article>`;
   }
   if(x._kind==='competency'){
     const href='competencia.html?id='+encodeURIComponent(x.id);
     return `<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Competencia QA</span><span class="status">${escapeHtml(x.level)}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>${escapeHtml(x.duration)}</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions"><a class="btn primary small" href="${href}">Aprender más →</a></div></article>`;
   }
   const game=x.id==='game-qa',virtuoso=x.id==='virtuoso-qa',utest=x.id==='utest-academy',academybugs=x.id==='academybugs-practice',visual=x.id==='visual-ai',english=x.id==='english-qa',robotics=x.id==='robotics-qa',aviation=x.id==='aviation-qa',auditor=x.id==='software-auditor',contentqa=x.id==='content-marketing-qa',paymentqa=x.id==='payment-gateway-qa',processqa=x.id==='qa-process-improvement',claude=x.id==='claude-academy';
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
   else if(claude){cta=`<a class="btn primary small" href="claude-learning-path.html">Aprender más →</a>`;status='Gratis · oficial';}
   else cta=`<button class="btn primary small add-academy-cart" type="button" data-course="${escapeHtml(x.name)}">Agregar al carrito</button>`;
   return `<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Learning Path</span><span class="status">${status}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>${escapeHtml(x.duration)}</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions">${cta}</div></article>`;
 }).join('');
 window.applyTranslations?.();
}

const STACK_LEARNING=[
 {id:"manual",name:"QA Manual Web & Mobile",level:"Inicial",modules:["Requisitos y criterios","Caja negra y exploración","Web responsive y mobile","Riesgo, evidencia y reporte de defectos"],desc:"Pruebas funcionales y exploratorias de aplicaciones web y móviles."},
 {id:"webauto",name:"Playwright / Cypress / Selenium",level:"Intermedio",modules:["Selección de framework y arquitectura","Locators, assertions y sincronización","Page Object Model y reutilización","Cross-browser con BrowserStack","Selenium con Maven/Gradle","CI/CD y reportes"],desc:"Automatización web mantenible con Playwright, Cypress y Selenium, integrada a build tools, cross-browser y pipelines."},
 {id:"api",name:"API Quality Engineering",level:"Intermedio",modules:["REST, HTTP y contratos","GraphQL y validación de schemas","Microservicios, resiliencia e idempotencia","Postman y Karate","Contract testing con Pact","Automatización API en CI/CD"],desc:"Pruebas de REST, GraphQL y microservicios con automatización, contratos y validación de reglas de negocio."},
 {id:"performance",name:"JMeter + k6 + Lighthouse CI",level:"Intermedio",modules:["Modelo de carga","JMeter Test Plans","k6 tests-as-code","Lighthouse CI para rendimiento web","Percentiles, throughput y thresholds","CI/CD y observabilidad"],desc:"Performance QA para backend y web con JMeter, k6 y Lighthouse CI, métricas, thresholds y quality gates."},
 {id:"data",name:"QA de Bases de Datos · SQL + NoSQL",level:"Intermedio",modules:["Fundamentos de persistencia","SQL relacional","NoSQL documental","Integridad y esquema","Transacciones y concurrencia","UI/API/BD end-to-end","Seguridad, índices y rendimiento"],desc:"Quality Assurance para bases relacionales y no relacionales: SQL Server, PostgreSQL, MySQL, Oracle, MongoDB, Firestore y SQLite."},
 {id:"devops",name:"CI/CD para QA · Jenkins + GitHub Actions + GitLab CI + Azure DevOps",level:"Intermedio",modules:["Git y estrategia de ramas","Jenkins pipelines","GitHub Actions","GitLab CI/CD","Azure DevOps Pipelines","Quality gates, artefactos y trazabilidad"],desc:"Integración de QA en pipelines modernos con ejecución automatizada, quality gates y evidencia trazable."},
 {id:"mobile",name:"Appium + BrowserStack",level:"Intermedio",modules:["Android/iOS y tipos de app","Appium, locators y capacidades","Permisos, gestos e interrupciones","Dispositivos reales y BrowserStack","Matrices, paralelización y evidencia","Mobile automation en CI/CD"],desc:"Testing móvil automatizado con Appium, dispositivos reales, Android/iOS y ejecución cloud."},
 {id:"accessibility",name:"axe-core + WCAG · Accessibility Testing",level:"Intermedio",modules:["WCAG y criterios verificables","Teclado, foco y semántica","Contraste, texto alternativo y formularios","axe-core y automatización asistida","Lectores de pantalla y validación humana","Accesibilidad en CI/CD"],desc:"Accesibilidad web combinando WCAG, axe-core, automatización asistida y validación humana."},
 {id:"testmanagement",name:"Test Management · Jira + Xray + TestRail + Zephyr",level:"Inicial–Avanzado",modules:["Estrategia y ciclo de gestión de pruebas","Jira para defectos y trazabilidad","Xray para pruebas dentro de Jira","Zephyr para planificación y ejecución","TestRail para suites, runs y reportes","Métricas, cobertura y release readiness"],desc:"Ruta orientada a herramientas de gestión de pruebas para planificar, ejecutar, trazar y reportar calidad."},
 {id:"cloudobservability",name:"Cloud QA · Docker + Kubernetes + Observabilidad",level:"Avanzado",modules:["Contenedores con Docker","Kubernetes para ambientes de prueba","Logs, métricas y trazas","Observabilidad con OpenTelemetry","Pruebas en sistemas distribuidos","Diagnóstico de fallos y quality gates"],desc:"Ruta para QA/SDET que necesita validar sistemas cloud-native, contenedores y evidencia operacional."},
 {id:"salesforce",name:"Salesforce QA",level:"Intermedio–Avanzado",modules:["CRM, objetos y metadata","Sandboxes y datos","Roles, perfiles y permission sets","Flows y automatizaciones","Apex tests","LWC + Jest","APIs e integraciones","UAT, releases y regresión"],desc:"Ruta completa para probar configuración, seguridad, automatizaciones, Apex, Lightning y procesos de negocio."},
 {id:"jira-confluence",name:"Jira + Confluence para QA",level:"Inicial–Intermedio",modules:["Jira: work items, boards y workflows","Bugs y trazabilidad","Buscar con JQL","Confluence: documentación y evidencias","Filtros, reportes y colaboración"],desc:"Ruta para gestionar defectos, búsquedas avanzadas con JQL, trazabilidad y documentación QA con Atlassian."},
 {id:"oracle-apex",name:"Oracle APEX QA",level:"Inicial–Intermedio",modules:["Qué es Oracle APEX","App Builder y Page Designer","SQL Workshop y datos","Autenticación y autorización","Validaciones y procesos","UI, accesibilidad y responsive","APIs e integraciones","Regresión y despliegues"],desc:"Ruta para comprender Oracle APEX y diseñar pruebas funcionales, de datos, seguridad, accesibilidad e integración."}
]
function renderStackLearning(){
 const el=$('#stackLearningGrid');if(!el)return;
 el.innerHTML=STACK_LEARNING.map(x=>`<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Stack QA</span><span class="status">${escapeHtml(x.level)}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>Autodirigido</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions"><a class="btn primary small" href="${x.id==='data'?'qa-bases-datos.html':`stack-detalle.html?id=${encodeURIComponent(x.id)}`}">Aprender más →</a><a class="btn secondary small" href="simuladores.html?mode=stack&stack=${encodeURIComponent(x.id)}">Practicar</a></div></article>`).join('');
}

function renderIndustry(){const el=$('#industryGrid');if(!el)return;el.innerHTML=window.INDUSTRY_PATHS.map(x=>`<article class="industry-card"><h3>${escapeHtml(x.sector)}</h3><p><b>Lenguajes:</b> ${escapeHtml(x.languages)}</p><p><b>Herramientas:</b> ${escapeHtml(x.tools)}</p><p><b>Enfoque:</b> ${escapeHtml(x.focus)}</p><a class="text-link" href="${x.url}" target="_blank" rel="noopener">Referencia ↗</a></article>`).join('');window.applyTranslations?.();}
function resourceCard(x){return `<article class="resource-card"><span class="badge">${escapeHtml(x.type)}</span><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.desc)}</p><a class="btn ghost small" href="${x.url}" target="_blank" rel="noopener">Abrir recurso ↗</a></article>`}
function renderLibrary(){if($('#ebookGrid'))$('#ebookGrid').innerHTML=window.EBOOKS.map(resourceCard).join('');if($('#magazineGrid'))$('#magazineGrid').innerHTML=window.MAGAZINES.map(resourceCard).join('');if($('#researchGrid'))$('#researchGrid').innerHTML=(window.RESEARCH_REPOSITORIES||[]).map(resourceCard).join('');window.applyTranslations?.();}
renderLearningPaths();renderIndustry();renderLibrary();

window.addEventListener('languagechange',()=>{renderAcademy();renderLearningPaths();renderIndustry();renderLibrary();});


function renderExternalCertifications(){
 const el=$('#externalCertGrid');if(!el)return;
 const baseIds=new Set((window.CERTIFICATIONS||[]).map(c=>c.id));
 const items=(window.PRO_CREDENTIAL_PATHS||[]).filter(x=>{const text=(x.name||'').toUpperCase();return ![...baseIds].some(id=>text.includes(id.toUpperCase()));});
 el.innerHTML=items.map(x=>`<article class="cert-card credential-card"><div class="cert-top"><span class="badge">Certificación externa</span><span class="status">${escapeHtml(x.provider)}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="cert-meta"><span><b>Nivel</b>${escapeHtml(x.level)}</span><span><b>Modalidad</b>${escapeHtml(x.duration)}</span><span><b>Áreas</b>${x.modules.length}</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol>${x.freeTraining?`<div class="free-training-box"><span class="badge">Capacitación gratuita</span><h3>${escapeHtml(x.freeTraining.name)}</h3><p>${escapeHtml(x.freeTraining.note)}</p><a class="btn ghost small" href="${x.freeTraining.url}" target="_blank" rel="noopener">Abrir capacitación gratis ↗</a></div>`:''}<div class="card-actions"><a class="btn primary small" href="${x.url}" target="_blank" rel="noopener">Ver certificación ↗</a><button class="btn secondary small add-external-cert-cart" type="button" data-course="Preparación ${escapeHtml(x.name)}">Agregar al carrito</button></div></article>`).join('');
 $$('.add-external-cert-cart',el).forEach(b=>b.addEventListener('click',()=>{addAcademyCourseToCart(b.dataset.course);const status=$('#certCartStatus');if(status){status.hidden=true;status.textContent=''}}));
}
renderExternalCertifications();
