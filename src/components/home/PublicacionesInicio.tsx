import Link from "next/link";
import { publicaciones } from "@/lib/otras-publicaciones";
import { urlPublica } from "@/lib/noticias-publicas";

export async function PublicacionesInicio() {
  const secciones = [
    { tabla: "noticias", titulo: "Noticias", ruta: "/noticias" },
    { tabla: "convocatorias", titulo: "Avisos de compra", ruta: "/avisos-de-compra" },
    { tabla: "eventos", titulo: "Eventos", ruta: "/eventos" }
  ] as const;
  const resultados = await Promise.all(secciones.map(s => publicaciones(s.tabla)));
  return <>{secciones.map((s, i) => (
    <section key={s.tabla} className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-bold text-institucional-verdeOscuro">{s.titulo}</h2>
      <Link href={s.ruta} className="text-institucional-verde underline">Ver todos</Link>
      {resultados[i].fallo ? <p role="alert" className="mt-4">No se pudo cargar esta sección. Intenta nuevamente más tarde.</p> :
       resultados[i].datos.length === 0 ? <p className="mt-4">Aún no hay publicaciones.</p> :
       <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{resultados[i].datos.map(p => {
         const imagen = urlPublica(typeof p.imagen_portada === "string" ? p.imagen_portada : typeof p.imagen === "string" ? p.imagen : null);
         const resumen = p.resumen || p.descripcion || p.contenido;
         return <article key={p.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
           {imagen && (
             // eslint-disable-next-line @next/next/no-img-element
             <img src={imagen} alt={p.titulo} loading="lazy" className="h-48 w-full object-cover" />
           )}
           <div className="space-y-3 p-5">
             <h3 className="text-xl font-bold">{p.titulo}</h3>
             {typeof resumen === "string" && <p>{resumen.slice(0, 200)}</p>}
             <Link className="inline-block text-institucional-verde underline" href={s.ruta + "/" + p.id}>Ver publicación completa</Link>
           </div>
         </article>;
       })}</div>}
    </section>
  ))}</>;
}
