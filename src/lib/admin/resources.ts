export type FieldType =
  | 'text' | 'textarea' | 'select' | 'date' | 'datetime' | 'time'
  | 'number' | 'boolean' | 'image' | 'images' | 'file'

export type Field = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  help?: string
  options?: { value: string; label: string }[]
}

export type Resource = {
  key: string            // segmento de URL: /admin/<key>
  table: string
  singular: string
  plural: string
  titleField: string
  dateField?: string     // columna mostrada en el listado
  statusField?: string   // columna 'estado' opcional
  fields: Field[]
}

const yes = { required: true }

export const RESOURCES: Resource[] = [
  {
    key: 'proyectos', table: 'proyectos', singular: 'proyecto', plural: 'Proyectos',
    titleField: 'titulo', dateField: 'fecha', statusField: 'estado',
    fields: [
      { name: 'titulo', label: 'Título', type: 'text', ...yes },
      { name: 'estado', label: 'Estado', type: 'select', ...yes, options: [
        { value: 'planificado', label: 'Planificado' },
        { value: 'en_ejecucion', label: 'En ejecución' },
        { value: 'finalizado', label: 'Finalizado' },
      ] },
      { name: 'ubicacion', label: 'Ubicación (sector)', type: 'text' },
      { name: 'aprobado_consulta', label: 'Aprobado en Consulta Ciudadana', type: 'boolean' },
      { name: 'monto_aprobado', label: 'Monto aprobado (B/.)', type: 'number', help: 'Ingresar solo el monto aprobado oficialmente, sin comas de miles.' },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      { name: 'imagen_portada', label: 'Imagen de portada', type: 'image' },
      { name: 'galeria', label: 'Galería de fotos', type: 'images' },
      { name: 'documento_pdf', label: 'Documento PDF del proyecto', type: 'file' },
      { name: 'video_url', label: 'Enlace de video (YouTube, opcional)', type: 'text' },
      { name: 'publicado', label: 'Publicado en la web', type: 'boolean' },
    ],
  },
  {
    key: 'noticias', table: 'noticias', singular: 'noticia', plural: 'Noticias',
    titleField: 'titulo', dateField: 'fecha_publicacion',
    fields: [
      { name: 'titulo', label: 'Título', type: 'text', ...yes },
      { name: 'resumen', label: 'Resumen corto', type: 'textarea', help: 'Se muestra en la tarjeta de la noticia.' },
      { name: 'contenido', label: 'Contenido', type: 'textarea' },
      { name: 'imagen_portada', label: 'Imagen de portada', type: 'image' },
      { name: 'video_url', label: 'Enlace de video (opcional)', type: 'text' },
      { name: 'fecha_publicacion', label: 'Fecha de publicación', type: 'date' },
      { name: 'publicado', label: 'Publicado en la web', type: 'boolean' },
    ],
  },
  {
    key: 'convocatorias', table: 'convocatorias', singular: 'aviso de compra', plural: 'Avisos de compra',
    titleField: 'titulo', dateField: 'fecha_acto_publico',
    fields: [
      { name: 'titulo', label: 'Descripción de la compra', type: 'text', ...yes },
      { name: 'programa', label: 'Programa', type: 'text', ...yes },
      { name: 'categoria', label: 'Categoría', type: 'text', ...yes },
      { name: 'subcategoria', label: 'Subcategoría', type: 'text', ...yes },
      { name: 'precio', label: 'Precio de referencia (B/.)', type: 'number', ...yes,
        help: 'Monto aproximado de la contratación.' },
      { name: 'lugar', label: 'Lugar del Acto Público', type: 'text', ...yes,
        help: 'Ubicación para el acto público y la presentación de propuestas.' },
      { name: 'fecha_acto_publico', label: 'Fecha del Acto Público', type: 'date', ...yes },
      { name: 'inicio_presentacion_propuestas', label: 'Inicio de Presentación de Propuestas', type: 'time', ...yes },
      { name: 'inicio_acto_publico', label: 'Inicio del Acto Público', type: 'time', ...yes },
      { name: 'institucion', label: 'Institución', type: 'text' },
      { name: 'tipo_procedimiento', label: 'Tipo de procedimiento', type: 'text' },
      { name: 'numero_acto', label: 'Número de acto', type: 'text' },
      { name: 'partida_presupuestal', label: 'Partida presupuestal', type: 'text' },
      { name: 'fianza', label: 'Fianza', type: 'text' },
      { name: 'termino_subsanacion', label: 'Término de subsanación', type: 'text' },
      { name: 'modalidad_adjudicacion', label: 'Modalidad de adjudicación', type: 'text' },
      { name: 'numero_convocatoria', label: 'Número de Convocatoria', type: 'text', ...yes },
      { name: 'provincia', label: 'Provincia de entrega', type: 'text' },
      { name: 'responsable', label: 'Responsable', type: 'text' },
      { name: 'documento_pdf', label: 'Documento PDF', type: 'file' },
      { name: 'cuadro_cotizaciones_pdf', label: 'Cuadro de cotizaciones', type: 'file' },
      { name: 'publicado', label: 'Publicado en la web', type: 'boolean' },
    ],
  },
  {
    key: 'eventos', table: 'eventos', singular: 'evento', plural: 'Eventos',
    titleField: 'titulo', dateField: 'fecha_inicio',
    fields: [
      { name: 'titulo', label: 'Nombre del evento', type: 'text', ...yes },
      { name: 'fecha_inicio', label: 'Inicio', type: 'datetime', ...yes },
      { name: 'fecha_fin', label: 'Fin (opcional)', type: 'datetime' },
      { name: 'lugar', label: 'Lugar', type: 'text' },
      { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      { name: 'imagen', label: 'Imagen', type: 'image' },
      { name: 'publicado', label: 'Publicado en la web', type: 'boolean' },
    ],
  },
]

export const getResource = (key: string) => RESOURCES.find((r) => r.key === key)
