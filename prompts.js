
const source=window.PROMPT_DATA_FULL||[];
const grid=$('#promptGrid'),search=$('#promptSearch');
const toggleAll=$('#toggleAllPrompts');

function norm(value){
 return String(value||'')
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .toLowerCase()
  .replace(/[^a-z0-9+#.\s-]/g,' ')
  .replace(/\s+/g,' ')
  .trim();
}
function tokenize(v){return norm(v).split(/\s+/).filter(Boolean)}
function levenshtein(a,b){
 a=norm(a);b=norm(b);
 if(a===b)return 0;if(!a)return b.length;if(!b)return a.length;
 const prev=Array.from({length:b.length+1},(_,i)=>i),cur=new Array(b.length+1);
 for(let i=1;i<=a.length;i++){
  cur[0]=i;
  for(let j=1;j<=b.length;j++){
   cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
  }
  for(let j=0;j<=b.length;j++)prev[j]=cur[j];
 }
 return prev[b.length];
}
function approximateTokenMatch(qw,tw){
 if(tw===qw)return 1;
 if(tw.startsWith(qw)||tw.includes(qw)||qw.includes(tw))return .9;
 if(qw.length<4||tw.length<4)return 0;
 const d=levenshtein(qw,tw),max=Math.max(qw.length,tw.length);
 const sim=1-(d/max);
 return sim>=.72?sim:0;
}
function fuzzyScore(prompt,query){
 const q=norm(query);
 if(!q)return 1;
 const title=norm(prompt.title),desc=norm(prompt.desc),template=norm(prompt.template);
 const all=`${title} ${desc} ${template}`;
 if(title===q)return 180;
 if(title.includes(q))return 150;
 if(desc.includes(q))return 130;
 if(template.includes(q))return 110;

 const qWords=tokenize(q);
 const fields=[
   {text:title,weight:5},
   {text:desc,weight:3},
   {text:template,weight:1.2}
 ];
 let total=0,matchedWords=0;
 for(const qw of qWords){
   let best=0;
   for(const f of fields){
     const tokens=tokenize(f.text);
     for(const tw of tokens){
       best=Math.max(best,approximateTokenMatch(qw,tw)*f.weight);
     }
   }
   if(best>0){matchedWords++;total+=best;}
 }
 const ratio=matchedWords/Math.max(qWords.length,1);
 if(ratio===0)return 0;

 // Reward multi-word matches even when words are separated.
 const phraseBonus=qWords.length>1&&ratio===1?35:qWords.length>1&&ratio>=.67?18:0;
 // Require stronger coverage for longer queries to avoid unrelated cards.
 if(qWords.length>=3&&ratio<.5)return 0;
 return total*10+phraseBonus+ratio*25;
}
function updateToggleLabel(){
 const details=$$('details',grid);
 const allOpen=details.length>0&&details.every(d=>d.open);
 toggleAll.textContent=allOpen?'Contraer todos':'Expandir todos';
 toggleAll.setAttribute('aria-expanded',String(allOpen));
}
function renderPrompts(){
 const q=search?.value||'';
 const list=source.map((p,i)=>({...p,_i:i,_score:fuzzyScore(p,q)}))
  .filter(p=>!q||p._score>0)
  .sort((a,b)=>b._score-a._score||a._i-b._i);

 grid.innerHTML=list.map(p=>`<article class="prompt-card prompt-card-full">
   <span class="prompt-number">${String(p._i+1).padStart(2,'0')}</span>
   <h2>${escapeHtml(p.title)}</h2>
   <p>${escapeHtml(p.desc)}</p>
   <details>
     <summary>Ver Mega-Prompt completo</summary>
     <pre>${escapeHtml(p.template)}</pre>
     <button class="btn secondary small copy" data-i="${p._i}" type="button">Copiar Mega-Prompt completo</button>
   </details>
 </article>`).join('')||'<div class="empty-state"><h2>Sin coincidencias</h2><p>Pruebe con conceptos como requisitos, API, seguridad, automatización, defectos o mantenimiento.</p></div>';

 $$(`.copy`,grid).forEach(b=>b.onclick=async()=>{
   const text=source[+b.dataset.i].template;
   try{await navigator.clipboard.writeText(text);b.textContent='Copiado ✓';}
   catch{
     const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);
     ta.select();document.execCommand('copy');ta.remove();b.textContent='Copiado ✓';
   }
   setTimeout(()=>b.textContent='Copiar Mega-Prompt completo',1400);
 });
 $$('details',grid).forEach(d=>d.addEventListener('toggle',updateToggleLabel));
 updateToggleLabel();
}
search?.addEventListener('input',renderPrompts);
toggleAll?.addEventListener('click',()=>{
 const details=$$('details',grid);
 const shouldOpen=!details.every(d=>d.open);
 details.forEach(d=>d.open=shouldOpen);
 updateToggleLabel();
});
renderPrompts();
