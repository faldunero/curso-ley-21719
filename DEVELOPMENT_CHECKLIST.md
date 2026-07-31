# Development Checklist - AFAN Learning

Guía de desarrollo y checklist para mantener track del progreso.

## Fase 1: Estructura Base (COMPLETADO ✓)

### Landing Page
- [x] Crear landing.html con React
- [x] Header con navegación
- [x] Hero section
- [x] Grid de cursos (2-3 columnas)
- [x] Cards de cursos con información
- [x] Footer con enlaces
- [x] Responsive (desktop/mobile)
- [x] Comentarios de autenticación futura

### Curso Ley 21.719
- [x] Crear index-standalone.html
- [x] Header con navegación
- [x] Hero section con intro
- [x] 5 módulos temáticos
- [x] Progress bar
- [x] Examen final (5 preguntas)
- [x] Certificado personalizado
- [x] localStorage para progreso
- [x] Botón de volver a cursos
- [x] Responsive design

### Curso Ley Karin
- [x] Crear ley-karin.html
- [x] Header con navegación
- [x] Hero section con intro
- [x] 6 módulos temáticos
- [x] Progress bar
- [x] Examen final (8 preguntas)
- [x] Certificado personalizado
- [x] localStorage para progreso
- [x] Botón de volver a cursos
- [x] Responsive design

### Admin Panel
- [x] Crear admin-panel.html
- [x] Header
- [x] Secciones de características planeadas
- [x] Links de navegación
- [x] Documentación de estructura BD

### Documentación
- [x] README.md actualizado
- [x] ARCHITECTURE.md detallado
- [x] INTEGRATION_GUIDE.md paso a paso
- [x] courses-config.json con estructura completa
- [x] DEVELOPMENT_CHECKLIST.md (este archivo)

## Fase 2: Autenticación (TODO)

### Backend Setup
- [ ] Crear cuenta Supabase/Firebase
- [ ] Configurar proyecto
- [ ] Obtener API keys
- [ ] Configurar variables de entorno

### Tablas de BD
- [ ] Crear tabla `users`
- [ ] Crear tabla `courses`
- [ ] Crear tabla `progress`
- [ ] Crear tabla `certificates`
- [ ] Configurar indexes
- [ ] Configurar RLS (Row Level Security)

### Módulo de Autenticación
- [ ] Crear `src/auth.js` (servicios de auth)
- [ ] Implementar signUp
- [ ] Implementar signIn
- [ ] Implementar signOut
- [ ] Implementar getCurrentUser
- [ ] Implementar password reset

### Login/Registro
- [ ] Crear componente Login
- [ ] Crear componente Register
- [ ] Validación de formularios
- [ ] Manejo de errores
- [ ] Redirect después de login

### Session Management
- [ ] Context API para usuario global
- [ ] Persistencia de sesión
- [ ] Logout cleanup
- [ ] Protected routes

## Fase 3: Integración de Progreso (TODO)

### Landing Page
- [ ] Cargar usuario actual
- [ ] Filtrar cursos por permiso
- [ ] Mostrar rol del usuario
- [ ] Estadísticas personales (opcional)

### Cursos
- [ ] Cargar progreso del usuario
- [ ] Guardar progreso en BD (real-time)
- [ ] Sincronizar entre dispositivos
- [ ] Mostrar progreso sincronizado

### Examen
- [ ] Cargar respuestas previas
- [ ] Guardar calificación
- [ ] Generar certificado en BD
- [ ] Marcar como completado

## Fase 4: Sistema de Certificados (TODO)

### Generación
- [ ] Instalar jsPDF y html2canvas
- [ ] Crear plantilla de certificado
- [ ] Generar PDF automáticamente
- [ ] Guardar URL en BD
- [ ] Generar código de verificación

### Descarga
- [ ] Botón funcional de descarga
- [ ] Guardar "descargado" en BD
- [ ] Opción de descargar de nuevo

### Verificación (Futuro)
- [ ] Crear página de verificación
- [ ] API para verificar código
- [ ] Mostrar datos del certificado
- [ ] Indicar si es válido/expirado

## Fase 5: Notificaciones Email (TODO)

### Setup
- [ ] Configurar servicio email (Resend, SendGrid)
- [ ] Crear Edge Functions en Supabase
- [ ] Configurar templates

### Eventos
- [ ] Email de bienvenida (signup)
- [ ] Email de certificado (aprobado)
- [ ] Email de recordatorio (curso pendiente)
- [ ] Email de reinicio contraseña

## Fase 6: Admin Panel (TODO)

### Gestión de Usuarios
- [ ] Listar usuarios
- [ ] Ver detalles de usuario
- [ ] Asignar/revocar cursos
- [ ] Cambiar rol
- [ ] Búsqueda y filtros
- [ ] Bulk actions

### Gestión de Cursos
- [ ] Crear curso (CRUD)
- [ ] Editar módulos
- [ ] Publicar/archivar
- [ ] Preview
- [ ] Duplicar curso

