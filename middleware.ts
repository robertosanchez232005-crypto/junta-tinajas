import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list: { name: string; value: string; options: CookieOptions }[]) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user && request.nextUrl.pathname !== '/admin/login') {
    const destino = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.getAll().forEach(cookie => destino.cookies.set(cookie))
    return destino
  }
  // El layout y las acciones comprueban el permiso. No redirigir cualquier
  // sesión desde login evita bucles para usuarios sin autorización.
  return response
}
export const config = { matcher: ['/admin/:path*'] }
