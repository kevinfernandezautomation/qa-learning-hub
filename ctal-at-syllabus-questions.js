
window.CTAL_AT_TOPICS=[
{ch:1,sec:"1.1",topic:"Test Types",fact:"En Agile, los tipos de prueba se seleccionan según objetivos, contexto de iteración, criterios de aceptación, riesgos y necesidades de feedback.",wrong:"Todos los tipos de prueba deben ejecutarse con la misma profundidad durante cada iteración."},
{ch:1,sec:"1.2",topic:"End-to-end Testing",fact:"E2E debe usarse selectivamente para flujos críticos e integraciones de alto riesgo, porque suele ser costoso, lento y con menor capacidad diagnóstica.",wrong:"E2E debe cubrir toda la funcionalidad para sustituir pruebas de niveles inferiores."},
{ch:1,sec:"1.3",topic:"Formal vs Holistic Testing",fact:"El testing formal aporta trazabilidad y repetibilidad; el holístico aporta contexto, exploración y múltiples perspectivas. Pueden complementarse.",wrong:"El testing formal y holístico son excluyentes y no deben combinarse."},
{ch:1,sec:"1.4",topic:"Regression Test Approaches",fact:"La regresión puede ser incremental, basada en riesgo, orientada a DevOps, exploratoria o colaborativa según contexto y madurez.",wrong:"La regresión Agile debe ejecutarse siempre como suite completa al final del release."},

{ch:2,sec:"2.1.1",topic:"Generalization and Specialization",fact:"Los equipos Agile combinan especialistas con habilidades T-shaped para reducir silos y aumentar resiliencia.",wrong:"Agile elimina toda especialización para que todos hagan exactamente lo mismo."},
{ch:2,sec:"2.1.2",topic:"Business Representatives in Testing",fact:"Involucrar temprano a negocio en criterios de aceptación, ejemplos y feedback mejora testabilidad y alineación con valor.",wrong:"Negocio debe participar solamente en la aprobación final."},
{ch:2,sec:"2.1.3",topic:"Supporting Developers",fact:"Testers apoyan a desarrolladores mediante feedback temprano, ejemplos, component testing, code reviews y colaboración sobre riesgos.",wrong:"Apoyar a desarrollo significa que QA debe asumir toda la automatización del equipo."},
{ch:2,sec:"2.2",topic:"Tissue Testers",fact:"Los tissue testers aportan fresh eyes de forma temporal y son útiles temprano para usabilidad, exploración y validar supuestos.",wrong:"Tissue testing reemplaza las pruebas estructuradas y debe usar siempre los mismos evaluadores."},

{ch:3,sec:"3.1.1",topic:"Agile Test Planning",fact:"La planificación de pruebas en Agile se integra a iteración y release, se adapta a riesgos y se revisa conforme aparece nueva información.",wrong:"El plan de pruebas Agile debe quedar cerrado al inicio y no modificarse."},
{ch:3,sec:"3.1.2",topic:"Project Test Strategy",fact:"Una estrategia de pruebas Agile puede apoyarse en testing quadrants para equilibrar pruebas de apoyo al equipo y crítica del producto.",wrong:"La estrategia se limita a decidir qué herramienta de automatización usar."},
{ch:3,sec:"3.2",topic:"Test Monitoring and Control",fact:"Monitoreo y control deben usar información útil para adaptar el trabajo de pruebas, no solo reportar números.",wrong:"Control significa seguir el plan original aunque el riesgo haya cambiado."},
{ch:3,sec:"3.3",topic:"Test Reporting",fact:"El reporte Agile puede usar distintos tipos de cobertura y métricas según audiencia y decisión requerida.",wrong:"Solo la cobertura de código es válida para reportar testing Agile."},
{ch:3,sec:"3.4.1",topic:"Metrics for Improvement",fact:"Las métricas deben seleccionarse para apoyar preguntas y decisiones de mejora, evitando métricas de vanidad.",wrong:"Cuantas más métricas se recolecten, mejor será automáticamente el proceso."},
{ch:3,sec:"3.4.2",topic:"Test Process Improvement",fact:"La mejora del proceso en Agile es iterativa y debe apoyarse en feedback, retrospectivas, datos y experimentación.",wrong:"La mejora debe esperar hasta terminar el proyecto."},

{ch:4,sec:"4.1.1",topic:"Testware as Requirements",fact:"Criterios, ejemplos, checklists y pruebas automatizadas pueden apoyar o actuar como requisitos vivos cuando mantienen claridad y alineación.",wrong:"El testware nunca puede aportar información útil a requisitos."},
{ch:4,sec:"4.1.2",topic:"Storyboarding and Testboarding",fact:"Storyboarding y testboarding ayudan a visualizar flujos y riesgos para mejorar el test basis.",wrong:"Solo sirven para diseñar la interfaz y no aportan a testing."},
{ch:4,sec:"4.1.3",topic:"Example Mapping",fact:"Example mapping facilita conversaciones estructuradas sobre reglas, ejemplos y preguntas para mejorar criterios de aceptación.",wrong:"Example mapping reemplaza la colaboración con una lista estática de casos."},
{ch:4,sec:"4.1.4",topic:"Biases in Agile Testing",fact:"Los sesgos cognitivos pueden afectar decisiones y calidad; hacerlos visibles ayuda a desafiar supuestos.",wrong:"Los testers experimentados no están expuestos a sesgos."},
{ch:4,sec:"4.1.5",topic:"User Story Slicing",fact:"Dividir historias grandes en porciones pequeñas y valiosas mejora testabilidad y feedback.",wrong:"Slicing significa dividir solo por capas técnicas sin entregar valor observable."},
{ch:4,sec:"4.2",topic:"Requirements Engineering and Shift Left",fact:"Requirements engineering apoya shift left al clarificar, validar y hacer testables necesidades antes de etapas tardías.",wrong:"Shift left elimina la necesidad de ingeniería de requisitos."},

{ch:5,sec:"5.1.1",topic:"Test Heuristics",fact:"Las heurísticas son guías prácticas para orientar exploración; no garantizan resultados correctos en todo contexto.",wrong:"Una heurística es una regla obligatoria con resultado garantizado."},
{ch:5,sec:"5.1.2",topic:"Test Mnemonics",fact:"Los mnemonics ayudan a recordar perspectivas o áreas para explorar y generar ideas de prueba.",wrong:"Un mnemonic reemplaza el razonamiento y la adaptación del tester."},
{ch:5,sec:"5.1.3",topic:"Test Tours",fact:"Los test tours dirigen la exploración desde una perspectiva o recorrido intencional.",wrong:"Un tour es equivalente a una suite automatizada rígida."},
{ch:5,sec:"5.1.4",topic:"Test Charter Creation",fact:"Un test charter define misión, alcance y enfoque de una sesión exploratoria, derivado del riesgo y la información disponible.",wrong:"Un charter debe especificar todos los pasos exactos antes de iniciar."},
{ch:5,sec:"5.1.5",topic:"Exploratory Testing",fact:"La exploración combina aprendizaje, diseño y ejecución durante sesiones estructuradas y documentadas.",wrong:"Exploratory testing significa probar sin objetivo ni documentación."},
{ch:5,sec:"5.2.1",topic:"Mob Testing",fact:"Mob testing reúne varias perspectivas en tiempo real con roles como moderador, navigator, driver y mob.",wrong:"Mob testing consiste en que cada persona pruebe por separado y luego combine resultados."},
{ch:5,sec:"5.2.2",topic:"Pair Testing",fact:"Pair testing combina dos personas, típicamente driver y navigator, para aprendizaje, feedback y cobertura.",wrong:"Pair testing siempre reduce esfuerzo porque dos personas hacen tareas distintas."},
{ch:5,sec:"5.2.3",topic:"Vibe Testing",fact:"Vibe testing es un enfoque emergente asistido por IA que requiere validar que el resultado generado refleje la intención del usuario.",wrong:"Vibe testing implica aceptar código generado por IA sin revisión humana."},
{ch:5,sec:"5.3",topic:"Test Smells",fact:"Los test smells son indicios de problemas de diseño o mantenibilidad en pruebas y deben analizarse en contexto.",wrong:"Todo test smell demuestra por sí mismo que la prueba es inválida."},

{ch:6,sec:"6.1",topic:"Test Automation in Agile",fact:"La automatización Agile debe apoyar feedback rápido, repetibilidad y entrega continua, manteniéndose sostenible.",wrong:"Automatización Agile significa automatizar el 100% de las pruebas."},
{ch:6,sec:"6.2",topic:"Test Tools in Agile",fact:"Las herramientas deben seleccionarse por necesidad, integración, mantenibilidad y valor para el equipo.",wrong:"La herramienta con más funciones es siempre la mejor elección."}
];

