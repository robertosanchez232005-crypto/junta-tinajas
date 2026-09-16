import { notFound } from "next/navigation";

// EN PRODUCCIÓN: consultar la noticia por slug en Supabase (tabla `noticias`).
export default function PaginaNoticiaIndividual() {
  // Sin datos de demostración de noticias: se muestra 404 hasta tener contenido real.
  return notFound();
}
