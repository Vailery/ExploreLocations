import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  CityColoredIcon,
  ClockIcon,
  DirectionIcon,
  IATAIcon,
  MarkerIcon,
} from "~/src/assets";

interface AirportSectionProps {
  name: string;
  city: string;
  country: string;
  iata: string;
  x: number;
  y: number;
  timezone?: string;
  type?: string;
  // countryCode: string;
}

export const AirportSection = ({
  name,
  city,
  country,
  iata,
  x,
  y,
  timezone,
  type,
}: AirportSectionProps) => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );
  const airportData = {
    name: {
      value: name,
      icon: <DirectionIcon />,
    },
    city: {
      value: city,
      icon: <CityColoredIcon />,
    },
    country: {
      value: country,
      icon: (
        <div className="h-6 w-7">
          <ReactCountryFlag
            countryCode={"US"}
            svg
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      ),
    },
    iata: {
      value: `IATA Code: ${iata}`,
      icon: <IATAIcon />,
    },
    type: {
      value: type ? `${type} Airport` : null,
      icon: <MarkerIcon className="w-5 text-redBg" />,
    },
    timezone: {
      value: timezone || null,
      icon: <ClockIcon />,
    },
    // hardcoded
  };
  return (
    <div className="w-full rounded-md bg-white px-3 pb-4 pt-1 lg:w-1/2 lg:px-8 lg:pb-7 lg:pt-11">
      <h2 className="mb-4 text-lg font-bold tracking-wide lg:mb-5 lg:text-3xl">
        {name}
      </h2>
      <div className="h-56 w-full lg:mb-6 lg:h-64">
        <ClientMap position={[y, x]} mainMarkers={[[y, x]]} zoom={8} />
      </div>
      {Object.values(airportData).map(
        (el, idx) =>
          el.value && (
            <div
              className={clsx(
                "flex items-center gap-3 py-[0.84rem] lg:py-5",
                Object.values(airportData).length !== idx + 1 &&
                  "border-b border-grayText"
              )}
              key={idx}
            >
              {el.icon}
              <span>{el.value}</span>
            </div>
          )
      )}
      <Link
        className="mt-3 block w-full rounded-md bg-buttonBg py-3 text-center text-lg text-white"
        href={`/airports/${name.replaceAll(" ", "_") || ""}`}
      >
        Explore airport
      </Link>
    </div>
  );
};
