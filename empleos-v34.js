(function(){
 const btn=document.getElementById('searchQaLinkedIn');if(!btn)return;
 const COUNTRIES={"Americas": ["Antigua and Barbuda", "Argentina", "Bahamas", "Barbados", "Belize", "Bolivia", "Brazil", "Canada", "Chile", "Colombia", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "Ecuador", "El Salvador", "Grenada", "Guatemala", "Guyana", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Paraguay", "Peru", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Suriname", "Trinidad and Tobago", "United States", "Uruguay", "Venezuela"], "Europe": ["Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Holy See (Vatican City)", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom"], "Asia": ["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Türkiye", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"]};
 const JOBS=[{"title": "QA Engineer CR", "company": "Core Code io", "country": "Costa Rica", "continent": "Americas", "mode": "onsite", "type": "fulltime", "age": "~17 horas", "desc": "QA de software en Alajuela; oportunidad publicada recientemente en LinkedIn.", "url": "https://cr.linkedin.com/jobs/view/qa-engineer-cr-at-core-code-io-4464155224"}, {"title": "Automation QA Engineer CR", "company": "Core Code io", "country": "Costa Rica", "continent": "Americas", "mode": "onsite", "type": "fulltime", "age": "~17 horas", "desc": "Automatización QA y suites de testing; publicación reciente en LinkedIn.", "url": "https://cr.linkedin.com/jobs/view/automation-qa-engineer-cr-at-core-code-io-4464143927"}, {"title": "Application Tester CR", "company": "Core Code io", "country": "Costa Rica", "continent": "Americas", "mode": "onsite", "type": "fulltime", "age": "~1 día", "desc": "Testing de aplicaciones web, móvil y desktop; casos, regresión y defectos.", "url": "https://cr.linkedin.com/jobs/view/application-tester-cr-at-core-code-io-4464147975"}, {"title": "QA Tester", "company": "Unisys", "country": "Costa Rica", "continent": "Americas", "mode": "remote", "type": "fulltime", "age": "~3 días", "desc": "Pruebas funcionales, integración, UAT e incidentes/defectos.", "url": "https://cr.linkedin.com/jobs/view/qa-tester-at-unisys-4464366779"}, {"title": "Quality Assurance Engineer - Trabajo Remoto", "company": "BairesDev", "country": "Costa Rica", "continent": "Americas", "mode": "remote", "type": "fulltime", "age": "~2 días", "desc": "Quality Assurance remoto; listado reciente en LinkedIn Costa Rica.", "url": "https://cr.linkedin.com/jobs/qa-engineer-empleos"}, {"title": "QA Engineer / Test Automation", "company": "Cronos Europa", "country": "Portugal", "continent": "Europe", "mode": "onsite", "type": "fulltime", "age": "vigente en revisión", "desc": "Test automation para programa tecnológico de fabricante automotriz global en Lisboa.", "url": "https://pt.linkedin.com/jobs/view/qa-engineer-test-automation-at-cronos-europa-4458753246"}];
 const continent=document.getElementById('qaJobContinent');
 const country=document.getElementById('qaJobCountry');
 const status=document.getElementById('qaJobSearchStatus');
 const box=document.getElementById('qaJobResults');
 const labels={Americas:'América',Europe:'Europa',Asia:'Asia'};
 function populateCountries(){
   const c=continent.value;
   const selected=country.value;
   const list=c?COUNTRIES[c]:Object.values(COUNTRIES).flat();
   country.innerHTML='<option value="">Todos los países</option>'+[...new Set(list)].sort((a,b)=>a.localeCompare(b,'es')).map(x=>`<option value="${x}">${x}</option>`).join('');
   if([...country.options].some(o=>o.value===selected))country.value=selected;
 }
 function modeText(v){return v==='remote'?'Remoto':v==='hybrid'?'Híbrido':'Presencial'}
 function typeText(v){return v==='internship'?'Internship / pasantía':v==='contract'?'Contrato':'Tiempo completo'}
 function render(){
   const kw=(document.getElementById('qaJobKeyword').value||'').trim().toLowerCase();
   const c=continent.value,co=country.value,mode=document.getElementById('qaJobWorkplace').value,type=document.getElementById('qaJobType').value;
   const list=JOBS.filter(j=>(!kw||(`${j.title} ${j.company} ${j.desc}`.toLowerCase().includes(kw)||kw==='quality assurance'||kw==='qa'))&&(!c||j.continent===c)&&(!co||j.country===co)&&(!mode||j.mode===mode)&&(!type||j.type===type));
   status.hidden=true;status.textContent='';
   if(!list.length){
     box.innerHTML=`<div class="empty-state"><h3>No se encontraron vacantes verificadas con esos filtros</h3><p>Este catálogo contiene únicamente publicaciones reales verificadas durante la última revisión; no genera ofertas ficticias. Cambie los filtros o consulte LinkedIn con los mismos criterios.</p></div>`;
     return;
   }
   box.innerHTML=list.map(j=>`<article class="job-opportunity"><div class="job-card-top"><span class="badge">${modeText(j.mode)}</span><span class="job-age">${j.age}</span></div><h3>${j.title}</h3><p><strong>${j.company}</strong> · ${j.country} · ${labels[j.continent]}</p><p>${j.desc}</p><small>${typeText(j.type)}</small><div class="card-actions"><a class="btn secondary small" href="${j.url}" target="_blank" rel="noopener">Ver publicación ↗</a></div></article>`).join('');
 }
 continent.addEventListener('change',()=>{populateCountries();box.innerHTML='';status.hidden=true;});
 btn.addEventListener('click',render);
 document.getElementById('qaJobKeyword')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();render();}});
 populateCountries();
 box.innerHTML='';status.hidden=true;

 document.querySelectorAll('.employment-nav a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
   e.preventDefault();const target=document.querySelector(a.getAttribute('href'));if(!target)return;
   target.scrollIntoView({behavior:'smooth',block:'start'});
   history.replaceState(null,'',a.getAttribute('href'));
 }));
})();