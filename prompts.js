
const source=window.PROMPT_DATA_FULL||[];
const grid=$('#promptGrid'),search=$('#promptSearch');

function norm(value){
 return String(value||'')
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .toLowerCase()
  .replace(/[^a-z0-9+#.\s-]/g,' ')
  .replace(/\s+/g,' ')
  .trim();
}
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
function wordMatches(queryWord,textWord){
 if(!queryWord)return true;
 if(textWord.includes(queryWord)||queryWord.includes(textWord))return true;
 const max=Math.max(queryWord.length,textWord.length);
 if(max<4)return false;
 const allowance=max<=6?1:max<=10?2:3;
 return levenshtein(queryWord,textWord)<=allowance;
}
function fuzzyScore(prompt,query){
 const q=norm(query);if(!q)return 1;
 const text=norm([prompt.title,prompt.desc,prompt.template].join(' '));
 if(text.includes(q))return 100;
 const qWords=q.split(' ').filter(Boolean),tWords=text.split(' ').filter(Boolean);
 let matched=0;
 for(const qw of qWords){
  if(tWords.some(tw=>wordMatches(qw,tw)))matched++;
 }
 const ratio=matched/Math.max(qWords.length,1);
 if(ratio===1)return 80;
 if(qWords.length>=2&&ratio>=.67)return 60;
 if(qWords.length===1&&ratio===1)return 50;
 return 0;
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
   <details><summary>Ver Mega-Prompt completo</summary>
   <pre>${escapeHtml(p.template)}</pre>
   <button class="btn secondary small copy" data-i="${p._i}">Copiar Mega-Prompt completo</button>
   </details>
 </article>`).join('')||'<div class="empty-state"><h2>Sin coincidencias</h2><p>Pruebe con una palabra relacionada o una escritura similar.</p></div>';
 $$(`.copy`,grid).forEach(b=>b.onclick=async()=>{
   const text=source[+b.dataset.i].template;
   try{await navigator.clipboard.writeText(text);b.textContent='Copiado ✓';}
   catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();b.textContent='Copiado ✓';}
   setTimeout(()=>b.textContent='Copiar Mega-Prompt completo',1400);
 });
}
search?.addEventListener('input',renderPrompts);
$('#expandAllPrompts')?.addEventListener('click',()=>$$(`details`,grid).forEach(d=>d.open=true));
$('#collapseAllPrompts')?.addEventListener('click',()=>$$(`details`,grid).forEach(d=>d.open=false));
renderPrompts();
