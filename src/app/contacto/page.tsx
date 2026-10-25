import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { contacto } from "@/data/contacto";
import { IconoRed } from "@/components/layout/IconoRed";

export const metadata: Metadata = { title: "Contacto" };

export default function PaginaContacto() {
  const datos = [
    { Icono: MapPin, titulo: "Dirección", valor: contacto.direccion },
    { Icono: Phone, titulo: "Teléfono", valor: contacto.telefono, href: "tel:" + contacto.telefonoEnlace },
    { Icono: Mail, titulo: "Correo electrónico", valor: contacto.correo, href: "mailto:" + contacto.correo },
    { Icono: Clock, titulo: "Horario de atención", valor: contacto.horario }
  ];
  return (
    <div className="fondo-puntos">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
        <h1 className="titulo-display text-4xl text-institucional-verdeOscuro sm:text-6xl">Contacto</h1>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {datos.map(({ Icono, titulo, valor, href }) => (
            <div key={titulo} className="group flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg marco">
              <span className="rounded-full bg-institucional-verdeClaro p-3 text-institucional-verde transition group-hover:bg-institucional-verde group-hover:text-white"><Icono size={24} aria-hidden="true" /></span>
              <div><p className="text-sm font-semibold uppercase tracking-wide text-institucional-verde">{titulo}</p>
                {href ? <a href={href} className="mt-1 block break-all text-lg font-semibold text-institucional-verdeOscuro hover:underline">{valor}</a> : <p className="mt-1 text-lg font-semibold text-institucional-verdeOscuro">{valor}</p>}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm marco">
          <p className="font-semibold text-institucional-verdeOscuro">Síguenos en redes sociales: {contacto.usuario}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {contacto.redes.map((r) => <a key={r.clave} href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-black px-5 py-2.5 font-semibold text-institucional-verdeOscuro transition hover:bg-institucional-verde hover:text-white"><IconoRed clave={r.clave} />{r.nombre}</a>)}
          </div>
        </div>
      </div>
    </div>
  );
}
