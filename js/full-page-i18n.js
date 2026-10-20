/*
Full-page translation helper for static GitHub Pages.
- Existing local dictionaries translate common UI instantly.
- For "Aprender más" pages, Google Website Translator is used as a full-page
  fallback so dynamically rendered lessons, paragraphs, labels and examples
  are not left in Spanish.
- If the external translator is blocked, the site's local dictionaries remain active.
*/
(function(){
 window.QA_FULL_PAGE_I18N=true;
 const supported={es:'es',en:'en',pt:'pt',zh:'zh-CN',hi:'hi'};
 const sel=document.getElementById('language');
 if(!sel)return;

 const normalize=(v)=>supported[v]||'es';
 const cookieName='googtrans';

 function cookieValue(){
   const m=document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
   return m?decodeURIComponent(m[1]):'';
 }
 function setTranslateCookie(lang){
   const value=lang==='es'?'/es/es':`/es/${normalize(lang)}`;
   document.cookie=`${cookieName}=${encodeURIComponent(value)};path=/;SameSite=Lax`;
   // GitHub Pages sometimes needs the cookie at the parent host as well.
   if(location.hostname.endsWith('.github.io')){
     document.cookie=`${cookieName}=${encodeURIComponent(value)};path=/;domain=.github.io;SameSite=Lax`;
   }
 }
 function loadGoogleTranslator(){
   if(document.getElementById('google_translate_element'))return;
   const holder=document.createElement('div');
   holder.id='google_translate_element';
   holder.className='google-translate-holder';
   holder.setAttribute('aria-hidden','true');
   document.body.appendChild(holder);

   window.__qaGoogleTranslateReady=function(){
     if(!window.google?.translate?.TranslateElement)return;
     new google.translate.TranslateElement({
       pageLanguage:'es',
       includedLanguages:'en,pt,zh-CN,hi',
       autoDisplay:false
     },'google_translate_element');

     const wanted=normalize(localStorage.getItem('lang')||'es');
     if(wanted==='es')return;
     let tries=0;
     const timer=setInterval(()=>{
       const combo=document.querySelector('.goog-te-combo');
       if(combo){
         clearInterval(timer);
         if(combo.value!==wanted){
           combo.value=wanted;
           combo.dispatchEvent(new Event('change',{bubbles:true}));
         }
       }else if(++tries>40)clearInterval(timer);
     },150);
   };

   const script=document.createElement('script');
   script.src='https://translate.google.com/translate_a/element.js?cb=__qaGoogleTranslateReady';
   script.async=true;
   script.defer=true;
   document.head.appendChild(script);
 }

 const current=localStorage.getItem('lang')||'es';
 if(current!=='es'){
   setTranslateCookie(current);
   loadGoogleTranslator();
 }

 sel.addEventListener('change',(e)=>{
   const next=e.target.value;
   localStorage.setItem('lang',next);
   setTranslateCookie(next);
   // Reload ensures all static and dynamically rendered content is translated together.
   location.reload();
 });

 // Dynamic learning content can appear after common.js runs.
 window.addEventListener('qa-content-rendered',()=>{
   window.applyTranslations?.(localStorage.getItem('lang')||'es');
 });
})();