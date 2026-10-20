(function(){
const id=new URLSearchParams(location.search).get('module')||'qa-vocabulary';
let renderedLang=localStorage.getItem('lang')||'es';
const m=(window.ENGLISH_QA_MODULES||[]).find(x=>x.id===id)||window.ENGLISH_QA_MODULES?.[0];if(!m)return;
document.title=`${m.title} | QA Learning Hub`;document.getElementById('englishTitle').textContent=m.title;document.getElementById('englishSubtitle').textContent=m.subtitle;
function speak(text){if(!('speechSynthesis'in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)}
const SAMPLE_ANSWERS={
'qa-vocabulary':[
'Severity describes impact; priority describes how urgently the team should address the issue. A defect can be high severity but lower priority depending on context.',
'Checkout allows duplicate payment after retry.',
'A flaky test passes and fails without a meaningful product change. I would first check timing, data, environment, dependencies and selectors before treating it as a product defect.',
'Example: The expected result is a single transaction. The evidence shows two charges, so I would run regression around retry behavior and assess the business risk.',
'The release has acceptable functional coverage, but one residual risk remains in payment retries. The quality gate should stay blocked until the fix is verified or a rollback plan is approved.'
],
'bug-reports':[
'Login fails after submitting valid credentials on Chrome 150.',
'1. Open the login page. 2. Enter a valid user and an incorrect password. 3. Select Sign in and observe the error message.',
'Expected: selecting Save persists the record and shows a confirmation. Actual: the form closes, but the new value is not stored after refresh.'
],
'agile-meetings':[
'Yesterday I completed API regression for the payment service and found one blocker. Today I will retest the fix and continue checkout automation. My blocker is access to the latest test data.',
'Can we clarify what should happen when the API times out? Is the limit inclusive? Which user roles should see this option?',
'The main release risk is duplicate payment during retries. If it remains open, users could be charged twice, so I recommend blocking release until the fix is verified.'
],
'qa-interviews':[
'I’m a QA professional with experience in web, API and mobile testing. Recently I’ve focused on risk-based testing, automation and clear defect evidence. I’m looking for a role where I can help teams release reliable software while continuing to grow in Quality Engineering and automation.',
'Situation: a payment release showed duplicate transactions after retry. Task: confirm whether it was reproducible and assess impact. Action: I isolated the condition, captured logs and steps, aligned severity with the team and retested the fix. Result: the issue was corrected before release and a regression scenario was added.',
'I prioritize automation when a test is repetitive, stable, high-value and can run with controlled data. I also consider execution frequency and maintenance cost. I would not automate a rapidly changing exploratory flow if the maintenance cost is higher than the feedback value.',
'I once disagreed about the severity of a defect. I reproduced the user impact, linked it to the acceptance criterion and shared evidence rather than arguing from opinion. We reviewed it with Product Owner and agreed on priority and next steps.',
'I would first verify the test code, data, environment, dependencies and logs. If the failure is reproducible against a valid expected result and the automation itself is healthy, I would document it as a product defect with evidence.',
'How is release readiness decided? How do QA, developers and Product share responsibility for quality? What would success look like for this role in the first 90 days?'
],
'technical-reading':[
'Example summary: 1) Authentication is required for protected endpoints. 2) Requests must use JSON. 3) A 429 response means the rate limit was exceeded.',
'Example terms: endpoint, payload, timeout, retry, token, schema, deprecated, prerequisite, response, constraint. Write one technical sentence for each.',
'Example: “This API version is deprecated and will stop receiving updates after the stated date.” The limitation affects upgrade planning.'
],
'professional-writing':[
'Subject: Checkout blocker in build 2.8. The payment confirmation fails for valid Visa test cards in QA. I reproduced the issue three times and attached logs and steps. This blocks checkout regression. Please confirm when a fix is available so QA can retest.',
'Retested on build 2.8.4 in Chrome 150. The original issue is no longer reproducible with the same data. Evidence attached. I will keep the ticket open until the API regression completes.',
'Tested checkout, refunds and payment retries. Core scenarios passed, but one medium residual risk remains in delayed callbacks. Recommendation: release only if monitoring and rollback are ready.'
],
'medical-qa':[
'Verification asks whether the product was built according to specified requirements. Validation asks whether the resulting product supports its intended use and user needs in the intended context.',
'Risk control: prevent an invalid dosage value from being submitted. Evidence: requirement trace, boundary tests, UI validation result and system log showing rejected input.',
'The protocol was executed as planned. All acceptance criteria passed and no unresolved deviations affect the intended use covered by this test.'
],
'financial-qa':[
'Authorization checks whether the transaction can proceed; capture confirms the amount to be collected; settlement transfers the funds through the payment ecosystem.',
'A duplicate transaction was created after the user retried payment following a timeout. The same order ID produced two successful charges. Logs and transaction IDs are attached.',
'I would compare transaction totals between the application ledger and the processor report, identify unmatched records, verify currency/rounding rules and document any discrepancy.'
],
'project-manager':[
'Status: API integration is 80% complete. The main dependency is vendor access due Wednesday. One schedule risk remains. The team is testing a fallback and no milestone change is recommended yet.',
'Risk: the vendor may delay credentials. Mitigation: request access early, prepare mocks and define an escalation date. Contingency: move independent testing forward if access is late.',
'To close: Ana owns the API fix by Tuesday, Carlos validates the data on Wednesday, and I will update the risk log after both actions are complete.'
]};
function sampleFor(i){return (SAMPLE_ANSWERS[id]||[])[i]||'Compare su respuesta con el objetivo del ejercicio: claridad, evidencia, contexto y una conclusión concreta.'}
function practiceCard(x,i){return `<article class="practice-card"><b>${i+1}</b><h3>Practice task</h3><p>${x}</p><details class="practice-result"><summary>Ver ejemplo de respuesta</summary><div class="practice-result-body"><strong>Resultado orientativo</strong><p>${sampleFor(i)}</p><small>Úselo como referencia; adapte la respuesta a su experiencia y contexto.</small></div></details></article>`}
if(id==='qa-vocabulary'&&Array.isArray(window.QA_VOCABULARY_TERMS)){
 const lang=localStorage.getItem('lang')||document.documentElement.lang||'es';
 const isEn=lang==='en';
 const ui=isEn?{guide:'How to use this module',guideText:'Listen to the term, read the definition, review a professional QA example, and repeat it aloud. Learn each word in a realistic QA context instead of memorizing an isolated translation.',example:'Example',listen:'🔊 Listen to term and example',task:'Practice task',show:'View sample answer',result:'Suggested answer',note:'Use it as a reference and adapt it to your own experience and context.'}:{guide:'Cómo usar este módulo',guideText:'Escuche el término, lea la definición en español, observe una frase profesional en inglés y repítala en voz alta. No memorice la traducción de forma aislada: relacione cada palabra con una situación real de QA.',example:'Example',listen:'🔊 Escuchar término y ejemplo',task:'Ejercicio práctico',show:'Ver ejemplo de respuesta',result:'Resultado orientativo',note:'Úselo como referencia; adapte la respuesta a su experiencia y contexto.'};
 const categoryEn={'Fundamentos':'Fundamentals','Defectos':'Defects','Pruebas':'Testing','Riesgo':'Risk','Release':'Release','Automatización':'Automation','Calidad':'Quality','API/Seguridad':'API/Security','Arquitectura':'Architecture','Operación':'Operations','Gestión':'Management','Performance':'Performance','DevOps':'DevOps'};
 const meaningEn={
 'test case':'A documented set of preconditions, inputs, actions and expected results used to verify a test objective.','test scenario':'A high-level situation or flow that describes what should be tested.','expected result':'The result that should occur when the system behaves according to the requirement or oracle.','actual result':'The behavior actually observed during test execution.','acceptance criteria':'Conditions that must be satisfied for a user story or requirement to be accepted.','defect':'An imperfection in a work product that may cause a failure when executed or used.','failure':'An observable deviation from expected behavior during operation.','root cause':'The underlying factor that explains why a problem occurred.','severity':'The degree of technical or business impact caused by a defect.','priority':'The urgency with which a defect or work item should be addressed.','workaround':'A temporary alternative that reduces impact without correcting the underlying defect.','regression testing':'Testing performed to detect unintended effects after a change.','confirmation testing':'Testing focused on verifying that a specific defect has been fixed.','traceability':'The relationship among requirements, risks, tests, results and defects.','test oracle':'A source used to determine whether an observed result is correct.','risk-based testing':'An approach that adjusts test priority and depth according to product risk.','residual risk':'Risk that remains after mitigations or testing have been applied.','release readiness':'An assessment of whether evidence and risk support proceeding with a release.','quality gate':'An objective criterion used before allowing a change to progress through delivery.','rollback':'The action of returning to a previous version after a serious release problem.','locator':'A strategy used to identify a user-interface element in automation.','assertion':'A programmatic check of an expected result.','fixture':'Reusable setup of data, context or resources for tests.','mock':'A controlled substitute that simulates the behavior of a dependency.','flaky test':'A test that can pass or fail without a meaningful product change.','pipeline':'An automated sequence for building, testing and deploying software.','build':'An identifiable constructed version of software that can be tested or released.','deployment':'The process of installing or promoting a version to an environment.','accessibility':'The ability of a product to be used by people with diverse needs and assistive technologies.','performance testing':'Evaluation of response time, capacity and stability under defined loads.','authentication':'The process of verifying the identity of a person or system.','authorization':'Control over which actions an authenticated identity is allowed to perform.','contract testing':'Verification of interface agreements between service consumers and providers.','microservice':'A small independent service that collaborates with others through defined interfaces.','observability':'The ability to understand internal system state through logs, metrics and traces.','resilience':'The ability to maintain or recover service when dependencies or infrastructure fail.','scalability':'The ability to sustain increased load through appropriate resources or architecture.','test strategy':'The overall approach defining objectives, scope, risks, test types, resources and criteria.'};
 const cards=window.QA_VOCABULARY_TERMS.map((x,i)=>`<article class="learn-path-card vocab-card"><span class="badge">${isEn?(categoryEn[x.category]||x.category):x.category}</span><h2>${x.term}</h2>${isEn?'':`<p class="vocab-es"><strong>${x.es}</strong></p>`}<p>${isEn?(meaningEn[x.term]||x.meaning):x.meaning}</p><div class="vocab-example"><strong>${ui.example}:</strong> ${x.example}${isEn?'':`<br><small>${x.translation}</small>`}</div><button class="btn ghost small vocab-audio" type="button" data-speak="${i}">${ui.listen}</button></article>`).join('');
 document.getElementById('englishLearn').innerHTML=`<article class="vocab-guide"><h2>${ui.guide}</h2><p>${ui.guideText}</p></article>`+cards;
 document.querySelectorAll('[data-speak]').forEach(b=>b.addEventListener('click',()=>{const x=window.QA_VOCABULARY_TERMS[Number(b.dataset.speak)];speak(`${x.term}. ${x.example}`)}));
 const tasks=isEn?['Listen to ten terms and repeat each sentence without reading it a second time.','Explain in English the difference between defect, failure and root cause.','Describe a bug using severity, priority, expected result and actual result.','Explain why a flaky test should not automatically be treated as a product defect.','Prepare a release update using risk, residual risk, quality gate and rollback.']:['Escuche diez términos y repita cada frase sin leerla por segunda vez.','Explique en inglés la diferencia entre defect, failure y root cause.','Describa un bug usando severity, priority, expected result y actual result.','Explique por qué un flaky test no debe asumirse automáticamente como defecto del producto.','Prepare un release update usando risk, residual risk, quality gate y rollback.'];
 const samples=SAMPLE_ANSWERS[id]||[];
 document.getElementById('englishPractice').innerHTML=tasks.map((x,i)=>`<article class="practice-card"><b>${i+1}</b><h3>${ui.task}</h3><p>${x}</p><details class="practice-result"><summary>${ui.show}</summary><div class="practice-result-body"><strong>${ui.result}</strong><p>${samples[i]||''}</p><small>${ui.note}</small></div></details></article>`).join('');
}else{
 document.getElementById('englishLearn').innerHTML=m.learn.map((x,i)=>`<article class="learn-path-card"><span class="module-type">Parte ${i+1}</span><h2>${x[0]}</h2><p>${x[1]}</p></article>`).join('');
 if(id==='qa-interviews'){
   document.getElementById('englishLearn').insertAdjacentHTML('beforeend',`<article class="learn-path-card interview-reference-card"><span class="module-type">Referencias</span><h2>Cómo practicar mejor</h2><p>Las recomendaciones siguen buenas prácticas de entrevistas: respuestas concisas y relevantes, ejemplos específicos y estructura Situation–Action–Result / STAR para preguntas conductuales.</p><div class="card-actions"><a class="btn ghost small" href="https://careerservices.fas.harvard.edu/resources/interviewing/" target="_blank" rel="noopener">Harvard · Interviewing ↗</a><a class="btn ghost small" href="https://www.coursera.org/articles/qa-interview-questions" target="_blank" rel="noopener">Coursera · QA interview questions ↗</a></div></article>`);
 }
 document.getElementById('englishPractice').innerHTML=m.practice.map(practiceCard).join('');
}
window.addEventListener('languagechange',()=>{const next=localStorage.getItem('lang')||'es';if(id==='qa-vocabulary'&&next!==renderedLang)location.reload();});
})();
