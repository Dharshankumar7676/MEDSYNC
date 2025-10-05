"use client"

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type MarkerItem = {
  id: string
  name: string
  position: [number, number] // [lat, lng]
  type: "hospital" | "pharmacy" | "blood_bank"
  extra?: any
}

const icon = (color: string) =>
  new L.Icon({
    iconUrl: `/placeholder.svg?height=32&width=32&query=${color}-map-marker`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  })

export function LeafletMap({
  center = [12.9716, 77.5946],
  markers = [],
}: {
  center?: [number, number]
  markers: MarkerItem[]
}) {
  return (
    <div className="rounded-md border overflow-hidden">
      <MapContainer center={center} zoom={12} style={{ height: 320, width: "100%" }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              crossOrigin="anonymous"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {markers.map((m) => (
          <Marker
            key={m.id}
            position={m.position}
            icon={icon(m.type === "hospital" ? "blue" : m.type === "pharmacy" ? "green" : "red")}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-medium">{m.name}</div>
                {m.extra ? <pre className="text-xs mt-1">{JSON.stringify(m.extra, null, 2)}</pre> : null}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
