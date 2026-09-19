(()=>{const groups=[
['QA Strategy',['qa strategy','quality strategy','quality roadmap','operating model','process from scratch','proceso qa','standards']],
['Requirements & Acceptance',['acceptance criteria','requirements','business analyst','product manager','ux']],
['Planning & Traceability',['test strategy','test plan','estimates','traceability','trazabilidad']],
['Automation UI/API/E2E',['playwright','cypress','selenium','ui automation','api testing','postman','end-to-end','e2e']],
['CI/CD & Continuous Testing',['ci/cd','continuous integration','continuous delivery','pipeline','continuous testing']],
['Functional & Exploratory',['functional','exploratory','regression','integration']],
['Mobile/Compatibility/Accessibility',['mobile','accessibility','cross-browser','compatibility','wcag']],
['Performance/Scalability',['performance','scalability','load testing','stress']],
['Reliability/Resilience',['reliability','resilience','recovery','fault']],
['Risk-Based Testing',['risk-based','risk based','customer impact','technical risk']],
['UAT & Release Readiness',['uat','user acceptance','release readiness','go/no-go','go no go']],
['Quality Metrics',['automation coverage','escaped defects','defect trends','regression duration','release quality','quality metrics']],
['Defect Lifecycle',['defect lifecycle','defect tracking','jira','xray','zephyr','testrail']],
['GraphQL & Microservices',['graphql','microservices','rest api','contract testing']],
['Leadership & Mentoring',['mentor','mentoring','lead quality','quality team','technical guidance','stakeholders']],
['English/Communication',['english','b2','communication','technical discussions']]
];const route='senior-quality-engineering.html';function norm(s){return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}function run(){const raw=document.querySelector('#jobText').value;const t=norm(raw);if(t.trim().length<80){document.querySelector('#jobResult').innerHTML='<p class="feedback error">Pegue una descripción más completa para obtener un análisis útil.</p>';return}const hits=groups.map(([name,keys])=>({name,found:keys.some(k=>t.includes(norm(k))),matches:keys.filter(k=>t.includes(norm(k)))}));const requested=hits.filter(x=>x.found), missing=hits.filter(x=>!x.found);const coverage=Math.round(requested.length/groups.length*100);document.querySelector('#jobResult').innerHTML=`<div class="qe-scorecard"><div><b>${requested.length}</b><span>áreas detectadas</span></div><div><b>${coverage}%</b><span>de la matriz reconocida en el texto</span></div></div><h2>Competencias detectadas</h2><div class="match-grid">${requested.map(x=>`<article><b>✓ ${x.name}</b><small>${x.matches.slice(0,4).join(' · ')}</small></article>`).join('')||'<p>No se detectaron términos de la matriz.</p>'}</div><h2>Áreas no explícitas en la vacante</h2><p class="muted">No significa que sean brechas personales; solo que no fueron reconocidas en el texto pegado.</p><div class="match-grid">${missing.map(x=>`<article><b>○ ${x.name}</b></article>`).join('')}</div><p><a class="btn primary" href="${route}">Abrir ruta Senior/Lead</a></p>`}document.querySelector('#analyzeJob')?.addEventListener('click',run);document.querySelector('#clearJob')?.addEventListener('click',()=>{document.querySelector('#jobText').value='';document.querySelector('#jobResult').innerHTML='';});})();