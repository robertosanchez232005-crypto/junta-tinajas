import type { Metadata } from "next";
import { listarProyectos } from "@/lib/proyectos-publicos";
import { TarjetaProyecto } from "@/components/proyectos/TarjetaProyecto";

export const metadata: Metadata = { title: "Proyectos" };
export const dynamic = "force-dynamic";

export default async function PaginaProyectos({ searchParams }: { searchParams: { q?: string; estado?: string } }) {
  const { proyectos, fallo } = await listarProyectos();
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const estado = typeof searchParams.estado === "string" ? searchParams.estado : "";
  const resultados = proyectos.filter(p => (!q || p.titulo.toLowerCase().includes(q.toLowerCase())) && (!estado || p.estado === estado));
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-institucional-verdeOscuro">Proyectos</h1>
      <p className="mt-2 text-gray-600">Proyectos de la Junta Comunal de Las Tinajas.</p>
      <form className="mt-8 flex flex-wrap gap-3" role="search">
        <input name="q" type="search" defaultValue={q} aria-label="Buscar proyectos" placeholder="Buscar por título" className="flex-1 rounded-lg border p-3" />
        <select name="estado" defaultValue={estado} aria-label="Estado del proyecto" className="rounded-lg border p-3">
          <option value="">Todos los estados</option>
          <option value="planificado">Planificado</option>
          <option value="en_ejecucion">En ejecución</option>
          <option value="finalizado">Finalizado</option>
          <option value="suspendido">Suspendido</option>
        </select>
        <button className="btn-primario">Filtrar</button>
      </form>
      {fallo ? <p role="alert" className="mt-8">No se pudieron cargar los proyectos. Intenta nuevamente en unos minutos.</p> :
        resultados.length === 0 ? <p className="mt-8">No hay proyectos publicados que coincidan con la búsqueda.</p> :
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{resultados.map(p => <TarjetaProyecto key={p.id} proyecto={p} />)}</div>}
    </div>
  );
}
