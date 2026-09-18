"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearClienteNavegador } from "@/lib/supabase/client";

export default function PaginaLoginAdmin() {
  const router = useRouter();
  const supabase = crearClienteNavegador();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function alEnviar(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
    setCargando(false);
    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14">
      <div className="mb-6 flex flex-col items-center">
        {/* Logo oficial también en la pantalla de inicio de sesión del personal */}
        <img
          src="/images/logo-junta-tinajas.png"
          alt="Escudo de la Junta Comunal de Las Tinajas"
          className="mb-4 h-16 w-16 object-contain"
        />
        <h1 className="text-xl font-bold text-institucional-verdeOscuro">Acceso del personal</h1>
      </div>
      <form onSubmit={alEnviar} className="space-y-4 rounded-xl border border-gray-200 p-6">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Correo electrónico</label>
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="campo-formulario"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Contraseña</label>
          <input
            type="password"
            required
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="campo-formulario"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={cargando} className="btn-primario w-full disabled:opacity-60">
          {cargando ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
