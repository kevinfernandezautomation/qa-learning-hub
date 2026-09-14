
window.CTFL_SYLLABUS_TOPICS = [
{ch:1,sec:"1.1",topic:"Objetivos de prueba",fact:"Las pruebas evalúan productos de trabajo, encuentran defectos, reducen riesgo, verifican requisitos y ayudan a tomar decisiones.",wrong:"Las pruebas solo consisten en ejecutar software."},
{ch:1,sec:"1.1.2",topic:"Pruebas y depuración",fact:"Pruebas y depuración son actividades distintas; depuración localiza, analiza y corrige las causas de una falla.",wrong:"Pruebas y depuración son la misma actividad."},
{ch:1,sec:"1.2.2",topic:"Pruebas y QA",fact:"Testing se orienta al producto y al control de calidad, mientras QA es preventivo y orientado a procesos.",wrong:"QA y pruebas son sinónimos exactos."},
{ch:1,sec:"1.2.3",topic:"Error, defecto, falla y causa raíz",fact:"Un error humano puede introducir un defecto; al ejecutarse, ese defecto puede producir una falla.",wrong:"Una falla siempre existe antes de que haya un defecto."},
{ch:1,sec:"1.3",topic:"Presencia de defectos",fact:"Las pruebas pueden demostrar la presencia de defectos, no demostrar su ausencia total.",wrong:"Una suite aprobada demuestra que el sistema no contiene defectos."},
{ch:1,sec:"1.3",topic:"Pruebas exhaustivas",fact:"Las pruebas exhaustivas son imposibles en sistemas no triviales, por lo que deben priorizarse técnicas y riesgos.",wrong:"La única estrategia fiable es probar todas las combinaciones posibles."},
{ch:1,sec:"1.3",topic:"Pruebas tempranas",fact:"Probar temprano ayuda a detectar defectos antes de que generen defectos derivados y mayores costos.",wrong:"Es mejor esperar a que todo el sistema esté terminado para comenzar a probar."},
{ch:1,sec:"1.3",topic:"Agrupación de defectos",fact:"Una pequeña cantidad de componentes suele concentrar una gran proporción de defectos o fallas.",wrong:"Los defectos se distribuyen de forma uniforme entre todos los componentes."},
{ch:1,sec:"1.3",topic:"Desgaste de pruebas",fact:"Repetir siempre las mismas pruebas puede reducir su capacidad de detectar nuevos defectos.",wrong:"Una prueba nunca pierde efectividad aunque se repita sin cambios."},
{ch:1,sec:"1.3",topic:"Dependencia del contexto",fact:"El enfoque de pruebas debe adaptarse al contexto del producto, proyecto, riesgos y dominio.",wrong:"Existe un único proceso de pruebas óptimo para cualquier proyecto."},
{ch:1,sec:"1.3",topic:"Falacia de ausencia de defectos",fact:"Un sistema puede cumplir requisitos y aun así fracasar si no satisface necesidades de usuarios y negocio.",wrong:"Si no se encuentran defectos, el producto necesariamente tendrá éxito."},
{ch:1,sec:"1.4.1",topic:"Análisis de pruebas",fact:"El análisis de pruebas responde qué probar, identificando y priorizando condiciones de prueba.",wrong:"El análisis de pruebas consiste únicamente en ejecutar casos."},
{ch:1,sec:"1.4.1",topic:"Diseño de pruebas",fact:"El diseño de pruebas transforma condiciones en casos y otros elementos de testware y define datos y ambiente.",wrong:"El diseño de pruebas se limita a registrar resultados reales."},
{ch:1,sec:"1.4.1",topic:"Implementación de pruebas",fact:"La implementación organiza casos en procedimientos y suites, prepara datos, scripts y ambiente.",wrong:"La implementación ocurre únicamente después de cerrar el proyecto."},
{ch:1,sec:"1.4.4",topic:"Trazabilidad",fact:"La trazabilidad conecta base de prueba, condiciones, casos, resultados, riesgos y defectos, apoyando cobertura e impacto.",wrong:"La trazabilidad solo sirve para numerar casos de prueba."},
{ch:1,sec:"1.4.5",topic:"Roles de pruebas",fact:"El rol de gestión se centra en planificar, monitorear, controlar y completar; el rol de pruebas se centra en análisis, diseño, implementación y ejecución.",wrong:"Todos los roles de pruebas tienen exactamente las mismas responsabilidades."},
{ch:1,sec:"1.5",topic:"Habilidades del tester",fact:"Pensamiento analítico, comunicación, curiosidad, conocimiento técnico y del dominio son habilidades relevantes para testers.",wrong:"La única habilidad necesaria para un tester es saber usar una herramienta."},
{ch:1,sec:"1.5.2",topic:"Enfoque de equipo completo",fact:"En el enfoque de equipo completo, todos comparten responsabilidad por la calidad y colaboran según sus habilidades.",wrong:"La calidad es responsabilidad exclusiva del equipo de QA."},
{ch:1,sec:"1.5.3",topic:"Independencia de pruebas",fact:"La independencia puede ayudar a detectar defectos diferentes, pero también puede introducir aislamiento o problemas de colaboración.",wrong:"La máxima independencia siempre es la mejor opción para todo proyecto."},

{ch:2,sec:"2.1.1",topic:"SDLC y pruebas",fact:"El modelo de ciclo de vida afecta alcance, momento, niveles y tipos de pruebas.",wrong:"El SDLC no influye en las actividades de pruebas."},
{ch:2,sec:"2.1.3",topic:"Pruebas primero",fact:"TDD, ATDD y BDD son ejemplos de enfoques donde pruebas o criterios se elaboran antes o junto al desarrollo.",wrong:"Pruebas primero significa ejecutar únicamente pruebas al final del sprint."},
{ch:2,sec:"2.1.4",topic:"DevOps y pruebas",fact:"DevOps favorece retroalimentación rápido, automatización, CI/CD y colaboración entre desarrollo, pruebas y operaciones.",wrong:"DevOps elimina la necesidad de pruebas manuales y revisión humana."},
{ch:2,sec:"2.1.5",topic:"Shift left",fact:"Shift left busca realizar actividades de calidad antes en el ciclo sin abandonar las pruebas posteriores.",wrong:"Shift left significa mover todas las pruebas a producción."},
{ch:2,sec:"2.1.6",topic:"Retrospectivas",fact:"Las retrospectivas pueden identificar mejoras de proceso basadas en lo ocurrido durante una iteración o proyecto.",wrong:"Las retrospectivas solo sirven para asignar culpables."},
{ch:2,sec:"2.2.1",topic:"Niveles de prueba",fact:"Los niveles de prueba se relacionan con diferentes objetos y objetivos, como componente, integración, sistema y aceptación.",wrong:"Todos los niveles de prueba tienen el mismo objeto y propósito."},
{ch:2,sec:"2.2.2",topic:"Tipos funcionales y no funcionales",fact:"Las pruebas funcionales verifican qué hace el sistema y las no funcionales evalúan qué tan bien se comporta.",wrong:"Las pruebas no funcionales solo revisan requisitos de interfaz."},
{ch:2,sec:"2.2.3",topic:"Confirmación y regresión",fact:"La confirmación comprueba una corrección específica; la regresión busca efectos adversos en otras áreas.",wrong:"Confirmación y regresión significan exactamente lo mismo."},
{ch:2,sec:"2.3",topic:"Pruebas de mantenimiento",fact:"Cambios, migraciones, actualizaciones y retiro de sistemas pueden activar pruebas de mantenimiento.",wrong:"El mantenimiento nunca requiere pruebas si la versión anterior estaba estable."},

{ch:3,sec:"3.1.1",topic:"Productos revisables estáticamente",fact:"Requisitos, código, modelos, planes y otros productos de trabajo pueden examinarse sin ejecutar software.",wrong:"Las pruebas estáticas requieren ejecutar el sistema."},
{ch:3,sec:"3.1.2",topic:"Valor de pruebas estáticas",fact:"Las pruebas estáticas pueden detectar defectos temprano y mejorar calidad de productos de trabajo antes de la ejecución.",wrong:"Las pruebas estáticas solo pueden aplicarse a código terminado."},
{ch:3,sec:"3.1.3",topic:"Estático vs dinámico",fact:"Las pruebas estáticas no ejecutan el objeto de prueba; las dinámicas sí implican ejecución.",wrong:"La diferencia entre estático y dinámico depende solo de quién ejecuta la prueba."},
{ch:3,sec:"3.2.1",topic:"Feedback temprano",fact:"Feedback temprano y frecuente ayuda a reducir malentendidos y detectar problemas antes de que se propaguen.",wrong:"El retroalimentación debe esperar hasta la finalización del producto."},
{ch:3,sec:"3.2.2",topic:"Proceso de revisión",fact:"Una revisión estructurada puede incluir planificación, inicio, revisión individual, comunicación/análisis y corrección/reporte.",wrong:"Una revisión formal consiste solo en una reunión final."},
{ch:3,sec:"3.2.3",topic:"Roles en revisiones",fact:"Las revisiones asignan responsabilidades diferenciadas, como autor, moderador, revisor, escriba y responsable de gestión.",wrong:"Todos los participantes de una revisión cumplen una única función idéntica."},
{ch:3,sec:"3.2.4",topic:"Tipos de revisión",fact:"Los tipos de revisión difieren en objetivos, formalidad y responsabilidades.",wrong:"Todas las revisiones deben tener exactamente el mismo nivel de formalidad."},
{ch:3,sec:"3.2.5",topic:"Factores de éxito en revisiones",fact:"Objetivos claros, participantes adecuados, tiempo suficiente y cultura constructiva favorecen revisiones exitosas.",wrong:"Una revisión es efectiva aunque nadie conozca su objetivo."},

{ch:4,sec:"4.1",topic:"Familias de técnicas",fact:"El syllabus distingue técnicas de caja negra, caja blanca y basadas en experiencia, además de enfoques colaborativos.",wrong:"Todas las técnicas de diseño dependen únicamente del código fuente."},
{ch:4,sec:"4.2.1",topic:"Partición de equivalencia",fact:"La partición de equivalencia divide datos en clases que se espera sean procesadas de manera similar.",wrong:"La partición de equivalencia exige probar cada dato posible."},
{ch:4,sec:"4.2.2",topic:"Valores límite",fact:"El análisis de valores límite se concentra en fronteras entre particiones donde suelen aparecer defectos.",wrong:"Los valores límite se seleccionan únicamente en el centro de una partición."},
{ch:4,sec:"4.2.3",topic:"Tablas de decisión",fact:"Las tablas de decisión son útiles cuando combinaciones de condiciones producen diferentes acciones o resultados.",wrong:"Las tablas de decisión solo se usan cuando existe una única condición."},
{ch:4,sec:"4.2.4",topic:"Transición de estados",fact:"La técnica de transición de estados modela estados, eventos y transiciones para derivar pruebas.",wrong:"La transición de estados se aplica únicamente a cálculos numéricos."},
{ch:4,sec:"4.3.1",topic:"Cobertura de sentencias",fact:"La cobertura de sentencias mide qué proporción de sentencias ejecutables fue ejercitada por las pruebas.",wrong:"La cobertura de sentencias mide requisitos cubiertos."},
{ch:4,sec:"4.3.2",topic:"Cobertura de ramas",fact:"La cobertura de ramas evalúa los resultados posibles de decisiones y ramas en el flujo de control.",wrong:"La cobertura de ramas es idéntica a contar casos de prueba."},
{ch:4,sec:"4.3.3",topic:"Valor de caja blanca",fact:"Las medidas de cobertura estructural pueden revelar partes del código no ejercitadas y orientar pruebas adicionales.",wrong:"La caja blanca demuestra ausencia total de defectos."},
{ch:4,sec:"4.4.1",topic:"Predicción de errores",fact:"Predicción de errores usa conocimiento, experiencia y datos históricos para anticipar errores, defectos y fallas probables.",wrong:"Predicción de errores elimina la necesidad de experiencia del tester."},
{ch:4,sec:"4.4.2",topic:"Pruebas exploratorias",fact:"En pruebas exploratorio el tester diseña, ejecuta y evalúa pruebas mientras aprende del producto.",wrong:"El pruebas exploratorio prohíbe aprender o adaptar pruebas durante la sesión."},
{ch:4,sec:"4.4.3",topic:"Pruebas basadas en listas de comprobación",fact:"Las listas de comprobación pueden guiar pruebas consistentes y deben actualizarse con aprendizaje y defectos relevantes.",wrong:"Una checklist debe crecer indefinidamente y nunca cambiar."},
{ch:4,sec:"4.5.1",topic:"Historias de usuario colaborativas",fact:"Las historias de usuario se benefician de colaboración entre negocio, desarrollo y pruebas para clarificar necesidades.",wrong:"Las historias de usuario deben escribirse sin participación de pruebas."},
{ch:4,sec:"4.5.2",topic:"Criterios de aceptación",fact:"Los criterios de aceptación describen condiciones que permiten valorar si una historia o funcionalidad cumple lo esperado.",wrong:"Los criterios de aceptación deben ser ambiguos para permitir flexibilidad."},
{ch:4,sec:"4.5.3",topic:"ATDD",fact:"ATDD deriva pruebas de aceptación a partir de ejemplos y criterios acordados antes de implementar la funcionalidad.",wrong:"ATDD significa diseñar pruebas solo después del desarrollo."},

{ch:5,sec:"5.1.1",topic:"Plan de pruebas",fact:"Un plan de pruebas define objetivos, enfoque, recursos, calendario y otros elementos necesarios para dirigir las pruebas.",wrong:"Un plan de pruebas solo contiene una lista de defectos."},
{ch:5,sec:"5.1.3",topic:"Criterios de entrada y salida",fact:"Los criterios de entrada indican condiciones para iniciar una actividad y los de salida condiciones para considerarla completada.",wrong:"Entrada y salida son dos nombres para el mismo criterio."},
{ch:5,sec:"5.1.4",topic:"Estimación",fact:"Las técnicas de estimación ayudan a prever esfuerzo de prueba usando información disponible, experiencia o descomposición.",wrong:"La estimación precisa no requiere conocer alcance ni complejidad."},
{ch:5,sec:"5.1.5",topic:"Priorización de casos",fact:"Los casos pueden priorizarse por riesgo, cobertura, dependencias o valor para obtener retroalimentación útil antes.",wrong:"La priorización debe hacerse siempre alfabéticamente."},
{ch:5,sec:"5.1.6",topic:"Pirámide de pruebas",fact:"La pirámide favorece muchas pruebas rápidas en niveles bajos y menos pruebas costosas en niveles altos.",wrong:"La pirámide recomienda que todas las pruebas sean UI end-to-end."},
{ch:5,sec:"5.1.7",topic:"Cuadrantes de pruebas",fact:"Los cuadrantes ayudan a relacionar tipos y objetivos de prueba con apoyo al equipo y crítica del producto.",wrong:"Los cuadrantes reemplazan todos los niveles de prueba."},
{ch:5,sec:"5.2.1",topic:"Nivel de riesgo",fact:"El nivel de riesgo se relaciona con probabilidad e impacto.",wrong:"El riesgo depende únicamente del número de casos ejecutados."},
{ch:5,sec:"5.2.2",topic:"Riesgo de proyecto y producto",fact:"Los riesgos de proyecto afectan la capacidad de entregar; los riesgos de producto afectan características o calidad del producto.",wrong:"Los riesgos de proyecto y producto son siempre idénticos."},
{ch:5,sec:"5.2.3",topic:"Análisis de riesgo de producto",fact:"El análisis de riesgo puede influir en alcance, profundidad, prioridad y esfuerzo de pruebas.",wrong:"El riesgo no debe influir en cuánto ni qué se prueba."},
{ch:5,sec:"5.3.1",topic:"Métricas de pruebas",fact:"Las métricas ayudan a monitorear progreso, cobertura, defectos, esfuerzo y calidad para apoyar decisiones.",wrong:"Una única métrica puede describir completamente la calidad del producto."},
{ch:5,sec:"5.3.2",topic:"Reportes de prueba",fact:"El contenido y detalle de un reporte deben adaptarse a su audiencia y propósito.",wrong:"Todos los stakeholders necesitan exactamente el mismo nivel de detalle técnico."},
{ch:5,sec:"5.4",topic:"Gestión de configuración",fact:"La gestión de configuración ayuda a mantener integridad y versiones conocidas de testware y objetos de prueba.",wrong:"La gestión de configuración no tiene relación con reproducibilidad."},
{ch:5,sec:"5.5",topic:"Reporte de defectos",fact:"Un reporte útil incluye contexto, pasos, resultados esperado/real, impacto, prioridad, estado y evidencia suficiente.",wrong:"Un reporte de defecto solo necesita un título."},

{ch:6,sec:"6.1",topic:"Soporte de herramientas",fact:"Las herramientas pueden apoyar gestión, estático, diseño, ejecución, cobertura, no funcional, DevOps, colaboración y despliegue.",wrong:"Las herramientas de pruebas solo sirven para automatizar la interfaz de usuario."},
{ch:6,sec:"6.2",topic:"Beneficios de automatización",fact:"La automatización puede ahorrar trabajo repetitivo, mejorar consistencia, acelerar retroalimentación y aportar medidas objetivas.",wrong:"La automatización garantiza por sí sola mejor calidad."},
{ch:6,sec:"6.2",topic:"Riesgos de automatización",fact:"Expectativas irreales, costos de mantenimiento, dependencia de proveedores y herramientas inadecuadas son riesgos de automatización.",wrong:"Adquirir una herramienta elimina el costo de mantenimiento y formación."}
];

