import http from 'node:http';
import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=dirname(fileURLToPath(import.meta.url));
const dir=resolve(process.env.DATA_DIR||resolve(root,'data'));mkdirSync(dir,{recursive:true});
const db=new DatabaseSync(resolve(dir,'evaluaciones.sqlite'));
db.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS evaluations (id TEXT PRIMARY KEY, instrument INTEGER NOT NULL, organization TEXT NOT NULL, answers TEXT NOT NULL, created_at TEXT NOT NULL); CREATE INDEX IF NOT EXISTS idx_evals_org ON evaluations(organization,instrument);');
const PORT=Number(process.env.PORT||3000), ORIGIN=process.env.ALLOWED_ORIGIN||'http://localhost:3000',ADMIN_TOKEN=process.env.ADMIN_TOKEN||'';
const rate=new Map();
function respond(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':ORIGIN,'Vary':'Origin','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));}
function countsFor(rows,questions){return Array.from({length:questions},(_,i)=>{const max=Math.max(0,...rows.map(r=>r.answers[i]));return Array.from({length:max+1},(_,j)=>rows.filter(r=>r.answers[i]===j).length)});}
const server=http.createServer(async(req,res)=>{
if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization'});res.end();return;}
if(req.headers.origin && req.headers.origin!==ORIGIN){respond(res,403,{error:'Origen no autorizado'});return;}
if(req.method==='GET'&&req.url==='/api/health'){respond(res,200,{ok:true});return;}
if(req.method==='POST'&&req.url==='/api/evaluations'){
const ip=req.socket.remoteAddress||'unknown',now=Date.now(),hits=(rate.get(ip)||[]).filter(t=>now-t<60000);if(hits.length>=15){respond(res,429,{error:'Demasiados intentos; espere un minuto.'});return;}hits.push(now);rate.set(ip,hits);
let raw='';try{for await(const chunk of req){raw+=chunk;if(raw.length>16000)throw Error('Solicitud demasiado grande');}const body=JSON.parse(raw);const instrument=body.instrument,org=String(body.organization||'').trim().slice(0,120)||'Organización no indicada',answers=body.answers;
if(!Number.isInteger(instrument)||instrument<0||instrument>30||!Array.isArray(answers)||answers.length<1||answers.length>100||!answers.every(x=>Number.isInteger(x)&&x>=0&&x<20)){respond(res,400,{error:'Respuestas inválidas'});return;}
const id=randomUUID();db.prepare('INSERT INTO evaluations VALUES (?,?,?,?,?)').run(id,instrument,org,JSON.stringify(answers),new Date().toISOString());
const rows=db.prepare('SELECT answers FROM evaluations WHERE organization=? AND instrument=?').all(org,instrument).map(r=>({answers:JSON.parse(r.answers)})).filter(r=>r.answers.length===answers.length);
const aggregateAvailable=rows.length>=3;const selected=aggregateAvailable?rows:[{answers}];const counts=countsFor(selected,answers.length).map((arr,i)=>Array.from({length:Math.max(arr.length,answers[i]+1)},(_,j)=>arr[j]||0));respond(res,201,{saved:true,total:selected.length,aggregateAvailable,counts});
}catch(e){respond(res,400,{error:'No se pudo procesar la evaluación: '+e.message});}return;}
if(req.method==='GET'&&req.url?.startsWith('/api/admin/evaluations')){if(!ADMIN_TOKEN||req.headers.authorization!==`Bearer ${ADMIN_TOKEN}`){respond(res,401,{error:'Acceso restringido'});return;}const rows=db.prepare('SELECT id,instrument,organization,answers,created_at FROM evaluations ORDER BY created_at DESC LIMIT 5000').all();respond(res,200,{total:rows.length,records:rows.map(r=>({...r,answers:JSON.parse(r.answers)}))});return;}
respond(res,404,{error:'Ruta no encontrada'});
});server.listen(PORT,()=>console.log(`API diagnósticos disponible en puerto ${PORT}`));
