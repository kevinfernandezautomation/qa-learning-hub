
(function(){
const resources={
"programming-qa":[
 {t:"C# para utilidades y automatización",d:"Aprenda tipos, colecciones, clases, excepciones, LINQ y consumo HTTP para crear utilidades y automatizaciones QA.",r:["https://learn.microsoft.com/dotnet/csharp/"]},
 {t:"JavaScript para testing web",d:"Comprenda variables, funciones, objetos, promesas, async/await, módulos y manipulación de datos, base para Playwright y Cypress.",r:["https://developer.mozilla.org/docs/Web/JavaScript"]},
 {t:"Java para Selenium y frameworks",d:"Domine POO, colecciones, excepciones, Maven/Gradle y patrones reutilizables para Selenium, TestNG o JUnit.",r:["https://dev.java/learn/","https://www.selenium.dev/documentation/"]},
 {t:"Python para Pytest, API y automatización",d:"Practique funciones, clases, entornos virtuales, requests, fixtures y Pytest para API y automatización.",r:["https://docs.python.org/3/tutorial/","https://docs.pytest.org/"]}
],
"databases-qa":[
 {t:"SQL Server y T-SQL",d:"SELECT, JOIN, agregaciones, constraints y validaciones de datos para contrastar UI/API con base de datos.",r:["https://learn.microsoft.com/sql/"]},
 {t:"PL/SQL y Oracle",d:"Bloques, procedures, functions, packages, excepciones y consultas para escenarios QA.",r:["https://docs.oracle.com/en/database/oracle/oracle-database/"]},
 {t:"Validación de datos",d:"Diseñe comprobaciones de integridad, duplicados, nulos, formatos, reglas de negocio y consistencia entre capas.",r:[]},
 {t:"Transacciones e integridad",d:"Comprenda commit, rollback, aislamiento e integridad referencial para detectar defectos de persistencia.",r:[]}
],
"test-design-istqb":[
 {t:"Análisis de pruebas",d:"Identifique qué probar a partir de requisitos, riesgos, historias y criterios de aceptación.",r:["https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/"]},
 {t:"Diseño de casos",d:"Aplique partición de equivalencia, valores límite, tablas de decisión, transición de estados y enfoques basados en experiencia.",r:[]},
 {t:"Implementación y ejecución",d:"Organice suites, datos, ambiente, secuencia de ejecución, resultados y evidencia.",r:[]},
 {t:"Trazabilidad",d:"Relacione base de prueba, riesgos, casos, resultados y defectos para conocer cobertura e impacto.",r:[]}
],
"devops-tfs":[
 {t:"Work items y trazabilidad",d:"Conecte requerimientos, bugs, tareas y casos de prueba para mantener historial verificable.",r:["https://learn.microsoft.com/azure/devops/"]},
 {t:"Repositorios",d:"Use Git, ramas, pull requests y políticas para integrar revisión y calidad.",r:[]},
 {t:"Pipelines",d:"Incorpore pruebas automáticas y quality gates en build y release pipelines.",r:[]},
 {t:"Test Plans",d:"Organice pruebas manuales, suites, configuraciones y resultados con Azure Test Plans cuando aplique.",r:[]}
],
"performance-qa":[
 {t:"Modelo de carga",d:"Defina objetivos, usuarios, concurrencia, ramp-up, duración, datos y criterios de aceptación antes de ejecutar.",r:["https://jmeter.apache.org/usermanual/","https://grafana.com/docs/k6/latest/"]},
 {t:"JMeter",d:"Aprenda Thread Groups, samplers, assertions, timers, parametrización, correlación y ejecución no-GUI.",r:["https://github.com/apache/jmeter"]},
 {t:"k6",d:"Modele VUs, scenarios, checks y thresholds como código JavaScript e intégrelos a CI/CD.",r:["https://github.com/grafana/k6"]},
 {t:"Interpretación",d:"Correlacione latencia, percentiles, throughput, errores y recursos antes de concluir dónde está el cuello de botella.",r:[]}
],
"selenium-qa":[
 {t:"WebDriver",d:"Comprenda sesiones, navegación, elementos y acciones del navegador.",r:["https://www.selenium.dev/documentation/"]},
 {t:"Locators",d:"Priorice selectores estables, legibles y resistentes a cambios.",r:[]},
 {t:"Page Objects",d:"Separe comportamiento de página de lógica de prueba para reducir duplicación.",r:[]},
 {t:"Cross-browser",d:"Ejecute en múltiples navegadores y ambientes con datos y configuración controlada.",r:[]}
],
"blackbox-web-mobile":[
 {t:"Pruebas funcionales",d:"Valide comportamiento observable contra requisitos y necesidades del usuario.",r:[]},
 {t:"Particiones y límites",d:"Reduzca combinaciones usando clases representativas y fronteras.",r:[]},
 {t:"Exploración",d:"Aprenda mientras diseña y ejecuta pruebas, usando charters y evidencia.",r:[]},
 {t:"Web responsive y mobile",d:"Pruebe orientación, resolución, teclado, permisos, red, interrupciones y compatibilidad.",r:[]}
],
"visual-ai":[
 {t:"Evidencia visual de QA",d:"Use capturas como evidencia contextual: incluya estado, versión, navegador/dispositivo y resultado esperado.",r:[]},
 {t:"Capturas y baselines",d:"Establezca imágenes de referencia controladas y reglas para actualizar baselines evitando aceptar cambios incorrectos.",r:[]},
 {t:"Detección de regresiones visuales",d:"Compare renderizados para identificar diferencias de layout, tipografía, color, espaciado o componentes.",r:["https://playwright.dev/docs/test-snapshots"]},
 {t:"Análisis de imágenes con IA",d:"Utilice IA para clasificar hallazgos visuales, sugerir riesgos y enriquecer evidencia; valide manualmente antes de confirmar defectos.",r:[]},
 {t:"Accesibilidad visual",d:"Revise contraste, legibilidad, jerarquía, foco, zoom y comportamiento responsive junto con pruebas automáticas.",r:["https://www.w3.org/WAI/standards-guidelines/wcag/"]},
 {t:"Human-in-the-Loop",d:"Mantenga una persona responsable para confirmar defectos, aprobar baselines y decidir impacto antes de modificar producto o liberar.",r:[]}
],
"medical-device-samd":[
 {t:"C#/.NET para software regulado",d:"Diseñe servicios mantenibles con separación de responsabilidades, manejo de errores, logging y pruebas automatizadas. En un entorno regulado, el código debe quedar respaldado por requisitos, revisiones y evidencia verificable.",r:["https://learn.microsoft.com/dotnet/csharp/"]},
 {t:"Angular y usabilidad",d:"Implemente componentes previsibles, formularios validados, accesibilidad y manejo claro de estados. En software médico, cambios de interfaz pueden tener impacto de riesgo y deben evaluarse junto con requisitos y usabilidad.",r:["https://angular.dev/"]},
 {t:"SQL Server y trazabilidad de datos",d:"Valide tablas, vistas, stored procedures, constraints, transacciones e integridad. Relacione resultados de UI/API con persistencia y conserve evidencia reproducible.",r:["https://learn.microsoft.com/sql/"]},
 {t:"Requisitos, diseño y risk controls",d:"Conecte requisitos de software, especificaciones de diseño, riesgos, controles y casos de prueba mediante trazabilidad bidireccional. Una modificación debe permitir analizar impacto sobre requisitos y evidencia.",r:[]},
 {t:"Verificación y validación",d:"La verificación aporta evidencia de que los productos de trabajo cumplen requisitos especificados; la validación confirma que la solución satisface el uso previsto en su contexto. Prepare protocolos, resultados, desviaciones y evidencia.",r:[]},
 {t:"IEC 62304",d:"Estudie los procesos de ciclo de vida de software para medical devices: desarrollo, mantenimiento y actividades relacionadas. Use la norma como marco para procesos y documentación, no como sustituto de requisitos regulatorios del producto.",r:["https://webstore.iec.ch/en/publication/22794"]},
 {t:"ISO 13485",d:"Comprenda el sistema de gestión de calidad específico para medical devices, con énfasis en requisitos regulatorios, procesos controlados, riesgo y evidencia de calidad.",r:["https://www.iso.org/standard/59752.html"]},
 {t:"SaMD, defectos y evidencia",d:"Diferencie software como dispositivo médico (SaMD) de software integrado en hardware médico y conserve evidencia suficiente para investigación de defectos, code review, V&V y decisiones de release.",r:["https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd"]}
]};
const id=new URLSearchParams(location.search).get('id')||'programming-qa';
const path=(window.QA_COMPETENCY_PATHS||[]).find(x=>x.id===id)||window.QA_COMPETENCY_PATHS?.[0];
if(!path)return;
document.title=`${path.name} | QA Learning Hub`;
document.getElementById('pathTitle').textContent=path.name;
document.getElementById('pathDesc').textContent=path.desc;
const box=document.getElementById('pathModules');
box.innerHTML=(resources[id]||path.modules.map(m=>({t:m,d:"Módulo de aprendizaje y práctica.",r:[]}))).map((m,i)=>`<article class="learn-path-card learning-expanded"><div class="learn-card-head"><span class="module-type">Módulo ${i+1}</span><span class="status">${path.level}</span></div><h2>${m.t}</h2><p>${m.d}</p><div class="inline-learning"><strong>Qué debe lograr</strong><p>Comprender el concepto, identificar cuándo aporta valor a QA y aplicarlo en un ejemplo reproducible con resultado esperado y evidencia.</p><strong>Práctica recomendada</strong><p>Construya un ejercicio pequeño, documente la entrada, acción, resultado esperado, resultado real y una conclusión técnica.</p></div>${m.r?.length?`<div class="card-actions">${m.r.map((u,j)=>`<a class="btn ghost small" href="${u}" target="_blank" rel="noopener">Abrir recurso ${j+1} ↗</a>`).join('')}</div>`:''}</article>`).join('');
})();
