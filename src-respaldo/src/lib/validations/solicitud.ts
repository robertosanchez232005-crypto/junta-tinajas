import { z } from "zod";

export const esquemaSolicitudCiudadana = z.object({
  nombreCompleto: z.string().min(3, "Ingresa tu nombre completo"),
  numeroIdentificacion: z.string().optional(),
  correo: z.string().email("Correo electrónico inválido"),
  telefono: z.string().optional(),
  comunidadSector: z.string().min(2, "Indica tu comunidad o sector"),
  tipoSolicitud: z.enum([
    "queja",
    "solicitud_de_servicio",
    "sugerencia",
    "consulta_general",
    "otro"
  ]),
  asunto: z.string().min(3).max(160),
  descripcion: z.string().min(10, "Describe tu solicitud con un poco más de detalle"),
  autorizoTratamientoDatos: z.literal(true, {
    errorMap: () => ({ message: "Debes autorizar el tratamiento de tus datos para continuar" })
  }),
  // Campo honeypot para protección antispam básica (además del captcha en producción).
  sitioWeb: z.string().max(0).optional()
});

export type SolicitudCiudadanaInput = z.infer<typeof esquemaSolicitudCiudadana>;
