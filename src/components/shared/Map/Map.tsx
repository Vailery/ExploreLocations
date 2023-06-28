import {
  TileLayer,
  Marker,
  useMap,
  LayerGroup,
  Polyline,
  Polygon,
} from "react-leaflet";
import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "~/src/assets/images/icons/marker.svg";
import ReactDOMServer from "react-dom/server";
import type { AirportItem, GeometryType } from "~/src/utils/types";
import { MuseumMarkerIcon } from "~/src/assets";

interface MapProps {
  airportsAround?: AirportItem[];
  position?: LatLngExpression;
  mainMarkers?: LatLngExpression[];
  setSelectedAirport?: (airport: AirportItem | null) => void;
  setPosition: (position: LatLngExpression) => void;
  selectedAirport?: AirportItem | null;
  polyline?: LatLngExpression[];
  isMuseum?: boolean;
  bounds?: LatLngBoundsExpression;
  polygon?: GeometryType;
}

export const Map = ({
  airportsAround,
  position,
  mainMarkers,
  setSelectedAirport,
  setPosition,
  selectedAirport,
  polyline,
  isMuseum,
  bounds,
  polygon,
}: MapProps) => {
  const icon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="h-20 w-20 -translate-x-1/2 -translate-y-[90%] text-redBg" />
    ),
  });

  const internationalIcon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="h-12 w-12 -translate-x-1/2 -translate-y-full text-redBg" />
    ),
  });
  const domesticIcon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="h-12 w-12 -translate-x-1/2 -translate-y-full text-buttonBg" />
    ),
  });
  const localIcon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="h-12 w-12 -translate-x-1/2 -translate-y-full text-grayColor" />
    ),
  });
  const internationalSelectedIcon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="h-16 w-16 -translate-x-1/2 -translate-y-full text-redBg" />
    ),
  });
  const domesticSelectedIcon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="h-16 w-16 -translate-x-1/2 -translate-y-full text-buttonBg" />
    ),
  });
  const localSelectedIcon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="h-16 w-16 -translate-x-1/2 -translate-y-full text-grayColor" />
    ),
  });
  const museumIcon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MuseumMarkerIcon className="-translate-x-1/2 -translate-y-full" />
    ),
  });

  const map = useMap();

  useEffect(() => {
    if (position) {
      map.panTo(position);
    }
  }, [position, map]);

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
      map.panBy([0, -7]);
    }
  }, [bounds, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://api.stadiamaps.com/tz/lookup/v1/?api_key=f3730460-a3d1-4933-b30f-a3d60aa884aa">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
      />
      {polygon && <Polygon positions={polygon.coordinates} color={"green"} />}
      {mainMarkers &&
        mainMarkers.map((el, idx) => (
          <Marker key={idx} position={el} icon={isMuseum ? museumIcon : icon} />
        ))}
      {polyline && (
        <Polyline positions={polyline} pathOptions={{ color: "#EC3343" }} />
      )}
      <LayerGroup>
        {airportsAround &&
          airportsAround.map((airport, idx) => (
            <Marker
              key={idx}
              position={[airport.CenterY, airport.CenterX]}
              icon={
                airport === selectedAirport
                  ? airport.Type.toLowerCase() === "international"
                    ? internationalSelectedIcon
                    : airport.Type.toLowerCase() === "domestic"
                    ? domesticSelectedIcon
                    : localSelectedIcon
                  : airport.Type.toLowerCase() === "international"
                  ? internationalIcon
                  : airport.Type.toLowerCase() === "domestic"
                  ? domesticIcon
                  : localIcon
              }
              eventHandlers={{
                click: () => {
                  setSelectedAirport && setSelectedAirport(airport);
                  setPosition({ lng: airport.CenterX, lat: airport.CenterY });
                },
              }}
            />
          ))}
      </LayerGroup>
    </>
  );
};
