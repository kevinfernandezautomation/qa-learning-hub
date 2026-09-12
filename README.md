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


## v12
- uTest integrado en Academia y Empleo.
- Ruta CTFL v4.0 estilo Learning Path.
- AICS ASTFC visible al filtrar Foundation.
- Repositorios GitHub y QA Agent movidos a Prompts IA.
- Revista CPIC y repositorios universitarios añadidos.
- Mejoras responsive para voz/encabezado móvil.
- Registro con reglas de contraseña y generador.
- Botón volver al inicio.


## v13
- AcademyBugs integrado como laboratorio gratuito de detección y reporte de defectos.
- Flecha volver al inicio en todas las páginas.
- Menú de accesibilidad ampliado con lectura, contraste, texto, espaciado, imágenes, cursor, estructura, altura de línea, alineación y saturación.
- Mostrar/ocultar contraseña en acceso, registro, confirmación y recuperación.
- Academia ampliada para C#, JavaScript, Java, Python, SQL Server, PL/SQL, TFS/Azure DevOps, JMeter, k6, Selenium y caja negra web/móvil.
- Todas las certificaciones muestran Ver ruta; CTFL mantiene ruta específica y las demás usan ruta-certificacion.html.
- SEO: titles/descriptions únicos, canonical, Open Graph, JSON-LD, robots.txt y sitemap.xml.

## v14
- Panel de accesibilidad rediseñado: mejor ancho, tarjetas, cierre compacto y vista móvil en 2 columnas.
- Página `stacks-qa.html` con rutas de herramientas, lenguajes y tecnologías para QA.
- Documentación técnica del Agente QA con IA integrada en Prompts IA y PDF incluido en `docs/`.
- Botón `Ver syllabus` para cada certificación ISTQB; se usan PDFs oficiales directos cuando están identificados y la página oficial como respaldo para las demás.
- Stacks QA añadido a navegación, sitemap y ruta por voz.

## v15
- Iconos de contraseña reemplazados por ojo / ojo tachado mediante SVG.
- Formularios de acceso ajustados a 520 px de tarjeta y 460 px de área útil; límites de nombre 80, correo 254 y contraseña 64 caracteres.
- Stacks QA integrado dentro de Academia; `stacks-qa.html` conserva redirección de compatibilidad.
- Nuevo modo `Stack QA` en Simuladores con Básico, Intermedio y Avanzado; 48 preguntas únicas por nivel/stack y 40 aleatorias por intento.
- Nuevo stack Salesforce QA basado en Trailhead y prácticas de sandbox, UAT, Apex, LWC y automatización.
- Performance Lab ampliado con JMeter, k6, CI/CD, repositorios GitHub y video de Grafana.
- Workday Careers intenta abrir la búsqueda `Quality Assurance` mediante el parámetro de búsqueda de Workday.
- FAQ revisado y actualizado a 20 preguntas relevantes para la versión actual.

## v16
- Corregido el motor de Stack QA: Anterior/Siguiente/Finalizar utiliza un único estado de 40 respuestas.
- Correos con placeholder `nombre@dominio.com` y participante con `Nombre Apellidos`.
- Dificultades de Stack QA: Básico / Intermedio / Avanzado, sin texto `práctica guiada`.
- Registro indica que la contraseña se transforma mediante hash antes de almacenarse.
- Certificado usa únicamente el encabezado `Certificado de aprovechamiento`; CTFL deja de aparecer en esa línea.
- Nuevo banco CTFL original alineado con los seis capítulos examinables del syllabus v4.0.1, con niveles Básico, Intermedio y Avanzado.

## v17
- Secciones vacías del simulador ocultas; campos de certificación/proveedor no se muestran en Stack QA.
- Validación visual y lógica de contraseña: 8+ caracteres, mayúscula, minúscula y número.
- CTAL-AT v2.0 enlaza a su página oficial correcta.
- Banco CTAL-AT original basado en sus seis capítulos y subsecciones examinables, con niveles Básico, Intermedio y Avanzado.
- Cada ruta de competencias QA incluye `Aprender más` y una página con módulos y recursos.
- Página específica `qa-imagenes-ia.html` para QA visual e IA.

