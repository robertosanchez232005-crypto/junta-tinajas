import Link from "next/link";

// Sigue el mismo patrón que /admin/proyectos: listado desde Supabase (tabla
// `noticias`) + formulario de creación/edición con estado borrador/publicado.
export default function PanelNoticias() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-institucional-verdeOscuro">Noticias y comunicados</h1>
        <Link href="#" className="btn-primario">Nueva noticia</Link>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Módulo con el mismo patrón CRUD que "Proyectos": crear, editar, publicar,
        archivar. Implementar `FormularioNoticia.tsx` siguiendo `FormularioProyecto.tsx`
        como referencia, con campos título, resumen, contenido, imagen y adjuntos.
      </p>
    </div>
  );
}
