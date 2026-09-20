'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError('')
    const supabase = createClient()
    try {
      const { error: errorLogin } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (errorLogin) { setError('Correo o contraseña incorrectos.'); return }
      const { data: autorizado, error: errorPermiso } = await supabase.rpc('is_admin')
      if (errorPermiso || autorizado !== true) {
        await supabase.auth.signOut()
        setError('Esta cuenta no tiene acceso al panel administrativo.')
        return
      }
      router.replace('/admin'); router.refresh()
    } catch {
      setError('No se pudo completar el acceso. Intenta nuevamente.')
    } finally {
      setBusy(false)
    }
  }

  const input = 'w-full rounded-md border border-stone-300 px-3 py-2 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/30'
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-green-900">Panel de la Junta Comunal</h1>
        <p className="text-sm text-stone-600">Inicia sesión para administrar el contenido del sitio.</p>
        <div><label className="mb-1 block text-sm font-medium">Correo</label>
          <input type="email" required autoComplete="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><label className="mb-1 block text-sm font-medium">Contraseña</label>
          <input type="password" required autoComplete="current-password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-md bg-green-800 py-2 font-semibold text-white hover:bg-green-900 disabled:opacity-60">
          {busy ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}
