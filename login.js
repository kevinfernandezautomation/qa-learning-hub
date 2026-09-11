
function passwordChecks(value){
  return {
    length:value.length>=8,
    upper:/[A-ZÁÉÍÓÚÑ]/.test(value),
    lower:/[a-záéíóúñ]/.test(value),
    number:/\d/.test(value),
    special:/[^A-Za-z0-9ÁÉÍÓÚÑáéíóúñ]/.test(value)
  };
}
function passwordIsValid(value){
  const c=passwordChecks(value);
  return c.length&&c.upper&&c.lower&&c.number&&c.special;
}
function renderPasswordRequirements(input){
  const target=document.querySelector(`[data-password-requirements="${input.id}"]`);
  if(!target)return;
  const c=passwordChecks(input.value);
  const item=(ok,label)=>`<li class="${ok?'ok':'pending'}">${ok?'✓':'○'} ${label}</li>`;
  target.innerHTML=[
    item(c.length,'Mínimo 8 caracteres'),
    item(c.upper,'Al menos una mayúscula'),
    item(c.lower,'Al menos una minúscula'),
    item(c.number,'Al menos un número'),
    item(c.special,'Al menos un carácter especial')
  ].join('');
}
['registerPassword','recoverPassword'].forEach(id=>{
  const input=document.getElementById(id);
  if(input){
    input.addEventListener('input',()=>renderPasswordRequirements(input));
    renderPasswordRequirements(input);
  }
});

