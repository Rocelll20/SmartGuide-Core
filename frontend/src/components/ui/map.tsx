import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

// Use the classic Leaflet pinpoint shape, but load the RED version!
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export interface MapMarker {
  id: number | string;
  pos: LatLngExpression;
  name: string;
  device: string;
}

interface MapProps {
  posix: LatLngExpression;
  zoom?: number;
  markers?: MapMarker[];
}

const Map = ({ posix, zoom = 13, markers = [] }: MapProps) => {
  // Fallback just in case markers haven't loaded yet from the Dashboard
  const displayMarkers = markers.length > 0 ? markers : [
    { id: 'default', pos: posix, name: "Active Station", device: "Device #882-Alpha" }
  ];

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={true}
      className="h-full w-full relative z-0"
    >
      {/* Back to the normal, bright default OpenStreetMap! */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Render all the scattered markers */}
      {displayMarkers.map((marker) => (
        <Marker key={marker.id} position={marker.pos} icon={redIcon}>
          <Popup>
            <div className="text-sm font-sans">
              <p className="font-bold text-red-600">{marker.name}</p>
              <p className="text-slate-600">{marker.device}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;