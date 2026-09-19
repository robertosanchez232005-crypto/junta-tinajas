'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getResource, type Resource } from './resources'

function buildSchema(r: Resource) {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const f of r.fields) {
    const req = 'Este campo es obligatorio'
    switch (f.type) {
      case 'boolean': shape[f.name] = z.boolean().default(f.name !== 'aprobado_consulta'); break
      case 'images': shape[f.name] = z.array(z.string()).default([]); break
      case 'number':
        shape[f.name] = z.preprocess(
          (v) => (v === '' || v == null ? null : Number(v)),
          f.required ? z.number({ message: req }) : z.number().nullable()
        ); break
      case 'select':
        shape[f.name] = z.enum(f.options!.map((o) => o.value) as [string, ...string[]], { message: req }); break
      default: {
        const base = z.string().trim().max(f.type === 'textarea' ? 20000 : 500)
        shape[f.name] = f.required
          ? base.min(1, req)
          : z.preprocess((v) => (v === '' ? null : v), base.nullable().optional())
      }
    }
  }
  return z.object(shape)
}

export type SaveResult = { ok: true } | { ok: false; errors: Record<string, string>; message?: string }

export async function saveRecord(key: string, id: string | null, values: Record<string, unknown>): Promise<SaveResult> {
  const r = getResource(key)
  if (!r) return { ok: false, errors: {}, message: 'Sección no válida' }

  const parsed = buildSchema(r).safeParse(values)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    parsed.error.issues.forEach((i) => { errors[String(i.path[0])] = i.message })
    return { ok: false, errors }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, errors: {}, message: 'Tu sesión expiró. Vuelve a iniciar sesión.' }

  const q = id
    ? supabase.from(r.table).update(parsed.data).eq('id', id)
    : supabase.from(r.table).insert(parsed.data)
  const { error } = await q
  if (error) return { ok: false, errors: {}, message: 'No se pudo guardar: ' + error.message }

  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function deleteRecord(key: string, id: string): Promise<{ ok: boolean; message?: string }> {
  const r = getResource(key)
  if (!r) return { ok: false, message: 'Sección no válida' }
  const supabase = await createClient()
  const { error, count } = await supabase.from(r.table).delete({ count: 'exact' }).eq('id', id)
  if (error) return { ok: false, message: error.message }
  if (!count) return { ok: false, message: 'Solo un administrador puede eliminar. Puedes desmarcar "Publicado" para ocultarlo.' }
  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
