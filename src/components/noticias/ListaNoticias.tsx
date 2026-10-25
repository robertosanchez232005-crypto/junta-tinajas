"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Share2, Newspaper } from "lucide-react";

export type NoticiaLista = { id: string; titulo: string; resumen: string; imagen?: string; fecha: string; fechaTexto: string };

export function ListaNoticias({ noticias }: { noticias: NoticiaLista[] }) {
  const [texto, setTexto] = useState("");
  const [orden, setOrden] = useState<"nuevas" | "antiguas">("nuevas");
  const [visibles, setVisibles] = useState(6);

  const lista = useMemo(() => {
    const q = texto.trim().toLowerCase();
    const f = noticias.filter((n) => !q || (n.titulo + " " + n.resumen).toLowerCase().includes(q));
    return [...f].sort((a, b) => (orden === "nuevas" ? b.fecha.localeCompare(a.fecha) : a.fecha.localeCompare(b.fecha)));
  }, [noticias, texto, orden]);

  const compartir = (n: NoticiaLista) => window.open("https://wa.me/?text=" + encodeURIComponent(n.titulo + " " + window.location.origin + "/noticias/" + n.id), "_blank", "noopener");
  const [destacada, ...resto] = lista;
  const sinFiltro = !texto.trim() && orden === "nuevas";

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="relative min-w-[16rem] flex-1">
          <span className="sr-only">Buscar noticias</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
          <input type="search" value={texto} onChange={(e) => { setTexto(e.target.value); setVisibles(6); }} placeholder="Buscar noticias…" className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 text-base outline-none transition focus:border-institucional-verde focus:ring-2 focus:ring-institucional-verde/30 marco" />
        </label>
        <div className="flex gap-2" role="group" aria-label="Ordenar">
          {([["nuevas", "Más recientes"], ["antiguas", "Más antiguas"]] as const).map(([v, t]) => (
            <button key={v} type="button" aria-pressed={orden === v} onClick={() => setOrden(v)} className={"rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition " + (orden === v ? "border-black bg-institucional-verde text-white" : "border-black bg-white text-institucional-verdeOscuro hover:bg-institucional-verdeClaro")}>{t}</button>
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600" role="status">{lista.length} {lista.length === 1 ? "noticia" : "noticias"}</p>

      {lista.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-institucional-verde/30 bg-institucional-verdeClaro/60 p-12 text-center">
          <Newspaper size={40} className="text-institucional-verde" aria-hidden="true" />
          <p className="text-lg">No encontramos noticias con “{texto}”.</p>
          <button type="button" className="btn-secundario" onClick={() => setTexto("")}>Ver todas</button>
        </div>
      ) : (
        <>
          {sinFiltro && destacada && (
            <Link href={"/noticias/" + destacada.id} className="group mt-8 grid overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-xl md:grid-cols-2 marco">
              <div className="relative min-h-[16rem] overflow-hidden bg-institucional-verdeClaro">
                {destacada.imagen && /* eslint-disable-next-line @next/next/no-img-element */ <img src={destacada.imagen} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
              </div>
              <div className="flex flex-col justify-center gap-3 p-8">
                <span className="w-fit rounded-full bg-institucional-verde px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">Destacada</span>
                <h2 className="titulo-display text-3xl text-institucional-verdeOscuro sm:text-4xl">{destacada.titulo}</h2>
                <p className="text-sm text-gray-500">{destacada.fechaTexto}</p>
                <p className="text-gray-700">{destacada.resumen}</p>
                <span className="font-semibold text-institucional-verde group-hover:underline">Leer noticia →</span>
              </div>
            </Link>
          )}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(sinFiltro ? resto : lista).slice(0, visibles).map((n) => (
              <article key={n.id} className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg marco">
                {n.imagen && <Link href={"/noticias/" + n.id} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={n.imagen} alt="" loading="lazy" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" /></Link>}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="text-sm text-gray-500">{n.fechaTexto}</p>
                  <h2 className="text-xl font-bold text-institucional-verdeOscuro"><Link href={"/noticias/" + n.id}>{n.titulo}</Link></h2>
                  <p className="flex-1 text-gray-700">{n.resumen}</p>
                  <div className="flex items-center justify-between">
                    <Link href={"/noticias/" + n.id} className="font-semibold text-institucional-verde hover:underline">Leer noticia</Link>
                    <button type="button" onClick={() => compartir(n)} aria-label={"Compartir por WhatsApp: " + n.titulo} className="rounded-full p-2 text-institucional-verde transition hover:bg-institucional-verdeClaro"><Share2 size={18} aria-hidden="true" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {(sinFiltro ? resto : lista).length > visibles && <div className="mt-8 text-center"><button type="button" className="btn-secundario" onClick={() => setVisibles((v) => v + 6)}>Cargar más noticias</button></div>}
        </>
      )}
    </>
  );
}
