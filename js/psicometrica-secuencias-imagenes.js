'use strict';
/* Figuras originales creadas localmente; no utiliza servicios externos. */
(()=>{
const $=id=>document.getElementById(id);
const cats={count:'Cantidad',rotate:'Rotación',shade:'Sombreado',move:'Posición',shape:'Cambio de forma',mixed:'Reglas combinadas'};
const names=['A','B','C','D'];
const items=[];
const wrap=(kind,vals,why)=>{
  const seq=[0,1,2,3].map(t=>({kind,...vals(t)}));
  const right={kind,...vals(4)};
  const wrong=why.wrong.map(v=>({kind,...v}));
  const candidates=[right,...wrong];
  const key=items.length%4;
  const opts=Array.from({length:4},(_,j)=>candidates[(j-key+4)%4]);
  items.push({cat:cats[kind],seq,opts,key,explain:why.explain});
};
for(let v=0;v<4;v++){
  const start=v+1;
  wrap('count',t=>({n:start+t,shape:['circle','square','triangle','diamond'][v]}),{
    wrong:[{n:start+3,shape:['circle','square','triangle','diamond'][v]},{n:start+5,shape:['circle','square','triangle','diamond'][v]},{n:start+2,shape:['circle','square','triangle','diamond'][v]}],
    explain:`Cada imagen agrega una figura: ${start}, ${start+1}, ${start+2}, ${start+3} y finalmente ${start+4}.`});
  const init=v*90;
  wrap('rotate',t=>({deg:(init+90*t)%360}),{
    wrong:[{deg:(init+90*3)%360},{deg:(init+90*5)%360},{deg:(init+90*2)%360}],
    explain:'La flecha gira 90 grados en sentido horario en cada paso. La siguiente orientación repite la dirección inicial después de cuatro giros.'});
  const invert=v%2;
  wrap('shade',t=>({filled:(t+invert)%2===0,shape:['square','circle','diamond','triangle'][v]}),{
    wrong:[{filled:(4+invert)%2!==0,shape:['square','circle','diamond','triangle'][v]},{filled:(4+invert)%2===0,shape:['circle','square','triangle','diamond'][v]},{filled:(4+invert)%2!==0,shape:['triangle','diamond','circle','square'][v]}],
    explain:'El sombreado alterna entre figura rellena y figura vacía. La forma permanece constante.'});
  wrap('move',t=>({pos:(v+t)%4}),{
    wrong:[{pos:(v+3)%4},{pos:(v+2)%4},{pos:(v+1)%4}],
    explain:'El punto avanza una posición en sentido horario por las cuatro esquinas del recuadro.'});
  wrap('shape',t=>({sides:3+(v+t)%4}),{
    wrong:[{sides:3+(v+3)%4},{sides:3+(v+2)%4},{sides:3+(v+1)%4}],
    explain:'La figura recorre el ciclo triángulo → cuadrado → pentágono → hexágono y vuelve a comenzar.'});
  const base=v+1;
  wrap('mixed',t=>({n:base+t,filled:t%2===v%2}),{
    wrong:[{n:base+t4(),filled:4%2!==v%2},{n:base+3,filled:4%2===v%2},{n:base+5,filled:4%2===v%2}],
    explain:'Dos reglas actúan a la vez: aumenta en uno la cantidad de puntos y el relleno alterna en cada paso.'});
}
function t4(){return 4}
// Corrige la clave de la alternativa para que todas las opciones sean distintas.
// El orden de opciones es una permutación de [correcta, distractor1, distractor2, distractor3].
function glyph(shape,x,y,r,filled){
 const fill=filled?'#2563eb':'none',stroke='#17466d';
 if(shape==='circle')return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
 if(shape==='square')return `<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
 const sides=shape==='triangle'?3:shape==='diamond'?4:shape==='pentagon'?5:shape==='hexagon'?6:4;
 const offset=shape==='diamond'?-Math.PI/2: -Math.PI/2;
 const pts=Array.from({length:sides},(_,i)=>`${(x+r*Math.cos(offset+i*2*Math.PI/sides)).toFixed(1)},${(y+r*Math.sin(offset+i*2*Math.PI/sides)).toFixed(1)}`).join(' ');
 return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}
function renderSvg(d){
 let inside='';
 if(d.kind==='count'||d.kind==='mixed'){
   const n=d.n;const cols=Math.min(4,Math.ceil(Math.sqrt(n)));const rows=Math.ceil(n/cols);
   const step=Math.min(24,72/Math.max(cols,rows));const r=Math.max(3,Math.min(8,step*.31));
   for(let i=0;i<n;i++){
     const x=50+(i%cols-(cols-1)/2)*step,y=50+(Math.floor(i/cols)-(rows-1)/2)*step;
     inside+=glyph(d.kind==='mixed'?'circle':d.shape,x,y,r,d.kind==='mixed'?d.filled:true);
   }
 }else if(d.kind==='rotate'){
   inside=`<g transform="rotate(${d.deg} 50 50)"><path d="M50 18 L50 78 M34 36 L50 18 L66 36" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
 }else if(d.kind==='shade')inside=glyph(d.shape,50,50,25,d.filled);
 else if(d.kind==='move'){
   const corners=[[24,24],[76,24],[76,76],[24,76]];
   inside='<rect x="15" y="15" width="70" height="70" rx="4" fill="none" stroke="#94a3b8" stroke-width="2"/>';
   inside+=glyph('circle',...corners[d.pos],10,true);
 }else if(d.kind==='shape')inside=glyph(({3:'triangle',4:'square',5:'pentagon',6:'hexagon'})[d.sides],50,50,28,false);
 return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Figura de ${cats[d.kind].toLowerCase()}">${inside}</svg>`;
}
let active=[],answers=[],index=0,mode='learn';
function show(id){['seqWelcome','seqQuiz','seqResult'].forEach(k=>$(k).hidden=k!==id)}
function shuffle(arr){for(let i=arr.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}
function start(){
 const n=Number($('seqLength').value);mode=$('seqMode').value;
 // Equilibrar tipos: dos o cuatro ejercicios por categoría.
 const by={};items.forEach(q=>(by[q.cat]??=[]).push(q));
 active=shuffle(Object.values(by).flatMap(a=>shuffle([...a]).slice(0,n===12?2:4)));
 answers=Array(active.length).fill(null);index=0;show('seqQuiz');draw();
}
function draw(){
 const q=active[index];$('seqProgress').textContent=`Pregunta ${index+1} de ${active.length}`;
 $('seqCategory').textContent=q.cat;$('seqBar').style.width=`${100*(index+1)/active.length}%`;
 $('seqFigures').innerHTML=q.seq.map((f,i)=>`<div class="seq-figure" aria-label="Figura ${i+1}">${renderSvg(f)}</div>`).join('')+'<div class="seq-figure seq-missing" aria-label="Figura faltante">?</div>';
 $('seqChoices').innerHTML=q.opts.map((o,i)=>`<button type="button" class="seq-option" data-choice="${i}" aria-pressed="${answers[index]===i}"><span>Opción ${names[i]}</span>${renderSvg(o)}</button>`).join('');
 $('seqChoices').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
   const choice=Number(b.dataset.choice);if(mode==='learn'&&answers[index]!==null)return;
   answers[index]=choice;draw();
 }));
 $('seqPrev').disabled=index===0;
 $('seqNext').textContent=index===active.length-1?'Ver resultados →':'Siguiente →';
 const reveal=mode==='learn'&&answers[index]!==null;
 $('seqFeedback').hidden=!reveal;
 if(reveal)$('seqFeedback').textContent=`${answers[index]===q.key?'Correcto.':'Respuesta correcta: opción '+names[q.key]+'.'} ${q.explain}`;
}
function finish(){show('seqResult');const correct=active.filter((q,i)=>answers[i]===q.key).length;
 $('seqSummary').textContent=`${correct} de ${active.length} respuestas correctas (${Math.round(correct/active.length*100)} %). Resultado de práctica educativa, sin baremos ni diagnóstico.`;
 const catScores={};active.forEach((q,i)=>{catScores[q.cat]??={ok:0,total:0};catScores[q.cat].total++;if(answers[i]===q.key)catScores[q.cat].ok++});
 $('seqBreakdown').innerHTML=Object.entries(catScores).map(([cat,s])=>`<span>${cat}: ${s.ok}/${s.total}</span>`).join('');
 $('seqReview').innerHTML=active.map((q,i)=>`<div class="seq-review-item"><strong>Pregunta ${i+1} · ${q.cat}</strong><p>Su respuesta: ${answers[i]===null?'Sin responder':names[answers[i]]} · Correcta: ${names[q.key]} ${answers[i]===q.key?'✓':'✗'}</p><p>${q.explain}</p></div>`).join('');
}
$('seqStart').addEventListener('click',start);$('seqRetry').addEventListener('click',()=>{show('seqWelcome');window.scrollTo({top:0,behavior:'smooth'})});
$('seqPrev').addEventListener('click',()=>{if(index>0){index--;draw()}});
$('seqNext').addEventListener('click',()=>{if(index<active.length-1){index++;draw()}else finish()});
})();