### Reportes
- [ ] Dashboard con KPIs
- [ ] Estudiantes por curso
- [ ] Tasa de aprobación
- [ ] Tiempo promedio de curso
- [ ] Gráficos y estadísticas
- [ ] Exportar a CSV/PDF

### Gestión de Certificados
- [ ] Listar certificados
- [ ] Verificar certificado
- [ ] Revocar certificado
- [ ] Re-generar PDF

## Fase 7: Testing (TODO)

### Unit Tests
- [ ] Tests de autenticación
- [ ] Tests de cálculo de progreso
- [ ] Tests de validación de examen
- [ ] Tests de generación de certificado

### Integration Tests
- [ ] Login → Cursos → Examen → Certificado
- [ ] Sincronización de progreso
- [ ] Permisos y restricciones

### E2E Tests
- [ ] Flujo completo de usuario
- [ ] Flujo de admin
- [ ] Casos de error

### Performance Tests
- [ ] Load testing
- [ ] Response times
- [ ] Database queries

## Fase 8: Deployment (TODO)

### Frontend
- [ ] Build para producción
- [ ] Configurar Vercel/Netlify
- [ ] Variables de entorno
- [ ] Domain configuration
- [ ] SSL certificate

### Backend
- [ ] Deploy de Supabase
- [ ] Backup automático
- [ ] Monitoring
- [ ] Alertas

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Plausible)
- [ ] Performance monitoring
- [ ] Uptime monitoring

## Fase 9: Post-Launch (TODO)

### Feedback
- [ ] Colectar user feedback
- [ ] Bug reports
- [ ] Feature requests
- [ ] Analytics review

### Mantenimiento
- [ ] Actualizar dependencias
- [ ] Parches de seguridad
- [ ] Contenido actualizado
- [ ] Performance optimization

### Expansión
- [ ] Nuevos cursos
- [ ] Nuevas leyes
- [ ] Internacionalización (i18n)
- [ ] Aplicación móvil

## Quick Start para Desarrolladores

### Setup Inicial
```bash
# 1. Clonar repo
git clone <repo-url>
cd capacitacion_ley_21719

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
open http://localhost:5173/landing.html
```

### Archivos Clave a Entender
1. `landing.html` - Punto de entrada principal
2. `index-standalone.html` - Estructura de curso (usar como template)
3. `ley-karin.html` - Segundo curso con variaciones
4. `courses-config.json` - Configuración de cursos
5. `ARCHITECTURE.md` - Explicación de la arquitectura

### Agregar Nuevo Curso
```bash
# 1. Copiar template
cp index-standalone.html nuevo-curso.html

# 2. Editar identificadores del curso
# - Cambiar ID (ej: '21719' → 'nuevo')
# - Cambiar título y descripción
# - Actualizar módulos (1-N)
# - Actualizar preguntas de examen

# 3. Registrar en landing.html
# - Agregar objeto curso en array `courses`
# - Proporcionar URL del nuevo archivo

# 4. Actualizar courses-config.json
# - Agregar entrada del nuevo curso
```

## Puntos Críticos a Recordar

⚠️ **Seguridad**
- No guardar contraseñas en localStorage
- Validar datos en servidor
- Usar HTTPS en producción
- Implementar CORS correctamente

⚠️ **Performance**
- Lazy load de módulos grandes
- Caché estratégico
- CDN para assets estáticos
- Optimizar queries de BD

⚠️ **Scalabilidad**
- Índices de BD correctos
- Connection pooling
- Rate limiting
- Pagination en listas

⚠️ **Usabilidad**
- Mobile-first approach
- Accesibilidad (WCAG)
- Tests con usuarios reales
- Feedback loops rápidos

## KPIs a Monitorear

- [ ] Usuarios registrados
- [ ] Tasa de completitud de cursos
- [ ] Tasa de aprobación en exámenes
- [ ] Tiempo promedio por módulo
- [ ] Certificados descargados
- [ ] Tiempo de página
- [ ] Tasa de error
- [ ] Usuarios activos

## Dependencias Necesarias (Futuro)

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "jspdf": "^2.0.0",
    "html2canvas": "^1.0.0",
    "react-router-dom": "^6.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vitest": "^0.34.0",
    "@testing-library/react": "^14.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

## Scripts Útiles (package.json Futuro)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint src --ext .js,.jsx",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit"
  }
}
```

## Recursos y Referencias

### Documentación
- [React Documentation](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

### Herramientas
- [VS Code](https://code.visualstudio.com)
- [GitHub](https://github.com)
- [Supabase Dashboard](https://app.supabase.com)
- [Vercel Dashboard](https://vercel.com)

### Comunidades
- Stack Overflow
- GitHub Discussions
- Reddit: r/learnreactjs, r/webdev
- Discord communities

## Contacto y Preguntas

📧 Email: faldunate@gmail.com
🐛 Issues: Usar GitHub Issues
💬 Discussions: GitHub Discussions

---

**Última actualización**: Enero 2024
**Estado**: Fase 1 Completada, Fase 2+ En Roadmap
**Mantenedor**: Felipe Aldunate