(function(){
 const stems={
  Básico:[
   t=>`¿Cuál afirmación describe mejor ${t.topic}?`,
   t=>`¿Qué idea está alineada con ${t.topic} en un contexto Agile?`
  ],
  Intermedio:[
   t=>`Un equipo Agile está aplicando ${t.topic}. ¿Cuál decisión es la más adecuada?`,
   t=>`¿Cómo debería utilizarse ${t.topic} para aportar feedback útil y calidad sostenible?`
  ],
  Avanzado:[
   t=>`Ante un escenario complejo relacionado con ${t.topic}, ¿qué enfoque ofrece la mejor justificación basada en contexto y riesgo?`,
   t=>`¿Qué decisión sobre ${t.topic} es más defendible cuando el equipo debe equilibrar velocidad, cobertura y mantenibilidad?`
  ]
 };
 const genericWrong=[
  "Aplicarlo siempre de la misma forma sin considerar contexto ni riesgo.",
  "Medir éxito únicamente por cantidad de casos o automatizaciones.",
  "Sustituir colaboración y criterio profesional por una herramienta.",
  "Esperar al final del release para obtener feedback.",
  "Priorizar documentación o métricas aunque no apoyen ninguna decisión.",
  "Asumir que una práctica Agile elimina la necesidad de validación."
 ];
 function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 function make(t,level,i){
   const q=stems[level][i%2](t);
   let correct=t.fact;
   if(level==="Intermedio")correct=`Aplicarlo de forma adaptativa: ${t.fact}`;
   if(level==="Avanzado")correct=`Tomar la decisión con evidencia, riesgo y feedback: ${t.fact}`;
   const opts=shuffle([correct,t.wrong,...shuffle(genericWrong).slice(0,2)]);
   return {q,a:opts,c:opts.indexOf(correct),d:level,chapter:t.ch,section:t.sec,topic:`Capítulo ${t.ch} · ${t.sec} · ${t.topic}`,uid:`ctal-at-${t.sec}-${level}-${i}`};
 }
 window.buildCtalAtSyllabusBank=function(){
  const out=[];
  window.CTAL_AT_TOPICS.forEach((t,i)=>{
   out.push(make(t,"Básico",i));
   out.push(make(t,"Intermedio",i+1));
   out.push(make(t,"Avanzado",i+2));
   // a second variant per level to grow bank above 100 while preserving section coverage
   out.push(make(t,"Básico",i+3));
   out.push(make(t,"Intermedio",i+4));
   out.push(make(t,"Avanzado",i+5));
  });
  return out;
 };
})();
