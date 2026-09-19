import Link from "next/link";
import { Users, Heart, ShieldCheck, MessageCircle, Handshake, Leaf, MapPin } from "lucide-react";
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
  const iconos = [Users, Heart, ShieldCheck, MessageCircle, Handshake, Leaf];
  return <>
    <section className="bg-white py-16 sm:py-24" aria-labelledby="comunidad-titulo">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-institucional-verde">Dolega · Chiriquí</p>
          <h2 id="comunidad-titulo" className="mt-3 text-3xl font-bold text-institucional-verdeOscuro">{contenido.titulo}</h2>
          <p className="mt-6 whitespace-pre-line leading-7 text-gray-600">{contenido.presentacion}</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Link href="/junta-comunal" className="rounded-lg border bg-gray-50 p-4 text-sm font-semibold text-institucional-verde">La Junta Comunal →</Link>
            <Link href="/proyectos" className="rounded-lg border bg-gray-50 p-4 text-sm font-semibold text-institucional-verde">Nuestros proyectos →</Link>
          </div>
        </div>
        {comunidadFoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={comunidadFoto} alt="Comunidad de Las Tinajas" loading="lazy" className="h-80 w-full rounded-xl object-cover shadow-lg" />
        ) : <div className="flex h-80 flex-col items-center justify-center rounded-xl bg-institucional-verdeClaro text-institucional-verdeOscuro"><MapPin size={64} strokeWidth={1} aria-hidden="true" /><p className="mt-5 text-2xl font-bold">Las Tinajas</p><p className="mt-2">Dolega, Chiriquí</p></div>}
      </div>
    </section>
    {representante.nombre && representante.biografia && <section className="bg-gray-50 py-16 sm:py-20" aria-labelledby="representante-titulo">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-12">
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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20" aria-labelledby="valores-titulo">
      <h2 id="valores-titulo" className="text-center text-3xl font-bold text-institucional-verdeOscuro">Nuestros valores</h2>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{contenido.valores.map((valor, i) => {
        const Icono = iconos[i % iconos.length];
        return <article key={valor.titulo} className="rounded-xl border border-gray-200 bg-gray-50 p-6"><Icono className="text-institucional-verde" size={28} strokeWidth={1.5} aria-hidden="true" /><h3 className="mt-4 font-bold text-institucional-verdeOscuro">{valor.titulo}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{valor.texto}</p></article>;
      })}</div>
    </section>
    <section className="bg-institucional-verdeOscuro py-12 text-white" aria-labelledby="consulta-titulo">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-7 px-4 sm:flex-row sm:items-center sm:gap-12">
        <div className="rounded-full border border-white/30 bg-white/10 p-7"><MessageCircle size={64} strokeWidth={1} aria-hidden="true" /></div>
        <div><h2 id="consulta-titulo" className="text-2xl font-bold">Consulta Ciudadana</h2><p className="mt-3 max-w-xl leading-7 text-white/90">Tu voz cuenta. Comparte tus consultas, propuestas y necesidades con la Junta Comunal.</p><Link href="/consulta-ciudadana" className="mt-5 inline-block rounded bg-white px-5 py-3 text-sm font-semibold text-institucional-verdeOscuro">Ver Consulta Ciudadana →</Link></div>
      </div>
    </section>
  </>;
}
