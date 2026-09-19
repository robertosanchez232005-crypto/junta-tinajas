import { createClient } from "@supabase/supabase-js";

export type NoticiaPublica = {
  id: string;
  titulo: string;
  resumen: string | null;
  contenido: string | null;
  imagen_portada: string | null;
  video_url: string | null;
  fecha_publicacion: string | null;
};

export function urlPublica(valor: string | null): string | undefined {
  if (!valor) return undefined;
  try {
    const url = new URL(valor);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

export function fechaNoticia(valor: string | null): string {
  if (!valor) return "";
  const fecha = new Date(valor.length === 10 ? valor + "T12:00:00Z" : valor);
  if (Number.isNaN(fecha.getTime())) return "";
  return fecha.toLocaleDateString("es-PA", {
    year: "numeric", month: "long", day: "numeric", timeZone: "America/Panama"
  });
}

export function clienteNoticias() {
  // Cliente público sin sesión administrativa: se aplican las políticas RLS.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Falta configurar Supabase.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) }
  });
}
