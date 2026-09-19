import Link from "next/link";
import { Sun, Users, Home, Heart, Leaf, Bike, TreePine, MapPin } from "lucide-react";
import { publicaciones } from "@/lib/otras-publicaciones";
import { urlPublica } from "@/lib/noticias-publicas";
import styles from "./PortadaTinajas.module.css";

export async function PortadaTinajas() {
  const resultados = await Promise.all([
    publicaciones("noticias"), publicaciones("proyectos"), publicaciones("eventos")
  ]);
  const imagenes = Array.from(new Set(resultados.flatMap(r => r.datos.flatMap(p => {
    const valor = p.imagen_portada || p.imagen;
    const url = urlPublica(typeof valor === "string" ? valor : null);
    return url ? [url] : [];
  })))).slice(0, 3);
  const iconos = [Sun, Users, Home, Heart, Leaf, Bike, TreePine, MapPin];
  return <section className={styles.portada} aria-labelledby="titulo-portada">
    <div className={styles.fotos} aria-hidden="true">
      {[0, 1, 2].map(i => <div className={styles.panel} key={i}>
        {imagenes.length > 0 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagenes[i % imagenes.length]} alt="" className={styles.foto} />
        )}
      </div>)}
    </div>
    <div className={styles.velo} />
    <div className={styles.contenido}>
      <p className={styles.etiqueta}>NUESTRA COMUNIDAD, NUESTRO HOGAR</p>
      <h1 id="titulo-portada">Junta Comunal<br />de Las Tinajas</h1>
      <p className={styles.descripcion}>Trabajando juntos por el desarrollo de nuestra comunidad.</p>
      <Link href="#publicaciones" className={styles.enlace}>Conoce lo que estamos haciendo <span aria-hidden="true">↓</span></Link>
    </div>
    <div className={styles.iconos} aria-hidden="true">{iconos.map((Icono, i) => <Icono key={i} strokeWidth={1} />)}</div>
  </section>;
}
