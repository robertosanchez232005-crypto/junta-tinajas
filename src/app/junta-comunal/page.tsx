import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, UserRound } from "lucide-react";

export const metadata: Metadata = { title: "La Junta Comunal" };

const comunidades = ["Tinajas", "Balita", "Cermeño", "Los Palomos", "Conventillo", "Loma Alta"];
const autoridades = [
  { siglas: "H.R.", nombre: "Guillermo Álvarez", cargo: "Honorable Representante" },
  { siglas: "H.S.", nombre: "José De la Rosa", cargo: "Honorable Suplente" }
];

export default function PaginaJuntaComunal() {
  return (
    <div className="fondo-puntos">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <h1 className="titulo-display text-4xl text-institucional-verdeOscuro sm:text-6xl">La Junta Comunal de Las Tinajas</h1>

        <section className="mt-12 rounded-3xl bg-white p-6 shadow-sm sm:p-10 marco" aria-labelledby="historia">
          <h2 id="historia" className="titulo-display text-3xl text-institucional-verde">Historia</h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-gray-700">
            <p>El corregimiento de Tinajas, ubicado en el distrito de Dolega, provincia de Chiriquí, República de Panamá, fue fundado el <strong>28 de octubre de 1949</strong>. De acuerdo con el Censo de Población de 2023, contaba con <strong>2,053 habitantes</strong>.</p>
            <p>El corregimiento está conformado por las comunidades de Tinajas, Balita, Cermeño, Los Palomos, Conventillo y Loma Alta, las cuales forman parte de una comunidad caracterizada por sus tradiciones, su identidad rural y el esfuerzo de sus habitantes por impulsar el desarrollo local.</p>
            <ul className="flex flex-wrap gap-2" aria-label="Comunidades del corregimiento">
              {comunidades.map((c) => <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-institucional-verdeClaro px-4 py-2 text-base font-semibold text-institucional-verdeOscuro transition hover:-translate-y-0.5 hover:bg-institucional-verde hover:text-white"><MapPin size={16} aria-hidden="true" />{c}</li>)}
            </ul>
            <p>A lo largo de su historia, las actividades agropecuarias han desempeñado un papel importante en la economía del corregimiento. Entre sus principales actividades productivas destacan la siembra de caña de azúcar, la elaboración artesanal de raspadura y la ganadería, prácticas que forman parte de las costumbres y tradiciones de la región.</p>
            <div className="grid grid-cols-2 gap-3" aria-hidden="true">
              <div className="group relative h-56 overflow-hidden rounded-2xl border-2 border-black sm:h-72"><Image src="/images/portada/tinajas-05.jpg" alt="" fill sizes="(max-width: 640px) 50vw, 400px" quality={70} className="object-cover transition duration-700 group-hover:scale-110" style={{ objectPosition: "50% 60%" }} /></div>
              <div className="group relative h-56 overflow-hidden rounded-2xl border-2 border-black sm:h-72"><Image src="/images/portada/tinajas-06.jpg" alt="" fill sizes="(max-width: 640px) 50vw, 400px" quality={70} className="object-cover transition duration-700 group-hover:scale-110" /></div>
            </div>
            <p>Tinajas conserva el valor de sus raíces, el trabajo de su gente y sus tradiciones productivas, elementos que contribuyen a fortalecer la identidad de sus comunidades y a preservar su patrimonio cultural. Su historia representa el esfuerzo de generaciones de habitantes que han contribuido al crecimiento y desarrollo del corregimiento.</p>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="autoridades">
          <h2 id="autoridades" className="titulo-display text-3xl text-institucional-verde">Autoridades</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {autoridades.map((a) => (
              <article key={a.nombre} className="group flex items-center gap-5 rounded-2xl border border-institucional-verde/20 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-institucional-verde hover:shadow-lg marco">
                <span className="rounded-full bg-institucional-verdeClaro p-4 text-institucional-verde transition group-hover:bg-institucional-verde group-hover:text-white"><UserRound size={32} aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-institucional-verde">{a.cargo}</p>
                  <p className="titulo-display mt-1 text-2xl text-institucional-verdeOscuro">{a.siglas} {a.nombre}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
