import Link from "next/link";
import { publicaciones } from "@/lib/otras-publicaciones";

export const dynamic = "force-dynamic";
const moneda = (centavos: number) => "B/. " + (centavos / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export default async function ConsultaCiudadana() {
  const { datos, fallo } = await publicaciones("proyectos");
  const proyectos = datos.filter(p => p.aprobado_consulta === true).map(p => {
    const valor = p.monto_aprobado;
    const monto = (typeof valor === "number" || (typeof valor === "string" && valor.trim() !== "")) ? Number(valor) : NaN;
    const ej = p.monto_ejecutado;
    const ejecutado = (typeof ej === "number" || (typeof ej === "string" && ej.trim() !== "")) ? Number(ej) : NaN;
    return {
      id: p.id, titulo: p.titulo, centavos: Number.isFinite(monto) && monto >= 0 ? Math.round(monto * 100) : null,
      ejecutado: Number.isFinite(ejecutado) && ejecutado >= 0 ? Math.round(ejecutado * 100) : null,
      estado: typeof p.estado === "string" ? p.estado : "", anio: typeof p.fecha === "string" ? p.fecha.slice(0, 4) : ""
    };
  });
  const etiquetaEstado: Record<string, string> = { planificado: "Planificado", en_ejecucion: "En ejecución", finalizado: "Finalizado", suspendido: "Suspendido" };
  const total = proyectos.reduce((s, p) => s + (p.centavos ?? 0), 0);
  const pendientes = proyectos.some(p => p.centavos === null);
  const ejecutadoTotal = proyectos.reduce((s, p) => s + (p.ejecutado ?? 0), 0);
  const restante = Math.max(total - ejecutadoTotal, 0);
  const porcentaje = total > 0 ? Math.min(Math.round((ejecutadoTotal / total) * 100), 100) : 0;
  const ejecPendiente = proyectos.some(p => p.ejecutado === null);
  return <>
    <section className="bg-institucional-verdeOscuro px-4 py-14 text-center text-white">
      <h1 className="titulo-display text-5xl sm:text-7xl">Consulta Ciudadana</h1>
      <nav aria-label="Ruta de navegación" className="mt-5 text-sm"><Link href="/" className="underline">Inicio</Link><span aria-hidden="true"> › </span><span>Consulta Ciudadana</span></nav>
    </section>
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 className="border-l-4 border-institucional-verde pl-5 text-2xl font-bold italic text-institucional-verdeOscuro">Decidimos juntos el futuro de Las Tinajas</h2>
        <p className="mt-6 leading-7 text-gray-700">La Consulta Ciudadana abre las puertas de la Junta Comunal a todos los vecinos de Tinajas, Balita, Cermeño, Los Palomos, Conventillo y Loma Alta. Aquí tus ideas y necesidades se escuchan y se convierten en proyectos para la comunidad.</p>
        <p className="mt-4 leading-7 text-gray-700">Conoce cada proyecto aprobado: cuánto cuesta, en qué estado se encuentra y cuánto se ha ejecutado, con información clara y al alcance de todos.</p>
        {!fallo && proyectos.length > 0 && <div className="mt-7 rounded-xl border border-institucional-verde/20 bg-gray-50 p-6 marco"><p className="text-xs font-semibold uppercase tracking-wide">{pendientes ? "Total de montos registrados" : "Inversión aprobada total"}</p><p className="mt-2 text-3xl font-bold text-institucional-verdeOscuro">{moneda(total)}</p>{pendientes && <p className="mt-2 text-sm text-gray-600">Hay proyectos con el monto pendiente de registrar; no se incluyen en este total.</p>}</div>}
        <Link href="/atencion-ciudadana" className="btn-secundario mt-6 inline-block">Enviar una consulta o propuesta →</Link>
      </div>
      <div className="self-start overflow-hidden rounded-xl border shadow-md marco">
        <h2 className="bg-institucional-verdeOscuro px-6 py-5 text-center font-bold uppercase text-white">Proyectos aprobados en Consulta Ciudadana</h2>
        {fallo ? <p role="alert" className="p-6">No se pudo cargar la información. Intenta nuevamente más tarde.</p> : proyectos.length === 0 ? <p className="p-6 text-gray-600">Aún no hay proyectos publicados en esta sección.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Proyectos y montos aprobados en balboas</caption><thead className="bg-gray-50 text-xs uppercase"><tr><th scope="col" className="p-4">Nombre del proyecto</th><th scope="col" className="p-4">Vigencia</th><th scope="col" className="p-4 text-right">Monto del proyecto</th><th scope="col" className="p-4">Estado</th></tr></thead><tbody>{proyectos.map(p => <tr key={p.id} className="border-t"><th scope="row" className="p-4 font-medium"><Link href={"/proyectos/" + p.id} className="text-institucional-verde hover:underline">{p.titulo}</Link></th><td className="p-4">{p.anio || "Por registrar"}</td><td className="whitespace-nowrap p-4 text-right tabular-nums">{p.centavos === null ? "Por registrar" : moneda(p.centavos)}</td><td className="p-4">{etiquetaEstado[p.estado] ?? "—"}</td></tr>)}</tbody><tfoot className="border-t bg-gray-50 font-bold"><tr><th scope="row" colSpan={2} className="p-4">{pendientes ? "TOTAL REGISTRADO" : "TOTAL"}</th><td className="whitespace-nowrap p-4 text-right tabular-nums">{moneda(total)}</td><td className="p-4"></td></tr></tfoot></table></div>}
      </div>
    </section>
    {!fallo && proyectos.length > 0 && (
      <section className="fondo-puntos px-4 py-14" aria-labelledby="avance-titulo">
        <div className="mx-auto max-w-6xl">
          <h2 id="avance-titulo" className="titulo-display text-3xl text-institucional-verdeOscuro sm:text-4xl">Avance de la inversión</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Inversión ejecutada total", moneda(ejecutadoTotal), ejecPendiente ? "Hay proyectos con la ejecución por registrar." : ""],
              ["Ejecución restante", moneda(restante), "Aprobado menos ejecutado."]
            ].map(([t, v, n]) => (
              <div key={t} className="rounded-2xl border border-institucional-verde/20 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg marco">
                <p className="text-xs font-semibold uppercase tracking-wide text-institucional-verde">{t}</p>
                <p className="titulo-display mt-2 text-3xl text-institucional-verdeOscuro">{v}</p>
                {n && <p className="mt-2 text-sm text-gray-600">{n}</p>}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm marco">
            <div className="flex items-baseline justify-between"><p className="font-semibold text-institucional-verdeOscuro">Porcentaje ejecutado</p><p className="titulo-display text-2xl text-institucional-verde">{porcentaje}%</p></div>
            <div className="mt-3 h-4 overflow-hidden rounded-full bg-institucional-verdeClaro" role="progressbar" aria-valuenow={porcentaje} aria-valuemin={0} aria-valuemax={100} aria-label="Porcentaje de la inversión ejecutada"><div className="h-full rounded-full bg-institucional-verde transition-all duration-1000" style={{ width: porcentaje + "%" }} /></div>
          </div>
        </div>
      </section>
    )}
  </>;
}
