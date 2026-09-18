// DATOS DE DEMOSTRACIÓN — claramente marcados como ejemplo.
// En producción estos registros provienen de la tabla `proyectos` en Supabase
// (ver src/lib/supabase y supabase/migrations/0001_init.sql).
// Reemplazar o eliminar antes de publicar el sitio en producción.

export type ProyectoDemo = {
  slug: string;
  titulo: string;
  fecha: string;
  estado: "planificado" | "en_ejecucion" | "finalizado" | "suspendido";
  lugar: string;
  resumen: string;
  esDemo: true;
};

export const proyectosDemo: ProyectoDemo[] = [
  {
    slug: "rehabilitacion-camino-sector-central",
    titulo: "Rehabilitación de camino — sector central (EJEMPLO)",
    fecha: "2025-03-10",
    estado: "en_ejecucion",
    lugar: "Sector central, Las Tinajas",
    resumen:
      "Proyecto de ejemplo para ilustrar el diseño de tarjetas. Reemplazar con datos reales aportados por la Junta.",
    esDemo: true
  },
  {
    slug: "mejoras-escuela-comunitaria",
    titulo: "Mejoras a la escuela comunitaria (EJEMPLO)",
    fecha: "2024-11-02",
    estado: "finalizado",
    lugar: "Las Tinajas centro",
    resumen:
      "Proyecto de ejemplo. Sustituir por información y fotografías oficiales antes de publicar.",
    esDemo: true
  },
  {
    slug: "sistema-de-agua-potable",
    titulo: "Ampliación del sistema de agua potable (EJEMPLO)",
    fecha: "2026-01-15",
    estado: "planificado",
    lugar: "Sectores altos de Las Tinajas",
    resumen:
      "Proyecto de ejemplo para mostrar el estado 'planificado'. Verificar datos reales con la Junta.",
    esDemo: true
  }
];
