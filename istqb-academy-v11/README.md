# QA Learning Hub v11

Versión enfocada en calidad del simulador, entrevistas laborales, certificado PDF y experiencia de pago/empleo.

## Cambios principales
- Entrevista laboral separada de certificaciones: proveedor y certificación quedan deshabilitados cuando se selecciona entrevista.
- Bancos de certificación: 120 preguntas diferentes por certificación antes de seleccionar 40 aleatorias.
- Entrevistas: bancos independientes para Manual y Automatización, evitando mezclar herramientas de automatización en perfiles manuales.
- Eliminados prefijos artificiales como “En una entrevista para…”, “Caso 88” o “Preparación CTFL…”.
- Certificado PDF horizontal con diseño institucional propio inspirado en la estructura visual de la referencia suministrada; sin logos ni firmas de terceros.
- Certificado sin “Participante:” ni idioma; el nombre de la simulación aparece en el título y actividad.
- Pago con selector autocomplete/intellisense, filtros ISTQB/AICS/Academia y carrito múltiple.
- Menú renombrado de “Empleo QA” a “Empleo”.
- Empleo incluye filtro QA Jr / Mid / Sr / Lead que actualiza la búsqueda de LinkedIn.
- Corrección de contraste del botón Anterior en dark mode.

## Validación
- JavaScript validado con `node --check`.
- 10 páginas HTML y 0 enlaces internos rotos.
- 28 certificaciones/opciones con bancos de 120 preguntas únicas.
