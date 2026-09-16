-- =========================================================
-- Junta Comunal de Las Tinajas — Esquema inicial
-- Ejecutar en el editor SQL de Supabase o vía `supabase db push`
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------- ENUMS ----------
create type public.rol_usuario as enum ('administrador', 'editor');
create type public.estado_proyecto as enum ('planificado', 'en_ejecucion', 'finalizado', 'suspendido');
create type public.estado_solicitud as enum ('recibida', 'en_revision', 'atendida', 'cerrada');
create type public.estado_publicacion as enum ('borrador', 'publicado', 'archivado');

-- ---------- PERFILES (vinculados a auth.users) ----------
create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre_completo text not null,
  rol public.rol_usuario not null default 'editor',
  creado_en timestamptz not null default now()
);

-- ---------- PROYECTOS ----------
create table public.proyectos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  descripcion text not null,
  resumen_breve text,
  imagen_portada_url text,
  fecha_inicio date,
  fecha_fin date,
  estado public.estado_proyecto not null default 'planificado',
  comunidad_beneficiada text,
  monto numeric(14,2),               -- nulo = no publicar monto
  entidad_responsable text,
  categoria text,
  anio int generated always as (extract(year from coalesce(fecha_inicio, now()))::int) stored,
  estado_publicacion public.estado_publicacion not null default 'borrador',
  creado_por uuid references public.perfiles(id),
  fecha_publicacion timestamptz,
  actualizado_en timestamptz not null default now(),
  creado_en timestamptz not null default now()
);
create index on public.proyectos (estado_publicacion);
create index on public.proyectos (anio);
create index on public.proyectos (estado);

-- ---------- IMÁGENES DE PROYECTOS ----------
create table public.proyecto_imagenes (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid not null references public.proyectos(id) on delete cascade,
  url text not null,
  texto_alternativo text not null default '',
  orden int not null default 0
);

-- ---------- DOCUMENTOS DE PROYECTOS (PDF) ----------
create table public.proyecto_documentos (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid not null references public.proyectos(id) on delete cascade,
  titulo text not null,
  descripcion_accesible text,
  storage_path text not null,     -- ruta dentro del bucket privado/controlado
  nombre_archivo_original text not null,
  tamano_bytes bigint not null,
  subido_por uuid references public.perfiles(id),
  subido_en timestamptz not null default now()
);

-- ---------- SOLICITUDES CIUDADANAS ----------
create table public.solicitudes_ciudadanas (
  id uuid primary key default gen_random_uuid(),
  numero_seguimiento text unique not null default upper(substr(replace(gen_random_uuid()::text,'-',''),1,8)),
  nombre_completo text not null,
  numero_identificacion text,           -- opcional, considerar cifrado a nivel de aplicación
  correo text not null,
  telefono text,
  comunidad_sector text,
  tipo_solicitud text not null,
  asunto text not null,
  descripcion text not null,
  archivo_adjunto_url text,
  autorizo_tratamiento_datos boolean not null default false,
  estado public.estado_solicitud not null default 'recibida',
  creado_en timestamptz not null default now()
);

-- ---------- HISTORIAL DE ESTADOS DE SOLICITUDES ----------
create table public.solicitud_historial (
  id uuid primary key default gen_random_uuid(),
  solicitud_id uuid not null references public.solicitudes_ciudadanas(id) on delete cascade,
  estado_anterior public.estado_solicitud,
  estado_nuevo public.estado_solicitud not null,
  cambiado_por uuid references public.perfiles(id),
  nota text,
  cambiado_en timestamptz not null default now()
);

-- ---------- NOTICIAS / COMUNICADOS ----------
create table public.noticias (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  resumen text,
  contenido text not null,
  imagen_url text,
  estado_publicacion public.estado_publicacion not null default 'borrador',
  creado_por uuid references public.perfiles(id),
  fecha_publicacion timestamptz,
  creado_en timestamptz not null default now()
);

create table public.noticia_documentos (
  id uuid primary key default gen_random_uuid(),
  noticia_id uuid not null references public.noticias(id) on delete cascade,
  titulo text not null,
  storage_path text not null,
  tamano_bytes bigint not null
);

-- ---------- TRANSPARENCIA ----------
create table public.documentos_transparencia (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  categoria text not null,   -- informes, presupuestos, resoluciones, actas, contrataciones, rendicion_cuentas, otros
  anio int not null,
  storage_path text not null,
  tamano_bytes bigint not null,
  subido_por uuid references public.perfiles(id),
  publicado boolean not null default true,
  creado_en timestamptz not null default now()
);
create index on public.documentos_transparencia (categoria, anio);

-- ---------- CONFIGURACIÓN INSTITUCIONAL (clave/valor editable) ----------
create table public.configuracion_institucional (
  clave text primary key,
  valor text,
  actualizado_en timestamptz not null default now()
);
-- Valores base como marcadores pendientes de validar por la Junta:
insert into public.configuracion_institucional (clave, valor) values
  ('direccion', 'Pendiente de confirmar por la Junta Comunal'),
  ('telefono', 'Pendiente de confirmar por la Junta Comunal'),
  ('correo', 'Pendiente de confirmar por la Junta Comunal'),
  ('horario_atencion', 'Pendiente de confirmar por la Junta Comunal'),
  ('mision', 'Texto provisional: pendiente de redacción oficial.'),
  ('vision', 'Texto provisional: pendiente de redacción oficial.'),
  ('historia', 'Texto provisional: pendiente de redacción oficial.');

