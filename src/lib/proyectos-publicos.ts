import { clienteNoticias } from "./noticias-publicas";

export type ProyectoPublico = {
  id: string; titulo: string; descripcion: string | null;
  ubicacion: string | null; estado: string; fecha: string | null;
  imagen_portada: string | null; galeria: string[] | null;
  video_url: string | null; documento_pdf?: string | null;
};

export async function listarProyectos(limite?: number): Promise<{ proyectos: ProyectoPublico[]; fallo: boolean }> {
  try {
    let consulta = clienteNoticias().from("proyectos").select("*")
      .eq("publicado", true).order("created_at", { ascending: false });
    if (limite) consulta = consulta.limit(limite);
    const { data, error } = await consulta;
    return { proyectos: error ? [] : (data ?? []) as ProyectoPublico[], fallo: !!error };
  } catch { return { proyectos: [], fallo: true }; }
}

export async function obtenerProyecto(id: string): Promise<{ proyecto: ProyectoPublico | null; fallo: boolean }> {
  try {
    const { data, error } = await clienteNoticias().from("proyectos").select("*")
      .eq("publicado", true).eq("id", id).maybeSingle();
    return { proyecto: data as ProyectoPublico | null, fallo: !!error };
  } catch { return { proyecto: null, fallo: true }; }
}
