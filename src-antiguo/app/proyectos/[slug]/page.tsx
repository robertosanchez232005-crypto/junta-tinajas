import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { proyectosDemo } from "@/data/proyectos-demo";
import { FileText } from "lucide-react";

// EN PRODUCCIÓN: reemplazar por consulta a Supabase por slug, incluyendo
// proyecto_imagenes y proyecto_documentos relacionados.
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const proyecto = proyectosDemo.find((p) => p.slug === params.slug);
  return { title: proyecto ? proyecto.titulo : "Proyecto no encontrado" };
}

export default function PaginaProyectoIndividual({ params }: { params: { slug: string } }) {
  const proyecto = proyectosDemo.find((p) => p.slug === params.slug);
  if (!proyecto) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-institucional-verde">
        {proyecto.estado.replace("_", " ")}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-institucional-verdeOscuro">{proyecto.titulo}</h1>
      <p className="mt-2 text-gray-500">{proyecto.lugar}</p>

      <div className="mt-8 flex h-64 items-center justify-center rounded-xl bg-institucional-verdeClaro text-sm text-institucional-verdeOscuro">
        Galería de imágenes del proyecto (opcional)
      </div>

      <div className="prose prose-green mt-8 max-w-none text-gray-700">
        <p>{proyecto.resumen}</p>
      </div>

      {/* Visor / descarga de PDF — en producción, listar proyecto_documentos */}
      <div className="mt-10 rounded-xl border border-gray-200 p-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-institucional-verdeOscuro">
          <FileText size={20} /> Documentos del proyecto
        </h2>
        <p className="text-sm text-gray-500">
          No hay documentos PDF asociados a este proyecto de ejemplo. En producción
          se mostrarán aquí los botones "Ver documento" y "Descargar" para cada PDF cargado.
        </p>
      </div>
    </article>
  );
}
