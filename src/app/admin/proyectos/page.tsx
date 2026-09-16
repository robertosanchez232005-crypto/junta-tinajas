import Link from "next/link";
import { crearClienteServidor } from "@/lib/supabase/server";

export default async function PanelListadoProyectos() {
  const supabase = crearClienteServidor();
  const { data: proyectos } = await supabase
    .from("proyectos")
    .select("id, titulo, estado, estado_publicacion, actualizado_en")
    .order("actualizado_en", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-institucional-verdeOscuro">Proyectos</h1>
        <Link href="/admin/proyectos/nuevo" className="btn-primario">Nuevo proyecto</Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Publicación</th>
              <th className="px-4 py-3">Actualizado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(proyectos ?? []).map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">{p.titulo}</td>
                <td className="px-4 py-3">{p.estado}</td>
                <td className="px-4 py-3">{p.estado_publicacion}</td>
                <td className="px-4 py-3">{new Date(p.actualizado_en).toLocaleDateString("es-PA")}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/proyectos/${p.id}`} className="font-semibold text-institucional-verde hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {(!proyectos || proyectos.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Aún no hay proyectos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
