import Link from "next/link";

const etiquetasEstado: Record<string, string> = {
  planificado: "Planificado",
  en_ejecucion: "En ejecución",
  finalizado: "Finalizado",
  suspendido: "Suspendido"
};

const coloresEstado: Record<string, string> = {
  planificado: "bg-amber-100 text-amber-800",
  en_ejecucion: "bg-blue-100 text-blue-800",
  finalizado: "bg-institucional-verdeClaro text-institucional-verdeOscuro",
  suspendido: "bg-red-100 text-red-800"
};

export function TarjetaProyecto({
  slug,
  titulo,
  fecha,
  estado,
  lugar,
  resumen,
  esDemo
}: {
  slug: string;
  titulo: string;
  fecha: string;
  estado: string;
  lugar: string;
  resumen: string;
  esDemo?: boolean;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex h-40 items-center justify-center bg-institucional-verdeClaro text-sm text-institucional-verdeOscuro">
        Imagen del proyecto
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${coloresEstado[estado]}`}>
            {etiquetasEstado[estado] ?? estado}
          </span>
          {esDemo && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
              Ejemplo
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-institucional-verdeOscuro">{titulo}</h3>
        <p className="text-sm text-gray-500">
          {lugar} · {new Date(fecha).toLocaleDateString("es-PA", { year: "numeric", month: "long" })}
        </p>
        <p className="flex-1 text-sm text-gray-700">{resumen}</p>
        <Link href={`/proyectos/${slug}`} className="mt-2 text-sm font-semibold text-institucional-verde hover:underline">
          Ver proyecto →
        </Link>
      </div>
    </article>
  );
}