-- ---------- REGISTRO DE ACCIONES ADMINISTRATIVAS (auditoría) ----------
create table public.registro_acciones (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references public.perfiles(id),
  accion text not null,          -- p.ej. 'crear_proyecto', 'eliminar_documento'
  entidad text not null,         -- p.ej. 'proyectos', 'noticias'
  entidad_id uuid,
  detalle jsonb,
  creado_en timestamptz not null default now()
);

-- =========================================================
-- FUNCIONES AUXILIARES
-- =========================================================
create or replace function public.es_staff()
returns boolean language sql stable security definer as $$
  select exists (select 1 from public.perfiles where id = auth.uid());
$$;

create or replace function public.es_admin()
returns boolean language sql stable security definer as $$
  select exists (select 1 from public.perfiles where id = auth.uid() and rol = 'administrador');
$$;

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================
alter table public.perfiles enable row level security;
alter table public.proyectos enable row level security;
alter table public.proyecto_imagenes enable row level security;
alter table public.proyecto_documentos enable row level security;
alter table public.solicitudes_ciudadanas enable row level security;
alter table public.solicitud_historial enable row level security;
alter table public.noticias enable row level security;
alter table public.noticia_documentos enable row level security;
alter table public.documentos_transparencia enable row level security;
alter table public.configuracion_institucional enable row level security;
alter table public.registro_acciones enable row level security;

-- Perfiles: cada usuario ve el suyo; solo admin ve/edita todos
create policy "perfil propio visible" on public.perfiles for select using (id = auth.uid() or public.es_admin());
create policy "solo admin administra perfiles" on public.perfiles for all using (public.es_admin());

-- Proyectos: público lee solo publicados; staff lee/edita todo
create policy "publico lee proyectos publicados" on public.proyectos for select
  using (estado_publicacion = 'publicado' or public.es_staff());
create policy "staff administra proyectos" on public.proyectos for insert with check (public.es_staff());
create policy "staff actualiza proyectos" on public.proyectos for update using (public.es_staff());
create policy "solo admin elimina proyectos" on public.proyectos for delete using (public.es_admin());

-- Imágenes / documentos de proyectos: heredan visibilidad del proyecto
create policy "publico lee imagenes de proyectos publicados" on public.proyecto_imagenes for select
  using (exists (select 1 from public.proyectos p where p.id = proyecto_id and (p.estado_publicacion = 'publicado' or public.es_staff())));
create policy "staff administra imagenes" on public.proyecto_imagenes for all using (public.es_staff());

create policy "publico lee documentos de proyectos publicados" on public.proyecto_documentos for select
  using (exists (select 1 from public.proyectos p where p.id = proyecto_id and (p.estado_publicacion = 'publicado' or public.es_staff())));
create policy "staff administra documentos" on public.proyecto_documentos for all using (public.es_staff());

-- Solicitudes ciudadanas: cualquiera puede crear (formulario público); solo staff lee/gestiona
create policy "cualquiera crea solicitud" on public.solicitudes_ciudadanas for insert with check (true);
create policy "solo staff lee solicitudes" on public.solicitudes_ciudadanas for select using (public.es_staff());
create policy "solo staff actualiza solicitudes" on public.solicitudes_ciudadanas for update using (public.es_staff());

create policy "solo staff lee historial" on public.solicitud_historial for select using (public.es_staff());
create policy "solo staff crea historial" on public.solicitud_historial for insert with check (public.es_staff());

-- Noticias
create policy "publico lee noticias publicadas" on public.noticias for select
  using (estado_publicacion = 'publicado' or public.es_staff());
create policy "staff administra noticias" on public.noticias for all using (public.es_staff());

create policy "publico lee adjuntos de noticias publicadas" on public.noticia_documentos for select
  using (exists (select 1 from public.noticias n where n.id = noticia_id and (n.estado_publicacion = 'publicado' or public.es_staff())));
create policy "staff administra adjuntos noticias" on public.noticia_documentos for all using (public.es_staff());

-- Transparencia: público lee lo publicado
create policy "publico lee transparencia publicada" on public.documentos_transparencia for select
  using (publicado = true or public.es_staff());
create policy "staff administra transparencia" on public.documentos_transparencia for all using (public.es_staff());

-- Configuración institucional: lectura pública, edición solo staff
create policy "publico lee configuracion" on public.configuracion_institucional for select using (true);
create policy "staff edita configuracion" on public.configuracion_institucional for update using (public.es_staff());

-- Registro de acciones: solo staff, solo lectura para no-admin
create policy "staff lee registro" on public.registro_acciones for select using (public.es_staff());
create policy "staff escribe registro" on public.registro_acciones for insert with check (public.es_staff());
