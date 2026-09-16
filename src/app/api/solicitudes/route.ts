import { NextResponse } from "next/server";
import { esquemaSolicitudCiudadana } from "@/lib/validations/solicitud";
import { crearClienteServidor } from "@/lib/supabase/server";

// POST /api/solicitudes
// Recibe el formulario público de Atención Ciudadana, valida con Zod,
// descarta bots mediante el honeypot y guarda la solicitud vía Supabase (RLS
// permite INSERT público, ver policy "cualquiera crea solicitud").
export async function POST(request: Request) {
  const cuerpo = await request.json();
  const resultado = esquemaSolicitudCiudadana.safeParse(cuerpo);

  if (!resultado.success) {
    return NextResponse.json({ error: resultado.error.flatten() }, { status: 400 });
  }

  // Honeypot: si el campo oculto "sitioWeb" viene lleno, es casi seguro un bot.
  if (resultado.data.sitioWeb) {
    return NextResponse.json({ error: "Solicitud rechazada" }, { status: 400 });
  }

  // NOTA: en producción, antes de insertar, validar también un token de
  // Cloudflare Turnstile / hCaptcha enviado desde el cliente.

  const supabase = crearClienteServidor();
  const { data, error } = await supabase
    .from("solicitudes_ciudadanas")
    .insert({
      nombre_completo: resultado.data.nombreCompleto,
      numero_identificacion: resultado.data.numeroIdentificacion || null,
      correo: resultado.data.correo,
      telefono: resultado.data.telefono || null,
      comunidad_sector: resultado.data.comunidadSector,
      tipo_solicitud: resultado.data.tipoSolicitud,
      asunto: resultado.data.asunto,
      descripcion: resultado.data.descripcion,
      autorizo_tratamiento_datos: resultado.data.autorizoTratamientoDatos
    })
    .select("numero_seguimiento")
    .single();

  if (error) {
    return NextResponse.json({ error: "No se pudo registrar la solicitud" }, { status: 500 });
  }

  // Si RESEND_API_KEY está configurada, aquí se enviaría el correo de
  // confirmación al ciudadano con su número de seguimiento.

  return NextResponse.json({ numeroSeguimiento: data.numero_seguimiento }, { status: 201 });
}
