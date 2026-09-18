import { crearClienteServidor } from "@/lib/supabase/server";

export default async function PanelResumen() {
  const supabase = crearClienteServidor();

  const [{ count: totalProyectos }, { count: solicitudesPendientes }] = await Promise.all([
    supabase.from("proyectos").select("*", { count: "exact", head: true }),
    supabase
      .from("solicitudes_ciudadanas")
      .select("*", { count: "exact", head: true })
      .in("estado", ["recibida", "en_revision"])
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-institucional-verdeOscuro">Resumen</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <TarjetaMetrica etiqueta="Proyectos totales" valor={totalProyectos ?? 0} />
        <TarjetaMetrica etiqueta="Solicitudes pendientes" valor={solicitudesPendientes ?? 0} />
        <TarjetaMetrica etiqueta="Noticias publicadas" valor="—" />
      </div>
    </div>
  );
}

function TarjetaMetrica({ etiqueta, valor }: { etiqueta: string; valor: number | string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <p className="text-3xl font-extrabold text-institucional-verde">{valor}</p>
      <p className="text-sm text-gray-500">{etiqueta}</p>
    </div>
  );
}