const status=$('#loginStatus');
async function hash(v){const b=new TextEncoder().encode(v);const d=await crypto.subtle.digest('SHA-256',b);return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function accounts(){
 let list=[];try{list=JSON.parse(localStorage.getItem('academyAccounts')||'[]')}catch{}
 if(!Array.isArray(list))list=[];
 const legacy=(()=>{try{return JSON.parse(localStorage.getItem('academyAccount')||'null')}catch{return null}})();
 if(legacy?.email&&!list.some(a=>a.email===String(legacy.email).toLowerCase())){legacy.email=String(legacy.email).toLowerCase();list.push(legacy);localStorage.setItem('academyAccounts',JSON.stringify(list));}
 return list;
}
function findAccount(email){return accounts().find(a=>a.email===String(email||'').trim().toLowerCase())||null}
function emailIsDuplicate(email){return !!findAccount(email)}
function registrationReady(){
 const name=$('#registerName')?.value.trim()||'',email=$('#registerEmail')?.value.trim().toLowerCase()||'',pw=$('#registerPassword')?.value||'',cf=$('#registerConfirm')?.value||'';
 return name.split(/\s+/).filter(Boolean).length>=2 && /^\S+@\S+\.\S+$/.test(email) && passwordIsValid(pw) && pw===cf && !emailIsDuplicate(email);
}
function updateRegisterButton(){
 const b=$('#registerSubmit');if(!b)return;const ok=registrationReady();b.disabled=!ok;b.setAttribute('aria-disabled',String(!ok));
}
function showStatus(t){status.textContent=t}
function strongPassword(v){return passwordIsValid(v)}
function makePassword(){
  const upper='ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower='abcdefghijkmnopqrstuvwxyz';
  const digits='23456789';
  const special='!@#$%&*?_-';
  const all=upper+lower+digits+special;
  const pick=s=>s[crypto.getRandomValues(new Uint32Array(1))[0]%s.length];
  // Garantiza al menos un carácter de cada requisito antes de completar.
  let chars=[pick(upper),pick(lower),pick(digits),pick(special)];
  while(chars.length<14)chars.push(pick(all));
  for(let i=chars.length-1;i>0;i--){
    const r=crypto.getRandomValues(new Uint32Array(1))[0]%(i+1);
    [chars[i],chars[r]]=[chars[r],chars[i]];
  }
  const password=chars.join('');
  return passwordIsValid(password)?password:makePassword();
}
$$('[data-auth]').forEach(b=>b.onclick=()=>{$$('[data-auth]').forEach(x=>x.classList.toggle('active',x===b));$$('[data-auth-panel]').forEach(p=>p.hidden=p.dataset.authPanel!==b.dataset.auth);showStatus('')});
$('#generatePassword')?.addEventListener('click',()=>{
  const pw=makePassword();
  $('#registerPassword').value=pw;
  $('#registerConfirm').value=pw;
  renderPasswordRequirements($('#registerPassword'));updateRegisterButton();
  showStatus('Guarde la contraseña en un administrador de contraseñas y no la comparta.');
});
$('#registerForm').onsubmit=async e=>{
 e.preventDefault();
 const name=$('#registerName').value.trim(),email=$('#registerEmail').value.trim().toLowerCase(),pw=$('#registerPassword').value,cf=$('#registerConfirm').value;
 if(emailIsDuplicate(email)){showStatus('Ese correo ya está registrado.');updateRegisterButton();return}
 if(!strongPassword(pw)){showStatus('La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');return}
 if(pw!==cf){showStatus('Las contraseñas no coinciden.');updateRegisterButton();return}
 if(!registrationReady()){showStatus('Complete nombre, correo y contraseñas coincidentes antes de registrarse.');return}
 const list=accounts();const a={name,email,passwordHash:await hash(pw)};list.push(a);localStorage.setItem('academyAccounts',JSON.stringify(list));localStorage.setItem('academyUser',JSON.stringify({name,email}));
 showStatus('Cuenta creada. Bienvenido a la Academia.');updateRegisterButton();
};
$('#loginForm').onsubmit=async e=>{
 e.preventDefault();const email=$('#loginEmail').value.trim().toLowerCase(),pw=$('#loginPassword').value,a=findAccount(email);
 if(!a||a.passwordHash!==await hash(pw)){showStatus('Correo o contraseña incorrectos.');return}
 localStorage.setItem('academyUser',JSON.stringify({name:a.name,email:a.email}));showStatus(`Bienvenido, ${a.name}.`);$('#loginPassword').value='';
};
$('#recoverForm').onsubmit=async e=>{
 e.preventDefault();const email=$('#recoverEmail').value.trim().toLowerCase(),pw=$('#recoverPassword').value,a=findAccount(email);
 if(!strongPassword(pw)){showStatus('La nueva contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');return}
 if(!a){showStatus('No se encontró una cuenta con ese correo en este navegador.');return}
 const list=accounts(),i=list.findIndex(x=>x.email===email);list[i]={...list[i],passwordHash:await hash(pw)};localStorage.setItem('academyAccounts',JSON.stringify(list));showStatus('Contraseña actualizada. Ya puede iniciar sesión.');
};
// Mostrar / ocultar contraseñas con icono ojo / ojo tachado
const eyeSvg=(slashed=false)=>`<span class="eye-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="3"/>${slashed?'<path class="eye-slash" d="M4 4l16 16"/>':''}</svg></span>`;
document.querySelectorAll('[data-password-target]').forEach(btn=>{
  btn.innerHTML=eyeSvg(false);
  btn.addEventListener('click',()=>{
    const input=document.getElementById(btn.dataset.passwordTarget);if(!input)return;
    const show=input.type==='password';
    input.type=show?'text':'password';
    btn.setAttribute('aria-pressed',String(show));
    btn.setAttribute('aria-label',show?'Ocultar contraseña':'Mostrar contraseña');
    btn.innerHTML=eyeSvg(show);
  });
});
['registerName','registerEmail','registerPassword','registerConfirm'].forEach(id=>{
 const input=document.getElementById(id);if(!input)return;
 input.addEventListener('input',()=>{
  if(id==='registerPassword')renderPasswordRequirements(input);
  if(id==='registerEmail'&&input.value.trim()&&emailIsDuplicate(input.value)){showStatus('Ese correo ya está registrado.');}
  else if(id==='registerEmail'&&status.textContent==='Ese correo ya está registrado.')showStatus('');
  updateRegisterButton();
 });
});
updateRegisterButton();
