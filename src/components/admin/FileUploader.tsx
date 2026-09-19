'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Props = {
  folder: string
  kind: 'image' | 'file'
  multiple?: boolean
  value: string | string[] | null
  onChange: (v: any) => void
}

const MAX_MB = { image: 8, file: 15 }

export default function FileUploader({ folder, kind, multiple, value, onChange }: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const list: string[] = Array.isArray(value) ? value : value ? [value] : []

  async function handle(files: FileList | null) {
    if (!files?.length) return
    setBusy(true); setError('')
    try {
      const supabase = createClient()
      const urls: string[] = []
      for (const original of Array.from(files)) {
        if (original.size > MAX_MB[kind] * 1024 * 1024) throw new Error(`"${original.name}" pesa más de ${MAX_MB[kind]} MB`)
        let file: File = original
        if (kind === 'image') {
          const { default: compress } = await import('browser-image-compression')
          file = await compress(original, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true })
        }
        const ext = original.name.split('.').pop()?.toLowerCase() || (kind === 'image' ? 'jpg' : 'pdf')
        const path = `${folder}/${crypto.randomUUID()}.${ext}`
        const { error } = await supabase.storage.from('media').upload(path, file, { contentType: file.type })
        if (error) throw error
        urls.push(supabase.storage.from('media').getPublicUrl(path).data.publicUrl)
      }
      onChange(multiple ? [...list, ...urls] : urls[0])
    } catch (e: any) {
      setError(e.message ?? 'No se pudo subir el archivo')
    } finally { setBusy(false) }
  }

  const remove = (u: string) => onChange(multiple ? list.filter((x) => x !== u) : null)

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {list.map((u) => (
          <div key={u} className="relative">
            {kind === 'image'
              ? <img src={u} alt="" className="h-24 w-32 rounded-md border object-cover" />
              : <a href={u} target="_blank" className="block rounded-md border bg-white px-3 py-2 text-sm text-green-800 underline">Ver documento</a>}
            <button type="button" onClick={() => remove(u)} aria-label="Quitar"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-600 text-xs text-white">×</button>
          </div>
        ))}
      </div>
      {(multiple || list.length === 0) && (
        <label className="mt-2 inline-block cursor-pointer rounded-md border border-dashed border-green-700 px-4 py-2 text-sm text-green-900 hover:bg-green-50">
          {busy ? 'Subiendo…' : kind === 'image' ? (multiple ? 'Agregar fotos' : 'Elegir imagen') : 'Elegir PDF'}
          <input type="file" className="hidden" disabled={busy} multiple={multiple}
            accept={kind === 'image' ? 'image/jpeg,image/png,image/webp' : 'application/pdf'}
            onChange={(e) => { handle(e.target.files); e.target.value = '' }} />
        </label>
      )}
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  )
}
