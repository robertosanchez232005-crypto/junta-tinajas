import { z } from "zod";

export const estadosProyecto = ["planificado", "en_ejecucion", "finalizado", "suspendido"] as const;

export const esquemaProyecto = z.object({
  titulo: z.string().min(3, "El título es muy corto").max(160),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "El slug debe usar minúsculas y guiones, sin espacios"),
  descripcion: z.string().min(20, "Agrega una descripción más completa"),
  resumenBreve: z.string().max(220).optional(),
  fechaInicio: z.string().date().optional(),
  fechaFin: z.string().date().optional(),
  estado: z.enum(estadosProyecto),
  comunidadBeneficiada: z.string().min(2),
  monto: z.coerce.number().nonnegative().optional(), // opcional: la Junta decide si se publica
  entidadResponsable: z.string().min(2),
  categoria: z.string().optional(),
  estadoPublicacion: z.enum(["borrador", "publicado", "archivado"]).default("borrador")
});

export type ProyectoInput = z.infer<typeof esquemaProyecto>;
