import { ComunidadTinajas } from "@/components/home/ComunidadTinajas";
import { PortadaTinajas } from "@/components/home/PortadaTinajas";
import { PublicacionesInicio } from "@/components/home/PublicacionesInicio";
import Link from "next/link";
import { TarjetaProyecto } from "@/components/proyectos/TarjetaProyecto";
import { listarProyectos } from "@/lib/proyectos-publicos";
import { FileText, MapPin, Phone, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PaginaInicio() {
  const { proyectos, fallo } = await listarProyectos();
  return (
    <>
      <PortadaTinajas />
      <ComunidadTinajas />

      {/* ---------- FRANJA DE DATOS PRINCIPALES ---------- */}
      <section className="border-y border-institucional-verdeClaro bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center sm:grid-cols-4">
          <div>
            <p className="text-2xl font-extrabold text-institucional-verde">Chiriquí</p>
            <p className="text-sm text-gray-600">Provincia</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-institucional-verde">Dolega</p>
            <p className="text-sm text-gray-600">Distrito</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-institucional-verde">29.4 km²</p>
            <p className="text-sm text-gray-600">Superficie</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-institucional-verde">1,530 hab.</p>
            <p className="text-sm text-gray-600">Población (censo 2010)</p>
          </div>
        </div>
      </section>

      {/* ---------- MAPA ---------- */}
      <section id="mapa-tinajas" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-institucional-verdeOscuro">Mapa de Las Tinajas</h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          Ubicación de referencia y límites territoriales de la comunidad.
        </p>
        <div className="mt-6">
          <div className="flex h-[420px] items-center justify-center rounded-xl border-2 border-dashed border-institucional-verde/40 bg-institucional-verdeClaro px-6 text-center text-gray-700">
            <div>
              <p className="font-semibold text-institucional-verdeOscuro">
                Mapa temporalmente en actualización
              </p>
              <p className="mt-2 text-sm">
                Los límites territoriales oficiales de Las Tinajas se publicarán
                cuando hayan sido validados por la Junta Comunal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROYECTOS RECIENTES ---------- */}
      <section id="publicaciones" className="bg-institucional-verdeClaro/40 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-institucional-verdeOscuro">Proyectos publicados</h2>
            <Link href="/proyectos" className="text-sm font-semibold text-institucional-verde hover:underline">
              Ver todos →
            </Link>
          </div>
          {fallo ? <p className="mt-6" role="alert">No se pudieron cargar los proyectos.</p> : proyectos.length === 0 ? <p className="mt-6">Aún no hay proyectos publicados.</p> : null}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((p) => (
              <TarjetaProyecto key={p.id} proyecto={p} />
            ))}
          </div>
        </div>
      </section>

      <PublicacionesInicio />

      {/* ---------- ACCESOS RÁPIDOS ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-6 text-2xl font-bold text-institucional-verdeOscuro">Accesos rápidos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AccesoRapido href="/atencion-ciudadana" icono={<Phone size={22} />} texto="Atención ciudadana" />
          <AccesoRapido href="/proyectos" icono={<MapPin size={22} />} texto="Consultar proyectos" />
          <AccesoRapido href="/transparencia" icono={<FileText size={22} />} texto="Descargar documentos" />
          <AccesoRapido href="/contacto" icono={<ShieldCheck size={22} />} texto="Transparencia y contacto" />
        </div>
      </section>
    </>
  );
}

function AccesoRapido({ href, icono, texto }: { href: string; icono: React.ReactNode; texto: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center font-semibold text-institucional-verdeOscuro shadow-sm transition hover:border-institucional-verde hover:shadow-md"
    >
      <span className="rounded-full bg-institucional-verdeClaro p-3 text-institucional-verde">{icono}</span>
      {texto}
    </Link>
  );
}
