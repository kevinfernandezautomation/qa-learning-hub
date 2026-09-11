-- QA Learning Hub v10 - PostgreSQL 15+
-- Ejecutar en el servidor. El navegador NO debe conectarse directamente a la base de datos.
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email CITEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  preferred_language VARCHAR(5) NOT NULL DEFAULT 'es' CHECK (preferred_language IN ('es','en','pt','zh','hi')),
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  practice_type VARCHAR(20) NOT NULL CHECK (practice_type IN ('certification','interview')),
  target_code VARCHAR(80) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  exam_language VARCHAR(5) NOT NULL DEFAULT 'es',
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 40),
  total_questions INTEGER NOT NULL DEFAULT 40,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exam_attempts_user_target ON exam_attempts(user_id,target_code,completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_reset_user ON password_reset_tokens(user_id);

-- Ejemplo de registro: el hash debe producirse en backend con Argon2id o bcrypt.
-- INSERT INTO users(full_name,email,password_hash,preferred_language)
-- VALUES ($1,$2,$3,$4)
-- RETURNING id,full_name,email,preferred_language,created_at;

-- CITEXT + UNIQUE impide correos duplicados sin diferenciar mayúsculas/minúsculas.
-- El constraint UNIQUE de users.email es la protección definitiva en base de datos.
