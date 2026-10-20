# Persistencia de cuentas

`schema.sql` está diseñado para PostgreSQL 15+. La aplicación estática de GitHub Pages no debe abrir una conexión directa a PostgreSQL.

Flujo recomendado: navegador -> API HTTPS -> servicio backend -> PostgreSQL. El backend valida datos, genera `password_hash` con Argon2id/bcrypt, crea tokens aleatorios de sesión/recuperación y guarda solo sus hashes.

Endpoints sugeridos: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`, `POST /api/exam-attempts`.
