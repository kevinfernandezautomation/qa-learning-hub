(function(){
 const id=new URLSearchParams(location.search).get('id')||'manual';
 const data=window.STACK_DETAIL_DATA?.[id]||window.STACK_DETAIL_DATA?.manual;if(!data)return;
 document.title=`${data.name} | QA Learning Hub`;
 document.getElementById('stackTitle').textContent=data.name;
 document.getElementById('stackIntro').textContent=data.intro;
 document.getElementById('practiceStack').href=`simuladores.html?mode=stack&stack=${encodeURIComponent(id)}`;
 const lessons=document.getElementById('stackLessons');
 lessons.innerHTML=data.lessons.map((x,i)=>`<article class="lesson-block"><div class="lesson-num">${i+1}</div><div><h2>${x[0]}</h2><p>${x[1]}</p><div class="lesson-example"><strong>Aplicación en QA</strong><p>${x[2]}</p></div>${id==='mobile'&&i===0&&data.video?`<div class="browserstack-inline-video"><strong>Video recomendado</strong><p>${data.video.title}</p><a class="btn primary small" href="${data.video.url}" target="_blank" rel="noopener">▶ Ver video de BrowserStack en YouTube ↗</a></div>`:''}</div></article>`).join('')+(data.resources?`<article class="lesson-resources"><h2>Recursos recomendados</h2><div class="resource-links">${data.resources.filter(r=>!(id==='mobile'&&/video browserstack/i.test(r[0]))).map(r=>`<a href="${r[1]}" target="_blank" rel="noopener">${r[0]} ↗</a>`).join('')}</div></article>`:'');
 window.applyTranslations?.(localStorage.getItem('lang')||'es');
})();