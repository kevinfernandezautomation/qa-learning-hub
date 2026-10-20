const GENERAL=[
{d:"Análisis",q:"Un requisito dice que el campo acepta valores entre 1 y 100. ¿Qué conjunto aporta mejor cobertura inicial?",o:[["1, 50 y 100",2],["0, 1, 100 y 101",3],["Solo 50",0],["1 y 100 solamente",1]]},
{d:"Atención al detalle",q:"Un defecto aparece solo en una versión específica del navegador. ¿Qué evidencia es más útil?",o:[["Captura sin contexto",0],["Versión, navegador, pasos, datos y evidencia",3],["Solo indicar 'falla'",0],["Un comentario verbal",1]]},
{d:"Riesgo",q:"Hay poco tiempo antes de una release. ¿Qué conviene priorizar?",o:[["Casos aleatorios",0],["Flujos críticos y cambios de mayor riesgo",3],["Solo UI",1],["Todo por igual",1]]},
{d:"Comunicación",q:"Encuentra un defecto crítico que bloquea una función principal. ¿Qué hace primero?",o:[["Lo oculta hasta tener más defectos",0],["Lo documenta con evidencia y comunica impacto/riesgo",3],["Solo comenta en chat",1],["Espera a la retrospectiva",0]]},
{d:"Análisis",q:"Una API devuelve 200 pero el body contiene datos inconsistentes. ¿Cuál es la conclusión correcta?",o:[["La prueba pasó porque fue 200",0],["Debe validar contrato y reglas de negocio, no solo status",3],["Es un problema solo de UI",0],["No se puede probar",0]]},
{d:"Atención al detalle",q:"Dos pruebas fallan después de cambiar datos compartidos. ¿Qué revisa primero?",o:[["Dependencia entre datos/estado y aislamiento",3],["Cambiar el requisito",0],["Ignorar una falla",0],["Aumentar el timeout siempre",1]]},
{d:"Riesgo",q:"Una función poco usada puede causar pérdida de datos. ¿Cómo debería considerarse?",o:[["Baja prioridad por poco uso",0],["Alta atención por impacto potencial",3],["No probarla",0],["Solo automatizar UI",1]]},
{d:"Comunicación",q:"Un desarrollador no reproduce un defecto. ¿Qué respuesta ayuda más?",o:[["Insistir sin evidencia",0],["Compartir ambiente, datos, pasos y video/logs",3],["Cerrar el defecto",0],["Cambiar severidad sin discutir",1]]},
{d:"Análisis",q:"Una historia tiene criterios ambiguos. ¿Qué práctica reduce riesgo antes de probar?",o:[["Esperar a ejecución",0],["Aclarar ejemplos, reglas y criterios con el equipo",3],["Inventar el comportamiento",0],["Probar solo happy path",1]]},
{d:"Atención al detalle",q:"¿Qué diferencia aporta probar límites además de valores medios?",o:[["Detectar errores en fronteras de rangos",3],["Ninguna",0],["Solo mejora performance",0],["Evita documentar",0]]},
{d:"Riesgo",q:"Una suite automática tiene 20% de pruebas inestables. ¿Qué riesgo genera?",o:[["Ninguno",0],["Pérdida de confianza y señales falsas",3],["Solo más cobertura",0],["Mejor velocidad siempre",0]]},
{d:"Comunicación",q:"En una conclusión de pruebas, ¿qué información es más útil?",o:[["Solo 'aprobado'",0],["Alcance, resultados, riesgos pendientes y recomendación",3],["Lista sin contexto",1],["Solo número de casos",1]]}
];

