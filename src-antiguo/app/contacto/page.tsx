import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contacto" };

export default function PaginaContacto() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-institucional-verdeOscuro">Contacto</h1>
      <div className="mt-8 space-y-3 text-gray-700">
        <p><strong>Dirección:</strong> [Pendiente de confirmar por la Junta Comunal]</p>
        <p><strong>Teléfono:</strong> [Pendiente de confirmar por la Junta Comunal]</p>
        <p><strong>Correo electrónico:</strong> [Pendiente de confirmar por la Junta Comunal]</p>
        <p><strong>Horario de atención:</strong> [Pendiente de confirmar por la Junta Comunal]</p>
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Estos datos se completarán con la información oficial suministrada por la
        Junta Comunal y podrán editarse desde el panel administrativo
        (tabla <code>configuracion_institucional</code>).
      </p>
    </div>
  );
}
