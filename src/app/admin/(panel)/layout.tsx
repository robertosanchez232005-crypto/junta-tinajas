import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RESOURCES } from '@/lib/admin/resources'
import { signOut } from '@/lib/admin/actions'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: perfil } = await supabase.from('perfiles').select('nombre, rol').eq('id', user.id).maybeSingle()

  if (!perfil) {
    return (
      <main className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-lg font-bold">Tu cuenta no tiene acceso al panel</h1>
        <p className="mt-2 text-stone-600">Pide a un administrador que active tu usuario.</p>
        <form action={async () => { 'use server'; await signOut(); redirect('/admin/login') }}>
          <button className="mt-4 rounded-md border px-4 py-2">Cerrar sesión</button>
        </form>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <aside className="border-b bg-green-950 p-4 text-green-50 md:min-h-screen md:w-60 md:border-b-0">
        <p className="mb-4 font-bold">Junta Comunal de Las Tinajas</p>
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          <Link href="/admin" className="rounded px-3 py-2 hover:bg-green-900">Resumen</Link>
          {RESOURCES.map((r) => (
            <Link key={r.key} href={`/admin/${r.key}`} className="rounded px-3 py-2 hover:bg-green-900">{r.plural}</Link>
          ))}
        </nav>
        <div className="mt-6 text-sm text-green-200">
          <p>{perfil.nombre ?? user.email}</p>
          <p className="text-xs">{perfil.rol === 'admin' ? 'Administrador' : 'Editor'}</p>
          <form action={async () => { 'use server'; await signOut(); redirect('/admin/login') }}>
            <button className="mt-2 underline">Cerrar sesión</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  )
}
