import Link from "next/link";
import Image from "next/image";
import { Users, MessageCircle } from "lucide-react";
import { contenidoInstitucional as contenido } from "@/lib/contenido-institucional";

function fotoValida(valor: string) {
  if (valor.startsWith("/images/") && !valor.includes("..")) return valor;
  try { const url = new URL(valor); return url.protocol === "https:" ? url.href : undefined; }
  catch { return undefined; }
}

export function ComunidadTinajas() {
  const representante = contenido.representante;
  const comunidadFoto = fotoValida(contenido.fotoComunidad);
  const representanteFoto = fotoValida(representante.foto);
  return <>
    <section className="bg-white py-16 sm:py-20" aria-labelledby="comunidad-titulo">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-institucional-verde">Dolega · Chiriquí</p>
          <h2 id="comunidad-titulo" className="titulo-display mt-3 text-4xl text-institucional-verdeOscuro sm:text-5xl">{contenido.titulo}</h2>
          <p className="mt-6 whitespace-pre-line leading-7 text-gray-600">{contenido.presentacion}</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Link href="/junta-comunal" className="btn-secundario">La Junta Comunal →</Link>
            <Link href="/proyectos" className="btn-secundario">Nuestros proyectos →</Link>
          </div>
        </div>
        {comunidadFoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={comunidadFoto} alt="Comunidad de Las Tinajas" loading="lazy" className="h-80 w-full rounded-xl object-cover shadow-lg lg:h-[26rem]" />
        ) : <div className="grid h-80 grid-cols-3 grid-rows-2 gap-3 lg:h-[26rem]" aria-hidden="true">
          {["tinajas-02", "tinajas-05", "tinajas-09", "tinajas-07"].map((n, i) => <div key={n} className={"group relative overflow-hidden rounded-2xl " + (i === 0 ? "col-span-2 row-span-2" : "")}><Image src={"/images/portada/" + n + ".jpg"} alt="" fill sizes="(max-width: 1024px) 60vw, 30vw" quality={70} className="object-cover transition duration-700 group-hover:scale-110" /></div>)}
        </div>}
      </div>
    </section>
    {representante.nombre && representante.biografia && <section className="bg-gray-50 py-16 sm:py-20" aria-labelledby="representante-titulo">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-12">
        {representanteFoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={representanteFoto} alt={representante.nombre} loading="lazy" className="h-auto max-h-[520px] w-full rounded-xl object-contain shadow-lg" />
        ) : <div className="flex h-72 items-center justify-center rounded-xl bg-institucional-verdeClaro"><Users size={100} strokeWidth={1} aria-hidden="true" /></div>}
        <div>
          <p className="inline-block rounded-full bg-institucional-verdeClaro px-3 py-1 text-xs font-semibold uppercase tracking-widest">Conoce a tu representante</p>
          <h2 id="representante-titulo" className="mt-3 text-3xl font-bold text-institucional-verdeOscuro">{representante.nombre}</h2>
          <p className="mt-2 text-sm font-medium text-institucional-verde">{representante.cargo}</p>
          <p className="mt-6 whitespace-pre-line leading-7 text-gray-700">{representante.biografia}</p>
        </div>
      </div>
    </section>}
    <section className="relative isolate overflow-hidden bg-institucional-verdeOscuro py-16 text-white" aria-labelledby="consulta-titulo">
      <Image src="/images/portada/tinajas-03.jpg" alt="" fill sizes="100vw" quality={60} className="-z-20 object-cover" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-institucional-verdeOscuro/85" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-7 px-4 sm:flex-row sm:items-center sm:gap-12">
        <div className="rounded-full border border-white/30 bg-white/10 p-7"><MessageCircle size={64} strokeWidth={1} aria-hidden="true" /></div>
        <div><h2 id="consulta-titulo" className="titulo-display text-3xl sm:text-4xl">Consulta Ciudadana</h2><p className="mt-3 max-w-xl leading-7 text-white/90">Tu voz cuenta. Comparte tus consultas, propuestas y necesidades con la Junta Comunal.</p><Link href="/consulta-ciudadana" className="mt-5 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-institucional-verdeOscuro transition hover:bg-institucional-verdeClaro">Ver Consulta Ciudadana →</Link></div>
      </div>
    </section>
  </>;
}
