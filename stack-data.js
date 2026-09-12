
window.QA_STACKS={
 manual:{name:"QA Manual Web & Mobile",topics:["requisitos verificables","partición de equivalencia","valores límite","tablas de decisión","transición de estados","pruebas exploratorias","regresión","defectos y evidencia"]},
 webauto:{name:"Playwright / Cypress / Selenium",topics:["locators robustos","assertions","Page Object Model","esperas y sincronización","datos de prueba","cross-browser","mantenibilidad","CI/CD"]},
 api:{name:"API Quality Engineering",topics:["métodos HTTP","status codes","headers","autenticación","schema","pruebas negativas","idempotencia","contratos OpenAPI"]},
 performance:{name:"JMeter + k6",topics:["perfil de carga","usuarios virtuales","throughput","percentiles","thresholds","correlación","parametrización","ejecución CI/CD"]},
 data:{name:"QA de Bases de Datos · SQL + NoSQL",topics:["modelos relacionales y NoSQL","SQL Server","PostgreSQL","MySQL","Oracle/PLSQL","MongoDB","Firestore","SQLite","integridad y schema validation","transacciones y concurrencia","seguridad y permisos","validación UI-API-BD","rendimiento e índices"]},
 devops:{name:"Azure DevOps / TFS + Git + CI/CD",topics:["repositorios Git","work items","build pipelines","release pipelines","quality gates","artefactos","trazabilidad","gestión de fallos"]},
 mobile:{name:"Appium + BrowserStack",topics:["dispositivos reales","emuladores","permisos","orientación","interrupciones","conectividad","gestos","fragmentación"]},
 accessibility:{name:"WCAG + Accessibility Testing",topics:["teclado","foco visible","semántica","ARIA","contraste","texto alternativo","lectores de pantalla","automatización asistida"]},
 salesforce:{name:"Salesforce QA",topics:["sandbox","UAT","Apex tests","Lightning Web Components","roles y permisos","automatización","datos y configuraciones","deployment"]},
 aiqa:{name:"QA con imágenes, IA y agentes",topics:["prompts trazables","generación de pruebas","análisis de resultados","evidencia visual","crawling","Human-in-the-Loop","riesgo","no alucinación"]},
 "jira-confluence":{name:"Jira + Confluence para QA",topics:["work items y bugs","prioridad y severidad","workflows","boards y filtros","trazabilidad de defectos","Confluence para evidencia","documentación de pruebas","reportes y colaboración"]},
 "oracle-apex":{name:"Oracle APEX QA",topics:["App Builder","Page Designer","SQL Workshop","validaciones","procesos","autenticación","autorización","session state","responsive UI","accesibilidad","REST integrations","regresión"]}
};

