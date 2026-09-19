import { DetallePublicacion } from "@/components/home/DetallePublicacion";
export const dynamic = "force-dynamic";
export default function Pagina({ params }: { params: { id: string } }) { return <DetallePublicacion tabla="convocatorias" id={params.id} ruta="/avisos-de-compra" />; }
