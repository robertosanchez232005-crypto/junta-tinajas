"use client";

import { crearClienteNavegador } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function CambiarEstadoSolicitud({
  id,
  estadoActual,
  etiquetas
}: {
  id: string;
  estadoActual: string;
  etiquetas: Record<string, string>;
}) {
  const supabase = crearClienteNavegador();
  const router = useRouter();

  async function alCambiar(nuevoEstado: string) {
    const { data: sesion } = await supabase.auth.getUser();
    await supabase.from("solicitudes_ciudadanas").update({ estado: nuevoEstado }).eq("id", id);
    await supabase.from("solicitud_historial").insert({
      solicitud_id: id,
      estado_anterior: estadoActual,
      estado_nuevo: nuevoEstado,
      cambiado_por: sesion.user?.id
    });
    router.refresh();
  }

  return (
    <select
      defaultValue={estadoActual}
      onChange={(e) => alCambiar(e.target.value)}
      className="rounded-md border border-gray-300 px-2 py-1 text-sm"
      aria-label="Cambiar estado de la solicitud"
    >
      {Object.entries(etiquetas).map(([valor, texto]) => (
        <option key={valor} value={valor}>{texto}</option>
      ))}
    </select>
  );
}
