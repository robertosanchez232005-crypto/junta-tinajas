import Link from "next/link";
import { redirect } from "next/navigation";
import { crearClienteServidor } from "@/lib/supabase/server";
import { CerrarSesionBoton } from "@/components/admin/CerrarSesionBoton";

// El middleware (middleware.ts) ya protege /admin/*, pero aquí también
// verificamos la sesión y el rol para poder ocultar controles según
// "administrador" vs "editor", y para no aplicar este layout a /admin/login.
export default async function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const supabase = crearClienteServidor();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("nombre_completo, rol")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-col bg-institucional-verdeOscuro p-6 text-white lg:flex">
        <p className="mb-8 text-lg font-bold">Panel administrativo</p>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin/dashboard" className="rounded-md px-3 py-2 hover:bg-white/10">Resumen</Link>
          <Link href="/admin/proyectos" className="rounded-md px-3 py-2 hover:bg-white/10">Proyectos</Link>
          <Link href="/admin/noticias" className="rounded-md px-3 py-2 hover:bg-white/10">Noticias</Link>
          <Link href="/admin/transparencia" className="rounded-md px-3 py-2 hover:bg-white/10">Transparencia</Link>
          <Link href="/admin/solicitudes" className="rounded-md px-3 py-2 hover:bg-white/10">Solicitudes ciudadanas</Link>
        </nav>
        <div className="mt-auto pt-8 text-xs text-institucional-verdeClaro">
          <p>{perfil?.nombre_completo ?? user.email}</p>
          <p className="uppercase">{perfil?.rol ?? "editor"}</p>
          <CerrarSesionBoton />
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-6 lg:p-10">{children}</main>
    </div>
  );
}
