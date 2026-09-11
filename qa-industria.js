(function(){
const el=document.getElementById('industryGrid');if(!el)return;
el.innerHTML=(window.INDUSTRY_PATHS||[]).map(x=>`<article class="industry-card"><h2>${escapeHtml(x.sector)}</h2><p><b>Lenguajes:</b> ${escapeHtml(x.languages)}</p><p><b>Herramientas:</b> ${escapeHtml(x.tools)}</p><p><b>Enfoque:</b> ${escapeHtml(x.focus)}</p><a class="btn ghost small" href="${x.url}" target="_blank" rel="noopener">Abrir referencia ↗</a></article>`).join('');
window.applyTranslations?.();
})();