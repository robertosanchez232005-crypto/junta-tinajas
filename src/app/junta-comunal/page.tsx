import type { Metadata } from "next";

export const metadata: Metadata = { title: "La Junta Comunal" };

// Todo el contenido de esta página es texto provisional y editable, tal como
// se solicitó. Reemplazar cada bloque con la información oficial suministrada
// por la Junta Comunal (o conectarlo a `configuracion_institucional` en Supabase).

export default function PaginaJuntaComunal() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-institucional-verdeOscuro">La Junta Comunal de Las Tinajas</h1>

      <Bloque titulo="Historia">
        Texto provisional: pendiente de redacción oficial por parte de la Junta Comunal.
      </Bloque>

      <Bloque titulo="Misión">
        Texto provisional: pendiente de redacción oficial por parte de la Junta Comunal.
      </Bloque>

      <Bloque titulo="Visión">
        Texto provisional: pendiente de redacción oficial por parte de la Junta Comunal.
      </Bloque>

      <Bloque titulo="Valores">
        Texto provisional: pendiente de definición oficial por parte de la Junta Comunal.
      </Bloque>

      <Bloque titulo="Autoridades">
        [Pendiente] No se cuenta con nombres de representantes o funcionarios. Esta
        sección debe completarse únicamente con información oficial confirmada.
      </Bloque>

      <Bloque titulo="Organigrama">
        [Pendiente] Espacio reservado para el organigrama oficial de la Junta Comunal.
      </Bloque>

      <Bloque titulo="Información territorial">
        Distrito de Dolega, provincia de Chiriquí. Superficie: 29.4 km². Población:
        1,530 habitantes según el censo de 2010 (cifra histórica, no representa la
        población actual).
      </Bloque>
    </div>
  );
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold text-institucional-verde">{titulo}</h2>
      <p className="mt-2 text-gray-700">{children}</p>
    </section>
  );
}
