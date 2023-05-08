import { MapContainer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { AirportItem } from "~/src/utils/types";
import { Map } from "./Map";

interface MapProps {
  position?: LatLngExpression;
  zoom?: number;
  airportsAround?: AirportItem[];
  setSelectedAirport?: (airport: AirportItem | null) => void;
  selectedAirport?: AirportItem | null;
  mainMarkers?: LatLngExpression[];
}

const MapContainerElement = ({
  position: defaultPosition,
  zoom,
  airportsAround,
  setSelectedAirport,
  selectedAirport,
  mainMarkers,
}: MapProps) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
      iconUrl: "leaflet/images/marker-icon.png",
      shadowUrl: "leaflet/images/marker-shadow.png",
    });
  }, []);

  const [position, setPosition] = useState(defaultPosition);

  return (
    <MapContainer center={defaultPosition} zoom={zoom} scrollWheelZoom={false}>
      <Map
        mainMarkers={mainMarkers}
        airportsAround={airportsAround}
        setSelectedAirport={setSelectedAirport}
        setPosition={setPosition}
        position={position}
        selectedAirport={selectedAirport}
      />
    </MapContainer>
  );
};

export default MapContainerElement;
