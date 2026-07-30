# Guía de Prueba - Sistema de Quiz Mejorado

## Cómo Probar las Nuevas Características

### Requisitos:
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Acceso a localStorage

---

## TEST 1: Guardado de Progreso

### Pasos:
1. Abre `premium-design.html` en el navegador
2. Navega a "Cursos"
3. Haz clic en "Ver Módulo" del Módulo 1
4. Haz clic en "Hacer Quiz del Módulo"
5. Responde las primeras 3 preguntas
6. **Cierra la pestaña del navegador completamente**
7. Vuelve a abrir el archivo HTML
8. Navega a Cursos → Módulo 1

### Resultado Esperado:
- ✅ Debes ver un botón "Continuar Quiz" en vez de "Hacer Quiz del Módulo"
- ✅ Al hacer clic, tus 3 respuestas anteriores están ahí
- ✅ Puedes continuar desde la pregunta 4

---

## TEST 2: Volver al Módulo Sin Perder Respuestas

### Pasos:
1. Comienza un quiz (Módulo 1, por ejemplo)
2. Responde 5 preguntas
3. Haz clic en "Volver al Módulo"
4. Se debe mostrar un diálogo pidiendo confirmación

### Resultado Esperado:
- ✅ Se muestra: "¿Deseas volver sin enviar el quiz? Tus respuestas se guardarán."
- ✅ Si haces clic "Aceptar", vuelves al módulo
- ✅ Tus respuestas están guardadas

---

## TEST 3: Indicador Visual de Progreso

### Pasos:
1. Abre un quiz
2. Observa la parte superior del contenedor del quiz

### Resultado Esperado:
- ✅ Ves una barra de progreso con porcentaje
- ✅ Muestra "0 de 10 preguntas respondidas" al inicio
- ✅ A medida que respondes, los números suben
- ✅ El porcentaje se actualiza dinámicamente

---

## TEST 4: Indicadores de Preguntas (Dots)

### Pasos:
1. Abre un quiz
2. Observa debajo del título y progreso

### Resultado Esperado Inicial:
- ✅ Ves 10 círculos numerados (1-10)
- ✅ Todos son de color gris (no respondidas)

### Resultado Esperado Al Responder:
- ✅ Cuando respondes pregunta 1, su círculo se vuelve azul
- ✅ Puedes hacer clic en cualquier número para saltar a esa pregunta
- ✅ Todos los círculos se actualizan en tiempo real

---

## TEST 5: Explicaciones (IMPORTANTE - 50 Preguntas)

### Pasos:
1. Abre un quiz
2. Responde TODAS las preguntas (10 del módulo)
3. Haz clic en "Enviar Quiz"
4. Observa cada pregunta después de enviar

### Resultado Esperado:
- ✅ Debajo de cada pregunta aparece una sección "Explicación"
- ✅ La explicación comienza con "La respuesta correcta es..."
- ✅ Incluye 2-3 líneas de contexto
- ✅ Las explicaciones son DIFERENTES para cada pregunta
- ✅ Son relevantes al contenido del módulo

### Ejemplo de Explicación para Módulo 1:
```
📚 Explicación:
La Ley 21.719 fue publicada en el Diario Oficial el 28 de septiembre 
de 2022, pero entró en vigencia el 28 de septiembre de 2023, un año 
después de su publicación.
```

---

## TEST 6: Feedback Visual - Respuestas Correctas

### Pasos:
1. Abre un quiz
2. Responde todas las preguntas
3. Envía el quiz
4. Mira una pregunta que respondiste correctamente

### Resultado Esperado:
- ✅ La opción que seleccionaste tiene fondo verde claro
- ✅ Debajo de las opciones aparece: "✓ ¡Correcto!"
- ✅ El texto está en verde
- ✅ La explicación aparece debajo

---

## TEST 7: Feedback Visual - Respuestas Incorrectas

### Pasos:
1. Completa el quiz y envía
2. Mira una pregunta que respondiste incorrectamente

### Resultado Esperado:
- ✅ Tu opción tiene fondo rojo claro
- ✅ La opción correcta tiene fondo verde
- ✅ Aparece "✗ Respuesta incorrecta" en rojo
- ✅ La explicación clarifica por qué era incorrecta

---

## TEST 8: Resumen de Resultados

### Pasos:
1. Responde todas las preguntas de un quiz
2. Envía el quiz
3. Mira el resumen en la parte superior

### Resultado Esperado:
- ✅ Aparece un cuadro grande con:
  - 🎉 o 📋 (emoji apropiado)
  - "Excelente" o "Necesitas mejorar"
  - "X/10 correctas (Y%)"
  - Mensaje motivacional personalizado

