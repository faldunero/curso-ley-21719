# Arquitectura de AFAN Learning - Plataforma Multi-Curso

## Descripción General

AFAN Learning es una plataforma web de educación digital para cursos sobre legislación laboral chilena. La arquitectura está diseñada para ser escalable, mantenible y lista para futuras integraciones con backend y base de datos.

## Stack Tecnológico

### Frontend Actual
- **React 19**: Biblioteca UI moderna con hooks
- **Babel Standalone**: Compilación JSX en el navegador
- **CSS3**: Estilos responsivos con media queries
- **localStorage**: Almacenamiento de progreso local
- **Vite**: Build tool y dev server

### Futuro (Roadmap)
- **Node.js/Express**: Backend API
- **Supabase/Firebase**: Base de datos y autenticación
- **Tailwind CSS**: Utilidades CSS (opcional)
- **TypeScript**: Type safety
- **Jest**: Testing framework

## Arquitectura de Componentes

### Nivel de Presentación (Frontend)

```
Landing (landing.html)
├── Header
│   ├── Logo
│   ├── Navigation
│   └── User Profile
├── Hero Section
│   ├── Introduction
│   └── Features
├── Courses Grid
│   ├── Course Cards
│   │   ├── Header
│   │   ├── Description
│   │   └── CTA Button
│   └── Course List [21719, Karin, Future]
├── Info Section
│   └── Benefits Cards
└── Footer
    └── Links & Copyright

Ley 21.719 (index-standalone.html)
├── Header
├── Main Content
│   ├── Hero Section
│   ├── Modules Section
│   │   ├── Progress Bar
│   │   └── Module Cards (5 modules)
│   ├── Exam Section
│   │   ├── Questions (5 preguntas)
│   │   └── Options
│   └── Results & Certificate
└── Footer

Ley Karin (ley-karin.html)
├── Header
├── Main Content
│   ├── Hero Section
│   ├── Modules Section
│   │   ├── Progress Bar
│   │   └── Module Cards (6 modules)
│   ├── Exam Section
│   │   ├── Questions (8 preguntas)
│   │   └── Options
│   └── Results & Certificate
└── Footer

Admin Panel (admin-panel.html)
├── Header
└── Dashboard Sections
    ├── User Management (stub)
    ├── Course Management (stub)
    ├── Reports & Analytics (stub)
    ├── Access Management (stub)
    └── Certificate Management (stub)
```

### Flujo de Datos

```
User
  │
  ├─→ landing.html
  │     │
  │     ├─→ [currentUser State]
  │     ├─→ [availableCourses Computed]
  │     └─→ Selecciona curso
  │
  ├─→ index-standalone.html (21719)
  │     │
  │     ├─→ [currentPage State] (inicio|cursos|examen)
  │     ├─→ [completedModules State] → localStorage
  │     ├─→ [examAnswers State]
  │     ├─→ [examScore State]
  │     │
  │     └─→ Flujo:
  │         inicio → cursos (módulos) → examen → certificado
  │
  └─→ ley-karin.html (karin)
        │
        ├─→ [currentPage State]
        ├─→ [completedModules State] → localStorage
        ├─→ [examAnswers State]
        ├─→ [examScore State]
        │
        └─→ Flujo:
            inicio → cursos (módulos) → examen → certificado
```

### Estructura de Estado (React)

#### landing.html
```javascript
{
  currentUser: {
    id: string,
    name: string,
    email: string,
    role: 'estudiante' | 'admin' | 'instructor',
    coursesAvailable: string[] // ['21719', 'karin']
  },
  availableCourses: Course[]
}
```

#### Cursos (index-standalone.html, ley-karin.html)
```javascript
{
  currentPage: 'inicio' | 'cursos' | 'examen',
  viewMode: 'desktop' | 'mobile',
  completedModules: number[],
  examAnswers: {
    [questionId]: number // índice de opción seleccionada
  },
  examSubmitted: boolean,
  examScore: number,
  progressPercentage: number, // computed
  isPassed: boolean // computed
}
```

## Modelos de Datos

### Curso
```typescript
interface Course {
  id: string; // '21719', 'karin'
  title: string;
  description: string;
  icon: string;
  duration: string; // '90 minutos'
  modules: number;
  status: 'published' | 'draft';
  url: string;
  modulesList: Module[];
  examQuestions: ExamQuestion[];
}

interface Module {
  id: number;
  title: string;
  duration: string;
  icon: string;
  content: string;
}

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number; // índice de respuesta correcta
}
```

### Usuario (Futuro con BD)
```typescript
interface User {
  id: UUID;
  email: string;
  password: string; // hashed
  name: string;
  role: 'estudiante' | 'admin' | 'instructor';
  coursesAvailable: string[];
  createdAt: timestamp;
  updatedAt: timestamp;
  lastLogin: timestamp;
}
```

### Progreso (Futuro con BD)
```typescript
interface Progress {
  id: UUID;
  userId: UUID;
  courseId: string;
  modulesCompleted: number[];
  score: number | null;
  passed: boolean;
  certificateId: string | null;
  certificateDownloaded: boolean;
  startedAt: timestamp;
  completedAt: timestamp | null;
  updatedAt: timestamp;
}

interface Certificate {
  id: string; // 'CERT-2024-0130-001'
  userId: UUID;
  courseId: string;
  score: number;
  issuedAt: timestamp;
  expiresAt: timestamp | null;
  verificationCode: string;
  pdfUrl: string | null;
}
```

## Persistencia de Datos

### Actual (localStorage)
```javascript
// Progreso del usuario (local)
localStorage.setItem('course_21719_progress', JSON.stringify({
  completedModules: [1, 2, 3],
  score: 85,
  date: '2024-01-30'
}));

// Se pierde si se borra el navegador
```

