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
