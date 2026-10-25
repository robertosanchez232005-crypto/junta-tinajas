import { Suspense } from "react";
import Link from "next/link";
import { FileText, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ComunidadTinajas } from "@/components/home/ComunidadTinajas";
import { PortadaTinajas } from "@/components/home/PortadaTinajas";
import { PublicacionesInicio } from "@/components/home/PublicacionesInicio";
import { GaleriaComunidad } from "@/components/home/GaleriaComunidad";
import { censo } from "@/data/censo";
import { CifrasContador } from "@/components/home/CifrasContador";
import { ProyectosFiltrables } from "@/components/home/ProyectosFiltrables";
import { listarProyectos } from "@/lib/proyectos-publicos";

export const dynamic = "force-dynamic";

export default function PaginaInicio() {
  return (
    <>
      <PortadaTinajas />

      {/* ---------- ACCESOS RÁPIDOS: lo que más se busca, justo debajo de la portada ---------- */}
      <section className="fondo-puntos border-b border-institucional-verdeClaro" aria-label="Accesos rápidos">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <AccesoRapido href="/atencion-ciudadana" icono={<Phone size={24} />} texto="Atención ciudadana" />
          <AccesoRapido href="/proyectos" icono={<MapPin size={24} />} texto="Consultar proyectos" />
          <AccesoRapido href="/transparencia" icono={<FileText size={24} />} texto="Descargar documentos" />
          <AccesoRapido href="/contacto" icono={<ShieldCheck size={24} />} texto="Transparencia y contacto" />
        </div>
      </section>

      <ComunidadTinajas />

      {censo.cifras.length > 0 && (
        <section className="bg-white py-14 sm:py-20" aria-labelledby="titulo-censo">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="titulo-censo" className="titulo-display text-4xl text-institucional-verdeOscuro sm:text-5xl">Las Tinajas en cifras · Censo {censo.anio}</h2>
            {censo.fuente && <p className="mt-3 max-w-xl text-gray-600">{censo.fuente}</p>}
            <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
              <CifrasContador cifras={censo.cifras} />
              <div className="rounded-2xl border border-institucional-verdeClaro bg-white p-6 marco">
                <h3 className="font-bold text-institucional-verdeOscuro">Crecimiento de la población</h3>
                <ul className="mt-4 space-y-4">
                  {censo.historico.map((h) => (
                    <li key={h.anio} className="group">
                      <div className="flex justify-between text-sm"><span className="font-semibold">{h.anio}</span><span className="tabular-nums">{h.habitantes.toLocaleString("es-PA")} hab.</span></div>
                      <div className="mt-1 h-3 overflow-hidden rounded-full bg-institucional-verdeClaro"><div className="h-full rounded-full bg-institucional-verde transition group-hover:bg-institucional-verdeOscuro" style={{ width: Math.round((h.habitantes / censo.historico[censo.historico.length - 1].habitantes) * 100) + "%" }} /></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <GaleriaComunidad />

      <Suspense fallback={<div id="publicaciones" role="status" className="mx-auto max-w-7xl px-4 py-14">Cargando proyectos…</div>}>
        <ProyectosInicio />
      </Suspense>

      <Suspense fallback={<p role="status" className="mx-auto max-w-7xl px-4 py-10">Cargando noticias, avisos y eventos…</p>}>
        <PublicacionesInicio />
      </Suspense>
    </>
  );
}

function AccesoRapido({ href, icono, texto }: { href: string; icono: React.ReactNode; texto: string }) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 font-semibold text-institucional-verdeOscuro shadow-sm transition hover:-translate-y-1 hover:border-institucional-verde hover:shadow-md marco">
      <span className="rounded-full bg-institucional-verdeClaro p-3 text-institucional-verde transition group-hover:bg-institucional-verde group-hover:text-white">{icono}</span>
      {texto}
    </Link>
  );
}

async function ProyectosInicio() {
  const { proyectos, fallo } = await listarProyectos();
  return <ProyectosFiltrables proyectos={proyectos} fallo={fallo} />;
}
