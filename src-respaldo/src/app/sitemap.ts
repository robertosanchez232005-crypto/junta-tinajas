import type { MetadataRoute } from "next";

const urlSitio = process.env.NEXT_PUBLIC_SITE_URL ?? "https://juntatinajas.gob.pa";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutasEstaticas = [
    "",
    "/junta-comunal",
    "/proyectos",
    "/atencion-ciudadana",
    "/transparencia",
    "/noticias",
    "/contacto",
    "/aviso-privacidad",
    "/terminos-de-uso"
  ];

  return rutasEstaticas.map((ruta) => ({
    url: `${urlSitio}${ruta}`,
    lastModified: new Date()
  }));
  // EN PRODUCCIÓN: agregar dinámicamente las rutas de /proyectos/[slug] y
  // /noticias/[slug] consultando Supabase.
}
