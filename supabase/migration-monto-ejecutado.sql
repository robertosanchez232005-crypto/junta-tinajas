-- Ejecutar una sola vez en Supabase > SQL Editor
alter table public.proyectos add column if not exists monto_ejecutado numeric(14,2);
