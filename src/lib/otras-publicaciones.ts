import { clienteNoticias } from "./noticias-publicas";

export type Publicacion = {
  id: string; titulo: string; publicado: boolean;
  [campo: string]: unknown;
};
export async function publicaciones(tabla: "noticias" | "proyectos" | "convocatorias" | "eventos", id?: string) {
  try {
    let q = clienteNoticias().from(tabla).select("*").eq("publicado", true).order("created_at", { ascending: false });
    if (id) q = q.eq("id", id);
    const { data, error } = await q;
    return { datos: (error ? [] : data ?? []) as Publicacion[], fallo: !!error };
  } catch { return { datos: [] as Publicacion[], fallo: true }; }
}
