(()=>{
const script=document.currentScript,root=new URL('../',script.src),href=p=>new URL(p,root).href;
function init(){
 const header=document.querySelector('.topbar');if(!header)return;
 const brand=header.querySelector('.brand-mark');if(brand)brand.textContent='✓';
 const nav=header.querySelector('.main-nav');if(nav){
  const links=[['Inicio','index.html'],['Academia','html/academia.html'],['Simuladores','html/simuladores.html'],['Certificaciones','html/certificaciones.html'],['IA aplicada a QA','html/prompts.html'],['Empleo','html/empleos.html']];
  nav.innerHTML=links.map(([name,path])=>`<a href="${href(path)}">${name}</a>`).join('');
 }
 const actions=header.querySelector('.header-actions');
 if(actions){
  const theme=actions.querySelector('#themeToggle');if(theme){theme.innerHTML='<i data-lucide="moon"></i>';theme.title='Cambiar tema';}
  const voice=actions.querySelector('#voiceNav');if(voice){
  const oldHandler=voice.onclick;
  const mic=document.createElement('button');mic.type='button';mic.className='icon-btn';mic.id='qaVoiceCommand';mic.title='Navegación por comandos de voz';mic.setAttribute('aria-label','Navegación por comandos de voz');mic.innerHTML='<i data-lucide="mic"></i>';voice.after(mic);
  mic.onclick=()=>{if(typeof oldHandler==='function')oldHandler.call(voice);};
  let reading=false;
  voice.innerHTML='<i data-lucide="volume-2"></i>';voice.setAttribute('aria-label','Escuchar contenido de la página');voice.title='Escuchar contenido de la página';
  voice.onclick=()=>{if(!('speechSynthesis' in window)){alert('La lectura por voz no está disponible en este navegador.');return;}
   if(reading){speechSynthesis.cancel();reading=false;voice.innerHTML='<i data-lucide="volume-2"></i>';icons();return;}
   const content=document.querySelector('main')?.innerText?.trim();if(!content)return;
   speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(content);utterance.lang='es-CR';utterance.rate=1;
   utterance.onend=utterance.onerror=()=>{reading=false;voice.innerHTML='<i data-lucide="volume-2"></i>';icons();};
   reading=true;voice.innerHTML='<i data-lucide="volume-x"></i>';icons();speechSynthesis.speak(utterance);
  };
 }
  const login=actions.querySelector('a[href*="login"]');if(login){login.classList.add('qa-login');login.innerHTML='<i data-lucide="user-round"></i><span>Iniciar sesión</span>';}
  const cart=actions.querySelector('#globalCartLink');if(cart)cart.innerHTML='<i data-lucide="shopping-cart"></i><span class="cart-count">0</span>';
  const menu=header.querySelector('#menuToggle');if(menu)menu.innerHTML='<i data-lucide="menu"></i>';
 }
 const a11y=document.querySelector('#accessibilityToggle');if(a11y)a11y.innerHTML='<i data-lucide="accessibility"></i>';
 const footer=document.querySelector('.qa-global-footer');
 if(footer){
  footer.innerHTML=`<div class="qa-footer-inner"><section class="qa-footer-brand"><div class="qa-footer-brandline"><span class="qa-footer-logo">✓</span><div><strong>QA Learning Hub</strong><small>Testing · Quality Engineering</small></div></div><p>Proyecto educativo independiente. Las marcas mencionadas pertenecen a sus respectivos titulares.</p><div class="qa-social"><a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">in</a><a href="https://www.youtube.com/@CalidadsinHumo" target="_blank" rel="noopener" aria-label="YouTube"><i data-lucide="youtube"></i></a><a href="https://github.com/kevinfernandezautomation" target="_blank" rel="noopener" aria-label="GitHub"><i data-lucide="github"></i></a></div></section><div class="qa-footer-sections"><details open><summary><i data-lucide="layers"></i> Explora</summary><a href="${href('index.html')}">Inicio</a><a href="${href('html/academia.html')}">Academia</a><a href="${href('html/simuladores.html')}">Simuladores</a><a href="${href('html/certificaciones.html')}">Certificaciones</a><a href="${href('html/pago.html')}">Inscripción</a></details><details open><summary><i data-lucide="book-open"></i> Recursos</summary><a href="https://www.youtube.com/@CalidadsinHumo">Calidad sin Humo</a><a href="https://traineristqb.pages.dev">Trainer ISTQB</a></details><details open><summary><i data-lucide="wrench"></i> Herramientas</summary><a href="${href('html/diagnostico-organizacional.html')}">Diagnóstico organizacional</a><a href="${href('html/recursos-comunidad.html')}">Recursos de la comunidad</a><a href="${href('html/empleos.html')}">Empleo QA</a></details><details><summary><i data-lucide="circle-help"></i> Ayuda</summary><a href="${href('html/faq.html')}">Preguntas frecuentes</a><a href="${href('html/pago.html')}">Planes de acceso</a></details></div></div><div class="qa-footer-bottom">© ${new Date().getFullYear()} QA Learning Hub. Todos los derechos reservados.<span>Los contenidos de terceros pertenecen a sus respectivos autores.</span></div><button class="qa-back-top" aria-label="Volver arriba" title="Volver arriba" type="button"><i data-lucide="arrow-up"></i></button>`;
  footer.querySelector('.qa-back-top').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
  if(matchMedia('(max-width:767px)').matches)footer.querySelectorAll('details').forEach(d=>d.open=false);
 }
 function icons(){if(window.lucide)window.lucide.createIcons();}
 icons();if(!window.lucide){const src=document.createElement('script');src.src='https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js';src.onload=icons;document.head.appendChild(src);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));else setTimeout(init,0);
})();