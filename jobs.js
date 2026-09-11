(function(){
'use strict';
const level=document.getElementById('jobLevel'),link=document.getElementById('linkedinJobSearch');if(!level||!link)return;
const terms={jr:'Junior QA OR Junior Quality Assurance OR QA Tester',mid:'QA Engineer OR Quality Assurance Engineer OR QA Analyst',sr:'Senior QA OR Senior Quality Assurance Engineer OR Senior QA Engineer',lead:'QA Lead OR Quality Assurance Lead OR Test Lead'};
const labels={jr:'QA Jr',mid:'QA Mid',sr:'QA Sr',lead:'QA Lead'};
function update(){const key=level.value||'jr';link.href='https://www.linkedin.com/jobs/search/?keywords='+encodeURIComponent(terms[key]);link.textContent='Buscar';}
level.addEventListener('change',update);update();
})();
