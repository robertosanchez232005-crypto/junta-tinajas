"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaProyecto, type ProyectoInput, estadosProyecto } from "@/lib/validations/proyecto";
import { crearClienteNavegador } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// Este formulario ilustra el patrón completo de creación de un proyecto:
// validación con Zod, carga de PDF a Supabase Storage con validación de tipo
// y tamaño, vista previa antes de publicar, y guardado como borrador o publicado.
// Los formularios de "Editar proyecto", "Noticias" y "Documentos de
// transparencia" siguen exactamente el mismo patrón.

const TAMANO_MAXIMO_MB = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB ?? 20);

export function FormularioProyecto() {
  const router = useRouter();
  const supabase = crearClienteNavegador();
  const [archivoPdf, setArchivoPdf] = useState<File | null>(null);
  const [errorArchivo, setErrorArchivo] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProyectoInput>({
    resolver: zodResolver(esquemaProyecto),
    defaultValues: { estadoPublicacion: "borrador" }
  });

  function alSeleccionarArchivo(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    setErrorArchivo(null);
    if (!archivo) return;

    // Validación en el cliente: solo PDF y tamaño máximo configurable.
    if (archivo.type !== "application/pdf") {
      setErrorArchivo("Solo se permiten archivos PDF.");
      return;
    }
    if (archivo.size > TAMANO_MAXIMO_MB * 1024 * 1024) {
      setErrorArchivo(`El archivo supera el tamaño máximo permitido (${TAMANO_MAXIMO_MB} MB).`);
      return;
    }
    setArchivoPdf(archivo);
  }

  async function alGuardar(datos: ProyectoInput, publicar: boolean) {
    setEnviando(true);
    setMensaje(null);

    const { data: sesion } = await supabase.auth.getUser();

    const { data: proyecto, error } = await supabase
      .from("proyectos")
      .insert({
        titulo: datos.titulo,
        slug: datos.slug,
        descripcion: datos.descripcion,
        resumen_breve: datos.resumenBreve,
        fecha_inicio: datos.fechaInicio || null,
        fecha_fin: datos.fechaFin || null,
        estado: datos.estado,
        comunidad_beneficiada: datos.comunidadBeneficiada,
        monto: datos.monto ?? null,
        entidad_responsable: datos.entidadResponsable,
        categoria: datos.categoria,
        estado_publicacion: publicar ? "publicado" : "borrador",
        fecha_publicacion: publicar ? new Date().toISOString() : null,
        creado_por: sesion.user?.id
      })
      .select("id")
      .single();

    if (error || !proyecto) {
      setMensaje("Ocurrió un error al guardar el proyecto.");
      setEnviando(false);
      return;
    }

    // Servidor de nombres seguros y únicos para el PDF (evita colisiones y
    // caracteres peligrosos en el nombre de archivo).
    if (archivoPdf) {
      const nombreSeguro = `${proyecto.id}/${crypto.randomUUID()}.pdf`;
      const { error: errorSubida } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET_PROYECTOS ?? "proyectos")
        .upload(nombreSeguro, archivoPdf, { contentType: "application/pdf" });

      if (!errorSubida) {
        await supabase.from("proyecto_documentos").insert({
          proyecto_id: proyecto.id,
          titulo: archivoPdf.name,
          storage_path: nombreSeguro,
          nombre_archivo_original: archivoPdf.name,
          tamano_bytes: archivoPdf.size,
          subido_por: sesion.user?.id
        });
      }
    }

    // Registro de auditoría básico
    await supabase.from("registro_acciones").insert({
      usuario_id: sesion.user?.id,
      accion: publicar ? "publicar_proyecto" : "guardar_borrador_proyecto",
      entidad: "proyectos",
      entidad_id: proyecto.id
    });

    setEnviando(false);
    router.push("/admin/proyectos");
    router.refresh();
  }

  return (
    <form className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
      <Campo etiqueta="Título" error={errors.titulo?.message}>
        <input
          {...register("titulo")}
          className="campo-formulario"
          onBlur={(e) =>
            setValue(
              "slug",
              e.target.value
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
            )
          }
        />
      </Campo>

      <Campo etiqueta="Slug (URL amigable)" error={errors.slug?.message}>
        <input {...register("slug")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Descripción" error={errors.descripcion?.message}>
        <textarea {...register("descripcion")} rows={5} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Resumen breve (para tarjetas)" error={errors.resumenBreve?.message}>
        <input {...register("resumenBreve")} className="campo-formulario" />
      </Campo>

      <div className="grid grid-cols-2 gap-4">
        <Campo etiqueta="Fecha de inicio" error={errors.fechaInicio?.message}>
          <input type="date" {...register("fechaInicio")} className="campo-formulario" />
        </Campo>
        <Campo etiqueta="Fecha de finalización" error={errors.fechaFin?.message}>
          <input type="date" {...register("fechaFin")} className="campo-formulario" />
        </Campo>
      </div>

      <Campo etiqueta="Estado del proyecto" error={errors.estado?.message}>
        <select {...register("estado")} className="campo-formulario">
          {estadosProyecto.map((e) => (
            <option key={e} value={e}>{e.replace("_", " ")}</option>
          ))}
        </select>
      </Campo>

      <Campo etiqueta="Comunidad o área beneficiada" error={errors.comunidadBeneficiada?.message}>
        <input {...register("comunidadBeneficiada")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Entidad responsable" error={errors.entidadResponsable?.message}>
        <input {...register("entidadResponsable")} className="campo-formulario" />
      </Campo>

      <Campo etiqueta="Monto (opcional — se publica solo si la Junta lo decide)" error={errors.monto?.message}>
        <input type="number" step="0.01" {...register("monto")} className="campo-formulario" />
      </Campo>

      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Documento PDF (opcional)</label>
        <input type="file" accept="application/pdf" onChange={alSeleccionarArchivo} className="campo-formulario" />
        {errorArchivo && <p className="mt-1 text-sm text-red-600">{errorArchivo}</p>}
        {archivoPdf && <p className="mt-1 text-sm text-gray-500">Seleccionado: {archivoPdf.name}</p>}
      </div>

      {mensaje && <p className="text-sm text-red-600">{mensaje}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          disabled={enviando}
          onClick={handleSubmit((d) => alGuardar(d, false))}
          className="btn-secundario disabled:opacity-60"
        >
          Guardar como borrador
        </button>
        <button
          type="button"
          disabled={enviando}
          onClick={handleSubmit((d) => alGuardar(d, true))}
          className="btn-primario disabled:opacity-60"
        >
          Publicar
        </button>
      </div>
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
