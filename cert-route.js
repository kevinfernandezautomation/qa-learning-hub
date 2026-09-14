(()=>{
 const p=new URLSearchParams(location.search),id=p.get('cert')||'CTFL';
 const c=(window.CERTIFICATIONS||[]).find(x=>x.id===id)||window.CERTIFICATIONS?.[0];if(!c)return;
 const impl=window.CERT_IMPLEMENTATION_DATA?.[c.id];const ws=window.CERT_WORK_SCENARIOS?.[c.id];
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v||'—'};
 document.title=`${c.name} · Capacitación | QA Learning Hub`;
 set('routeTitle',c.name);set('routeFocus',c.focus);set('routeLevel',c.level);set('routeK',c.k);set('routeDifficulty',c.difficulty);
 document.getElementById('routePractice').href=`simuladores.html?cert=${encodeURIComponent(c.id)}`;
 const ref=document.getElementById('routeReference');ref.href=c.url||'certificaciones.html';ref.textContent=c.id.startsWith('AICS')?'Fuente oficial ↗':'Ver syllabus / material oficial ↗';
 const focus=(c.focus||'').replace(/\.$/,'').split(',').map(s=>s.trim()).filter(Boolean);
 const modules=(impl?.steps?.length?impl.steps.map((x,i)=>[String(i+1).padStart(2,'0'),x.title,x.concept?`${x.concept}: ${x.action}`:x.action]):[
 ['01','Comprender el alcance',`Revise propósito, terminología y alcance: ${focus[0]||c.name}.`],['02','Estudiar conceptos esenciales','Relacione definiciones con decisiones y riesgos reales de testing.'],['03','Aplicar técnicas y prácticas',`Practique los temas centrales: ${focus.slice(0,3).join(', ')||'temario principal'}.`],['04','Resolver escenarios','Use contexto, restricciones, riesgo y evidencia para justificar decisiones.'],['05','Revisar brechas','Analice errores y vuelva al material de referencia.'],['06','Prepararse para evaluación','Realice simulaciones y confirme requisitos vigentes antes de pagar el examen.']]);
 set('routeModuleCount',String(modules.length));
 document.getElementById('routeModules').innerHTML=modules.map(([n,t,d])=>`<article class="learn-path-card"><span class="module-number">${n}</span><h3>${t}</h3><p>${d}</p></article>`).join('');
 const scenario=impl?.scenario||ws?.scenario||`${c.name} aplicado a un producto real`;
 const context=impl?.context||ws?.context||`Un equipo necesita aplicar ${c.name} para reducir riesgo y generar evidencia de calidad.`;
 const application=ws?.application||impl?.steps?.map(x=>x.action).slice(1).join(' ')||`Aplicar los objetivos de aprendizaje a decisiones verificables de testing.`;
 const deliverable=impl?.deliverable||ws?.deliverable||'Evidencia de testing trazable y una recomendación de calidad.';
 set('workScenarioTitle',scenario);set('workScenarioContext',context);set('workApplicationText',application);set('workDeliverable',deliverable);
 const steps=impl?.steps||[];
 document.getElementById('implementationSteps').innerHTML=(steps.length?steps:[{n:1,title:'Defina el problema',concept:'Contexto',action:context,evidence:'Alcance y riesgo documentados'},{n:2,title:'Aplique el conocimiento',concept:'Temario',action:application,evidence:deliverable},{n:3,title:'Revise evidencia',concept:'Cierre',action:'Compare resultados con criterios verificables y registre riesgo residual.',evidence:'Decisión sustentada'}]).map(s=>`<article class="implementation-step"><span class="step-index">${s.n}</span><div class="implementation-step-body"><span class="badge">${s.concept||'Aplicación'}</span><h3>${s.title}</h3><p>${s.action}</p><div class="step-evidence"><strong>Evidencia / entregable:</strong> ${s.evidence||deliverable}</div></div></article>`).join('');
 window.applyTranslations?.();
})();