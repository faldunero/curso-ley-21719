# Guía de Integración - AFAN Learning

Guía paso a paso para integrar autenticación y base de datos a la plataforma.

## 1. Configuración de Backend (Supabase o Firebase)

### Opción A: Supabase (Recomendado)

#### Paso 1: Crear proyecto en Supabase
1. Ir a https://supabase.com
2. Crear nueva organización
3. Crear nuevo proyecto
4. Copiar URL y API keys

#### Paso 2: Crear tablas
Ejecutar en Supabase SQL Editor:

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'estudiante',
  courses_available JSON DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP NULL
);

-- Tabla de cursos
CREATE TABLE courses (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(10),
  url VARCHAR(255),
  duration VARCHAR(50),
  modules INTEGER,
  questions INTEGER,
  passing_score INTEGER,
  status VARCHAR(20) DEFAULT 'published',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de progreso
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id VARCHAR(50) NOT NULL REFERENCES courses(id),
  modules_completed JSON DEFAULT '[]',
  score INTEGER NULL,
  passed BOOLEAN DEFAULT FALSE,
  certificate_id VARCHAR(50) NULL,
  certificate_downloaded BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de certificados
CREATE TABLE certificates (
  id VARCHAR(50) PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  course_id VARCHAR(50) NOT NULL REFERENCES courses(id),
  score INTEGER NOT NULL,
  issued_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NULL,
  verification_code VARCHAR(50) UNIQUE,
  pdf_url VARCHAR(255) NULL
);

-- Indexes para mejor performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_course_id ON progress(course_id);
CREATE INDEX idx_certificates_user_id ON certificates(user_id);
```

#### Paso 3: Configurar RLS (Row Level Security)
```sql
-- RLS para usuarios
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver su propio perfil"
ON users FOR SELECT
USING (auth.uid() = id);

-- RLS para progreso
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver su propio progreso"
ON progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar su propio progreso"
ON progress FOR UPDATE
USING (auth.uid() = user_id);
```

### Opción B: Firebase

#### Paso 1: Crear proyecto en Firebase
1. Ir a https://console.firebase.google.com
2. Crear nuevo proyecto
3. Habilitar Firestore Database y Authentication

#### Paso 2: Crear colecciones
- `users`: Documento por usuario
- `courses`: Documento por curso
- `progress`: Documento de progreso usuario-curso
- `certificates`: Documento por certificado

#### Paso 3: Reglas de seguridad
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /progress/{docId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if request.auth.uid == request.resource.data.userId;
    }
    match /courses/{courseId} {
      allow read: if true;
    }
  }
}
```

## 2. Implementar Login/Registro

### Crear archivo: `src/auth.jsx`

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

### Crear archivo: `src/components/Login.jsx`

```javascript
import { useState } from 'react';
import { signIn } from '../auth';

export function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const session = await signIn(email, password);
      onLoginSuccess(session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
```

## 3. Integrar Progreso en BD

### Modificar landing.html

```javascript
// Cambiar esta sección:
const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(async () => {
  // AUTENTICACIÓN FUTURA: Implementar
  const user = await getCurrentUser();
  if (user) {
    // Cargar permisos de BD
    const { data } = await supabase
      .from('users')
      .select('coursesAvailable')
      .eq('id', user.id)
      .single();
    
    setCurrentUser({ ...user, coursesAvailable: data.coursesAvailable });
  }
  setLoading(false);
}, []);

// Filtrar cursos
const availableCourses = courses.filter(c => 
  !currentUser || currentUser.coursesAvailable.includes(c.id)
);
```

### Modificar ley-21719.html y ley-karin.html

```javascript
// Agregar al inicio del componente:
useEffect(async () => {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  
  // Cargar progreso del usuario
  const { data: progress } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', '21719')
    .single();
  
  if (progress) {
    setCompletedModules(progress.modules_completed);
  }
}, []);

// Guardar progreso cuando se completa módulo:
async function handleCompleteModule(moduleId) {
  if (!completedModules.includes(moduleId)) {
    const newModules = [...completedModules, moduleId];
    setCompletedModules(newModules);
    
    // AUTENTICACIÓN FUTURA: Guardar en BD
    const user = await getCurrentUser();
    await supabase
      .from('progress')
      .upsert({
        user_id: user.id,
        course_id: '21719',
        modules_completed: newModules,
        updated_at: new Date()
      });
  }
}
```

## 4. Variables de Entorno

### Crear `.env` o `.env.local`:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyXXXXXX...
```

### En vite.config.js:
```javascript
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
```

## 5. Flujo de Autenticación Completo

```javascript
// 1. Usuario llega a landing.html
// 2. Si no está logeado, redirige a login
// 3. Usuario se registra o inicia sesión
// 4. Se crea sesión en Supabase Auth
// 5. Se carga rol y cursos disponibles desde DB
// 6. Se muestra landing con cursos permitidos
// 7. Usuario accede a curso
// 8. Se cargar progreso de la BD
// 9. Al completar módulo, se guarda en tiempo real
// 10. Al pasar examen, se genera certificado
// 11. Certificado se guarda en BD y se genera PDF
```

## 6. Generación de Certificados PDF

### Instalar librería:
```bash
npm install jspdf html2canvas
```

### Crear función para generar PDF:

```javascript
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generateCertificatePDF(userName, courseTitle, score) {
  // Crear elemento temporal
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="padding: 40px; text-align: center;">
      <h1>Certificado</h1>
      <p>${userName}</p>
      <p>Ha completado: ${courseTitle}</p>
      <p>Puntuación: ${score}%</p>
    </div>
  `;
  
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);
  pdf.save(`certificado-${userName}.pdf`);
}
```

## 7. Sistema de Notificaciones (Email)

### Usando Supabase Email:

```javascript
export async function sendCertificateEmail(userEmail, certificateUrl) {
  const { data, error } = await supabase.functions.invoke('send-certificate-email', {
    body: { email: userEmail, url: certificateUrl }
  });
  
  if (error) throw error;
  return data;
}
```

### Crear función en Supabase (Edge Function):

```javascript
// supabase/functions/send-certificate-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { email, url } = await req.json();
  
  // Enviar email con Resend u otro servicio
  // const response = await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${RESEND_API_KEY}` },
  //   body: JSON.stringify({ ... })
  // });
  
  return new Response(JSON.stringify({ success: true }));
});
```

## 8. Dashboard de Administrador

### Crear archivo: `src/components/AdminDashboard.jsx`

```javascript
import { useEffect, useState } from 'react';
import { supabase } from '../auth';

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(async () => {
    // Cargar estadísticas
    const { data: usersData } = await supabase.from('users').select('*');
    const { data: coursesData } = await supabase.from('courses').select('*');
    const { data: progressData } = await supabase.from('progress').select('*');
    
    setUsers(usersData);
    setCourses(coursesData);
    setProgress(progressData);
  }, []);

  return (
    <div>
      <h1>Dashboard Administrativo</h1>
      <p>Usuarios: {users.length}</p>
      <p>Cursos: {courses.length}</p>
      <p>Progresos: {progress.length}</p>
      {/* Más componentes */}
    </div>
  );
}
```

## 9. Testing

### Crear archivo: `src/__tests__/auth.test.js`

```javascript
import { describe, it, expect } from 'vitest';
import { signIn, signOut } from '../auth';

describe('Authentication', () => {
  it('should login with valid credentials', async () => {
    const session = await signIn('test@example.com', 'password123');
    expect(session).toBeDefined();
    expect(session.user).toBeDefined();
  });

  it('should fail with invalid credentials', async () => {
    expect(async () => {
      await signIn('invalid@example.com', 'wrongpass');
    }).rejects.toThrow();
  });
});
```

## 10. Deployment

### Desplegar en Vercel:

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Configurar variables de entorno en Vercel:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## Checklist de Integración

- [ ] Crear proyecto en Supabase/Firebase
- [ ] Crear tablas de BD
- [ ] Configurar RLS
- [ ] Instalar librerías necesarias
- [ ] Crear módulo de autenticación
- [ ] Implementar login/registro
- [ ] Integrar carga de progreso
- [ ] Implementar guardado de progreso
- [ ] Crear sistema de certificados
- [ ] Agregar notificaciones email
- [ ] Crear dashboard admin
- [ ] Hacer testing completo
- [ ] Desplegar en producción
- [ ] Configurar dominio propio

## Contacto y Soporte

Para preguntas: faldunate@gmail.com
