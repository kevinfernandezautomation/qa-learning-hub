# Refactorización JavaScript y comprobaciones

## Consolidaciones
- `payment-ui.js`: subscription.js, payment-choice.js
- `stack-detail-module.js`: stack-detail-data.js, stack-detail.js
- `istqb-exam-bank.js`: ctfl-syllabus-questions.js, ctfl-sample-style-questions.js, ctal-at-syllabus-questions.js, advanced-syllabus-questions.js, istqb-question-logic.js
- `career-jobs-module.js`: jobs.js, empleos-v34.js

## Comprobaciones automatizadas
- Páginas HTML revisadas: 66.
- Archivos JS antes: 60; después: 53.
- Referencias JS locales faltantes: 0.
- Errores de sintaxis con `node --check`: 0.
- Páginas HTML preservadas: sí.

## Alcance y limitaciones
Estas comprobaciones son estáticas. No constituyen una prueba de regresión funcional completa en navegadores, autenticación, accesibilidad o pagos. Para desplegar, validar manualmente los flujos críticos y las APIs externas.

## Grupos no consolidados
- `academy-ui.js`: different page references
- `pensions-learning.js`: different page references
- `psychometric-general-module.js`: scripts not contiguous in all pages
- `english-level-module.js`: scripts not contiguous in all pages
- `english-listening-module.js`: scripts not contiguous in all pages
- `english-qa-exam-module.js`: scripts not contiguous in all pages
- `english-core-module.js`: scripts not contiguous in all pages
- `prompt-library-module.js`: scripts not contiguous in all pages

## Pruebas de navegador
Se intentó ejecutar Chromium/Playwright en 13 páginas clave. El entorno bloqueó la navegación a direcciones locales y archivos (`ERR_BLOCKED_BY_ADMINISTRATOR`), por lo que **no se pudo ejecutar una regresión funcional real**. No debe interpretarse el éxito de los controles estáticos como garantía de funcionamiento integral. El detalle de los intentos está en `BROWSER_REGRESSION.json`.
