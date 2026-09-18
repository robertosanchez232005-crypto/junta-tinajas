import type { Metadata } from "next";
import "./globals.css";
import { Encabezado } from "@/components/layout/Encabezado";
import { PiePagina } from "@/components/layout/PiePagina";

const nombreSitio = "Junta Comunal de Las Tinajas";
const urlSitio = process.env.NEXT_PUBLIC_SITE_URL ?? "https://juntatinajas.gob.pa";

export const metadata: Metadata = {
  metadataBase: new URL(urlSitio),
  title: {
    default: `${nombreSitio} | Distrito de Dolega, Chiriquí`,
    template: `%s | ${nombreSitio}`
  },
  description:
    "Portal institucional de la Junta Comunal de Las Tinajas, distrito de Dolega, provincia de Chiriquí, Panamá. Información, proyectos, transparencia y atención ciudadana.",
  openGraph: {
    title: nombreSitio,
    description: "Trabajando juntos por el desarrollo de nuestra comunidad.",
    url: urlSitio,
    siteName: nombreSitio,
    locale: "es_PA",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RaizLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col">
        {/* Enlace de salto para navegación por teclado / lectores de pantalla */}
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Saltar al contenido principal
        </a>
        <Encabezado />
        <main id="contenido-principal" className="flex-1">
          {children}
        </main>
        <PiePagina />
      </body>
    </html>
  );
}
