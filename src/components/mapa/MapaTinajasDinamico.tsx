"use client";

import dynamic from "next/dynamic";

// Este límite de cliente evita que Leaflet se importe durante el renderizado
// del servidor. Leaflet usa `window`, que solo existe en el navegador.
const MapaTinajas = dynamic(
  () => import("./MapaTinajas").then((modulo) => modulo.MapaTinajas),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[420px] animate-pulse rounded-xl bg-institucional-verdeClaro"
        role="status"
        aria-label="Cargando mapa de Las Tinajas"
      />
    ),
  }
);

export function MapaTinajasDinamico() {
  return <MapaTinajas />;
}
