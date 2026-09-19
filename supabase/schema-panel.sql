-- Ejecutar completo en Supabase > SQL Editor

-- 1. Perfiles (quién puede entrar al panel)
create table if not exists perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  rol text not null default 'editor' check (rol in ('admin','editor'))
);
alter table perfiles enable row level security;

create or replace function public.is_staff() returns boolean
language sql security definer set search_path = public stable as
$$ select exists (select 1 from perfiles where id = auth.uid()) $$;

create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public stable as
$$ select exists (select 1 from perfiles where id = auth.uid() and rol = 'admin') $$;

create policy "ver mi perfil" on perfiles for select to authenticated using (id = auth.uid() or is_admin());
create policy "admin gestiona perfiles" on perfiles for all to authenticated using (is_admin()) with check (is_admin());

-- 2. Contenido
create table if not exists proyectos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  ubicacion text,
  estado text not null default 'planificado' check (estado in ('planificado','en_ejecucion','finalizado')),
  fecha date,
  imagen_portada text,
  galeria text[] not null default '{}',
  video_url text,
  publicado boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  resumen text,
  contenido text,
  imagen_portada text,
  video_url text,
  fecha_publicacion date default current_date,
  publicado boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists convocatorias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  institucion text,
  provincia text,
  categoria text,
  subcategoria text,
  precio numeric(14,2),
  fecha_presentacion timestamptz,
  lugar text,
  tipo_procedimiento text,
  numero_acto text,
  partida_presupuestal text,
  modalidad_adjudicacion text,
  responsable text,
  fecha_publicacion date default current_date,
  documento_pdf text,
  publicado boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  fecha_inicio timestamptz not null,
  fecha_fin timestamptz,
  lugar text,
  imagen text,
  publicado boolean not null default true,
  created_at timestamptz not null default now()
);

-- 3. RLS: público lee lo publicado; staff crea/edita; solo admin elimina
do $$
declare t text;
begin
  foreach t in array array['proyectos','noticias','convocatorias','eventos'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "lectura publica" on %I for select using (publicado = true or is_staff())', t);
    execute format('create policy "staff inserta" on %I for insert to authenticated with check (is_staff())', t);
    execute format('create policy "staff edita" on %I for update to authenticated using (is_staff()) with check (is_staff())', t);
    execute format('create policy "admin elimina" on %I for delete to authenticated using (is_admin())', t);
  end loop;
end $$;

-- 4. Storage: un bucket público "media"
insert into storage.buckets (id, name, public) values ('media','media', true) on conflict do nothing;
create policy "media lectura" on storage.objects for select using (bucket_id = 'media');
create policy "media staff sube" on storage.objects for insert to authenticated with check (bucket_id = 'media' and is_staff());
create policy "media staff edita" on storage.objects for update to authenticated using (bucket_id = 'media' and is_staff());
create policy "media admin borra" on storage.objects for delete to authenticated using (bucket_id = 'media' and is_admin());

-- 5. Tu primer administrador: crea el usuario en Authentication > Users y luego corre:
-- insert into perfiles (id, nombre, rol) values ('UUID-DEL-USUARIO', 'Robert', 'admin');
