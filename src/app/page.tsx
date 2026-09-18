import Image from "next/image";
import Link from "next/link";
import { TarjetaProyecto } from "@/components/proyectos/TarjetaProyecto";
import { proyectosDemo } from "@/data/proyectos-demo";
import { FileText, MapPin, Phone, ShieldCheck } from "lucide-react";

export default function PaginaInicio() {
  return (
    <>
      {/* ---------- PORTADA ---------- */}
      <section className="bg-institucional-verdeClaro">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 lg:grid-cols-2">
          <div>
            <Image
              src="/images/logo-junta-tinajas.png"
              alt="Escudo de la Junta Comunal de Las Tinajas"
              width={96}
              height={96}
              className="mb-6 h-24 w-24 object-contain"
              priority
            />
            <h1 className="text-3xl font-extrabold leading-tight text-institucional-verdeOscuro sm:text-4xl">
              Junta Comunal de Las Tinajas
            </h1>
            <p className="mt-3 text-lg text-gray-700">
              Trabajando juntos por el desarrollo de nuestra comunidad.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/proyectos" className="btn-primario">Ver proyectos</Link>
              <Link href="/atencion-ciudadana" className="btn-secundario">Atención ciudadana</Link>
            </div>
          </div>
          <div className="flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-institucional-verde/40 bg-white text-center text-sm text-gray-500 sm:h-72">
            Espacio para imagen representativa de la comunidad
            <br />
            (pendiente de fotografía oficial suministrada por la Junta)
          </div>
        </div>
      </section>

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
      <section className="bg-institucional-verdeClaro/40 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-institucional-verdeOscuro">Proyectos recientes</h2>
            <Link href="/proyectos" className="text-sm font-semibold text-institucional-verde hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proyectosDemo.map((p) => (
              <TarjetaProyecto key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

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
