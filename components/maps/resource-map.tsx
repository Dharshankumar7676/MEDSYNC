"use client"

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

type Resource = {
  id: string
  type: "hospital" | "pharmacy" | "blood_bank" | "clinic"
  name: string
  address?: string
  latitude: number
  longitude: number
  distance_km?: number
}

const icon = new L.Icon({
  iconUrl: "/map-marker.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

export default function ResourceMap({ resources, center }: { resources: Resource[]; center: [number, number] }) {
  return (
    <MapContainer center={center} zoom={12} className="h-[420px] w-full rounded-md border" scrollWheelZoom={false}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            crossOrigin="anonymous"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {resources.map((r) => (
        <Marker key={r.id} position={[r.latitude, r.longitude]} icon={icon}>
          <Popup>
            <div className="text-sm">
              <div className="font-medium">{r.name}</div>
              <div className="text-muted-foreground">{r.address}</div>
              {r.distance_km !== undefined && <div>{r.distance_km.toFixed(1)} km away</div>}
              <div className="uppercase text-xs">{r.type}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
