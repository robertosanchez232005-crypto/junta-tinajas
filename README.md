# Portal institucional — Junta Comunal de Las Tinajas

Sitio web institucional para la Junta Comunal de Las Tinajas (distrito de
Dolega, provincia de Chiriquí, Panamá): información pública, catálogo de
proyectos, transparencia, atención ciudadana y panel administrativo con roles.

## 1. Arquitectura

- **Next.js 14 (App Router) + TypeScript** — renderizado híbrido (SSR/estático)
  para buen SEO y carga rápida en conexiones móviles.
- **Tailwind CSS** — estilos utilitarios; paleta verde institucional definida
  en `tailwind.config.ts` (ajustar tonos exactos al recibir el logo oficial).
- **Supabase** — Postgres + Auth + Storage:
  - `auth` para el personal autorizado (administrador / editor).
  - Tablas públicas con **Row Level Security**: el público solo lee contenido
    `publicado`; el personal (`es_staff()`) lee/edita según su rol.
  - Storage para PDFs e imágenes (proyectos, noticias, transparencia).
- **Leaflet + OpenStreetMap** — mapa de Las Tinajas, aislado en
  `src/components/mapa/MapaTinajas.tsx` para facilitar su actualización.
- **Zod + React Hook Form** — validación de formularios en cliente; toda
  mutación se revalida también en el servidor (ruta API o políticas RLS).

### Estructura de páginas públicas
`/`, `/junta-comunal`, `/proyectos`, `/proyectos/[slug]`, `/atencion-ciudadana`,
`/transparencia`, `/noticias`, `/noticias/[slug]`, `/contacto`,
`/aviso-privacidad`, `/terminos-de-uso`.

### Panel administrativo (protegido)
`/admin/login`, `/admin/dashboard`, `/admin/proyectos` (+ `/nuevo`, `/[id]`),
`/admin/noticias`, `/admin/transparencia`, `/admin/solicitudes`.
Protegido por `middleware.ts` (redirige a `/admin/login` sin sesión) y por las
políticas RLS de Supabase (roles `administrador` / `editor`).

## 2. Instalación

```bash
npm install
cp .env.example .env.local
# completa .env.local con tus credenciales de Supabase
```

## 3. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ejecuta la migración `supabase/migrations/0001_init.sql` en el editor SQL
   del proyecto (o con `supabase db push` si usas la CLI).
3. Crea los buckets de Storage: `proyectos`, `transparencia`, `noticias`
   (privados o públicos controlados, según la sensibilidad del contenido).
4. Crea el primer usuario administrador:
   - En Authentication → Users, crea un usuario con correo/contraseña.
   - Inserta su perfil: `insert into perfiles (id, nombre_completo, rol) values ('<uuid-del-usuario>', 'Nombre Apellido', 'administrador');`
5. Copia la URL del proyecto y las llaves (`anon` y `service_role`) a
   `.env.local`.

## 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000`.

## 5. Pruebas

```bash
npm run test
```

Incluye pruebas de las funciones críticas de validación (formulario ciudadano
y formulario de proyectos con Zod). Ampliar con pruebas de integración según
crezca el proyecto.

## 6. Despliegue en Vercel

1. Sube el repositorio a GitHub/GitLab.
2. Importa el proyecto en [vercel.com](https://vercel.com).
3. Configura las mismas variables de entorno de `.env.local` en el panel de
   Vercel (Settings → Environment Variables).
4. Despliega. Vercel detecta Next.js automáticamente.

## 7. Datos oficiales pendientes de suministrar

Este proyecto **no inventa** ninguno de los siguientes datos; deben ser
suministrados por la Junta Comunal antes de publicar el sitio en producción:

- [ ] **Logo oficial** en alta resolución (actualmente hay un logo de
      marcador de posición en `public/images/logo-junta-tinajas.png`;
      reemplázalo por el archivo real, conservando proporciones y colores).
- [ ] Archivo **GeoJSON oficial** de límites territoriales de Las Tinajas
      (ver `public/geo/LEEME.md`).
- [ ] Nombres y cargos de las **autoridades** de la Junta Comunal.
- [ ] **Organigrama** oficial.
- [ ] Textos de **historia, misión, visión y valores**.
- [ ] **Dirección, teléfono, correo y horario** de atención de la sede.
- [ ] Enlaces a **redes sociales** oficiales.
- [ ] **Proyectos reales** (títulos, fechas, montos si se decide publicarlos,
      imágenes, documentos PDF) para reemplazar los datos de ejemplo en
      `src/data/proyectos-demo.ts`.
- [ ] Documentos de **transparencia** (informes, presupuestos, actas, etc.).
- [ ] Texto oficial del **aviso de privacidad** y **términos de uso**.
- [ ] Fotografía representativa de la comunidad para la portada.

## 8. Notas de seguridad implementadas

- RLS en todas las tablas: el público solo ve contenido `publicado`.
- Autenticación de Supabase + middleware para proteger `/admin/*`.
- Roles `administrador` (control total) y `editor` (contenido, sin gestión de
  usuarios/configuración crítica) — reforzar reglas de UI adicionales según
  se completen los módulos de noticias/transparencia.
- Validación de PDFs: tipo real, tamaño máximo configurable
  (`MAX_UPLOAD_SIZE_MB`), nombres de archivo únicos y aleatorios (evita
  colisiones y ejecución de código).
- Formulario ciudadano con campo honeypot + punto de integración para
  Cloudflare Turnstile / hCaptcha (`TURNSTILE_*` en `.env.example`).
- `robots.txt` bloquea el rastreo de `/admin`.

## 9. Alcance de esta entrega

Este scaffold implementa el flujo completo para el módulo de **Proyectos**
(listado, detalle, CRUD en el panel con carga de PDF) como referencia
completa del patrón. Los módulos de **Noticias** y **Transparencia** en el
panel administrativo están estructurados y documentados para replicar
exactamente ese mismo patrón (ver comentarios en
`src/app/admin/noticias/page.tsx` y `src/app/admin/transparencia/page.tsx`).
