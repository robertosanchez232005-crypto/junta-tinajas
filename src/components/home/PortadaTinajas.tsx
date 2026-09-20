import Image from "next/image";
import Link from "next/link";
import { Sun, Users, Home, Heart, Leaf, Bike, TreePine, MapPin } from "lucide-react";
import styles from "./PortadaTinajas.module.css";

// Fotografías exclusivas de la portada. No se consultan Noticias ni Supabase.
const fotografias = [
  { archivo: "tinajas-08.jpg", posicion: "50% 48%" },
  { archivo: "tinajas-03.jpg", posicion: "50% 48%" },
  { archivo: "tinajas-04.jpg", posicion: "50% 50%" },
  { archivo: "tinajas-06.jpg", posicion: "50% 50%" },
  { archivo: "tinajas-01.jpg", posicion: "50% 60%" },
  { archivo: "tinajas-05.jpg", posicion: "50% 50%" },
  { archivo: "tinajas-02.jpg", posicion: "50% 48%" },
  { archivo: "tinajas-07.jpg", posicion: "50% 55%" },
  { archivo: "tinajas-09.jpg", posicion: "50% 50%" },
];

export function PortadaTinajas() {
  const iconos = [Sun, Users, Home, Heart, Leaf, Bike, TreePine, MapPin];
  return <section className={styles.portada} aria-labelledby="titulo-portada">
    <div className={styles.fotos} aria-hidden="true">
      {fotografias.map((foto, i) => <div key={foto.archivo} className={styles.panel}>
        <Image
          src={"/images/portada/" + foto.archivo}
          alt=""
          fill
          sizes={i === 1 ? "(max-width: 700px) 33vw, 40vw" : "(max-width: 700px) 33vw, 20vw"}
          priority={i === 1}
          quality={70}
          className={styles.foto}
          style={{ objectPosition: foto.posicion }}
        />
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
