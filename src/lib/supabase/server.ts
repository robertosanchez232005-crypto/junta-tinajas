// Cliente de Supabase para uso en Server Components, Route Handlers y Server Actions.
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function crearClienteServidor() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
  try {
    cookieStore.set({ name, value, ...options });
  } catch {
    // El middleware actualiza la sesión.
  }
},
remove(name: string, options: CookieOptions) {
  try {
    cookieStore.set({ name, value: "", ...options });
  } catch {
    // El middleware actualiza la sesión.
  }
}
      }
    }
  );
}

// Cliente con permisos elevados (service role). Úsese SOLO en el servidor,
// nunca en código que se envía al navegador (p. ej. operaciones administrativas
// de almacenamiento que requieran evadir RLS de forma controlada).
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function crearClienteAdministrativo() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

// Alias asíncrono usado por las Server Actions y páginas del panel nuevo.
// Mantiene compatible la API existente de la web pública.
export async function createClient() {
  return crearClienteServidor();
}
