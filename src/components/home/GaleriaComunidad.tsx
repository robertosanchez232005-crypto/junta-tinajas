"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const fotos = ["tinajas-08", "tinajas-03", "tinajas-04", "tinajas-06", "tinajas-01", "tinajas-05", "tinajas-02", "tinajas-07", "tinajas-09"].map((n) => "/images/portada/" + n + ".jpg");
// Mosaico: algunas fotos ocupan más espacio para que la cuadrícula no se vea uniforme.
const forma = ["sm:col-span-2 sm:row-span-2", "", "", "", "sm:col-span-2", "", "", "sm:row-span-2", ""];

export function GaleriaComunidad() {
  const [abierta, setAbierta] = useState<number | null>(null);
  const mover = useCallback((d: number) => setAbierta((i) => (i === null ? i : (i + d + fotos.length) % fotos.length)), []);

  useEffect(() => {
    if (abierta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", tecla);
    return () => { window.removeEventListener("keydown", tecla); document.body.style.overflow = ""; };
  }, [abierta, mover]);

  return (
    <section className="fondo-puntos py-16 sm:py-24" aria-labelledby="titulo-galeria">
      <div className="mx-auto max-w-7xl px-4">
        <h2 id="titulo-galeria" className="titulo-display text-4xl text-institucional-verdeOscuro sm:text-5xl">Así se vive Las Tinajas</h2>
        <p className="mt-3 max-w-xl text-lg text-gray-600">Toca una foto para verla grande.</p>
        <div className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4">
          {fotos.map((src, i) => (
            <button key={src} type="button" onClick={() => setAbierta(i)} aria-label={"Ver foto " + (i + 1) + " de " + fotos.length}
              className={"group relative overflow-hidden rounded-2xl bg-institucional-verdeClaro " + forma[i]}>
              <Image src={src} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" quality={70} className="object-cover transition duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 bg-institucional-verdeOscuro/0 transition group-hover:bg-institucional-verdeOscuro/25" />
            </button>
          ))}
        </div>
      </div>

      {abierta !== null && (
        <div role="dialog" aria-modal="true" aria-label="Foto ampliada" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setAbierta(null)}>
          <button type="button" aria-label="Cerrar" className="absolute right-4 top-4 rounded-full bg-white/15 p-3 text-white hover:bg-white/30" onClick={() => setAbierta(null)}><X size={24} /></button>
          <button type="button" aria-label="Foto anterior" className="absolute left-3 rounded-full bg-white/15 p-3 text-white hover:bg-white/30" onClick={(e) => { e.stopPropagation(); mover(-1); }}><ChevronLeft size={28} /></button>
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={fotos[abierta]} alt="" fill sizes="90vw" quality={85} className="object-contain" />
          </div>
          <button type="button" aria-label="Foto siguiente" className="absolute right-3 rounded-full bg-white/15 p-3 text-white hover:bg-white/30" onClick={(e) => { e.stopPropagation(); mover(1); }}><ChevronRight size={28} /></button>
        </div>
      )}
    </section>
  );
}
