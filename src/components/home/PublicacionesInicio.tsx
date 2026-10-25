import { publicaciones } from "@/lib/otras-publicaciones";
import { urlPublica } from "@/lib/noticias-publicas";
import { PestanasPublicaciones, type SeccionPublicaciones } from "./PestanasPublicaciones";

export async function PublicacionesInicio() {
  const secciones = [
    { tabla: "noticias", titulo: "Noticias", ruta: "/noticias", vacio: "Todavía no hay noticias. Pronto compartiremos las novedades de la Junta." },
    { tabla: "convocatorias", titulo: "Avisos de compra", ruta: "/avisos-de-compra", vacio: "No hay avisos de compra abiertos por ahora." },
    { tabla: "eventos", titulo: "Eventos", ruta: "/eventos", vacio: "No hay eventos programados por ahora." }
  ] as const;
  const resultados = await Promise.all(secciones.map((s) => publicaciones(s.tabla)));
  const datos: SeccionPublicaciones[] = secciones.map((s, i) => ({
    clave: s.tabla, titulo: s.titulo, ruta: s.ruta, vacio: s.vacio, fallo: resultados[i].fallo,
    items: resultados[i].datos.map((p) => {
      const resumen = p.resumen || p.descripcion || p.contenido;
      return {
        id: p.id, titulo: p.titulo,
        resumen: typeof resumen === "string" ? resumen.slice(0, 160) : "",
        imagen: urlPublica(typeof p.imagen_portada === "string" ? p.imagen_portada : typeof p.imagen === "string" ? p.imagen : null)
      };
    })
  }));
  return <PestanasPublicaciones secciones={datos} />;
}
