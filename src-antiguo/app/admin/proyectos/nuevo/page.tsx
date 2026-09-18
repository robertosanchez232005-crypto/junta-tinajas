import { FormularioProyecto } from "@/components/admin/FormularioProyecto";

export default function PaginaNuevoProyecto() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-institucional-verdeOscuro">Nuevo proyecto</h1>
      <p className="mt-1 text-sm text-gray-500">
        Guarda como borrador para revisarlo antes de publicarlo, o publícalo directamente.
      </p>
      <div className="mt-6 max-w-2xl">
        <FormularioProyecto />
      </div>
    </div>
  );
}
