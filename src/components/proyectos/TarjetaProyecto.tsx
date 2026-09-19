import Link from "next/link";
import { fechaNoticia, urlPublica } from "@/lib/noticias-publicas";
import type { ProyectoPublico } from "@/lib/proyectos-publicos";

export function TarjetaProyecto({ proyecto: p }: { proyecto: ProyectoPublico }) {
  const imagen = urlPublica(p.imagen_portada);
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      {imagen && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagen} alt={p.titulo} loading="lazy" className="h-48 w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm font-semibold text-institucional-verde">{p.estado.replace(/_/g, " ")}</p>
        <h3 className="text-xl font-bold text-institucional-verdeOscuro">{p.titulo}</h3>
        <p className="text-sm text-gray-500">{[p.ubicacion, fechaNoticia(p.fecha)].filter(Boolean).join(" · ")}</p>
        <p className="flex-1 whitespace-pre-line text-gray-700">{p.descripcion?.slice(0, 220)}</p>
        <Link href={"/proyectos/" + p.id} className="text-institucional-verde underline">Ver proyecto</Link>
      </div>
    </article>
  );
}
