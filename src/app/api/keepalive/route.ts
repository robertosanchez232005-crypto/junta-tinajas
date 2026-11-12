import { NextResponse } from "next/server";
import { clienteNoticias } from "@/lib/noticias-publicas";

export const dynamic = "force-dynamic";

// Una consulta mínima a Supabase. Vercel la ejecuta cada día (ver vercel.json)
// para que el proyecto gratuito de Supabase no se pause por falta de actividad.
export async function GET() {
  try {
    const { error } = await clienteNoticias().from("proyectos").select("id").limit(1);
    return NextResponse.json({ ok: !error });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
