export default function CargandoProyectos() {
  return <section className="mx-auto max-w-6xl px-4 py-14" aria-busy="true">
    <h1 className="text-3xl font-bold text-institucional-verdeOscuro">Proyectos</h1>
    <p role="status" className="mt-4 text-gray-600">Cargando los proyectos de Las Tinajas…</p>
    <div aria-hidden="true" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0,1,2].map(i => <div key={i} className="h-64 rounded-xl bg-gray-100" />)}</div>
  </section>;
}
