'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Resource } from '@/lib/admin/resources'
import { saveRecord } from '@/lib/admin/actions'
import FileUploader from './FileUploader'

const toLocalInput = (v: string | null, withTime: boolean) => {
  if (!v) return ''
  if (!withTime) return v.slice(0, 10)
  const d = new Date(v); const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

export default function ResourceForm({ resource, record }: { resource: Resource; record: Record<string, any> | null }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [values, setValues] = useState<Record<string, any>>(() => {
    const v: Record<string, any> = {}
    for (const f of resource.fields) {
      const raw = record?.[f.name]
      v[f.name] =
        f.type === 'boolean' ? (raw ?? (f.name !== 'aprobado_consulta'))
        : f.type === 'images' ? (raw ?? [])
        : f.type === 'datetime' ? toLocalInput(raw ?? null, true)
        : (raw ?? '')
    }
    return v
  })
  const set = (name: string, val: any) => setValues((s) => ({ ...s, [name]: val }))

  function submit(e: React.FormEvent) {
    e.preventDefault(); setMessage(''); setErrors({})
    const payload = { ...values }
    for (const f of resource.fields) {
      if (f.type === 'datetime' && payload[f.name]) payload[f.name] = new Date(payload[f.name]).toISOString()
    }
    start(async () => {
      const res = await saveRecord(resource.key, record?.id ?? null, payload)
      if (res.ok) { router.push(`/admin/${resource.key}`); router.refresh() }
      else { setErrors(res.errors); setMessage(res.message ?? 'Revisa los campos marcados.') }
    })
  }

  const input = 'w-full rounded-md border border-stone-300 bg-white px-3 py-2 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/30'

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-5">
      {resource.fields.map((f) => (
        <div key={f.name}>
          {f.type !== 'boolean' && (
            <label className="mb-1 block text-sm font-medium text-stone-800">
              {f.label}{f.required && <span className="text-red-700"> *</span>}
            </label>
          )}
          {f.type === 'textarea' ? (
            <textarea rows={6} className={input} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} />
          ) : f.type === 'select' ? (
            <select className={input} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)}>
              <option value="">Selecciona…</option>
              {f.options!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) : f.type === 'boolean' ? (
            <label className="flex items-center gap-2 text-sm font-medium text-stone-800">
              <input type="checkbox" className="h-4 w-4 accent-green-800" checked={values[f.name]} onChange={(e) => set(f.name, e.target.checked)} />
              {f.label}
            </label>
          ) : f.type === 'image' || f.type === 'images' || f.type === 'file' ? (
            <FileUploader folder={resource.key} kind={f.type === 'file' ? 'file' : 'image'}
              multiple={f.type === 'images'} value={values[f.name]} onChange={(v) => set(f.name, v)} />
          ) : (
            <input className={input}
              type={f.type === 'date' ? 'date' : f.type === 'datetime' ? 'datetime-local' : f.type === 'time' ? 'time' : f.type === 'number' ? 'number' : 'text'}
              step={f.type === 'number' ? '0.01' : undefined}
              value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} />
          )}
          {f.help && <p className="mt-1 text-xs text-stone-500">{f.help}</p>}
          {errors[f.name] && <p className="mt-1 text-sm text-red-700">{errors[f.name]}</p>}
        </div>
      ))}
      {message && <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">{message}</p>}
      <div className="flex gap-3 pt-2">
        <button disabled={pending} className="rounded-md bg-green-800 px-5 py-2 font-semibold text-white hover:bg-green-900 disabled:opacity-60">
          {pending ? 'Guardando…' : 'Guardar'}
        </button>
        <button type="button" onClick={() => router.push(`/admin/${resource.key}`)} className="rounded-md border border-stone-300 px-5 py-2">Cancelar</button>
      </div>
    </form>
  )
}
