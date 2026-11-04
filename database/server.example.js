// Example backend for QA Learning Hub. Do NOT expose DB credentials in frontend code.
// npm install express pg argon2 helmet express-rate-limit
const express = require('express');
const { Pool } = require('pg');
const argon2 = require('argon2');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV==='production'?{rejectUnauthorized:true}:false });
app.use(helmet()); app.use(express.json({limit:'20kb'})); app.use('/api/auth',rateLimit({windowMs:15*60*1000,max:50}));
app.post('/api/auth/register', async (req,res)=>{
  const fullName=String(req.body.fullName||'').trim(); const email=String(req.body.email||'').trim().toLowerCase(); const password=String(req.body.password||''); const lang=String(req.body.language||'es');
  const strong=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/.test(password);
  if(fullName.split(/\s+/).filter(Boolean).length<2||!/^\S+@\S+\.\S+$/.test(email)||!strong) return res.status(400).json({error:'Datos inválidos'});
  const exists=await pool.query('SELECT 1 FROM users WHERE email=$1 LIMIT 1',[email]);
  if(exists.rowCount) return res.status(409).json({error:'El correo ya está registrado'});
  try{
    const passwordHash=await argon2.hash(password,{type:argon2.argon2id});
    const q=`INSERT INTO users(full_name,email,password_hash,preferred_language) VALUES($1,$2,$3,$4) RETURNING id,full_name,email,preferred_language,created_at`;
    const {rows}=await pool.query(q,[fullName,email,passwordHash,['es','en','pt','zh','hi'].includes(lang)?lang:'es']);
    res.status(201).json({user:rows[0]});
  }catch(e){ if(e.code==='23505') return res.status(409).json({error:'El correo ya está registrado'}); console.error(e); res.status(500).json({error:'No fue posible crear la cuenta'}); }
});
app.listen(process.env.PORT||3000,()=>console.log('QA Learning Hub API ready'));