const SECTOR={
software:[
{d:"Análisis",q:"Un microservicio cambió su contrato. ¿Qué valida además de la UI?",o:[["Contrato API, consumidores y regresión",3],["Solo color del botón",0],["Solo login",1],["Nada si compila",0]]},
{d:"Riesgo",q:"Un cambio toca autenticación y pagos. ¿Qué enfoque es más adecuado?",o:[["Regresión basada en impacto y seguridad",3],["Solo smoke visual",1],["Probar al final",0],["No revisar logs",0]]},
{d:"Atención al detalle",q:"Un bug ocurre solo con datos nulos. ¿Qué aprendizaje deja?",o:[["Agregar pruebas negativas y de datos faltantes",3],["Eliminar nulos del requisito",0],["Ignorar",0],["Solo aumentar cobertura de UI",1]]},
{d:"Comunicación",q:"Una dependencia externa está inestable. ¿Qué reporta?",o:[["Impacto, frecuencia, evidencia y mitigación temporal",3],["Solo 'tercero falla'",1],["Nada",0],["Cambiar proveedor sin análisis",0]]},
{d:"Análisis",q:"¿Qué combina mejor una pirámide de pruebas sana?",o:[["Muchas unitarias, suficientes integración/API y E2E selectivas",3],["Solo E2E",0],["Solo manual",1],["Solo snapshots",0]]},
{d:"Riesgo",q:"Un hotfix cambia una función central. ¿Qué es clave?",o:[["Confirmación + regresión de áreas impactadas",3],["Probar una vez el happy path",1],["Omitir regresión",0],["Esperar usuarios",0]]},
{d:"Atención al detalle",q:"Un locator UI falla tras cambios cosméticos. ¿Qué mejora?",o:[["Selector estable basado en rol/contrato",3],["XPath absoluto más largo",0],["Sleep de 30 s",0],["Duplicar test",1]]},
{d:"Comunicación",q:"La cobertura automática subió pero hay defectos críticos. ¿Cómo comunicarlo?",o:[["La cobertura no sustituye análisis de riesgo ni efectividad",3],["Decir que QA está completo",0],["Ocultar defectos",0],["Medir solo cantidad",1]]}
],
electrical:[
{d:"Riesgo",q:"Una función de monitoreo muestra una lectura inconsistente. ¿Qué prioriza?",o:[["Validar fuente, límites, alarmas y trazabilidad",3],["Solo estilo visual",0],["Ignorar por ser intermitente",0],["Cambiar dato manualmente",1]]},
{d:"Análisis",q:"Un sistema recibe telemetría retrasada. ¿Qué debe evaluarse?",o:[["Comportamiento ante latencia, pérdida y orden de datos",3],["Solo login",0],["Solo carga de página",1],["Nada",0]]},
{d:"Atención al detalle",q:"Dos pantallas muestran unidades distintas para el mismo valor. ¿Qué corresponde?",o:[["Verificar especificación, conversión y consistencia",3],["Aceptar ambas",0],["Cambiar colores",0],["Probar solo una",1]]},
{d:"Comunicación",q:"Un hallazgo puede afectar operación. ¿Cómo reportarlo?",o:[["Con impacto, condiciones, evidencia y escalamiento definido",3],["Solo chat informal",1],["Esperar cierre de sprint",0],["Omitir contexto",0]]},
{d:"Riesgo",q:"¿Qué enfoque es apropiado para funciones con impacto operativo alto?",o:[["Más rigor, trazabilidad y pruebas de fallos/recuperación",3],["Menos pruebas",0],["Solo exploración sin evidencia",1],["Probar solo en producción",0]]},
{d:"Análisis",q:"Una alarma no se activa en un límite esperado. ¿Qué técnica ayuda?",o:[["Análisis de valores límite y reglas de decisión",3],["Solo prueba visual",0],["Carga masiva",1],["Ninguna",0]]},
{d:"Atención al detalle",q:"¿Qué evidencia es valiosa para eventos y alertas?",o:[["Timestamp, fuente, valor, estado y secuencia",3],["Solo screenshot recortado",1],["Comentario sin hora",0],["Nada",0]]},
{d:"Comunicación",q:"El equipo cambia un umbral crítico. ¿Qué conviene confirmar?",o:[["Requisito, aprobación, impacto y pruebas asociadas",3],["Solo que compile",0],["Solo nombre del ticket",1],["Nada",0]]}
],
medical:[
{d:"Riesgo",q:"Un cambio afecta una función relacionada con seguridad del paciente. ¿Qué debe guiar la prueba?",o:[["Riesgo, requisitos, controles y evidencia V&V",3],["Solo velocidad",0],["Solo UI",1],["Cantidad de casos",0]]},
{d:"Análisis",q:"¿Por qué es importante la trazabilidad en software médico?",o:[["Relaciona requisitos, riesgos, controles y evidencia de prueba",3],["Solo para diseño visual",0],["Solo para estimar",1],["No es importante",0]]},
{d:"Atención al detalle",q:"Un resultado difiere del esperado en un protocolo. ¿Qué corresponde?",o:[["Registrar desviación/evidencia e investigar antes de concluir",3],["Modificar el esperado",0],["Borrar el resultado",0],["Ignorar si fue una vez",0]]},
{d:"Comunicación",q:"¿Cómo comunicar un defecto regulado?",o:[["Con hechos, impacto, trazabilidad y evidencia objetiva",3],["Con suposiciones",0],["Sin versión del software",1],["Solo verbalmente",0]]},
{d:"Riesgo",q:"Una corrección toca un risk control existente. ¿Qué revisión es razonable?",o:[["Impacto sobre requisito, riesgo, control y regresión",3],["Solo smoke visual",1],["Ninguna",0],["Cambiar documentación después",0]]},
{d:"Análisis",q:"¿Qué diferencia básica existe entre verificación y validación?",o:[["Verificación contra requisitos; validación respecto al uso previsto",3],["Son idénticas",0],["Solo validación usa pruebas",0],["Verificación es solo UI",0]]},
{d:"Atención al detalle",q:"¿Qué hace más reproducible una evidencia V&V?",o:[["Versión, configuración, datos, pasos y resultado",3],["Solo captura",1],["Nombre del tester",1],["Comentario informal",0]]},
{d:"Comunicación",q:"Se descubre un riesgo no contemplado durante pruebas. ¿Qué corresponde?",o:[["Escalarlo según el proceso y documentar evidencia",3],["Ocultarlo",0],["Cambiar requisito sin revisión",0],["Esperar al release",0]]}
],
banking:[
{d:"Riesgo",q:"Una transacción aparece duplicada. ¿Qué prioriza?",o:[["Integridad, idempotencia, conciliación e impacto monetario",3],["Color de pantalla",0],["Solo navegador",0],["Cerrar por intermitencia",0]]},
{d:"Análisis",q:"¿Qué validación es clave en una transferencia?",o:[["Saldo, ledger, estados, límites y efectos atómicos",3],["Solo mensaje final",1],["Solo latencia",1],["Solo UI",0]]},
{d:"Atención al detalle",q:"Un cálculo difiere por un centavo. ¿Qué investiga?",o:[["Reglas de redondeo, moneda, precisión y origen del dato",3],["Ignorarlo siempre",0],["Cambiar UI",0],["Solo repetir",1]]},
{d:"Comunicación",q:"Un defecto puede afectar conciliación. ¿Qué debe incluir el reporte?",o:[["Transacciones, rango temporal, impacto y evidencia",3],["Solo screenshot",1],["Nada sensible en texto público",2],["Un mensaje genérico",0]]},
{d:"Riesgo",q:"Un cambio modifica autenticación. ¿Qué enfoque es apropiado?",o:[["Pruebas funcionales, negativas, seguridad y regresión de acceso",3],["Solo happy path",1],["No probar errores",0],["Solo performance",0]]},
{d:"Análisis",q:"¿Por qué probar reintentos de una operación financiera?",o:[["Para detectar duplicación y problemas de idempotencia",3],["Para cambiar el diseño visual",0],["No aporta",0],["Solo para medir CPU",0]]},
{d:"Atención al detalle",q:"¿Qué debe cuidarse en evidencia de QA financiero?",o:[["No exponer datos sensibles y conservar referencias auditables",3],["Publicar números reales",0],["Compartir credenciales",0],["Omitir versión",1]]},
{d:"Comunicación",q:"Hay un incidente de pago. ¿Qué mensaje es más útil?",o:[["Hechos confirmados, alcance, impacto, mitigación y siguiente actualización",3],["Culpar sin investigar",0],["Decir 'todo mal'",0],["Esperar días",0]]}
]};

