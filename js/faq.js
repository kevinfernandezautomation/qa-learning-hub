(() => {
 const data=window.QA_FAQ_CATALOG||[]; const list=document.getElementById('faqList');
 const search=document.getElementById('faqSearch');const filters=document.getElementById('faqFilters');const count=document.getElementById('faqCount');
 if(!list||!search||!filters)return;
 let category='Todas';const cats=['Todas',...new Set(data.map(x=>x.category))];
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const fold=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function render(){const query=fold(search.value.trim());const found=data.filter(x=>(category==='Todas'||x.category===category)&&fold(x.q+' '+x.a+' '+x.category).includes(query));
 count.textContent=`${found.length} ${found.length===1?'pregunta disponible':'preguntas disponibles'}`;
 list.innerHTML=found.length?found.map((x,i)=>`<article class="faq-entry"><h3 style="margin:0;font-size:1rem"><button type="button" aria-expanded="false" aria-controls="faq-answer-${i}" id="faq-question-${i}"><span>${escape(x.q)}</span><span class="faq-plus" aria-hidden="true">+</span></button></h3><div class="faq-answer-modern" id="faq-answer-${i}" role="region" aria-labelledby="faq-question-${i}" hidden><p>${escape(x.a)}</p><a href="${escape(x.link)}" ${x.link.startsWith('https:')?'target="_blank" rel="noopener noreferrer"':''}>Consultar recurso relacionado →</a></div></article>`).join(''):'<div class="faq-empty"><strong>No encontramos coincidencias.</strong><p>Pruebe con otra palabra o seleccione Todas.</p></div>';
 list.querySelectorAll('.faq-entry button').forEach(b=>b.addEventListener('click',()=>{const expanded=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!expanded));b.parentElement.nextElementSibling.hidden=expanded;b.querySelector('.faq-plus').textContent=expanded?'+':'−';}));
 }
 filters.innerHTML=cats.map((c,i)=>`<button type="button" class="faq-filter" data-category="${i}" aria-pressed="${i===0}">${escape(c)}</button>`).join('');
 filters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=cats[Number(b.dataset.category)];filters.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});
 search.addEventListener('input',render);render();
})();
