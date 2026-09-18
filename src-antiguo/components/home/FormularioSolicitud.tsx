"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaSolicitudCiudadana, type SolicitudCiudadanaInput } from "@/lib/validations/solicitud";

export function FormularioSolicitud() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<SolicitudCiudadanaInput>({ resolver: zodResolver(esquemaSolicitudCiudadana) });

  const [numeroSeguimiento, setNumeroSeguimiento] = useState<string | null>(null);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  async function alEnviar(datos: SolicitudCiudadanaInput) {
    setErrorEnvio(null);
    try {
      const respuesta = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });
      if (!respuesta.ok) throw new Error("No se pudo enviar la solicitud");
      const { numeroSeguimiento: numero } = await respuesta.json();
      setNumeroSeguimiento(numero);
      reset();
    } catch {
      setErrorEnvio("Ocurrió un problema al enviar tu solicitud. Intenta nuevamente.");
    }
  }

  if (numeroSeguimiento) {
    return (
      <div role="status" className="rounded-xl bg-institucional-verdeClaro p-6 text-institucional-verdeOscuro">
        <p className="font-bold">¡Tu solicitud fue recibida!</p>
        <p className="mt-2">
          Tu número de seguimiento es <strong>{numeroSeguimiento}</strong>. Consérvalo para
          futuras consultas sobre el estado de tu solicitud.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(alEnviar)} className="space-y-5" noValidate>
      <Campo etiqueta="Nombre completo" error={errors.nombreCompleto?.message}>
        <input {...register("nombreCompleto")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Número de identificación (opcional)" error={errors.numeroIdentificacion?.message}>
        <input {...register("numeroIdentificacion")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Correo electrónico" error={errors.correo?.message}>
        <input type="email" {...register("correo")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Teléfono (opcional)" error={errors.telefono?.message}>
        <input type="tel" {...register("telefono")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Comunidad o sector" error={errors.comunidadSector?.message}>
        <input {...register("comunidadSector")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Tipo de solicitud" error={errors.tipoSolicitud?.message}>
        <select {...register("tipoSolicitud")} className="campo-formulario">
          <option value="">Selecciona una opción</option>
          <option value="queja">Queja</option>
          <option value="solicitud_de_servicio">Solicitud de servicio</option>
          <option value="sugerencia">Sugerencia</option>
          <option value="consulta_general">Consulta general</option>
          <option value="otro">Otro</option>
        </select>
      </Campo>

      <Campo etiqueta="Asunto" error={errors.asunto?.message}>
        <input {...register("asunto")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Descripción" error={errors.descripcion?.message}>
        <textarea {...register("descripcion")} rows={5} className="campo-formulario" />
      </Campo>

      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">
          Archivo adjunto (opcional)
        </label>
        <input type="file" className="campo-formulario" />
      </div>

      {/* Campo honeypot invisible: protección antispam básica */}
      <input type="text" {...register("sitioWeb")} className="hidden" tabIndex={-1} autoComplete="off" />

      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input type="checkbox" {...register("autorizoTratamientoDatos")} className="mt-1 h-5 w-5" />
        Autorizo el tratamiento de mis datos personales para dar seguimiento a esta solicitud.
      </label>
      {errors.autorizoTratamientoDatos && (
        <p className="text-sm text-red-600">{errors.autorizoTratamientoDatos.message}</p>
      )}

      {errorEnvio && <p className="text-sm text-red-600">{errorEnvio}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primario disabled:opacity-60">
        {isSubmitting ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  );
}

function Campo({ etiqueta, error, children }: { etiqueta: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-700">{etiqueta}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
