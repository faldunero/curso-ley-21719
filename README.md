# AFAN Learning - Plataforma de Capacitación en Legislación Chilena

Plataforma web de educación digital para cursos sobre legislación laboral chilena, incluyendo Ley 21.719 (Protección de Datos) y Ley Karin (Acoso Laboral).

## Estructura del Proyecto

```
capacitacion_ley_21719/
├── landing.html              # Página principal con grid de cursos
├── index-standalone.html     # Curso 1: Ley 21.719 - Protección de Datos
├── ley-karin.html           # Curso 2: Ley Karin - Acoso Laboral
├── admin-panel.html         # Panel de administración (stub)
├── package.json
├── vite.config.js
└── README.md
```

## Archivos Principales

### landing.html
- **Propósito**: Página de inicio y catálogo de cursos
- **Características**:
  - Hero section con información general
  - Grid de cursos disponibles (2-3 columnas)
  - Tarjetas con descripción, duración, módulos
  - Sección informativa con beneficios
  - Footer con enlaces
  - Comentarios para autenticación futura
  
**Funcionalidades**:
- Mostrar cursos disponibles
- Navegar a cursos específicos
- Estructura lista para filtrar por permisos de usuario

### index-standalone.html (Ley 21.719)
- **Propósito**: Curso completo de Protección de Datos
- **Contenido**:
  - 5 módulos temáticos (95 minutos)
  - Examen final con 5 preguntas
  - Certificado digital descargable
  
**Módulos**:
1. Introducción a la Ley 21.719
2. Derechos de los Titulares
3. Obligaciones de Responsables
4. Seguridad y Privacidad
5. Cumplimiento Normativo

**Examen**: 5 preguntas (80% = 4/5 para aprobar)

### ley-karin.html (Ley Karin)
- **Propósito**: Curso sobre acoso y violencia laboral
- **Contenido**:
  - 6 módulos temáticos (90 minutos)
  - Examen final con 8 preguntas
  - Certificado digital descargable
  
**Módulos**:
1. Introducción a Ley Karin
2. Derechos y Protecciones del Trabajador
3. Identificación de Acoso y Violencia Laboral
4. Procedimientos de Denuncia
5. Responsabilidades Empresariales
6. Sanciones y Consecuencias

**Examen**: 8 preguntas (75% = 6/8 para aprobar)

### admin-panel.html
- **Propósito**: Panel de administración (en desarrollo)
- **Características planeadas**:
  - Gestión de usuarios y roles
  - Gestión de cursos y módulos
  - Reportes y estadísticas
  - Gestión de acceso y permisos
  - Gestión de certificados

## Funcionalidades Actuales

### Navegación
- Navegación entre inicio, cursos y examen
- Botones de navegación principales en header
- Progreso visible en barra de progreso

### Cursos
- Módulos interactivos con descripciones
- Marcado de módulos completados
- Progreso general visible
- Acceso a examen solo cuando se completan todos los módulos

### Examen
- Preguntas de opción múltiple
- Validación de respuestas completas
- Calificación automática
- Resultados inmediatos

### Certificados
- Generación automática al aprobar
- Información personalizada (nombre, email)
- ID de certificado único con fecha
- Descarga de PDF (estructura lista)

## Preparación para Autenticación

El código está estructurado con comentarios `AUTENTICACIÓN FUTURA:` en puntos clave donde se debe integrar:

### landing.html
- Verificación de usuario logeado
- Filtrado de cursos según permisos
- Restricción de acceso según rol

### Cursos (index-standalone.html, ley-karin.html)
- Carga de progreso del usuario
- Guardado en tiempo real de progreso
- Verificación de acceso al curso

### Estructura de Datos Preparada

