import { crearClienteServidor } from "@/lib/supabase/server";
import { CambiarEstadoSolicitud } from "@/components/admin/CambiarEstadoSolicitud";

const etiquetas: Record<string, string> = {
  recibida: "Recibida",
  en_revision: "En revisión",
  atendida: "Atendida",
  cerrada: "Cerrada"
};

export default async function PanelSolicitudes() {
  const supabase = crearClienteServidor();
  const { data: solicitudes } = await supabase
    .from("solicitudes_ciudadanas")
    .select("id, numero_seguimiento, nombre_completo, asunto, tipo_solicitud, estado, creado_en")
    .order("creado_en", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-institucional-verdeOscuro">Solicitudes ciudadanas</h1>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">N.° seguimiento</th>
              <th className="px-4 py-3">Ciudadano</th>
              <th className="px-4 py-3">Asunto</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {(solicitudes ?? []).map((s) => (
              <tr key={s.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-mono text-xs">{s.numero_seguimiento}</td>
                <td className="px-4 py-3">{s.nombre_completo}</td>
                <td className="px-4 py-3">{s.asunto}</td>
                <td className="px-4 py-3">{s.tipo_solicitud}</td>
                <td className="px-4 py-3">
                  <CambiarEstadoSolicitud id={s.id} estadoActual={s.estado} etiquetas={etiquetas} />
                </td>
                <td className="px-4 py-3">{new Date(s.creado_en).toLocaleDateString("es-PA")}</td>
              </tr>
            ))}
            {(!solicitudes || solicitudes.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No hay solicitudes registradas todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
