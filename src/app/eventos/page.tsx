import { ListaPublicaciones } from "@/components/home/ListaPublicaciones";
export const dynamic = "force-dynamic";
export default function Pagina() { return <ListaPublicaciones tabla="eventos" titulo="Eventos" ruta="/eventos" />; }
