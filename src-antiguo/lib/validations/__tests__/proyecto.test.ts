import { describe, it, expect } from "vitest";
import { esquemaProyecto } from "../proyecto";

describe("esquemaProyecto", () => {
  const base = {
    titulo: "Rehabilitación de camino",
    slug: "rehabilitacion-de-camino",
    descripcion: "Descripción suficientemente larga del proyecto de rehabilitación vial.",
    estado: "en_ejecucion" as const,
    comunidadBeneficiada: "Sector central",
    entidadResponsable: "Junta Comunal de Las Tinajas"
  };

  it("acepta un proyecto válido", () => {
    expect(esquemaProyecto.safeParse(base).success).toBe(true);
  });

  it("rechaza un slug con mayúsculas o espacios", () => {
    expect(esquemaProyecto.safeParse({ ...base, slug: "Slug Invalido" }).success).toBe(false);
  });

  it("rechaza un título demasiado corto", () => {
    expect(esquemaProyecto.safeParse({ ...base, titulo: "Ab" }).success).toBe(false);
  });
});
