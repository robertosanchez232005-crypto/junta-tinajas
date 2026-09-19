import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { RESOURCES } from '@/lib/admin/resources'

export default async function Dashboard() {
  const supabase = await createClient()
  const counts = await Promise.all(
    RESOURCES.map(async (r) => {
      const { count } = await supabase.from(r.table).select('*', { count: 'exact', head: true })
      return { r, count: count ?? 0 }
    })
  )
  return (
    <div>
      <h1 className="text-2xl font-bold text-green-900">¿Qué quieres publicar hoy?</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {counts.map(({ r, count }) => (
          <div key={r.key} className="rounded-lg border bg-white p-5">
            <p className="text-3xl font-bold text-green-900">{count}</p>
            <p className="text-stone-600">{r.plural}</p>
            <Link href={`/admin/${r.key}/nuevo`} className="mt-3 inline-block rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-900">
              Agregar {r.singular}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
