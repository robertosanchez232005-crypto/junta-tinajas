import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerProyecto } from "@/lib/proyectos-publicos";
import { fechaNoticia, urlPublica } from "@/lib/noticias-publicas";

export const dynamic = "force-dynamic";

export default async function PaginaProyecto({ params }: { params: { slug: string } }) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug)) notFound();
  const { proyecto: p, fallo } = await obtenerProyecto(params.slug);
  if (fallo) return <p role="alert" className="p-10">No se pudo cargar el proyecto. Intenta nuevamente en unos minutos.</p>;
  if (!p) notFound();
  const imagen = urlPublica(p.imagen_portada);
  const pdf = urlPublica(p.documento_pdf ?? null);
  const video = urlPublica(p.video_url);
  const galeria = Array.isArray(p.galeria) ? p.galeria.map(urlPublica).filter((u): u is string => !!u) : [];
  return (
    <article className="mx-auto max-w-4xl px-4 py-14">
      <Link href="/proyectos" className="text-institucional-verde underline">Volver a proyectos</Link>
      <h1 className="mt-6 text-3xl font-extrabold text-institucional-verdeOscuro">{p.titulo}</h1>
      <p className="mt-3">{p.estado.replace(/_/g, " ")}</p>
      <p className="mt-2 text-gray-500">{[p.ubicacion, fechaNoticia(p.fecha)].filter(Boolean).join(" · ")}</p>
      {imagen && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagen} alt={p.titulo} className="mt-8 h-auto w-full rounded-xl" />
      )}
      <p className="mt-8 whitespace-pre-line leading-relaxed">{p.descripcion}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {galeria.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={url + i} src={url} alt={p.titulo + " — foto " + (i + 1)} loading="lazy" className="h-auto w-full rounded-lg" />
        ))}
      </div>
      {video && <a href={video} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-institucional-verde underline">Ver video relacionado</a>}
      <section className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-bold">Documento del proyecto</h2>
        {pdf ? <a href={pdf} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-institucional-verde underline">Abrir PDF (puedes descargarlo desde el visor)</a> : <p className="mt-3">No hay un PDF publicado para este proyecto.</p>}
      </section>
    </article>
  );
}
