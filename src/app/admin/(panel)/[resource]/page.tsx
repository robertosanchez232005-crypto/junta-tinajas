import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getResource } from '@/lib/admin/resources'
import DeleteButton from '@/components/admin/DeleteButton'

const fmt = (v: string | null) => (v ? new Date(v).toLocaleDateString('es-PA', { dateStyle: 'medium' }) : '—')

export default async function ListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource: key } = await params
  const r = getResource(key)
  if (!r) notFound()

  const supabase = await createClient()
  const { data: rows } = await supabase.from(r.table).select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-900">{r.plural}</h1>
        <Link href={`/admin/${r.key}/nuevo`} className="rounded-md bg-green-800 px-4 py-2 font-semibold text-white hover:bg-green-900">
          Agregar {r.singular}
        </Link>
      </div>

      {!rows?.length ? (
        <p className="mt-10 rounded-lg border border-dashed bg-white p-10 text-center text-stone-600">
          Todavía no hay {r.plural.toLowerCase()}. Agrega el primero con el botón verde.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-stone-100 text-stone-700">
              <tr><th className="p-3">Título</th>{r.statusField && <th className="p-3">Estado</th>}<th className="p-3">Fecha</th><th className="p-3">Web</th><th className="p-3" /></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{row[r.titleField]}</td>
                  {r.statusField && <td className="p-3">{String(row[r.statusField]).replace('_', ' ')}</td>}
                  <td className="p-3">{fmt(r.dateField ? row[r.dateField] : null)}</td>
                  <td className="p-3">{row.publicado ? 'Visible' : 'Oculto'}</td>
                  <td className="flex justify-end gap-4 p-3">
                    <Link href={`/admin/${r.key}/${row.id}`} className="text-green-800 hover:underline">Editar</Link>
                    <DeleteButton resourceKey={r.key} id={row.id} label={row[r.titleField]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