```javascript
// Usuario
USER {
  id: 'uuid',
  email: 'user@example.com',
  name: 'Nombre',
  role: 'estudiante|admin|instructor',
  coursesAvailable: ['21719', 'karin'],
  createdAt: 'timestamp'
}

// Curso
COURSE {
  id: '21719',
  title: 'Ley 21.719',
  description: '...',
  modules: 5,
  status: 'published|draft',
  createdBy: 'admin-id',
  createdAt: 'timestamp'
}

// Progreso
PROGRESS {
  userId: 'uuid',
  courseId: '21719',
  modulesCompleted: ['mod1', 'mod2'],
  score: 86,
  certificateDownloaded: true,
  updatedAt: 'timestamp'
}
```

## Próximas Integraciones (Roadmap)

### Backend y Base de Datos
- [ ] Supabase o Firebase para almacenamiento
- [ ] Tablas de usuarios, cursos, progreso y certificados
- [ ] API endpoints para CRUD

### Autenticación
- [ ] Sistema de login/registro
- [ ] Gestión de sesiones
- [ ] Roles y permisos
- [ ] OAuth (Google, GitHub)

### Notificaciones
- [ ] Email de bienvenida
- [ ] Recordatorios de cursos pendientes
- [ ] Notificación de certificados

### Certificados
- [ ] Generación de PDF automática
- [ ] Sistema de verificación de certificados
- [ ] Descarga y compartir en redes

### Admin Panel
- [ ] Gestión completa de usuarios
- [ ] Gestión de cursos y módulos
- [ ] Reportes y estadísticas
- [ ] Dashboard con métricas

## Cómo Usar

### Para Desarrolladores

1. **Iniciar proyecto**:
```bash
npm install
npm run dev
```

2. **Acceder a archivos**:
- Landing page: `http://localhost:5173/landing.html`
- Ley 21.719: `http://localhost:5173/index-standalone.html`
- Ley Karin: `http://localhost:5173/ley-karin.html`
- Admin: `http://localhost:5173/admin-panel.html`

3. **Agregar nuevo curso**:
   - Copiar `ley-karin.html` como base
   - Cambiar ID del curso en metadata
   - Actualizar módulos y preguntas
   - Registrar en `landing.html`

### Para Estudiantes

1. **Acceder a plataforma**: Abrir `landing.html`
2. **Seleccionar curso**: Hacer clic en "Acceder al Curso"
3. **Completar módulos**: Ver cada módulo y marcar como completado
4. **Realizar examen**: Cuando todos los módulos estén listos
5. **Descargar certificado**: Si aprobar el examen

## Validaciones

### Ley 21.719
- ✓ 5 módulos completos
- ✓ 5 preguntas de examen
- ✓ Certificado personalizado
- ✓ Responsive (desktop/mobile)
- ✓ localStorage para progreso local

### Ley Karin
- ✓ 6 módulos completos
- ✓ 8 preguntas de examen
- ✓ Contenido didáctico con casos chilenos
- ✓ Certificado personalizado
- ✓ Responsive (desktop/mobile)
- ✓ localStorage para progreso local

## Tecnologías Usadas

- **React 19**: Framework UI
- **React DOM**: Renderización
- **Babel Standalone**: JSX en el navegador
- **Vite**: Build tool
- **CSS3**: Estilos responsivos

## Notas de Desarrollo

### Comentarios de Estructura
El código incluye comentarios `TODO:` y `AUTENTICACIÓN FUTURA:` para:
- Facilitar futuras implementaciones
- Marcar puntos de integración
- Indicar funcionalidades planeadas

### localStorage
Actualmente usa localStorage para guardar progreso localmente. Cambiar a API/BD cuando sea implementada.

### Estilos Responsivos
Incluye breakpoints para:
- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## Consideraciones de Seguridad Futuras

- [ ] Validación de contraseñas robustas
- [ ] Hash de contraseñas en servidor
- [ ] HTTPS obligatorio
- [ ] Rate limiting en login
- [ ] Verificación de email
- [ ] 2FA opcional
- [ ] Validación de certificados en servidor

## Licencia

Proyecto interno - AFAN Learning 2024

## Contacto

Para preguntas o sugerencias: faldunate@gmail.com