let questions=[],answers=[],idx=0;
const labels={software:"Desarrollo de software",electrical:"Sector eléctrico",medical:"Sector médico",banking:"Sector bancario"};
function start(){
 const sector=document.getElementById('psychSector').value;
 questions=[...GENERAL,...SECTOR[sector]];
 answers=Array(questions.length).fill(null);idx=0;
 document.getElementById('psychSectorLabel').textContent=labels[sector];
 document.getElementById('psychConfig').hidden=true;document.getElementById('psychResult').hidden=true;document.getElementById('psychQuiz').hidden=false;render();
}
function render(){
 const q=questions[idx];
 document.getElementById('psychProgress').textContent=`Pregunta ${idx+1} / ${questions.length}`;
 document.getElementById('psychDimension').textContent=q.d;
 document.getElementById('psychQuestion').textContent=q.q;
 document.getElementById('psychOptions').innerHTML=q.o.map((x,i)=>`<button class="answer-btn ${answers[idx]===i?'selected':''}" type="button" data-i="${i}">${String.fromCharCode(65+i)}. ${x[0]}</button>`).join('');
 document.querySelectorAll('#psychOptions .answer-btn').forEach(b=>b.onclick=()=>{answers[idx]=+b.dataset.i;render()});
 document.getElementById('psychPrev').disabled=idx===0;
 document.getElementById('psychNext').textContent=idx===questions.length-1?'Ver resultado':'Siguiente →';
 document.getElementById('psychNext').disabled=answers[idx]===null;
}
function finish(){
 const dims={Análisis:[0,0], "Atención al detalle":[0,0], Riesgo:[0,0], Comunicación:[0,0]};
 questions.forEach((q,i)=>{const score=q.o[answers[i]]?.[1]??0;dims[q.d][0]+=score;dims[q.d][1]+=3});
 const parts=Object.entries(dims).map(([k,[s,max]])=>({k,p:Math.round(s/max*100)}));
 document.getElementById('psychScores').innerHTML=parts.map(x=>`<div class="score-card"><strong>${x.k}</strong><span>${x.p}%</span><div class="mini-bar"><i style="width:${x.p}%"></i></div><small>${x.p>=80?'Fortaleza en esta práctica':x.p>=60?'Base adecuada; siga practicando':'Área para reforzar con ejercicios'}</small></div>`).join('');
 const avg=Math.round(parts.reduce((a,x)=>a+x.p,0)/parts.length);
 document.getElementById('psychSummary').textContent=`Promedio educativo: ${avg}%. Revise cada dimensión y use el resultado para orientar su práctica, no como diagnóstico ni decisión laboral.`;
 document.getElementById('psychQuiz').hidden=true;document.getElementById('psychResult').hidden=false;document.getElementById('psychResult').scrollIntoView({behavior:'smooth',block:'start'});
}
document.getElementById('startPsych').onclick=start;
document.getElementById('psychPrev').onclick=()=>{if(idx>0){idx--;render()}};
document.getElementById('psychNext').onclick=()=>{if(answers[idx]===null)return;if(idx===questions.length-1)finish();else{idx++;render()}};
document.getElementById('psychRetry').onclick=()=>{document.getElementById('psychResult').hidden=true;document.getElementById('psychConfig').hidden=false;};
