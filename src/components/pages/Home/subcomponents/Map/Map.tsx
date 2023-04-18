import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "~/src/assets/images/icons/marker.svg";
import ReactDOMServer from "react-dom/server";
import type { AirportItem } from "~/src/server/api/routers/airport";

interface MapProps {
  position: LatLngExpression;
  zoom?: number;
  airportsAround?: AirportItem[];
}

const Map = ({ position, zoom, airportsAround }: MapProps) => {
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

  const icon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="w-10 text-redBg" />
    ),
  });

  const secondaryIcon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <MarkerIcon className="w-10 text-grayColor" />
    ),
  });

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://api.stadiamaps.com/tz/lookup/v1/?api_key=f3730460-a3d1-4933-b30f-a3d60aa884aa">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {airportsAround &&
        airportsAround.map((airport, idx) => (
          <Marker
            key={idx}
            position={[airport.CenterY, airport.CenterX]}
            icon={secondaryIcon}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
