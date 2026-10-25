"use client";

import Link from "next/link";
import { useState } from "react";
import { Newspaper, ShoppingBag, CalendarDays } from "lucide-react";

export type ItemPublicacion = { id: string; titulo: string; resumen: string; imagen?: string };
export type SeccionPublicaciones = { clave: string; titulo: string; ruta: string; vacio: string; fallo: boolean; items: ItemPublicacion[] };

const iconos: Record<string, typeof Newspaper> = { noticias: Newspaper, convocatorias: ShoppingBag, eventos: CalendarDays };

export function PestanasPublicaciones({ secciones }: { secciones: SeccionPublicaciones[] }) {
  const primera = secciones.findIndex((s) => s.items.length > 0);
  const [activa, setActiva] = useState(primera === -1 ? 0 : primera);
  const s = secciones[activa];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-20" aria-labelledby="titulo-novedades">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="titulo-novedades" className="titulo-display text-4xl text-institucional-verdeOscuro sm:text-5xl">Lo último en la comunidad</h2>
        <div role="tablist" aria-label="Tipo de publicación" className="flex flex-wrap gap-2">
          {secciones.map((x, i) => {
            const Icono = iconos[x.clave] ?? Newspaper;
            return (
              <button key={x.clave} role="tab" id={"tab-" + x.clave} aria-selected={i === activa} aria-controls="panel-novedades" onClick={() => setActiva(i)}
                className={"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition " + (i === activa ? "border-black bg-institucional-verde text-white" : "border-black bg-white text-institucional-verdeOscuro hover:bg-institucional-verdeClaro")}>
                <Icono size={16} aria-hidden="true" />{x.titulo}<span className={"rounded-full px-2 text-xs " + (i === activa ? "bg-white/25" : "bg-institucional-verdeClaro")}>{x.items.length}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="panel-novedades" role="tabpanel" aria-labelledby={"tab-" + s.clave} className="mt-8">
        {s.fallo ? <p role="alert">No se pudo cargar esta sección. Intenta nuevamente más tarde.</p>
        : s.items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-institucional-verde/30 bg-institucional-verdeClaro/50 px-6 py-12 text-center">
            <p className="text-lg text-institucional-verdeOscuro">{s.vacio}</p>
            <Link href={s.ruta} className="btn-secundario">Ir a {s.titulo.toLowerCase()}</Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.slice(0, 3).map((p) => (
                <Link key={p.id} href={s.ruta + "/" + p.id} className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg marco">
                  {p.imagen && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <div className="overflow-hidden"><img src={p.imagen} alt="" loading="lazy" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                  )}
                  <div className="space-y-2 p-5">
                    <h3 className="text-xl font-bold text-institucional-verdeOscuro">{p.titulo}</h3>
                    {p.resumen && <p className="text-gray-700">{p.resumen}</p>}
                    <span className="inline-block font-semibold text-institucional-verde group-hover:underline">Leer completo</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link href={s.ruta} className="mt-6 inline-block font-semibold text-institucional-verde hover:underline">Ver todos los {s.titulo.toLowerCase()} →</Link>
          </>
        )}
      </div>
    </section>
  );
}
