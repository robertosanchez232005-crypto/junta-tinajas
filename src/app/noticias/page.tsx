import type { Metadata } from "next";
import Link from "next/link";
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-institucional-verdeOscuro">Noticias y Comunicados</h1>
      <p className="mt-2 text-gray-600">Últimas publicaciones de la Junta Comunal de Las Tinajas.</p>
      {fallo ? (
        <p role="alert" className="mt-10 rounded-xl bg-amber-50 p-6 text-amber-900">No se pudieron cargar las noticias. Intenta nuevamente en unos minutos.</p>
      ) : noticias.length === 0 ? (
        <p className="mt-10 rounded-xl bg-institucional-verdeClaro p-8 text-center">Aún no hay noticias publicadas.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((n) => (
            <article key={n.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              {urlPublica(n.imagen_portada) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={urlPublica(n.imagen_portada)} alt={n.titulo} loading="lazy" className="h-48 w-full object-cover" />
              )}
              <div className="space-y-3 p-5">
                <h2 className="text-xl font-bold text-institucional-verdeOscuro"><Link href={"/noticias/" + n.id}>{n.titulo}</Link></h2>
                <p className="text-sm text-gray-500">{fechaNoticia(n.fecha_publicacion)}</p>
                <p className="whitespace-pre-line text-gray-700">{n.resumen || n.contenido?.slice(0, 220)}</p>
                <Link href={"/noticias/" + n.id} className="inline-block font-semibold text-institucional-verde underline">Leer noticia</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
