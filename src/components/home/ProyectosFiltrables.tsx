"use client";

import Link from "next/link";
import { useState } from "react";
import { TarjetaProyecto } from "@/components/proyectos/TarjetaProyecto";
import type { ProyectoPublico } from "@/lib/proyectos-publicos";

const etiquetas: Record<string, string> = { planificado: "Planificados", en_ejecucion: "En ejecución", finalizado: "Realizados", suspendido: "Suspendidos" };

export function ProyectosFiltrables({ proyectos, fallo }: { proyectos: ProyectoPublico[]; fallo: boolean }) {
  const [filtro, setFiltro] = useState("todos");
  const estados = Array.from(new Set(proyectos.map((p) => p.estado)));
  const visibles = (filtro === "todos" ? proyectos : proyectos.filter((p) => p.estado === filtro)).slice(0, 6);

  return (
    <section id="publicaciones" className="scroll-mt-4 bg-institucional-verdeClaro/50 py-14 sm:py-20" aria-labelledby="titulo-proyectos">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="titulo-proyectos" className="titulo-display text-4xl text-institucional-verdeOscuro sm:text-5xl">Proyectos publicados</h2>
          <Link href="/proyectos" className="font-semibold text-institucional-verde hover:underline">Ver todos →</Link>
        </div>
        {estados.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por estado">
            {["todos", ...estados].map((e) => (
              <button key={e} type="button" aria-pressed={filtro === e} onClick={() => setFiltro(e)}
                className={"rounded-full border-2 px-4 py-2 text-sm font-semibold transition " + (filtro === e ? "border-black bg-institucional-verde text-white" : "border-black bg-white text-institucional-verdeOscuro hover:bg-institucional-verdeClaro")}>
                {e === "todos" ? "Todos" : etiquetas[e] ?? e.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        )}
        {fallo ? <p className="mt-6" role="alert">No se pudieron cargar los proyectos.</p>
          : proyectos.length === 0 ? <p className="mt-6 text-lg">Aún no hay proyectos publicados.</p> : null}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((p) => <TarjetaProyecto key={p.id} proyecto={p} />)}
        </div>
      </div>
    </section>
  );
}
