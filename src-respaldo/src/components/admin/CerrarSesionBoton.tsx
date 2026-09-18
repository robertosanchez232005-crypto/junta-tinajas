"use client";

import { useRouter } from "next/navigation";
import { crearClienteNavegador } from "@/lib/supabase/client";

export function CerrarSesionBoton() {
  const router = useRouter();
  const supabase = crearClienteNavegador();

  async function cerrarSesion() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button onClick={cerrarSesion} className="mt-3 text-institucional-verdeClaro underline">
      Cerrar sesión
    </button>
  );
}
