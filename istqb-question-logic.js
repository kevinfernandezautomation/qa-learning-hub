(function(){
'use strict';
const norm=s=>String(s||'').trim();
const hash=s=>{let h=2166136261;for(const ch of String(s)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return Math.abs(h>>>0)};
const pick=(arr,seed)=>arr[seed%arr.length];
const uniq=a=>[...new Set((a||[]).map(norm).filter(Boolean))];
const profileFor=cert=>{
 const expert=/^CTEL-/.test(cert.id), advanced=/^CTAL-/.test(cert.id)||cert.difficulty==='Avanzado', specialist=/^CT-/.test(cert.id)&&!advanced;
 if(expert)return {levels:['K2','K3','K4','K5','K6'],weights:[.08,.17,.25,.25,.25],multi:.24};
 if(advanced)return {levels:['K2','K3','K4'],weights:[.20,.45,.35],multi:.20};
 if(specialist)return {levels:['K1','K2','K3','K4'],weights:[.12,.36,.36,.16],multi:.16};
 return {levels:['K1','K2','K3'],weights:[.20,.48,.32],multi:.13};
};
const kFor=(p,i)=>{const r=(i%100)/100;let acc=0;for(let x=0;x<p.levels.length;x++){acc+=p.weights[x]||0;if(r<acc)return p.levels[x]}return p.levels.at(-1)};
const situations=[
 'durante el refinamiento de una historia de usuario','antes de una liberación con riesgo alto','después de corregir un defecto crítico','al revisar una regresión que tarda demasiado','cuando un resultado contradice el criterio de aceptación','cuando una dependencia externa cambia','al preparar evidencia para una decisión go/no-go','cuando se detecta un patrón de defectos repetidos','al revisar cobertura frente a riesgos de producto','cuando el equipo necesita reducir feedback tardío','durante una revisión por pares','cuando el ambiente de prueba es inestable'
];
const actions=[
 'definir el objetivo y el oráculo antes de ejecutar','relacionar la prueba con riesgo, requisito y evidencia','confirmar precondiciones, datos, ambiente y versión','seleccionar la técnica que cubra mejor la condición de prueba','comparar alternativas usando impacto y probabilidad','registrar limitaciones y riesgo residual','separar la hipótesis de los hechos observados','conservar trazabilidad entre necesidad, prueba, resultado y defecto'
];
const bad=['memorizar una respuesta sin analizar el contexto','dar la misma prioridad a todos los riesgos','declarar un defecto sin comprobar datos ni ambiente','cambiar el resultado esperado para hacerlo coincidir','omitir trazabilidad para ahorrar tiempo','usar una métrica aislada como única evidencia','concluir que no existen defectos porque la suite pasó','ignorar el riesgo residual después de una prueba'];
const archetypes=[
 'concept','difference','scenario','mapping','risk','evidence','calculation','evaluate','selecttwo','sequence','metric','tradeoff'
];
function mk(cert,topic,i,k,type){
 const s=pick(situations,hash(cert.id+topic+i)), act=pick(actions,hash(topic+i+'a'));
 const wrong=[pick(bad,i+1),pick(bad,i+3),pick(bad,i+5)];
 const lo=`SIM-${cert.id}-${String(topic).toUpperCase().replace(/[^A-Z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,28)}`;
 let q,a,c,explanation;
 if(type==='concept'){
  q=`¿Cuál afirmación describe mejor el propósito de ${topic} dentro de ${cert.name}?`;
  a=[`Aportar una base verificable para decidir sobre ${topic} según objetivos, riesgo y contexto`,...wrong];c=0;
  explanation=`La opción correcta conecta ${topic} con un objetivo verificable, contexto y evidencia; las demás sustituyen el razonamiento por atajos.`;
 }else if(type==='difference'){
  q=`Un equipo confunde una actividad de ${topic} con una decisión de negocio ${s}. ¿Qué explicación es más adecuada?`;
  a=[`QA aporta evidencia y riesgo para la decisión, pero no sustituye al responsable de negocio`,...wrong];c=0;
  explanation='El testing informa decisiones mediante evidencia; no reemplaza responsabilidades de producto, negocio o gestión.';
 }else if(type==='scenario'){
  q=`${s[0].toUpperCase()+s.slice(1)}, ¿cuál sería la mejor acción respecto a ${topic}?`;
  a=[`${act}, y documentar el resultado frente a un criterio verificable`,...wrong];c=0;
  explanation=`La respuesta correcta aplica ${topic} al contexto y conserva reproducibilidad y trazabilidad.`;
 }else if(type==='mapping'){
  q=`Considere estas tareas sobre ${topic}: 1) identificar la condición; 2) diseñar la comprobación; 3) preparar datos/ambiente; 4) evaluar el resultado. ¿Qué secuencia es más coherente?`;
  a=['1 → 2 → 3 → 4','2 → 4 → 1 → 3','4 → 3 → 2 → 1','3 → 1 → 4 → 2'];c=0;
  explanation='La secuencia parte del análisis, pasa por diseño e implementación/preparación y finaliza con la evaluación del resultado.';
 }else if(type==='risk'){
  q=`Dos áreas relacionadas con ${topic} compiten por tiempo de prueba. A tiene probabilidad alta e impacto alto; B probabilidad baja e impacto bajo. ¿Qué decisión es más coherente con testing basado en riesgo?`;
  a=['Asignar mayor profundidad a A y justificar el riesgo residual de B','Probar ambas con idéntica profundidad siempre','Priorizar B porque será más rápida','Omitir A por ser más compleja'];c=0;
  explanation='El esfuerzo debe ajustarse al nivel de riesgo, no repartirse de manera uniforme sin contexto.';
 }else if(type==='evidence'){
  q=`¿Qué conjunto de información ofrece evidencia más defendible sobre ${topic} ${s}?`;
  a=['Versión/ambiente, datos, pasos o procedimiento, resultado esperado, resultado observado y evidencia','Solo una captura sin contexto','Solo la opinión del tester','El número total de casos sin resultado'];c=0;
  explanation='La evidencia útil permite reproducir, interpretar y relacionar el resultado con un criterio verificable.';
 }else if(type==='calculation'){
  const total=80+(i%5)*20, done=Math.round(total*(.55+((i%4)*.1))); const pct=Math.round(done/total*100);
  q=`Para una cobertura relacionada con ${topic}, se identifican ${total} elementos y las pruebas cubren ${done}. ¿Qué porcentaje de cobertura se observa?`;
  a=[`${pct}%`,`${Math.max(0,pct-15)}%`,`${Math.min(100,pct+10)}%`,`${done}%`];c=0;
  explanation=`La cobertura se calcula como elementos cubiertos / elementos totales × 100: ${done}/${total} × 100 ≈ ${pct}%.`;
 }else if(type==='evaluate'){
  q=`Un equipo propone cerrar una actividad de ${topic} porque “todas las pruebas ejecutadas pasaron”. ¿Qué evaluación es más sólida?`;
  a=['La decisión también debe considerar cobertura relevante, riesgos abiertos, limitaciones, defectos y criterios de salida',...wrong];c=0;
  explanation='Un resultado de ejecución aislado no demuestra por sí solo suficiente cobertura ni riesgo aceptable.';
 }else if(type==='selecttwo'){
  q=`¿Qué DOS prácticas fortalecen más la calidad del trabajo de ${topic} ${s}?`;
  a=[`${act}`,`Revisar cobertura, supuestos y riesgo residual con evidencia`,pick(bad,i+2),pick(bad,i+6)];c=[0,1];
  explanation='Ambas opciones correctas aumentan la calidad de decisión mediante evidencia, trazabilidad y control del riesgo.';
 }else if(type==='sequence'){
  q=`Se identifica un hallazgo relacionado con ${topic}. ¿Cuál secuencia de trabajo es más apropiada?`;
  a=['Reproducir → reunir evidencia → clasificar impacto → comunicar → verificar corrección','Clasificar crítico → cambiar requisito → cerrar','Corregir sin evidencia → omitir retest','Reejecutar hasta que pase → borrar historial'];c=0;
  explanation='La secuencia conserva evidencia, evita conclusiones prematuras y exige verificación posterior.';
 }else if(type==='metric'){
  q=`¿Qué uso de una métrica relacionada con ${topic} es más profesional?`;
  a=['Definir fórmula, periodo, fuente y objetivo antes de interpretarla','Comparar números sin contexto entre equipos','Usar una sola métrica para aprobar releases','Cambiar la definición entre reportes'];c=0;
  explanation='Una métrica solo es interpretable cuando su definición y contexto permanecen explícitos y consistentes.';
 }else{
  q=`Al automatizar o sistematizar ${topic}, ¿qué trade-off debe evaluarse primero?`;
  a=['Valor y riesgo cubierto frente a costo, mantenibilidad, datos, ambientes y feedback esperado','Elegir siempre la herramienta más popular','Automatizar todo por interfaz','Eliminar revisiones humanas'];c=0;
  explanation='Las decisiones de automatización o sistematización deben equilibrar valor, riesgo y costo total de mantenimiento.';
 }
 return {q,a,c,d:k==='K1'?'Básico':(k==='K2'?'Intermedio':'Avanzado'),topic,lo,k,explanation,uid:`logic-${cert.id}-${i+1}`};
}
window.buildIstqbLogicBank=function(cert,difficulty){
 if(!cert||!/^CT/.test(cert.id))return null;
 const topics=uniq((window.CERT_TOPICS&&window.CERT_TOPICS[cert.id])||[cert.focus]);
 const p=profileFor(cert),out=[],seen=new Set();
 let i=0;
 while(out.length<160&&i<1000){
  const topic=topics[i%topics.length]||cert.focus, k=kFor(p,i), type=archetypes[i%archetypes.length];
  let item=mk(cert,topic,i,k,type);
  // For Foundation keep K1-K3 only; for advanced/expert emphasize applied scenarios.
  if(cert.id==='CTFL' && !['K1','K2','K3'].includes(item.k)){item.k='K3';item.d='Avanzado'}
  const key=item.q.toLowerCase().replace(/[^a-záéíóúñ0-9]+/g,' ').trim();
  if(!seen.has(key)){seen.add(key);out.push(item)}
  i++;
 }
 return out;
};
})();
