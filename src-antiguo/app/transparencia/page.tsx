import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = { title: "Transparencia" };

const categorias = [
  "Informes",
  "Presupuestos",
  "Resoluciones",
  "Actas",
  "Contrataciones",
  "Rendición de cuentas",
  "Otros documentos públicos"
];

// EN PRODUCCIÓN: reemplazar por consulta a `documentos_transparencia`
// (Supabase), filtrando por `publicado = true`, con filtros por categoria/anio.
export default function PaginaTransparencia() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-institucional-verdeOscuro">Transparencia</h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Documentos públicos de la Junta Comunal de Las Tinajas.
      </p>

      <form className="mt-8 flex flex-wrap gap-3" role="search" aria-label="Filtrar documentos de transparencia">
        <select name="categoria" className="rounded-lg border border-gray-300 px-4 py-2" aria-label="Categoría">
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select name="anio" className="rounded-lg border border-gray-300 px-4 py-2" aria-label="Año">
          <option value="">Todos los años</option>
          <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
        </select>
        <button type="submit" className="btn-primario">Filtrar</button>
      </form>

      <div className="mt-10 rounded-xl bg-institucional-verdeClaro p-8 text-center text-institucional-verdeOscuro">
        <FileText className="mx-auto mb-3" size={32} />
        <p className="font-semibold">Aún no hay documentos de transparencia publicados.</p>
        <p className="mt-1 text-sm">
          Esta sección se completará conforme la Junta Comunal publique informes,
          presupuestos, resoluciones y otros documentos desde el panel administrativo.
        </p>
      </div>
    </div>
  );
}
