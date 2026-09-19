-- Actualiza la tabla de convocatorias para el formulario "Avisos de compra".
-- Conserva los registros y columnas existentes.

alter table public.convocatorias
  add column if not exists programa text,
  add column if not exists fecha_acto_publico date,
  add column if not exists inicio_presentacion_propuestas time,
  add column if not exists inicio_acto_publico time,
  add column if not exists fianza text,
  add column if not exists termino_subsanacion text,
  add column if not exists numero_convocatoria text,
  add column if not exists cuadro_cotizaciones_pdf text;
