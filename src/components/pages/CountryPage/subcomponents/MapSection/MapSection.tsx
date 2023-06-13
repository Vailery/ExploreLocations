import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { InfoIcon } from "~/src/assets";
import MarkerIcon from "~/src/assets/images/icons/marker.svg";
import type { AirportItem, RegionType } from "~/src/utils/types";

interface MapSectionProps {
  airports: AirportItem[];
  region: RegionType;
}

export const MapSection = ({ region, airports }: MapSectionProps) => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );

  const [currentAirport, setCurrentAirport] = useState<AirportItem | null>(
    null
  );

  const markersCenter = useMemo(() => {
    const coords = {
      lat: 0,
      lng: 0,
    };
    airports.forEach((el) => {
      coords.lat += el.CenterY;
      coords.lng += el.CenterX;
    });
    coords.lat = coords.lat / airports.length;
    coords.lng = coords.lng / airports.length;
    return coords;
  }, [airports]);

  return (
    <section className="container mb-6 rounded-md bg-white pt-6 shadow-md lg:mb-9">
      <h3 className="mb-2 px-3 text-lg font-bold tracking-wide lg:mb-7 lg:px-7 lg:text-3xl lg:tracking-wider">
        Map Of Airports In <span className="text-buttonBg">{region.Name}</span>
      </h3>
      <div className="relative">
        {currentAirport && (
          <div className="absolute right-3 top-11 z-30 w-[15.5rem] rounded-md bg-white p-4 lg:right-11 lg:top-6 lg:w-[21rem]">
            <div className="mb-6 flex items-center gap-3">
              <MarkerIcon className="w-10 text-redBg" />
              <div className="text-md font-bold leading-5 tracking-tight lg:text-lg">
                {currentAirport?.Name}
              </div>
            </div>
            {currentAirport?.SeoDescriptionEn && (
              <div className="flex items-start gap-3">
                <InfoIcon className="h-10 w-16" />
                <p className="leading-7 tracking-wider">
                  {currentAirport.SeoDescriptionEn.split(" ").length > 20
                    ? currentAirport.SeoDescriptionEn.split(" ")
                        .slice(0, 20)
                        .join(" ") + "..."
                    : currentAirport.SeoDescriptionEn}
                </p>
              </div>
            )}
            {/* <p className="leading-7 lg:leading-8">
            Willkommen am schönsten Seeufer Zürichs. Hier liegt eine maritime
            Welt für sich
          </p> */}
            <Link
              className="mt-4 block w-full rounded-md bg-buttonBg py-3 text-center text-lg text-white"
              href={`/airport/${currentAirport?.id || ''}/${
                currentAirport?.Name.replaceAll(" ", "_").toLowerCase() || ""
              }`}
            >
              Explore airport
            </Link>
          </div>
        )}
        <div className="relative z-0 h-[29rem] w-full pb-6 lg:h-[30.5rem] lg:px-7">
          <ClientMap
            position={markersCenter}
            setSelectedAirport={setCurrentAirport}
            airportsAround={airports}
            bounds={airports.map((el) => [el.CenterY, el.CenterX])}
            selectedAirport={currentAirport}
            shouldRemap
          />
        </div>
      </div>
    </section>
  );
};
