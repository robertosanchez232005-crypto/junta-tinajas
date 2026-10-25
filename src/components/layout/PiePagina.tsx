import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { contacto } from "@/data/contacto";
import { IconoRed } from "./IconoRed";

export function PiePagina() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-institucional-verdeClaro bg-institucional-verde text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/images/logo-junta-tinajas.png"
              alt="Escudo de la Junta Comunal de Las Tinajas"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold">Junta Comunal de Las Tinajas</span>
          </div>
          <p className="text-sm text-institucional-verdeClaro">
            Distrito de Dolega, provincia de Chiriquí, Panamá.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">Contacto</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" /><span>{contacto.direccion}</span></li>
            <li className="flex items-start gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" /><a href={"tel:" + contacto.telefonoEnlace} className="hover:underline">{contacto.telefono}</a></li>
            <li className="flex items-start gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" /><a href={"mailto:" + contacto.correo} className="break-all hover:underline">{contacto.correo}</a></li>
            <li className="flex items-start gap-3"><Clock size={18} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" /><span>{contacto.horario}</span></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">Enlaces</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/transparencia" className="hover:underline">Transparencia</Link></li>
            <li><Link href="/atencion-ciudadana" className="hover:underline">Atención Ciudadana</Link></li>
            <li><Link href="/aviso-privacidad" className="hover:underline">Aviso de privacidad</Link></li>
            <li><Link href="/terminos-de-uso" className="hover:underline">Términos de uso</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">Redes sociales</h2>
          <p className="text-sm font-semibold">{contacto.usuario}</p>
          <div className="mt-4 flex gap-3">
            {contacto.redes.map((r) => (
              <a key={r.clave} href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.nombre + " de la Junta Comunal"} className="rounded-full border-2 border-white/60 p-3 transition hover:-translate-y-1 hover:border-white hover:bg-white hover:text-institucional-verde"><IconoRed clave={r.clave} size={22} /></a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 px-4 py-4 text-center text-xs text-institucional-verdeClaro">
        © {anioActual} Junta Comunal de Las Tinajas. Todos los derechos reservados.
      </div>
    </footer>
  );
}