---

## TEST 9: Opciones de Continuar y Reiniciar

### Pasos:
1. Completa un quiz parcialmente
2. Vuelve al módulo (sin enviar)
3. Regresa al módulo en la pantalla de cursos
4. Vuelve a entrar al mismo módulo

### Resultado Esperado - Primer Intento:
- ✅ Botón "Hacer Quiz del Módulo" (sin progreso)

### Resultado Esperado - Segunda Vez:
- ✅ Botón "Continuar Quiz" (azul/principal)
- ✅ Botón "Reiniciar Quiz" (gris/secundario)
- ✅ Botones "Volver a Cursos" y "Marcar como Completado" siguen presente

### Al Hacer Clic en "Reiniciar Quiz":
- ✅ Se muestra confirmación
- ✅ Si confirmas, vuelve a pregunta 1 sin respuestas anteriores

---

## TEST 10: Verificar localStorage

### Para Desarrolladores:

#### Abrir Consola del Navegador (F12):
```javascript
// Ver todas las claves
Object.keys(localStorage).filter(k => k.includes('quiz-progress'))

// Ver progreso de módulo 1
localStorage.getItem('quiz-progress-1')

// Resultado esperado:
// {"quizId":1,"answers":{"1":0,"2":1,"3":2},"timestamp":"2026-07-30T..."}
```

### Limpiar localStorage (si necesitas reiniciar):
```javascript
// Limpiar progreso de un módulo
localStorage.removeItem('quiz-progress-1')

// Limpiar todo
localStorage.clear()
```

---

## TEST 11: Validación Antes de Enviar

### Pasos:
1. Abre un quiz
2. Responde solo 5 preguntas (de 10)
3. Intenta hacer clic en "Enviar Quiz"

### Resultado Esperado:
- ✅ Aparece un alerta: "Por favor, responde todas las preguntas antes de enviar."
- ✅ No envía el quiz
- ✅ Puedes continuar respondiendo

---

## TEST 12: Múltiples Módulos

### Pasos:
1. Completa parcialmente Quiz del Módulo 1
2. Vuelve a Cursos
3. Entra al Módulo 2 e inicia otro quiz
4. Responde algunas preguntas del Módulo 2
5. Vuelve a Cursos
6. Regresa al Módulo 1

### Resultado Esperado:
- ✅ El Módulo 1 tiene sus propias respuestas guardadas
- ✅ El Módulo 2 tiene sus propias respuestas guardadas
- ✅ No se mezclan los datos entre módulos
- ✅ Cada uno puede continuar independientemente

---

## CHECKLIST DE VALIDACIÓN COMPLETA

- [ ] localStorage funciona y guarda progreso
- [ ] Se puede continuar un quiz después de cerrar navegador
- [ ] Se pueden reiniciar quizzes
- [ ] Las explicaciones aparecen para todas las 50 preguntas
- [ ] El feedback visual es claro (verde para correcto, rojo para incorrecto)
- [ ] Los indicadores de preguntas se actualizan en tiempo real
- [ ] El porcentaje de progreso es exacto
- [ ] La validación evita enviar sin responder todas
- [ ] Los botones funcionan correctamente
- [ ] El diseño se ve profesional y consistente

---

## Si Algo No Funciona

### Problemas Comunes y Soluciones:

#### 1. No aparece el botón "Continuar Quiz"
- **Causa**: localStorage está deshabilitado
- **Solución**: Habilita cookies/storage en configuración del navegador

#### 2. Explicaciones no aparecen
- **Causa**: El JavaScript no se cargó completamente
- **Solución**: Recarga la página (F5)

#### 3. Los datos no se guardan
- **Causa**: Storage privado o navegación de incógnito
- **Solución**: Usa navegación normal, no incógnito

#### 4. Botones no responden
- **Causa**: JavaScript deshabilitado
- **Solución**: Habilita JavaScript en configuración

#### 5. Los estilos se ven mal
- **Causa**: CSS no cargó correctamente
- **Solución**: Limpia caché (Ctrl+Shift+R) o Cmd+Shift+R en Mac

---

## Contacto para Reportar Bugs

Si encuentras un problema, anota:
1. Qué paso hiciste
2. Qué esperabas que pasara
3. Qué pasó en su lugar
4. En qué navegador ocurrió
5. Captura de pantalla si es posible

---

**Última actualización**: 30 de Julio de 2026
**Versión probada**: 2.0 - Sistema de Quiz Mejorado
