import type { Metadata } from "next";
import { TarjetaProyecto } from "@/components/proyectos/TarjetaProyecto";
import { proyectosDemo } from "@/data/proyectos-demo";

export const metadata: Metadata = { title: "Proyectos" };

// EN PRODUCCIÓN: reemplazar `proyectosDemo` por una consulta a Supabase, p. ej.:
//
//   const supabase = crearClienteServidor();
//   const { data: proyectos } = await supabase
//     .from("proyectos")
//     .select("*")
//     .eq("estado_publicacion", "publicado")
//     .order("fecha_inicio", { ascending: false });
//
// searchParams (?q=, ?anio=, ?estado=, ?categoria=, ?pagina=) deben traducirse
// a filtros .ilike() / .eq() / .range() sobre esa consulta.

export default function PaginaProyectos({
  searchParams
}: {
  searchParams: { q?: string; estado?: string };
}) {
  const { q, estado } = searchParams;

  const proyectosFiltrados = proyectosDemo.filter((p) => {
    const coincideTexto = !q || p.titulo.toLowerCase().includes(q.toLowerCase());
    const coincideEstado = !estado || p.estado === estado;
    return coincideTexto && coincideEstado;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-institucional-verdeOscuro">Proyectos</h1>
      <p className="mt-2 text-gray-600">
        Catálogo público de proyectos ejecutados y en ejecución de la Junta Comunal de Las Tinajas.
      </p>

      {/* Buscador y filtros — formulario GET, funciona sin JavaScript */}
      <form className="mt-8 flex flex-wrap gap-3" role="search" aria-label="Buscar proyectos">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por palabra clave…"
          className="min-w-[240px] flex-1 rounded-lg border border-gray-300 px-4 py-2"
          aria-label="Palabra clave"
        />
        <select name="estado" defaultValue={estado ?? ""} className="rounded-lg border border-gray-300 px-4 py-2" aria-label="Filtrar por estado">
          <option value="">Todos los estados</option>
          <option value="planificado">Planificado</option>
          <option value="en_ejecucion">En ejecución</option>
          <option value="finalizado">Finalizado</option>
          <option value="suspendido">Suspendido</option>
        </select>
        <button type="submit" className="btn-primario">Filtrar</button>
      </form>

      {proyectosFiltrados.length === 0 ? (
        <p className="mt-12 rounded-lg bg-institucional-verdeClaro p-6 text-center text-institucional-verdeOscuro">
          No se encontraron proyectos con los criterios seleccionados.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyectosFiltrados.map((p) => (
            <TarjetaProyecto key={p.slug} {...p} />
          ))}
        </div>
      )}

      {/* Paginación de ejemplo — conectar a conteo real de Supabase (.range()) */}
      <nav className="mt-10 flex justify-center gap-2" aria-label="Paginación">
        <button className="rounded-md border border-gray-300 px-3 py-1 text-sm" disabled>Anterior</button>
        <span className="px-3 py-1 text-sm">Página 1</span>
        <button className="rounded-md border border-gray-300 px-3 py-1 text-sm" disabled>Siguiente</button>
      </nav>
    </div>
  );
}
