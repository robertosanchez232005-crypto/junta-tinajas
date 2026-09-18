import Link from "next/link";
import Image from "next/image";

// NOTA: los datos de contacto son marcadores provisionales. Reemplazar con la
// información oficial suministrada por la Junta Comunal (ver "configuracion_institucional").
export function PiePagina() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-institucional-verdeClaro bg-institucional-verde text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/images/logo-junta-tinajas.png"
              alt="Escudo de la Junta Comunal de Las Tinajas"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold">Junta Comunal de Las Tinajas</span>
          </div>
          <p className="text-sm text-institucional-verdeClaro">
            Distrito de Dolega, provincia de Chiriquí, Panamá.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">Contacto</h2>
          <ul className="space-y-2 text-sm text-institucional-verdeClaro">
            <li>Dirección: [Pendiente de confirmar por la Junta Comunal]</li>
            <li>Teléfono: [Pendiente de confirmar por la Junta Comunal]</li>
            <li>Correo: [Pendiente de confirmar por la Junta Comunal]</li>
            <li>Horario: [Pendiente de confirmar por la Junta Comunal]</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">Enlaces</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/transparencia" className="hover:underline">Transparencia</Link></li>
            <li><Link href="/atencion-ciudadana" className="hover:underline">Atención Ciudadana</Link></li>
            <li><Link href="/#mapa-tinajas" className="hover:underline">Mapa de Las Tinajas</Link></li>
            <li><Link href="/aviso-privacidad" className="hover:underline">Aviso de privacidad</Link></li>
            <li><Link href="/terminos-de-uso" className="hover:underline">Términos de uso</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">Redes sociales</h2>
          <p className="text-sm text-institucional-verdeClaro">
            [Pendiente: enlaces oficiales a redes sociales de la Junta Comunal]
          </p>
        </div>
      </div>

      <div className="border-t border-white/20 px-4 py-4 text-center text-xs text-institucional-verdeClaro">
        © {anioActual} Junta Comunal de Las Tinajas. Todos los derechos reservados.
      </div>
    </footer>
  );
}
