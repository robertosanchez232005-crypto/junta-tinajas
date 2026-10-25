import type { Metadata } from "next";
import { ListaNoticias, type NoticiaLista } from "@/components/noticias/ListaNoticias";
import { clienteNoticias, fechaNoticia, urlPublica, type NoticiaPublica } from "@/lib/noticias-publicas";

export const metadata: Metadata = { title: "Noticias y Comunicados" };
export const dynamic = "force-dynamic";

export default async function PaginaNoticias() {
  let noticias: NoticiaPublica[] = [];
  let fallo = false;
  try {
    const { data, error } = await clienteNoticias().from("noticias")
      .select("id,titulo,resumen,contenido,imagen_portada,video_url,fecha_publicacion")
      .eq("publicado", true)
      .order("fecha_publicacion", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) fallo = true;
    else noticias = (data ?? []) as NoticiaPublica[];
  } catch { fallo = true; }

  const lista: NoticiaLista[] = noticias.map((n) => ({
    id: n.id, titulo: n.titulo, resumen: n.resumen || n.contenido?.slice(0, 200) || "",
    imagen: urlPublica(n.imagen_portada), fecha: n.fecha_publicacion ?? "", fechaTexto: fechaNoticia(n.fecha_publicacion)
  }));

  return (
    <div className="fondo-puntos min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <h1 className="titulo-display text-4xl text-institucional-verdeOscuro sm:text-6xl">Noticias y Comunicados</h1>
        <p className="mt-3 text-lg text-gray-600">Últimas publicaciones de la Junta Comunal de Las Tinajas.</p>
        {fallo ? (
          <p role="alert" className="mt-10 rounded-xl bg-amber-50 p-6 text-amber-900">No se pudieron cargar las noticias. Intenta nuevamente en unos minutos.</p>
        ) : noticias.length === 0 ? (
          <p className="mt-10 rounded-2xl bg-white p-10 text-center text-lg shadow-sm">Aún no hay noticias publicadas. Vuelve pronto: aquí compartiremos las novedades de la comunidad.</p>
        ) : <ListaNoticias noticias={lista} />}
      </div>
    </div>
  );
}
