import Link from "next/link";
import { notFound } from "next/navigation";
import { publicaciones } from "@/lib/otras-publicaciones";
import { urlPublica } from "@/lib/noticias-publicas";

const campos: [string, string][] = [
  ["programa","Programa"],["categoria","Categoría"],["subcategoria","Subcategoría"],
  ["precio","Precio de referencia (B/.)"],["lugar","Lugar"],["fecha_acto_publico","Fecha del Acto Público"],
  ["inicio_presentacion_propuestas","Inicio de Presentación de Propuestas"],["inicio_acto_publico","Inicio del Acto Público"],
  ["institucion","Institución"],["tipo_procedimiento","Tipo de procedimiento"],["numero_acto","Número de acto"],
  ["partida_presupuestal","Partida presupuestal"],["fianza","Fianza"],["termino_subsanacion","Término de subsanación"],
  ["modalidad_adjudicacion","Modalidad de adjudicación"],["numero_convocatoria","Número de Convocatoria"],
  ["provincia","Provincia de entrega"],["responsable","Responsable"],["fecha_publicacion","Fecha de publicación"],
  ["fecha_inicio","Inicio del evento"],["fecha_fin","Fin del evento"]
];
export async function DetallePublicacion({ tabla, id, ruta }: { tabla: "convocatorias" | "eventos"; id: string; ruta: string }) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) notFound();
  const { datos, fallo } = await publicaciones(tabla, id);
  if (fallo) return <p role="alert" className="p-10">No se pudo cargar la publicación.</p>;
  const p = datos[0];
  if (!p) notFound();
  const imagen = urlPublica(typeof p.imagen === "string" ? p.imagen : null);
  return <article className="mx-auto max-w-4xl px-4 py-14">
    <Link href={ruta} className="text-institucional-verde underline">Volver al listado</Link>
    <h1 className="mt-6 text-3xl font-bold">{p.titulo}</h1>
    {imagen && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imagen} alt={p.titulo} className="mt-6 h-auto w-full rounded-xl" />
    )}
    {typeof p.descripcion === "string" && <p className="mt-6 whitespace-pre-line">{p.descripcion}</p>}
    <dl className="mt-8 grid gap-5 sm:grid-cols-2">{campos.map(([campo, etiqueta]) => {
      const valor = p[campo];
      if (valor === null || valor === undefined || valor === "") return null;
      let texto = String(valor);
      if (campo === "fecha_inicio" || campo === "fecha_fin") {
        const d = new Date(texto);
        if (!Number.isNaN(d.getTime())) texto = d.toLocaleString("es-PA", { timeZone: "America/Panama" }) + " (hora de Panamá)";
      }
      return <div key={campo}><dt className="font-semibold">{etiqueta}</dt><dd className="whitespace-pre-line">{texto}</dd></div>;
    })}</dl>
    <div className="mt-8 flex flex-wrap gap-4">{[["documento_pdf","Documento PDF"],["cuadro_cotizaciones_pdf","Cuadro de cotizaciones"]].map(([campo, etiqueta]) => {
      const url = urlPublica(typeof p[campo] === "string" ? p[campo] as string : null);
      return url ? <a key={campo} href={url} target="_blank" rel="noopener noreferrer" className="btn-primario">{etiqueta}</a> : null;
    })}</div>
  </article>;
}
