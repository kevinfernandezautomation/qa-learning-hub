(()=>{'use strict';
const data=window.QA_DIAGNOSTICOS||[],$=id=>document.getElementById(id),escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const API=(window.QA_DIAGNOSTICO_API_URL||'/api').replace(/\/$/,'');
let aggregate=null;
function instrumentsForRole(role){return data.map((d,i)=>({d,i})).filter(({d})=>role==='jefatura' ? (d.role==='Jefatura'||d.role==='Ambos') : (d.role==='Personal'||d.role==='Ambos'));}
function updateInstruments(){
 const choices=instrumentsForRole($('participant-role').value);
 $('instrument').innerHTML=choices.map(({d,i})=>`<option value="${i}">${escape(d.title)}</option>`).join('');
 render();
}
$('participant-role').addEventListener('change',updateInstruments);
function render(){const d=data[Number($('instrument').value)];$('questions').innerHTML=d.questions.map((q,i)=>`<fieldset><legend>${i+1}. ${escape(q.q)}</legend>${q.options.map((o,j)=>`<label class="diag-option"><input type="radio" name="q${i}" value="${j}" required> <span>${escape(o)}</span></label>`).join('')}</fieldset>`).join('');$('progress').textContent=`0 de ${d.questions.length} preguntas respondidas`;const bar=$('diag-progress-fill');if(bar)bar.style.width='0%';$('results').hidden=true;$('status').textContent='';}
$('instrument').addEventListener('change',render);
$('questions').addEventListener('change',()=>{const answered=$('questions').querySelectorAll('input:checked').length,total=data[Number($('instrument').value)].questions.length;$('progress').textContent=`${answered} de ${total} preguntas respondidas`;const bar=$('diag-progress-fill');if(bar)bar.style.width=`${total?answered/total*100:0}%`;});
function showResults(result){
 const d=data[Number($('instrument').value)], n=result.total, counts=result.counts;
 const percent=(v)=>n?(100*v/n).toFixed(1):'0.0';
 $('results').hidden=false;
 $('summary').textContent=`Resultados descriptivos de ${n} evaluación(es) para «${d.title}». ${result.aggregateAvailable?'Distribución consolidada de respuestas.':'Vista individual: los resultados de otras personas no se muestran hasta reunir al menos tres evaluaciones del mismo instrumento y organización.'}`;
 $('charts').innerHTML=d.questions.map((q,i)=>{
  const values=q.options.map((_,j)=>counts[i]?.[j]||0);
  const max=Math.max(...values), leaders=values.map((v,j)=>v===max&&v>0?j:-1).filter(j=>j>=0);
  const detail=leaders.length===1?`La respuesta más frecuente fue «${q.options[leaders[0]]}», seleccionada por ${max} de ${n} participante(s), equivalente al ${percent(max)} %.`:`Se presenta un empate entre ${leaders.length} alternativas con ${max} respuesta(s) cada una (${percent(max)} %).`;
  const rows=q.options.map((o,j)=>`<tr><td>${escape(o)}</td><td>${values[j]}</td><td>${percent(values[j])} %</td></tr>`).join('');
  const bars=q.options.map((o,j)=>`<div class="diag-barline"><span>${escape(o)}</span><div class="diag-track"><div class="diag-fill" style="width:${percent(values[j])}%"></div></div><strong>${values[j]} (${percent(values[j])} %)</strong></div>`).join('');
  return `<article class="diag-chart"><h3>Pregunta ${i+1}. ${escape(q.q)}</h3><p class="note">${n} respuesta(s) · Distribución de frecuencias</p><div role="img" aria-label="Gráfico de frecuencias para pregunta ${i+1}">${bars}</div><p class="diag-figure">Figura ${i+1}. Distribución de respuestas de la pregunta ${i+1}.</p><p class="note">Fuente: elaboración automática con respuestas registradas en QA Learning Hub.</p><h4>Tabla ${i+1}. Resultados de la pregunta ${i+1}</h4><div class="diag-table-scroll"><table class="diag-table"><thead><tr><th>Respuesta</th><th>Frecuencia</th><th>Porcentaje</th></tr></thead><tbody>${rows}<tr class="diag-total"><td>Total</td><td>${n}</td><td>100 %</td></tr></tbody></table></div><p class="diag-interpretation"><strong>Análisis descriptivo:</strong> ${escape(detail)} Esta distribución describe las percepciones registradas y no demuestra por sí sola el rendimiento real ni el cumplimiento de una norma.</p></article>`;
 }).join('');
 $('analysis').innerHTML=`<h3>Síntesis del diagnóstico</h3><p>Se analizaron ${n} evaluación(es) mediante frecuencias absolutas y porcentajes por alternativa. Las tablas y gráficos se elaboraron para cada pregunta del instrumento «${escape(d.title)}».</p><p>Las respuestas permiten identificar tendencias, diferencias de percepción y temas que requieren verificación. Para sustentar conclusiones sobre eficiencia, cobertura o defectos deben contrastarse con registros de ejecución, matrices de trazabilidad y evidencias verificables. No se infieren causas ni mejoras porcentuales sin una línea base comparable.</p><p class="note">Privacidad: cuestionario anónimo, sin solicitar nombre, correo ni identificador personal. No se solicita el nombre de la organización.</p>`;
 $('results').scrollIntoView({behavior:'smooth',block:'start'});
}
$('finish').addEventListener('click',async()=>{const index=Number($('instrument').value),d=data[index],answers=d.questions.map((_,i)=>{const e=$('questions').querySelector(`input[name="q${i}"]:checked`);return e?Number(e.value):null});if(answers.some(v=>v===null)){$('status').textContent='Debe responder todas las preguntas antes de terminar.';return;}const button=$('finish');button.disabled=true;$('status').textContent='Enviando evaluación de forma segura…';try{const response=await fetch(API+'/evaluations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({instrument:index,organization:'',answers})});const result=await response.json();if(!response.ok)throw Error(result.error||'No se pudo registrar la evaluación.');$('status').textContent='Evaluación registrada correctamente en la base de datos.';button.textContent='Evaluación finalizada';showResults(result);}catch(err){$('status').textContent='No se guardaron los resultados: '+err.message+'. Verifique la conexión con el servidor e inténtelo nuevamente.';button.disabled=false;}});
updateInstruments();
})();
