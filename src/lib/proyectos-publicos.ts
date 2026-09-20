import { publicaciones } from "./otras-publicaciones";
import { clienteNoticias } from "./noticias-publicas";

export type ProyectoPublico = {
  id: string; titulo: string; descripcion: string | null;
  ubicacion: string | null; estado: string; fecha: string | null;
  imagen_portada: string | null; galeria: string[] | null;
  video_url: string | null; documento_pdf?: string | null;
};

export async function listarProyectos(limite?: number): Promise<{ proyectos: ProyectoPublico[]; fallo: boolean }> {
  const { datos, fallo } = await publicaciones("proyectos");
  const proyectos = datos as unknown as ProyectoPublico[];
  return { proyectos: limite === undefined ? proyectos : proyectos.slice(0, limite), fallo };
}

export async function obtenerProyecto(id: string): Promise<{ proyecto: ProyectoPublico | null; fallo: boolean }> {
  try {
    const { data, error } = await clienteNoticias().from("proyectos").select("*")
      .eq("publicado", true).eq("id", id).maybeSingle();
    return { proyecto: data as ProyectoPublico | null, fallo: !!error };
  } catch { return { proyecto: null, fallo: true }; }
}