(function(){
const LEVELS={
 "Básico":{
  prompts:[
   t=>`¿Cuál es el propósito principal de ${t} dentro de un proceso de QA?`,
   t=>`¿Qué debería comprobar primero un QA al trabajar con ${t}?`,
   t=>`¿Cuál de estas acciones representa un uso correcto de ${t}?`,
   t=>`¿Qué resultado esperaría documentar al aplicar ${t}?`,
   t=>`¿Qué riesgo ayuda a reducir correctamente ${t}?`,
   t=>`¿Cuál es la mejor evidencia inicial al validar ${t}?`
  ],
  good:["Aplicarlo con un objetivo verificable y conservar evidencia del resultado","Relacionarlo con el requisito o riesgo que se desea comprobar","Definir previamente el resultado esperado antes de ejecutar","Registrar datos y condiciones suficientes para reproducir la validación","Usarlo como parte de una estrategia de pruebas y no como actividad aislada","Verificar el comportamiento observado contra un criterio conocido"],
  bad:["Ejecutarlo sin objetivo y asumir que todo está correcto","Sustituir el resultado esperado por una opinión personal","Omitir evidencias porque la prueba se ejecutó una vez","Cambiar el requisito para que coincida con el resultado observado","Concluir que no existen defectos únicamente porque una prueba pasó","Aplicarlo siempre de la misma forma aunque el contexto cambie"]
 },
 "Intermedio":{
  prompts:[
   t=>`¿Qué decisión mejora más la calidad al diseñar pruebas relacionadas con ${t}?`,
   t=>`¿Cómo debería integrarse ${t} en una estrategia basada en riesgo?`,
   t=>`¿Qué información es más útil para analizar un fallo relacionado con ${t}?`,
   t=>`¿Cuál es el enfoque más mantenible cuando ${t} debe repetirse frecuentemente?`,
   t=>`¿Qué práctica mejora la trazabilidad de una validación de ${t}?`,
   t=>`¿Cuál es la mejor forma de priorizar escenarios asociados con ${t}?`
  ],
  good:["Priorizar según impacto, probabilidad y criticidad del comportamiento","Mantener trazabilidad entre requisito, riesgo, prueba, resultado y defecto","Separar problemas del producto, datos, ambiente y herramienta antes de concluir","Automatizar solo cuando la repetibilidad, estabilidad y valor lo justifican","Usar datos representativos y criterios de aceptación medibles","Revisar cobertura útil en lugar de aumentar casos sin propósito"],
  bad:["Priorizar solo por el orden en que se escribieron los casos","Medir calidad únicamente por la cantidad de pruebas ejecutadas","Asumir que todo fallo corresponde a un defecto del producto","Automatizar todos los escenarios aunque cambien constantemente","Usar datos reales sensibles aunque no sean necesarios","Cerrar hallazgos sin una prueba de confirmación"]
 },
 "Avanzado":{
  prompts:[
   t=>`¿Qué enfoque de Quality Engineering es más sólido para gobernar ${t}?`,
   t=>`¿Cómo debería evaluarse el riesgo residual después de aplicar ${t}?`,
   t=>`¿Qué criterio permite convertir ${t} en un quality gate defendible?`,
   t=>`¿Cuál es la mejor estrategia para escalar ${t} sin aumentar deuda técnica?`,
   t=>`¿Qué combinación de métricas y evidencia aporta mayor valor al evaluar ${t}?`,
   t=>`¿Cómo debería incorporarse ${t} en CI/CD o en decisiones de release?`
  ],
  good:["Definir criterios medibles vinculados a riesgo y validar con evidencia histórica suficiente","Separar prevención, detección, confirmación y regresión manteniendo trazabilidad","Diseñar controles en la capa más eficiente sin depender innecesariamente de UI","Usar quality gates basados en riesgo, evidencia y objetivos de negocio","Correlacionar resultados técnicos con impacto, tendencia y contexto operacional","Mantener revisión humana para decisiones críticas de aceptación, seguridad y release"],
  bad:["Definir umbrales arbitrarios sin datos ni tolerancia de riesgo","Considerar resuelto un problema apenas se modifica el código","Ejecutar exclusivamente pruebas UI para obtener mayor cobertura aparente","Usar cualquier métrica disponible aunque no apoye una decisión","Eliminar controles cuando retrasan el pipeline","Delegar a una herramienta la decisión final de release sin gobernanza"]
 }
};

function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function build(stackId,level){
 const st=window.QA_STACKS[stackId],cfg=LEVELS[level]||LEVELS["Básico"]; if(!st)return[];
 const out=[];let n=0;
 st.topics.forEach((topic,ti)=>{
   cfg.prompts.forEach((make,pi)=>{
     const correct=cfg.good[(ti+pi)%cfg.good.length];
     const wrongs=shuffle(cfg.bad).slice(0,3);
     const opts=shuffle([correct,...wrongs]);
     out.push({q:make(topic),a:opts,c:opts.indexOf(correct),topic,d:level,n:++n,uid:`${stackId}-${level}-${n}`});
   });
 });
 return out; // 48 preguntas únicas por nivel/stack
}
window.buildStackQuestions=build;
})();