(function(){
 const basic=[
  t=>`¿Cuál afirmación describe correctamente ${t.topic}?`,
  t=>`¿Qué idea corresponde a ${t.topic}?`
 ];
 const intermediate=[
  t=>`Un equipo necesita aplicar correctamente ${t.topic}. ¿Qué enfoque es el más adecuado?`,
  t=>`Durante una actividad relacionada con ${t.topic}, ¿qué decisión está mejor alineada con el syllabus?`
 ];
 const advanced=[
  t=>`Un equipo debe tomar una decisión basada en ${t.topic}. ¿Cuál opción ofrece la justificación más sólida?`,
  t=>`Ante un problema relacionado con ${t.topic}, ¿qué respuesta preserva mejor riesgo, trazabilidad y evidencia?`
 ];
 function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 const genericWrong=[
  "Aplicar la actividad sin criterios verificables ni evidencia.",
  "Asumir que una prueba aprobada demuestra ausencia total de defectos.",
  "Ignorar el contexto y utilizar siempre el mismo enfoque.",
  "Modificar el resultado esperado para que coincida con el comportamiento observado.",
  "Priorizar únicamente por cantidad de casos y no por riesgo o valor.",
  "Sustituir revisión humana y pensamiento crítico por una herramienta."
 ];
 function make(t,level,index){
   const stems=level==="Básico"?basic:level==="Intermedio"?intermediate:advanced;
   const q=stems[index%stems.length](t);
   let correct=t.fact;
   if(level==="Intermedio")correct=`${t.fact}`;
   if(level==="Avanzado")correct=`Tomar la decisión con base en contexto, riesgo y evidencia: ${t.fact}`;
   const distractors=shuffle([t.wrong,...genericWrong]).filter(x=>x!==correct).slice(0,3);
   const a=shuffle([correct,...distractors]);
   return {q,a,c:a.indexOf(correct),d:level,topic:`Capítulo ${t.ch} · ${t.sec} · ${t.topic}`,section:t.sec,chapter:t.ch,uid:`ctfl-${t.sec}-${level}-${index}`};
 }
 window.buildCtflSyllabusBank=function(){
   const out=[];
   window.CTFL_SYLLABUS_TOPICS.forEach((t,i)=>{
     out.push(make(t,"Básico",i));
     out.push(make(t,"Intermedio",i+1));
     out.push(make(t,"Avanzado",i+2));
   });
   return out;
 };
})();
