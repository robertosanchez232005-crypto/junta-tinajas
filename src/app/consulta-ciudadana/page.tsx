import Link from "next/link";
import { publicaciones } from "@/lib/otras-publicaciones";

export const dynamic = "force-dynamic";
const moneda = (centavos: number) => "B/. " + (centavos / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export default async function ConsultaCiudadana() {
  const { datos, fallo } = await publicaciones("proyectos");
  const proyectos = datos.filter(p => p.aprobado_consulta === true).map(p => {
    const valor = p.monto_aprobado;
    const monto = (typeof valor === "number" || (typeof valor === "string" && valor.trim() !== "")) ? Number(valor) : NaN;
    return { id: p.id, titulo: p.titulo, centavos: Number.isFinite(monto) && monto >= 0 ? Math.round(monto * 100) : null };
  });
  const total = proyectos.reduce((s, p) => s + (p.centavos ?? 0), 0);
  const pendientes = proyectos.some(p => p.centavos === null);
  return <>
    <section className="bg-institucional-verdeOscuro px-4 py-14 text-center text-white">
      <h1 className="text-3xl font-extrabold sm:text-5xl">Consulta Ciudadana</h1>
      <nav aria-label="Ruta de navegación" className="mt-5 text-sm"><Link href="/" className="underline">Inicio</Link><span aria-hidden="true"> › </span><span>Consulta Ciudadana</span></nav>
    </section>
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 className="border-l-4 border-institucional-verde pl-5 text-2xl font-bold italic text-institucional-verdeOscuro">La voz de los vecinos construye nuestro futuro</h2>
        <p className="mt-6 leading-7 text-gray-700">La participación ciudadana permite compartir ideas y necesidades para el desarrollo de Las Tinajas.</p>
        <p className="mt-4 leading-7 text-gray-700">Aquí puedes consultar los proyectos registrados por la Junta como aprobados en Consulta Ciudadana, sus montos y sus detalles.</p>
        {!fallo && proyectos.length > 0 && <div className="mt-7 rounded-xl border border-institucional-verde/20 bg-gray-50 p-6"><p className="text-xs font-semibold uppercase tracking-wide">{pendientes ? "Total de montos registrados" : "Inversión aprobada total"}</p><p className="mt-2 text-3xl font-bold text-institucional-verdeOscuro">{moneda(total)}</p>{pendientes && <p className="mt-2 text-sm text-gray-600">Hay proyectos con el monto pendiente de registrar; no se incluyen en este total.</p>}</div>}
        <Link href="/atencion-ciudadana" className="mt-6 inline-block text-institucional-verde underline">Enviar una consulta o propuesta →</Link>
      </div>
      <div className="self-start overflow-hidden rounded-xl border shadow-md">
        <h2 className="bg-institucional-verdeOscuro px-6 py-5 text-center font-bold uppercase text-white">Proyectos aprobados en Consulta Ciudadana</h2>
        {fallo ? <p role="alert" className="p-6">No se pudo cargar la información. Intenta nuevamente más tarde.</p> : proyectos.length === 0 ? <p className="p-6 text-gray-600">Aún no hay proyectos publicados en esta sección.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Proyectos y montos aprobados en balboas</caption><thead className="bg-gray-50 text-xs uppercase"><tr><th scope="col" className="p-4">Nombre del proyecto</th><th scope="col" className="p-4 text-right">Monto aprobado</th></tr></thead><tbody>{proyectos.map(p => <tr key={p.id} className="border-t"><th scope="row" className="p-4 font-medium"><Link href={"/proyectos/" + p.id} className="text-institucional-verde hover:underline">{p.titulo}</Link></th><td className="whitespace-nowrap p-4 text-right tabular-nums">{p.centavos === null ? "Por registrar" : moneda(p.centavos)}</td></tr>)}</tbody><tfoot className="border-t bg-gray-50 font-bold"><tr><th scope="row" className="p-4">{pendientes ? "TOTAL REGISTRADO" : "TOTAL"}</th><td className="whitespace-nowrap p-4 text-right tabular-nums">{moneda(total)}</td></tr></tfoot></table></div>}
      </div>
    </section>
  </>;
}
