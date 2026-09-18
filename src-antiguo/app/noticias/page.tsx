import type { Metadata } from "next";

export const metadata: Metadata = { title: "Noticias y Comunicados" };

// EN PRODUCCIÓN: reemplazar por consulta a `noticias` con estado_publicacion = 'publicado'.
export default function PaginaNoticias() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-institucional-verdeOscuro">Noticias y Comunicados</h1>
      <p className="mt-2 text-gray-600">Últimas publicaciones de la Junta Comunal de Las Tinajas.</p>

      <div className="mt-10 rounded-xl bg-institucional-verdeClaro p-8 text-center text-institucional-verdeOscuro">
        <p className="font-semibold">Aún no hay noticias publicadas.</p>
        <p className="mt-1 text-sm">
          El personal autorizado puede publicar noticias y comunicados desde el panel administrativo.
        </p>
      </div>
    </div>
  );
}
