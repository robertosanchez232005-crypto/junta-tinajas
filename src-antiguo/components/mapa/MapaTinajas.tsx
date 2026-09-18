"use client";

// Componente aislado y fácil de actualizar: cuando llegue el archivo GeoJSON
// oficial de límites territoriales, colócalo en /public/geo/limite-tinajas.geojson
// y cambia `limiteDisponible` a true (o, mejor, detecta el archivo en tiempo de
// build). Mientras tanto se muestra un aviso claro de "pendiente de validación".

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Coordenada aproximada de Las Tinajas, Dolega, Chiriquí — SOLO para centrar el
// mapa inicialmente. No representa un límite oficial. Ajustar si se dispone de
// una coordenada exacta de la sede de la Junta Comunal.
const CENTRO_APROXIMADO: [number, number] = [8.65, -82.45];

const limiteDisponible = false; // cambiar a true cuando exista el GeoJSON oficial

export function MapaTinajas() {
  const [geojson, setGeojson] = useState<GeoJSON.GeoJsonObject | null>(null);

  useEffect(() => {
    if (!limiteDisponible) return;
    fetch("/geo/limite-tinajas.geojson")
      .then((r) => r.json())
      .then(setGeojson)
      .catch(() => setGeojson(null));
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      {!limiteDisponible && (
        <div className="bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <strong>Límite territorial pendiente de validación.</strong> Este mapa
          muestra únicamente una ubicación de referencia. El polígono oficial de
          Las Tinajas debe cargarse en{" "}
          <code className="rounded bg-amber-100 px-1">/public/geo/limite-tinajas.geojson</code>{" "}
          una vez que la Junta Comunal lo suministre.
        </div>
      )}
      <MapContainer
        center={CENTRO_APROXIMADO}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "420px", width: "100%" }}
        aria-label="Mapa de referencia de Las Tinajas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribuidores'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={CENTRO_APROXIMADO}>
          <Popup>
            <strong>Las Tinajas</strong>
            <br />
            Distrito de Dolega
            <br />
            Provincia de Chiriquí
          </Popup>
        </Marker>
        {geojson && (
          <GeoJSON
            data={geojson}
            style={{ color: "#1F5D3A", weight: 2, fillColor: "#1F5D3A", fillOpacity: 0.15 }}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(
                `<strong>${feature.properties?.nombre ?? "Las Tinajas"}</strong><br/>Distrito de Dolega<br/>Provincia de Chiriquí`
              );
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
