(function(){
 const id=new URLSearchParams(location.search).get('cert')||'CTFL';
 const d=window.CERT_IMPLEMENTATION_DATA?.[id]||window.CERT_IMPLEMENTATION_DATA?.CTFL;
 if(!d)return;
 document.title=`${d.name} · Aplicación laboral | QA Learning Hub`;
 document.getElementById('implTitle').textContent=d.name;
 document.getElementById('implIntro').textContent=`Escenario guiado para convertir ${d.focus} en acciones, evidencia y entregables de trabajo.`;
 document.getElementById('scenarioTitle').textContent=d.scenario;
 document.getElementById('scenarioContext').textContent=d.context;
 document.getElementById('scenarioDeliverable').textContent=d.deliverable;
 document.getElementById('implPractice').href=`simuladores.html?cert=${encodeURIComponent(d.id)}`;
 document.getElementById('implementationSteps').innerHTML=d.steps.map(s=>`<article class="implementation-step"><div class="step-index">${s.n}</div><div><span class="badge">${escapeHtml(s.concept)}</span><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.action)}</p><div class="step-evidence"><strong>Evidencia / entregable parcial</strong><p>${escapeHtml(s.evidence)}</p></div></div></article>`).join('');
 window.applyTranslations?.();
})();