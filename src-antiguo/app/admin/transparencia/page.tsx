import Link from "next/link";

// Mismo patrón CRUD que "Proyectos": subir documento (PDF), categoría, año,
// y bandera "publicado". Tabla: `documentos_transparencia`.
export default function PanelTransparencia() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-institucional-verdeOscuro">Documentos de transparencia</h1>
        <Link href="#" className="btn-primario">Subir documento</Link>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Implementar `FormularioDocumentoTransparencia.tsx` reutilizando la lógica
        de validación y carga de PDF de `FormularioProyecto.tsx` (tipo, tamaño
        máximo, nombre seguro único).
      </p>
    </div>
  );
}