## v18
- Workday abre el portal oficial sin parámetros frágiles; se agregó guía de búsqueda para Quality Assurance.
- Nombre del certificado usa placeholder `Nombre Apellidos` y no precarga `Participante`.
- En Stack QA se oculta `Antes de pagar el examen oficial`.
- Stack QA ahora permite Sin cronómetro, 60, 45 o 30 minutos.
- Contraseña exige carácter especial; checklist verde/rojo y validación al generar automáticamente.
- Eliminado texto técnico sobre hash en el formulario.
- Título de simulación cambia dinámicamente a la certificación, entrevista o stack seleccionado.
- Eliminado texto estático del banco de 120 preguntas al iniciar simulación.
- Cada Stack QA incluye `Aprender más` con contenido detallado por subtema.
- Performance Lab dejó de mostrarse siempre; ahora se accede desde JMeter + k6 → Aprender más.

## v19
- Eliminado `Volver a Stacks QA` de Simuladores.
- Botón `Comenzar` permanece inhabilitado hasta ingresar nombre y apellidos válidos.
- En Stack QA se unificaron nivel y tiempo en un solo selector: Básico/Intermedio/Avanzado con duración incluida.
- `Antes de pagar el examen oficial` solo se muestra en modo Certificación.
- El certificado PDF solo se habilita con 70% o más (28/40).
- Academia agrega accesos rápidos `Cursos gratis` y `QA por industria` junto a Biblioteca.

## v20
- Eliminada la mención a Microsoft Learn en la introducción de Academia.
- `Cursos gratis` ahora abre una página independiente (`cursos-gratis.html`).
- `QA por industria` ahora abre una página independiente (`qa-industria.html`).
- Se corrigieron accesos duplicados/rotos del menú interno de Academia.
- Se aumentó `scroll-margin-top` para que los títulos de las secciones queden visibles debajo del encabezado fijo en escritorio y móvil.

## v21
- Eliminadas de Academia las secciones duplicadas `Cursos técnicos dentro de la Academia` y `QA por sector de industria`.
- Agregados accesos rápidos a Ebooks, Revistas y Repositorios universitarios y tesis.
- Generador de contraseña garantiza mayúscula, minúscula, número y carácter especial; checklist se actualiza inmediatamente.
- Mensaje de contraseña generado simplificado.
- Carrito incorpora `Paquete certificaciones ISTQB` por US$100 + IVA con cálculo por precio individual.
- Tarjeta de LinkedIn Jobs compactada para eliminar espacio en blanco innecesario.
- Recomendación 9 de Empleo enlaza directamente a Simuladores en modo Entrevista laboral.

## v22
- Validado que `Preparación complementaria` y su `prepGrid` estén en `cursos-gratis.html`.
- Eliminada `Preparación complementaria` de `academia.html`.
- Biblioteca movida fuera de Academia a `biblioteca.html`.
- `biblioteca.html` contiene Ebooks, Revistas y Repositorios universitarios y tesis.
- Academia ahora enlaza a Biblioteca mediante página independiente.

## v23
- Eliminado el bloque de autoría/actualización de la página Prompts IA.
- Buscador de Prompts IA mejorado con búsqueda aproximada: ignora tildes, mayúsculas y tolera pequeñas diferencias de escritura.
- LinkedIn Jobs incorpora una guía `Cómo buscar trabajo`.
- Workday cambia el título de ayuda a `Cómo buscar vacantes`.
- Virtuoso QA actualizado a 9 cursos/rutas de la Training Library y 22 h totales según el catálogo suministrado.
- `Competencias QA profesional` se unifica dentro de `Learning paths y competencias QA`; se elimina la sección separada.

## v24
- Certificaciones movidas a `certificaciones.html`; Academia ya no duplica ese catálogo.
- Stacks QA rediseñados con el mismo estilo visual de Learning Paths.
- Eliminado duplicado de `QA con imágenes e IA`; se conserva la primera ruta y ahora incluye `Aprender más`.
- Nueva competencia `Software Quality Engineering para dispositivos médicos y SaMD`, con C#/.NET, Angular, SQL Server, V&V, trazabilidad, IEC 62304 e ISO 13485.
- Learning Paths incorpora credenciales externas verificadas para Python testing, Java, SQL Server, PL/SQL, DevOps, performance, Selenium, automatización ISTQB y mobile.
- Bancos propios nuevos para CTAL-TA, CTAL-TAE, CTAL-TM y CTAL-TTA, basados en la estructura de los syllabus adjuntos y con niveles Básico/Intermedio/Avanzado.
- Prompts IA incorpora repositorios GitHub para Selenium, REST Assured/API, Java QA, JMeter, k6, SQL Server y PL/SQL.
- Empleo incorpora guía de freelance, ANE Costa Rica y Get on Board.

