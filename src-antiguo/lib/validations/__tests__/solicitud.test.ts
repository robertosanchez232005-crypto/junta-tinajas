import { describe, it, expect } from "vitest";
import { esquemaSolicitudCiudadana } from "../solicitud";

describe("esquemaSolicitudCiudadana", () => {
  const base = {
    nombreCompleto: "Juana Pérez",
    correo: "juana@example.com",
    comunidadSector: "Sector Central",
    tipoSolicitud: "sugerencia" as const,
    asunto: "Mejora en el parque",
    descripcion: "Sugerencia para mejorar el mantenimiento del parque comunitario.",
    autorizoTratamientoDatos: true as const
  };

  it("acepta una solicitud válida", () => {
    const resultado = esquemaSolicitudCiudadana.safeParse(base);
    expect(resultado.success).toBe(true);
  });

  it("rechaza sin autorización de tratamiento de datos", () => {
    const resultado = esquemaSolicitudCiudadana.safeParse({ ...base, autorizoTratamientoDatos: false });
    expect(resultado.success).toBe(false);
  });

  it("rechaza correo inválido", () => {
    const resultado = esquemaSolicitudCiudadana.safeParse({ ...base, correo: "no-es-correo" });
    expect(resultado.success).toBe(false);
  });

  it("detecta el honeypot lleno como señal de spam", () => {
    const resultado = esquemaSolicitudCiudadana.safeParse({ ...base, sitioWeb: "http://spam.com" });
    expect(resultado.success).toBe(false);
  });
});
