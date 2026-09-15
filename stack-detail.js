(function(){
 const id=new URLSearchParams(location.search).get('id')||'manual';
 const data=window.STACK_DETAIL_DATA?.[id]||window.STACK_DETAIL_DATA?.manual;if(!data)return;
 const projects={
  webauto:['Suite E2E mantenible','Automatice login + compra con Page Objects/componentes, datos externos, evidencias de fallo y ejecución CI en al menos dos navegadores.'],
  api:['API de pedidos','Diseñe una colección/suite con positivos, negativos, autorización, schema/contrato e idempotencia; publique reporte y riesgos encontrados.'],
  performance:['Baseline de rendimiento','Modele carga, ejecute una prueba controlada con JMeter o k6, defina thresholds y entregue percentiles, errores, hallazgos y recomendaciones.'],
  data:['Validación end-to-end de datos','Valide reglas UI/API/BD, integridad, transacciones y consultas SQL; documente casos, evidencias y riesgos de datos.'],
  devops:['Pipeline de calidad','Cree un pipeline que ejecute smoke tests, publique artefactos y aplique un quality gate documentado.'],
  mobile:['Flujo móvil crítico','Automatice o documente un flujo Android/iOS incluyendo permisos, cambio de red, segundo plano y evidencia en dispositivo real/cloud.'],
  accessibility:['Auditoría accesible','Evalúe una página con teclado, foco, semántica y axe-core; clasifique hallazgos y documente cuáles requieren validación humana.'],
  testmanagement:['Release gestionado','Modele requisitos, casos, ejecución, defectos, cobertura y un dashboard de release readiness en la herramienta elegida.'],
  cloudobservability:['Diagnóstico cloud-native','Despliegue un servicio de práctica en contenedores, provoque un fallo controlado y correlacione logs, métricas/trazas para explicar causa y riesgo.'],
  salesforce:['Proceso CRM probado','Diseñe pruebas para un flujo Salesforce con permisos, Flow/Apex o integración, datos, regresión y evidencia de UAT.'],
  'jira-confluence':['Espacio QA trazable','Construya en Jira/Confluence un mini release con historia, casos, bug, JQL, evidencia y página de decisión de calidad.'],
  'oracle-apex':['Aplicación APEX validada','Pruebe una página APEX incluyendo sesión, validaciones, autorización, SQL/persistencia, responsive y regresión.']
 };
 document.title=`${data.name} | QA Learning Hub`;
 document.getElementById('stackTitle').textContent=data.name;
 document.getElementById('stackIntro').textContent=data.intro;
 document.getElementById('practiceStack').href=`simuladores.html?mode=stack&stack=${encodeURIComponent(id)}`;
 const lessons=document.getElementById('stackLessons');
 const hasProject=data.lessons.some(x=>/mini proyecto|proyecto de cierre/i.test(x[0]));
 let html=data.lessons.map((x,i)=>`<article class="lesson-block"><div class="lesson-num">${i+1}</div><div><h2>${x[0]}</h2><p>${x[1]}</p><div class="lesson-example"><strong>Aplicación en QA</strong><p>${x[2]}</p></div>${id==='mobile'&&i===0&&data.video?`<div class="browserstack-inline-video"><strong>Video recomendado</strong><p>${data.video.title}</p><a class="btn primary small" href="${data.video.url}" target="_blank" rel="noopener">▶ Ver video de BrowserStack en YouTube ↗</a></div>`:''}</div></article>`).join('');
 if(!hasProject){const pr=projects[id]||['Mini proyecto de cierre',`Integre los conceptos principales de ${data.name} en una práctica pequeña, reproducible y documentada que pueda incorporar a su portafolio.`];html+=`<article class="mini-project-card"><span class="project-badge">Proyecto de cierre</span><h2>${pr[0]}</h2><p>${pr[1]}</p><ul><li>Defina objetivo, alcance y riesgos.</li><li>Incluya evidencia reproducible y resultados.</li><li>Documente hallazgos, decisiones y mejoras.</li><li>Prepare un README breve para portafolio.</li></ul></article>`;}
 if(data.resources)html+=`<article class="lesson-resources"><h2>Recursos recomendados</h2><div class="resource-links">${data.resources.filter(r=>!(id==='mobile'&&/video browserstack/i.test(r[0]))).map(r=>`<a href="${r[1]}" target="_blank" rel="noopener">${r[0]} ↗</a>`).join('')}</div></article>`;
 lessons.innerHTML=html; window.applyTranslations?.(localStorage.getItem('lang')||'es');
})();
