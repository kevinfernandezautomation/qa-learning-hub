const status=$('#loginStatus');
async function hash(v){const b=new TextEncoder().encode(v);const d=await crypto.subtle.digest('SHA-256',b);return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function account(){return JSON.parse(localStorage.getItem('academyAccount')||'null')}
function showStatus(t){status.textContent=t}
function strongPassword(v){return v.length>=8&&/[A-Z]/.test(v)&&/[a-z]/.test(v)&&/\d/.test(v)}
function makePassword(){
  const upper='ABCDEFGHJKLMNPQRSTUVWXYZ',lower='abcdefghijkmnopqrstuvwxyz',digits='23456789',all=upper+lower+digits+'!@#$%';
  const pick=s=>s[crypto.getRandomValues(new Uint32Array(1))[0]%s.length];
  let chars=[pick(upper),pick(lower),pick(digits)];
  while(chars.length<14)chars.push(pick(all));
  for(let i=chars.length-1;i>0;i--){const r=crypto.getRandomValues(new Uint32Array(1))[0]%(i+1);[chars[i],chars[r]]=[chars[r],chars[i]]}
  return chars.join('');
}
$$('[data-auth]').forEach(b=>b.onclick=()=>{$$('[data-auth]').forEach(x=>x.classList.toggle('active',x===b));$$('[data-auth-panel]').forEach(p=>p.hidden=p.dataset.authPanel!==b.dataset.auth);showStatus('')});
$('#generatePassword')?.addEventListener('click',()=>{const pw=makePassword();$('#registerPassword').value=pw;$('#registerConfirm').value=pw;showStatus('Contraseña generada. Guárdela en un administrador de contraseñas y no la comparta.');});
$('#registerForm').onsubmit=async e=>{e.preventDefault();const name=$('#registerName').value.trim(),email=$('#registerEmail').value.trim().toLowerCase(),pw=$('#registerPassword').value,cf=$('#registerConfirm').value;if(!strongPassword(pw)){showStatus('La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.');return}if(pw!==cf){showStatus('Las contraseñas no coinciden.');return}localStorage.setItem('academyAccount',JSON.stringify({name,email,passwordHash:await hash(pw)}));localStorage.setItem('academyUser',JSON.stringify({name,email}));showStatus('Cuenta creada. Bienvenido a la Academia.');};
$('#loginForm').onsubmit=async e=>{e.preventDefault();const a=account(),email=$('#loginEmail').value.trim().toLowerCase(),pw=$('#loginPassword').value;if(!a||a.email!==email||a.passwordHash!==await hash(pw)){showStatus('Correo o contraseña incorrectos.');return}localStorage.setItem('academyUser',JSON.stringify({name:a.name,email:a.email}));showStatus(`Bienvenido, ${a.name}.`);$('#loginPassword').value='';};
$('#recoverForm').onsubmit=async e=>{e.preventDefault();const a=account(),email=$('#recoverEmail').value.trim().toLowerCase(),pw=$('#recoverPassword').value;if(!strongPassword(pw)){showStatus('La nueva contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.');return}if(!a||a.email!==email){showStatus('No se encontró una cuenta con ese correo en este navegador.');return}a.passwordHash=await hash(pw);localStorage.setItem('academyAccount',JSON.stringify(a));showStatus('Contraseña actualizada. Ya puede iniciar sesión.');};