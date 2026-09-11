(function(){
'use strict';
const stat=$('#paymentStatus'),input=$('#paymentCourseInput'),suggestions=$('#courseSuggestions'),cat=$('#paymentCategory'),scheme=$('#paymentScheme'),cart=$('#cartItems');
const PRICE=Number(window.ACADEMY_COURSE_PRICE||5),VAT=Number(window.ACADEMY_VAT||0.13),catalog=[];const add=(name,category,schemeType,price=PRICE)=>{if(!catalog.some(x=>x.name===name))catalog.push({name,category,scheme:schemeType,price});};
(window.CERTIFICATIONS||[]).forEach(c=>add(`Preparación ${c.id} — ${c.name}`,c.id.startsWith('AICS-')?'Preparación AICS':'Preparación ISTQB',c.id.startsWith('AICS-')?'AICS':'ISTQB'));
add('Paquete certificaciones ISTQB','Paquete ISTQB','ISTQB',100);
(window.LEARNING_PATHS||[]).filter(x=>!x.external&&!x.free&&x.id!=='game-qa').forEach(x=>add(x.name,'Learning Path','OTROS'));
catalog.sort((a,b)=>a.category.localeCompare(b.category,'es')||a.name.localeCompare(b.name,'es'));let selected=new Set(),highlight=-1,currentMatches=[];
new URLSearchParams(location.search).getAll('course').forEach(r=>{const exact=catalog.find(x=>x.name===r)||catalog.find(x=>x.name.includes(r));if(exact)selected.add(exact.name);});
function money(n){return `US$${n.toFixed(2)}`;}
function filtered(){const q=(input.value||'').trim().toLowerCase(),c=cat.value,sc=scheme.value;return catalog.filter(x=>(!c||x.category===c)&&(!sc||x.scheme===sc)&&(!q||`${x.name} ${x.category} ${x.scheme}`.toLowerCase().includes(q))&&!selected.has(x.name));}
function hideSuggestions(){suggestions.hidden=true;input.setAttribute('aria-expanded','false');highlight=-1;}
function renderSuggestions(){currentMatches=filtered().slice(0,12);if(!currentMatches.length){suggestions.innerHTML='<div class="suggestion-empty">No se encontraron opciones.</div>';suggestions.hidden=false;input.setAttribute('aria-expanded','true');return;}suggestions.innerHTML=currentMatches.map((x,i)=>`<button type="button" class="course-suggestion${i===highlight?' active':''}" data-i="${i}" role="option"><strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(x.category)} · ${money(x.price)}</small></button>`).join('');suggestions.hidden=false;input.setAttribute('aria-expanded','true');$$('.course-suggestion',suggestions).forEach(b=>b.onclick=()=>choose(Number(b.dataset.i)));}
function choose(i){const item=currentMatches[i];if(!item)return;input.value=item.name;hideSuggestions();input.dataset.selected=item.name;}
function remove(name){selected.delete(name);render();}
function itemByName(name){return catalog.find(x=>x.name===name)}
function cartSubtotal(){return [...selected].reduce((sum,name)=>sum+(itemByName(name)?.price||PRICE),0)}
function render(){
 const items=[...selected],subtotal=cartSubtotal(),vat=subtotal*VAT,total=subtotal+vat;
 cart.innerHTML=items.length?items.map(name=>{
   const item=itemByName(name),price=item?.price||PRICE;
   return `<div class="cart-item"><div><strong>${escapeHtml(name)}</strong><small>${money(price)} + IVA</small></div><button class="icon-btn remove-cart" type="button" data-name="${escapeHtml(name)}" aria-label="Quitar del carrito">×</button></div>`;
 }).join(''):'<p>El carrito está vacío.</p>';
 $$('.remove-cart',cart).forEach(b=>b.onclick=()=>remove(b.dataset.name));
 $('#summaryCourses').innerHTML=items.length?`<ul>${items.map(name=>{const item=itemByName(name);return `<li>${escapeHtml(name)} <strong>${money(item?.price||PRICE)}</strong></li>`}).join('')}</ul>`:'<p>Seleccione al menos un curso.</p>';
 $('#summarySubtotal').textContent=money(subtotal);
 $('#summaryVat').textContent=money(vat);
 $('#summaryTotal').textContent=money(total);
 localStorage.setItem('selectedAcademyCourses',JSON.stringify(items));
 stat.textContent='';input.value='';delete input.dataset.selected;hideSuggestions();window.applyTranslations?.();
}
input.addEventListener('input',()=>{delete input.dataset.selected;renderSuggestions();});input.addEventListener('focus',renderSuggestions);
input.addEventListener('keydown',e=>{if(suggestions.hidden&&['ArrowDown','ArrowUp'].includes(e.key)){renderSuggestions();return;}if(e.key==='ArrowDown'){e.preventDefault();highlight=Math.min(highlight+1,currentMatches.length-1);renderSuggestions();}else if(e.key==='ArrowUp'){e.preventDefault();highlight=Math.max(highlight-1,0);renderSuggestions();}else if(e.key==='Enter'){e.preventDefault();if(highlight>=0)choose(highlight);else if(currentMatches.length===1)choose(0);}else if(e.key==='Escape')hideSuggestions();});
document.addEventListener('click',e=>{if(!e.target.closest('.autocomplete-wrap'))hideSuggestions();});cat.onchange=()=>{input.value='';renderSuggestions();};scheme.onchange=()=>{input.value='';renderSuggestions();};
$('#addIstqbPackage')?.addEventListener('click',()=>{selected.add('Paquete certificaciones ISTQB');render();});
$('#addCourseToCart').onclick=()=>{let name=input.dataset.selected||'';if(!name){const exact=filtered().find(x=>x.name.toLowerCase()===input.value.trim().toLowerCase());if(exact)name=exact.name;}if(!name){stat.textContent='Seleccione una opción de las sugerencias antes de agregarla.';renderSuggestions();return;}selected.add(name);render();};$('#clearCart').onclick=()=>{selected.clear();render();};
$$('[data-pay]').forEach(b=>b.onclick=()=>{$$('[data-pay]').forEach(x=>x.classList.toggle('active',x===b));$$('[data-pay-panel]').forEach(p=>p.hidden=p.dataset.payPanel!==b.dataset.pay);stat.textContent='';});
$('#cardNumber').oninput=e=>{e.target.value=e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()};$('#cardExpiry').oninput=e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);e.target.value=v.length>2?v.slice(0,2)+'/'+v.slice(2):v};
$('#cardPayment').onsubmit=e=>{e.preventDefault();if(!selected.size){stat.textContent='Seleccione al menos un curso antes de continuar.';return;}stat.textContent=`Checkout visual preparado para ${selected.size} curso${selected.size===1?'':'s'} por ${money(cartSubtotal()*(1+VAT))} (IVA incluido).`;};
$('#paypalDemo').onclick=()=>{if(!selected.size){stat.textContent='Seleccione al menos un curso antes de continuar con PayPal.';return;}stat.textContent=`Flujo visual de PayPal preparado para ${selected.size} curso${selected.size===1?'':'s'} por ${money(cartSubtotal()*(1+VAT))}.`;};
window.addEventListener('languagechange',render);render();
})();
