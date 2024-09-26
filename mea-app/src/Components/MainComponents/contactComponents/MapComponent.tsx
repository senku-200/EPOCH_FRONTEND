// components/MapComponent.tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapComponent: React.FC = () => {
  const position: LatLngExpression = [12.545536023207582, 78.33123018103262];

  useEffect(() => {}, []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="z-0"
      style={{ height: "300px", width: "600px"}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          GCEB
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
