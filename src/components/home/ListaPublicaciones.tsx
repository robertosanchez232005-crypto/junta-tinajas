import Link from "next/link";
import { publicaciones } from "@/lib/otras-publicaciones";

export async function ListaPublicaciones({ tabla, titulo, ruta }: { tabla: "convocatorias" | "eventos"; titulo: string; ruta: string }) {
  const { datos, fallo } = await publicaciones(tabla);
  return <main className="mx-auto max-w-5xl px-4 py-14">
    <h1 className="text-3xl font-bold">{titulo}</h1>
    {fallo ? <p role="alert" className="mt-6">No se pudo cargar esta sección.</p> :
      datos.length === 0 ? <p className="mt-6">Aún no hay publicaciones.</p> :
      <div className="mt-8 grid gap-6 sm:grid-cols-2">{datos.map(p => <article key={p.id} className="rounded-xl border p-6">
        <h2 className="text-xl font-bold">{p.titulo}</h2>
        <Link href={ruta + "/" + p.id} className="mt-4 inline-block text-institucional-verde underline">Ver publicación completa</Link>
      </article>)}</div>}
  </main>;
}
