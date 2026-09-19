// Cliente de Supabase para uso en componentes del navegador ("use client").
import { createBrowserClient } from "@supabase/ssr";

export function crearClienteNavegador() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Alias usado por el panel administrativo nuevo. Se conserva el nombre
// anterior para no romper los componentes públicos existentes.
export const createClient = crearClienteNavegador;
