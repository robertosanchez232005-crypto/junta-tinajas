import type { MetadataRoute } from "next";
import { urlSitio } from "@/lib/sitio";
import { publicaciones } from "@/lib/otras-publicaciones";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rutasEstaticas = ["", "/junta-comunal", "/proyectos", "/consulta-ciudadana", "/atencion-ciudadana", "/transparencia", "/noticias", "/contacto", "/aviso-privacidad", "/terminos-de-uso"];
  const [proyectos, noticias] = await Promise.all([publicaciones("proyectos"), publicaciones("noticias")]);
  return [
    ...rutasEstaticas.map((ruta) => ({ url: urlSitio + ruta, lastModified: new Date(), priority: ruta === "" ? 1 : 0.7 })),
    ...proyectos.datos.map((p) => ({ url: urlSitio + "/proyectos/" + p.id, lastModified: new Date(), priority: 0.6 })),
    ...noticias.datos.map((n) => ({ url: urlSitio + "/noticias/" + n.id, lastModified: new Date(), priority: 0.6 }))
  ];
}
