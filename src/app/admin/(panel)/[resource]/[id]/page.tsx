import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getResource } from '@/lib/admin/resources'
import ResourceForm from '@/components/admin/ResourceForm'

export default async function EditPage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource: key, id } = await params
  const r = getResource(key)
  if (!r) notFound()

  let record = null
  if (id !== 'nuevo') {
    const supabase = await createClient()
    const { data } = await supabase.from(r.table).select('*').eq('id', id).maybeSingle()
    if (!data) notFound()
    record = data
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-green-900">
        {record ? `Editar ${r.singular}` : `Nuevo ${r.singular}`}
      </h1>
      <ResourceForm resource={r} record={record} />
    </div>
  )
}