## v25
- Agregada `GUIA_INTEGRACION_PAGO_BANCO.txt` con requisitos, arquitectura, seguridad, webhook, PCI, pruebas y checklist.
- Certificaciones externas retiradas de Academia y movidas a la página `certificaciones.html`.
- Stacks QA integrados en el mismo grid de Learning Paths, sin duplicidad; botones `Aprender más` y `Practicar`.
- Agregado stack `Jira + Confluence para QA` con cursos oficiales gratuitos de Atlassian.
- Simulador bloquea respuestas al vencer el tiempo y muestra/posiciona la sección de resultados.
- Registro frontend impide correos duplicados y habilita `Registrarse` solo con datos válidos y contraseñas coincidentes.
- Backend + PostgreSQL mantienen protección definitiva contra correos duplicados mediante CITEXT UNIQUE y respuesta HTTP 409.
- Academia conserva selección acumulativa tipo carrito mediante localStorage.
- Eliminado el texto del paquete ISTQB solicitado.
- QA por industria incorpora una referencia de producto para cada sector.
- Nueva ruta `English for QA` con Business English, vocabulario de testing, defectos, entrevistas y documentación.

## v26
- Corregido carrito: Academia persiste la selección y Pago restaura `selectedAcademyCourses`.
- Icono global de carrito agregado al header con contador.
- Botones de cursos pagados simplificados a `Agregar al carrito`; eliminado `Ver carrito`.
- English for QA ampliado a 9 módulos; cada módulo tiene `Practicar` y página detallada.
- Nuevos módulos: English for Medical QA, Financial QA y Project Managers.
- Performance QA unificado dentro de `JMeter + k6 · Performance QA`.
- Salesforce QA ampliado con objetos/metadata, seguridad, Flow, Apex, LWC/Jest, APIs, E2E y release.
- Nueva ruta `Oracle APEX QA` con simulador, App Builder, SQL Workshop, session state, seguridad, UI y APIs.
- Learning Paths/competencias/stacks simplificados eliminando duplicidades de web automation, API, performance, Selenium, manual, datos y DevOps.
- Agregada `GUIA_BASES_DATOS_USUARIOS.txt` con PostgreSQL/Supabase, Neon, MongoDB Atlas, Firestore y Oracle Always Free.

## v27
- Cada certificación principal y externa incorpora `Agregar al carrito`.
- La página de Certificaciones agrega el botón `Proveedores` junto a `Ir a simuladores`.
- `Fundamentos de QA y preparación CTFL` y `Preparación AICS ASTFC` fueron retirados de Academia para evitar duplicidad con la página de Certificaciones.
- Pago restaura también preparaciones de certificaciones externas agregadas desde Certificaciones.
- JMeter + k6 amplía su ruta con introducción, comparación, requisitos, instalación, configuración y primeros flujos prácticos de cada herramienta.

## v28
- Empleo incorpora explicación de pruebas psicométricas, objetivo de RR. HH., interpretación y advertencia de uso responsable.
- Nueva práctica psicométrica educativa de QA con selección previa de sector: software, eléctrico, médico y bancario.
- Nueva prueba orientativa de inglés MCER/CEFR A1–C2 con 30 preguntas; no sustituye una certificación oficial.
- Nuevos Learning Paths: QA para Robótica y QA para Software de Aviación.
- QA Robótica incluye ROS 2, Gazebo, sensores, simulación, SIL/HIL, safety, CI y observabilidad.
- QA Aviación incluye software assurance, FAA AC 20-115D/DO-178C en contexto, trazabilidad, verificación, cobertura, configuración e integración/HIL.
- Carpeta `microlearning-plans/` contiene un TXT por cada ruta, competencia y stack mostrado en Academia con cantidad y subtemas de videos de máximo 2 minutos.

