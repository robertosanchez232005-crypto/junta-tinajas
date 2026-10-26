import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fuenteTitulos = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["600", "800"] });
import { Encabezado } from "@/components/layout/Encabezado";
import { PiePagina } from "@/components/layout/PiePagina";
import { BotonSubir } from "@/components/layout/BotonSubir";
import { urlSitio } from "@/lib/sitio";
import { contacto } from "@/data/contacto";

const nombreSitio = "Junta Comunal de Las Tinajas";

export const metadata: Metadata = {
  metadataBase: new URL(urlSitio),
  title: {
    default: `${nombreSitio} | Distrito de Dolega, Chiriquí`,
    template: `%s | ${nombreSitio}`
  },
  description:
    "Sitio oficial de la Junta Comunal de Las Tinajas (Tinajas), distrito de Dolega, provincia de Chiriquí, Panamá. Proyectos, consulta ciudadana, transparencia, noticias y atención a la comunidad.",
  keywords: ["Junta Comunal de Tinajas", "Junta Comunal de Las Tinajas", "Tinajas Dolega", "Tinajas Chiriquí", "corregimiento de Tinajas", "Consulta Ciudadana Tinajas"],
  alternates: { canonical: "/" },
  openGraph: {
    title: nombreSitio,
    description: "Trabajando juntos por el desarrollo de nuestra comunidad.",
    url: urlSitio,
    siteName: nombreSitio,
    locale: "es_PA",
    type: "website",
    images: [{ url: "/images/comunidad/desfile-tradicion.jpg", width: 1040, height: 694, alt: nombreSitio }]
  },
  twitter: { card: "summary_large_image", title: nombreSitio, description: "Trabajando juntos por el desarrollo de nuestra comunidad.", images: ["/images/comunidad/desfile-tradicion.jpg"] },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION },
  robots: { index: true, follow: true }
};

const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: nombreSitio,
  alternateName: ["Junta Comunal de Tinajas", "Junta Comunal Tinajas"],
  url: urlSitio,
  logo: urlSitio + "/images/logo-junta-tinajas.png",
  image: urlSitio + "/images/comunidad/desfile-tradicion.jpg",
  email: contacto.correo,
  telephone: "+507" + contacto.telefono.replace(/\D/g, ""),
  address: { "@type": "PostalAddress", streetAddress: contacto.direccion, addressLocality: "Tinajas, Dolega", addressRegion: "Chiriquí", addressCountry: "PA" },
  openingHours: "8:00-16:00",
  sameAs: contacto.redes.map((r) => r.url)
};

export default function RaizLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fuenteTitulos.variable}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }} />
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
        <BotonSubir />
      </body>
    </html>
  );
}