### Futuro (Base de Datos)
```javascript
// Supabase
const { data, error } = await supabase
  .from('progress')
  .upsert({
    user_id: userId,
    course_id: '21719',
    modules_completed: [1, 2, 3],
    score: 85
  });

// Persistencia permanente, accesible desde cualquier dispositivo
```

## Seguridad

### Actual
- ⚠️ Sin autenticación
- ⚠️ Datos guardados localmente sin encriptación
- ⚠️ Sin validación de servidor

### Futuro (Implementar)
- ✅ JWT tokens para autenticación
- ✅ Validación de permisos en servidor
- ✅ Encriptación de contraseñas (bcrypt)
- ✅ RLS (Row Level Security) en Supabase
- ✅ HTTPS obligatorio
- ✅ Rate limiting en endpoints
- ✅ 2FA opcional
- ✅ Auditoría de acciones

## Escalabilidad

### Actual
- Soporta múltiples cursos simultáneamente
- Responsivo en desktop/mobile
- Código modular y reutilizable

### Futuro
- Multi-tenancy (múltiples organizaciones)
- CDN para assets
- Caching estratégico (Redis)
- Microservicios si es necesario
- GraphQL para queries flexibles

## Mantenibilidad

### Prácticas Actuales
✅ Componentes reutilizables  
✅ Estilos CSS organizados  
✅ Comentarios sobre autenticación futura  
✅ Estructura clara de carpetas  
✅ Naming consistente  
✅ Validaciones incorporadas  

### Mejoras Futuras
- [ ] TypeScript para type safety
- [ ] Tests automáticos (Jest, React Testing Library)
- [ ] Linting (ESLint, Prettier)
- [ ] Documentación en Storybook
- [ ] CI/CD pipeline
- [ ] Monitoring y logging

## Performance

### Optimizaciones Actuales
- Bundling con Vite
- React production build
- CSS minificado
- Lazy loading de componentes
- localStorage para caché

### Optimizaciones Futuras
- Code splitting
- Image optimization
- Service workers
- Compression gzip/brotli
- Database indexing
- CDN para media

## Monitoreo y Logging

### Futuro
```javascript
// Analytics
- Eventos de inicio de curso
- Módulos completados
- Tiempo de sesión
- Tasa de aprobación
- Conversión en certificados

// Error tracking (Sentry)
- Errores del frontend
- Fallos de autenticación
- Problemas de BD

// Performance monitoring
- Time to Interactive
- First Contentful Paint
- API response times
```

## Despliegue

### Actual
- Archivos HTML estáticos
- Puede servirse desde cualquier host
- CDN compatible

### Futuro
```
Frontend → Vercel/Netlify
  ↓
API → Node.js en Heroku/Railway
  ↓
Database → Supabase/Firebase
  ↓
Storage → AWS S3/Google Cloud Storage
```

## Integración Continua (CI/CD)

### Futuro (GitHub Actions)
```yaml
push → tests → linting → build → deploy
```

## Diagrama de Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────┐
│                   Usuarios                          │
└────────────────────┬────────────────────────────────┘
                     │
┌─────────────────────▼────────────────────────────────┐
│              Frontend Layer (React)                  │
│  ┌──────────────┬──────────────┬──────────────────┐  │
│  │   Landing    │  Ley 21.719  │   Ley Karin      │  │
│  │    Page      │    Course    │     Course       │  │
│  └──────────────┴──────────────┴──────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼──────┐          ┌────▼──────┐
    │ localStorage   │          │  API Layer    │
    │ (Actual)   │          │(Futuro)  │
    └────────────┘          └────┬─────┘
                                 │
                    ┌────────────┴────────────┐
                    │                        │
            ┌───────▼──────┐      ┌──────────▼─────┐
            │ Auth Service │      │ Database       │
            │ (Supabase)   │      │ (Supabase)     │
            └──────────────┘      └────────────────┘
                    │                      │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Email Service     │
                    │  (Resend/SendGrid) │
                    └────────────────────┘
```

## Puntos de Extensión

### Nuevos Cursos
1. Copiar `ley-karin.html`
2. Cambiar ID, título, módulos
3. Registrar en `landing.html`
4. Actualizar `courses-config.json`

### Nuevas Funcionalidades
1. Comentarios con "AUTENTICACIÓN FUTURA:" marcan puntos de integración
2. API está preparada para consumir desde BD
3. Esquema de datos está documentado en `courses-config.json`

### Nuevos Roles
- `estudiante`: Acceso a cursos asignados
- `instructor`: Crear y editar cursos
- `admin`: Control total

## Documentación Complementaria

- `README.md`: Overview del proyecto
- `INTEGRATION_GUIDE.md`: Paso a paso para backend
- `courses-config.json`: Esquema de datos
- `ARCHITECTURE.md`: Este documento

## Roadmap

### Q1 2024
- [x] Landing page
- [x] Cursos Ley 21.719 y Karin
- [ ] Login/Registro básico

### Q2 2024
- [ ] Integración Supabase
- [ ] Admin panel funcional
- [ ] Email notifications

### Q3 2024
- [ ] Certificate verification
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

### Q4 2024
- [ ] Internacionalización (i18n)
- [ ] API pública
- [ ] Integraciones LMS (Moodle, Canvas)

## Notas Importantes

1. **Seguridad**: Cambiar todos los valores de ejemplo antes de producción
2. **Escalabilidad**: Código está diseñado para crecer
3. **Mantenibilidad**: Comentarios claros sobre puntos de integración
4. **Performance**: Optimizar después de conectar BD
5. **Testing**: Agregar tests antes de cada release

## Contacto

Preguntas sobre arquitectura: faldunate@gmail.com
