import Link from "next/link";
import { notFound } from "next/navigation";
import { clienteNoticias, fechaNoticia, urlPublica, type NoticiaPublica } from "@/lib/noticias-publicas";

export const dynamic = "force-dynamic";

export default async function PaginaNoticiaIndividual({ params }: { params: { slug: string } }) {
  // Se conserva la carpeta [slug]; el enlace utiliza el ID ya guardado en Supabase.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug)) notFound();
  let noticia: NoticiaPublica | null = null;
  let fallo = false;
  try {
    const { data, error } = await clienteNoticias().from("noticias")
      .select("id,titulo,resumen,contenido,imagen_portada,video_url,fecha_publicacion")
      .eq("id", params.slug).eq("publicado", true).maybeSingle();
    if (error) fallo = true;
    else noticia = data as NoticiaPublica | null;
  } catch { fallo = true; }
  if (fallo) return <p role="alert" className="mx-auto max-w-3xl px-4 py-14">No se pudo cargar la noticia. Intenta nuevamente en unos minutos.</p>;
  if (!noticia) notFound();
  const imagen = urlPublica(noticia.imagen_portada);
  const video = urlPublica(noticia.video_url);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <Link href="/noticias" className="text-institucional-verde underline">Volver a noticias</Link>
      <h1 className="mt-6 text-3xl font-extrabold text-institucional-verdeOscuro">{noticia.titulo}</h1>
      <p className="mt-3 text-sm text-gray-500">{fechaNoticia(noticia.fecha_publicacion)}</p>
      {imagen && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagen} alt={noticia.titulo} className="mt-8 h-auto w-full rounded-xl" />
      )}
      {noticia.resumen && <p className="mt-6 whitespace-pre-line text-lg font-medium">{noticia.resumen}</p>}
      <div className="mt-6 whitespace-pre-line leading-relaxed text-gray-700">{noticia.contenido}</div>
      {video && <a href={video} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block text-institucional-verde underline">Ver video relacionado</a>}
    </article>
  );
}
