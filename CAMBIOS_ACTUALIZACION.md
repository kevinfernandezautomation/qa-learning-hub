# Cambios — 14 de octubre de 2026

- Se consolidaron los 25 documentos `BAC_*.txt` en `BAC_MATERIAL_UNIFICADO.txt`, preservando su texto y nombres de origen como separadores. Se actualizaron los enlaces en `banca-qa.html` hacia `bac-material.html` y se agregó `bac-material.js` para visualizar cada apartado. La visualización requiere HTTP(S), no abrir HTML mediante `file://`.
- `certificaciones.html`: eliminado filtro independiente de nivel; el filtro de dificultad muestra «Todos los niveles»; `academy.js` ya no genera botones «Agregar al carrito» en las tarjetas de certificaciones.
- `empleos.html`: «Analizar una vacante» pasó a la navegación por botones y a una sección bajo ella.
- `pago.html`: eliminado el total duplicado que cambiaba al seleccionar mensual/anual. Se conservan las tarifas visibles en las opciones y el botón Pagar.
- `simulator.js`: al iniciar una práctica válida, guarda nombre y correo en cookie de primera parte durante 24 horas, y los precarga al regresar. En modo HTTPS usa Secure; siempre usa SameSite=Lax. Los datos son personales y requieren informar al usuario en la política de privacidad/consentimiento según normativa aplicable.
- `prompts.html`: eliminado el texto de ayuda indicado.
- `academy.js`: eliminada la acción «Analizar vacante» de la ruta Senior Quality Engineering & QA Lead.

## Validaciones

Comprobar sintaxis JavaScript con `node --check`, enlaces relativos y contenido de páginas. Las pruebas completas de interfaz, cobros y cookies requieren navegador sobre HTTP(S) y un backend de pago configurado.
