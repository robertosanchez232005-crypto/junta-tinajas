"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Phone, Clock, Mail, CalendarDays, MessageCircle } from "lucide-react";
import { contacto } from "@/data/contacto";
import { IconoRed } from "./IconoRed";

const avisos = [
  { Icono: Clock, texto: "Horario de atención: " + contacto.horario },
  { Icono: Phone, texto: "Teléfono: " + contacto.telefono, href: "tel:" + contacto.telefonoEnlace },
  { Icono: MapPin, texto: contacto.direccion },
  { Icono: Mail, texto: contacto.correo, href: "mailto:" + contacto.correo }
];

export function BarraSuperior() {
  const [fecha, setFecha] = useState("");
  useEffect(() => {
    setFecha(new Date().toLocaleDateString("es-PA", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Panama" }));
  }, []);

  // La lista se repite dos veces para que el desplazamiento nunca deje huecos.
  const fila = (copia: number) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copia === 1}>
      {avisos.map(({ Icono, texto, href }) => {
        const contenido = <><Icono size={14} aria-hidden="true" className="text-amber-300" /><span>{texto}</span></>;
        return (
          <li key={texto} className="flex items-center px-6">
            {href ? <a href={href} tabIndex={copia === 1 ? -1 : 0} className="flex items-center gap-2 hover:text-amber-200">{contenido}</a> : <span className="flex items-center gap-2">{contenido}</span>}
            <span className="ml-12 text-white/30" aria-hidden="true">◆</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-[#0f2f25] via-[#1a4a39] to-[#0f2f25] px-4 text-[13px] text-white sm:px-6 lg:px-10">
      <div className="hidden shrink-0 items-center gap-2 py-2 font-semibold lg:flex">
        <MapPin size={15} className="text-amber-300" aria-hidden="true" />Las Tinajas · Dolega · Chiriquí
        {fecha && <span className="ml-2 hidden items-center gap-1.5 border-l border-white/25 pl-3 font-normal capitalize text-white/80 xl:flex"><CalendarDays size={14} aria-hidden="true" />{fecha}</span>}
      </div>

      <div className="barra-marquesina relative min-w-0 flex-1 overflow-hidden py-2" role="region" aria-label="Información importante">
        <div className="barra-marquesina-pista flex w-max">{fila(0)}{fila(1)}</div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 py-1.5">
        <div className="hidden items-center gap-1 sm:flex">
          {contacto.redes.map((r) => (
            <a key={r.clave} href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.nombre + " de la Junta Comunal"} className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"><IconoRed clave={r.clave} size={16} /></a>
          ))}
        </div>
        <Link href="/contacto" className="inline-flex items-center gap-1.5 rounded-full bg-amber-300 px-4 py-1.5 font-semibold text-[#0f2f25] transition hover:bg-white">
          <MessageCircle size={15} aria-hidden="true" />Contáctanos
        </Link>
      </div>
    </div>
  );
}
