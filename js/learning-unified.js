/* Shared, non-invasive learning navigation; independent of question engines. */
(()=>{'use strict';
 const configs={
 'ingles-listening.html':{group:'english',label:'Listening'},
 'ingles-speaking.html':{group:'english',label:'Speaking'},
 'ingles-writing.html':{group:'english',label:'Writing'},
 'psicometrica-general.html':{group:'psych',label:'General'},
 'psicometrica-qa.html':{group:'psych',label:'QA'},
 'competencia.html':{group:'paths',label:'Ruta QA'},
 'competencia.html?view=stack':{group:'paths',label:'Stack QA'},
 'ingles-qa.html':{group:'english-course',label:'Inglés para QA'},
 'ingles-modulo.html':{group:'english-course',label:'Práctica por módulo'}
 };
 const page=location.pathname.split('/').pop(),current=configs[page];if(!current)return;
 const main=document.querySelector('main');if(!main)return;
 document.body.classList.add('learning-unified');
 const group=Object.entries(configs).filter(([,v])=>v.group===current.group);
 const nav=document.createElement('nav');nav.className='unified-links';nav.setAttribute('aria-label','Actividades relacionadas');
 for(const [file,config] of group){const a=document.createElement('a');a.href=file;a.textContent=config.label;if(file===page)a.setAttribute('aria-current','page');nav.appendChild(a)}
 const hero=main.querySelector('.page-hero')||main.firstElementChild;
 if(hero)hero.insertAdjacentElement('afterend',nav);else main.prepend(nav);
 if(current.group==='psych'||current.group==='english'){
 const note=document.createElement('details');note.className='unified-guide';
 const summary=document.createElement('summary');summary.textContent='Indicaciones de práctica';
 const p=document.createElement('p');p.textContent='Complete la actividad en esta página. Los resultados son orientativos y no sustituyen una evaluación profesional. Puede cambiar de práctica desde los enlaces anteriores.';
 note.append(summary,p);nav.insertAdjacentElement('afterend',note);
 }
})();
