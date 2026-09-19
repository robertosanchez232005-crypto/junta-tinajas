"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Encabezado.module.css";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/junta-comunal", texto: "La Junta Comunal" },
  { href: "/proyectos", texto: "Proyectos" },
  { href: "/consulta-ciudadana", texto: "Consulta Ciudadana" },
  { href: "/transparencia", texto: "Transparencia" },
  { href: "/noticias", texto: "Noticias" },
  { href: "/contacto", texto: "Contacto" }
];

export function Encabezado() {
  const inicio = usePathname() === "/";
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className={inicio ? styles.portada : "sticky top-0 z-40 border-b border-institucional-verdeClaro bg-white/95 backdrop-blur"}>
      {inicio && <div className={styles.barra}>Las Tinajas · Dolega · Chiriquí<Link href="/contacto">Contáctanos →</Link></div>}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/*
            LOGO OFICIAL: reemplazar /public/images/logo-junta-tinajas.png por el
            archivo entregado por la Junta Comunal. Conservar proporciones originales:
            no recortar, deformar ni recolorear.
          */}
          <Image
            src="/images/logo-junta-tinajas.png"
            alt="Escudo de la Junta Comunal de Las Tinajas"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            priority
          />
          <span className="text-base font-bold leading-tight text-institucional-verdeOscuro sm:text-lg">
            Junta Comunal de
            <br className="sm:hidden" /> Las Tinajas
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Menú principal">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <Link href={enlace.href} className="text-gray-700 hover:text-institucional-verde">
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-institucional-verdeOscuro lg:hidden"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((v) => !v)}
        >
          {menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuAbierto && (
        <nav className="border-t border-institucional-verdeClaro bg-white lg:hidden" aria-label="Menú móvil">
          <ul className="flex flex-col gap-1 px-4 py-3 text-base font-medium">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  className="block rounded-md px-3 py-3 text-gray-700 hover:bg-institucional-verdeClaro"
                  onClick={() => setMenuAbierto(false)}
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
