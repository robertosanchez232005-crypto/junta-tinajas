'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteRecord } from '@/lib/admin/actions'

export default function DeleteButton({ resourceKey, id, label }: { resourceKey: string; id: string; label: string }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  return (
    <button disabled={pending} className="text-sm text-red-700 hover:underline disabled:opacity-50"
      onClick={() => {
        if (!confirm(`¿Eliminar "${label}"? Esta acción no se puede deshacer.`)) return
        start(async () => {
          const res = await deleteRecord(resourceKey, id)
          if (!res.ok) alert(res.message)
          router.refresh()
        })
      }}>Eliminar</button>
  )
}