## v29
- Empleo explica presencial, híbrido y remoto.
- Nueva prueba psicométrica general y se mantiene la práctica psicométrica contextualizada a QA.
- Se separan examen general MCER/CEFR y examen técnico de inglés para QA.
- Nuevos Learning Paths: QA Auditor de Software, QA para Software de Contenido/Marketing Digital y QA para Pasarelas de Pago.
- `GUIA_INTEGRACION_PAGO_BANCO.txt` ampliada paso a paso con responsables, requisitos y glosario.
- Nueva `GUIA_FACTURACION_ELECTRONICA_CR.txt` basada en comprobantes electrónicos 4.4.
- El checkout demo genera una factura demostrativa imprimible únicamente después del pago visual; no se presenta como comprobante tributario oficial.
- En producción, la factura oficial debe generarse server-side como XML, firmarse y procesarse con Hacienda.
- Al iniciar sesión, el header muestra el nombre del usuario y `Cerrar sesión`.

## v30
- Integrado el documento DISC suministrado como contenido educativo para empleabilidad; se parafrasean estilos/perfiles sin convertirlos en diagnóstico.
- La sesión autenticada expira tras 30 minutos de inactividad; actividad de teclado/pointer/touch renueva el timestamp.
- Simuladores aprobados permiten solicitar certificado por correo. El frontend intenta `POST /api/certificates/email` y mantiene fallback local hasta conectar backend.
- Prompts IA amplía QA-AI-Agente con pasos, herramientas, tiempos estimados, seguridad y Human-in-the-Loop.
- Nueva `GUIA_IMPUESTOS_AMERICA_EUROPA_2026.txt` con países soberanos de América y Europa, tasas indirectas orientativas y checklist legal/financiero.
- Empleo incorpora un curso de preguntas frecuentes de entrevista laboral en inglés.

## v31
- Nueva sección de Academia `Medical Device / SaMD QA Lab`.
- Laboratorio interactivo basado en un producto médico ficticio sin uso clínico real.
- 8 misiones de defectos: autorización, timestamps, estado, audit log, input validation, traceability, configuration y problem resolution.
- Módulo V&V con 6 artefactos simulados.
- Matriz de trazabilidad Requirement → Risk → Control → Test → Evidence.
- Release readiness checklist + decisión GO/NO-GO.
- Exportación de Evidence Pack JSON, resumen TXT y Traceability Matrix CSV.
- Se mantiene la ruta teórica existente de Medical Device/SaMD y se enlaza al laboratorio.
- Nueva `GUIA_PORTAFOLIO_MEDICAL_DEVICE_SAMD_QA.txt` para describir correctamente la práctica sin presentarla como experiencia profesional regulada.

## v32
- Bug Lab convertido a formulario de una pregunta por pantalla con Atrás/Siguiente.
- Al responder Bug Lab, se marca en verde la correcta y en rojo la opción seleccionada si fue incorrecta.
- Nueva página `medreview-trainer.html`: producto médico ficticio con errores intencionales para explorar antes del Bug Lab.
- V&V convertido a práctica guiada de objetivo → fuente → setup → procedimiento → evidencia → conclusión.
- Prueba general de inglés reescrita para eliminar referencias a QA; la prueba QA mantiene contenido técnico.
- Resultado escrito muestra preguntas falladas, explicación en español y consejos por área.
- Nueva `ingles-listening.html` con 30 audios originales A1–C2 usando Speech Synthesis del navegador.
- Nuevo Learning Path `QA + Mejora de Procesos` con DMAIC, PDCA, RCA, Pareto, métricas y control.
- Nueva carpeta `microlearning-scripts/` con un TXT de guion + recomendaciones visuales por cada Learning Path, competencia y stack.

## v33
- Ruta Medical Device/SaMD incorpora una sección explícita `Requirement → C#/.NET implementation → SQL Server → test → defect → correction → retest`.
- Nuevo `medical-dotnet-sql-lab.html` y carpeta `medical-device-samd-project/` con subcarpetas C#/.NET+SQL Server, Python auxiliar y Playwright E2E.
- Nuevas pruebas orientativas `Writing A1–C2` y `Speaking A1–C2`.
- Listening y Speaking permiten seleccionar voz/acento de EE. UU., India, Reino Unido, Bulgaria, Alemania, Filipinas, Japón, China y Brasil, sujeto a voces disponibles en el dispositivo.
- Speaking aclara que el navegador estima contenido transcrito y no puede calificar con fiabilidad pronunciación/acento.
