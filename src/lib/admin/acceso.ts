import type { SupabaseClient } from '@supabase/supabase-js'

export async function tieneAccesoAdmin(supabase: SupabaseClient): Promise<boolean> {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user || user.email?.trim().toLowerCase() !== 'juntacomunaltinajas1@gmail.com') return false
  const { data, error: permisoError } = await supabase.rpc('is_admin')
  return !permisoError && data === true
}
