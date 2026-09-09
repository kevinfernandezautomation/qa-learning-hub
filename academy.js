const grid=$('#academyGrid'),search=$('#certSearch'),lf=$('#levelFilter'),df=$('#difficultyFilter');
function coursePayLink(name){return `pago.html?course=${encodeURIComponent(name)}`}
function renderAcademy(){
  const q=(search?.value||'').toLowerCase(),lev=lf?.value||'',dif=df?.value||'';
  const list=window.CERTIFICATIONS.filter(c=>{const levelMatch=!lev||c.level===lev||(lev==='Foundation'&&c.id==='AICS-ASTFC');return levelMatch&&(!dif||c.difficulty===dif)&&(!q||[c.id,c.name,c.focus,c.level].join(' ').toLowerCase().includes(q));});
  if(!grid)return;
  grid.innerHTML=list.map(c=>`<article class="cert-card"><div class="cert-top"><span class="badge">${escapeHtml(c.level)}</span><span class="status">${escapeHtml(c.status)}</span></div><h2>${escapeHtml(c.name)}</h2><p>${escapeHtml(c.focus)}</p><div class="cert-meta"><span><b>Dificultad</b>${escapeHtml(c.difficulty)}</span><span><b>Nivel</b>${escapeHtml(c.k)}</span><span><b>Examen</b>${escapeHtml(c.exam)}</span></div><div class="card-actions"><a class="btn primary small" href="simuladores.html?cert=${encodeURIComponent(c.id)}">Practicar</a>${c.id==='CTFL'?'<a class="btn secondary small" href="ctfl-v4.html">Ver ruta CTFL v4.0 →</a>':''}<a class="btn secondary small" href="${c.url}" target="_blank" rel="noopener">Fuente oficial ↗</a></div></article>`).join('')||'<div class="empty-state"><h2>Sin resultados</h2><p>Cambie los filtros o la búsqueda.</p></div>';
  window.applyTranslations?.();
}
[search,lf,df].filter(Boolean).forEach(x=>x.addEventListener('input',renderAcademy));renderAcademy();

function renderLearningPaths(){
 const el=$('#learningPathGrid');if(!el)return;
 el.innerHTML=window.LEARNING_PATHS.map(x=>{
   const game=x.id==='game-qa',virtuoso=x.id==='virtuoso-qa',utest=x.id==='utest-academy';
   let cta,status='US$5 + IVA';
   if(game){cta=`<a class="btn primary small" href="https://frecuenciagamer.com/nuestros-cursos/qa-testing-para-videojuegos/" target="_blank" rel="noopener">Ir a Frecuencia Gamer ↗</a>`;status='Recurso externo';}
   else if(virtuoso){cta=`<a class="btn primary small" href="https://training.virtuosoqa.com/library/" target="_blank" rel="noopener">Abrir Virtuoso Training ↗</a>`;status='Training oficial';}
   else if(utest){cta=`<a class="btn primary small" href="https://www.utest.com/academy" target="_blank" rel="noopener">Abrir uTest Academy ↗</a>`;status='Gratis · externo';}
   else cta=`<a class="btn primary small" href="${coursePayLink(x.name)}">Inscribirse · US$5</a>`;
   return `<article class="learn-path-card"><div class="learn-card-head"><span class="module-type">Learning Path</span><span class="status">${status}</span></div><h2>${escapeHtml(x.name)}</h2><p>${escapeHtml(x.desc)}</p><div class="course-meta"><span>${escapeHtml(x.duration)}</span><span>${escapeHtml(x.level)}</span><span>${x.modules.length} módulos</span></div><ol class="module-list">${x.modules.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ol><div class="card-actions">${cta}</div></article>`;
 }).join('');window.applyTranslations?.();
}
function renderIndustry(){const el=$('#industryGrid');if(!el)return;el.innerHTML=window.INDUSTRY_PATHS.map(x=>`<article class="industry-card"><h3>${escapeHtml(x.sector)}</h3><p><b>Lenguajes:</b> ${escapeHtml(x.languages)}</p><p><b>Herramientas:</b> ${escapeHtml(x.tools)}</p><p><b>Enfoque:</b> ${escapeHtml(x.focus)}</p><a class="text-link" href="${x.url}" target="_blank" rel="noopener">Referencia ↗</a></article>`).join('');window.applyTranslations?.();}
function resourceCard(x){return `<article class="resource-card"><span class="badge">${escapeHtml(x.type)}</span><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.desc)}</p><a class="btn ghost small" href="${x.url}" target="_blank" rel="noopener">Abrir recurso ↗</a></article>`}
function renderLibrary(){if($('#ebookGrid'))$('#ebookGrid').innerHTML=window.EBOOKS.map(resourceCard).join('');if($('#magazineGrid'))$('#magazineGrid').innerHTML=window.MAGAZINES.map(resourceCard).join('');if($('#researchGrid'))$('#researchGrid').innerHTML=(window.RESEARCH_REPOSITORIES||[]).map(resourceCard).join('');window.applyTranslations?.();}
renderLearningPaths();renderIndustry();renderLibrary();

window.addEventListener('languagechange',()=>{renderAcademy();renderLearningPaths();renderIndustry();renderLibrary();});
