import { iso1A2Code } from "@rapideditor/country-coder";
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
  id: number;
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
  id
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
            countryCode={iso1A2Code(country) || "US"}
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
      value: type
        ? `${type.substring(0, 1).toUpperCase()}${type.substring(
            1,
            type.length
          )}  Airport`
        : null,
      icon: <MarkerIcon className="w-5 text-redBg" />,
    },
    timezone: {
      value: timezone || null,
      icon: <ClockIcon />,
    },
    // hardcoded
  };
  return (
    <>
      <h2 className="w-full rounded-[0.4rem_0.4rem_0_0] bg-white px-3 pb-4 pt-1 text-lg font-bold tracking-wide lg:px-8 lg:pb-5 lg:pt-11 lg:text-3xl">
        {name}
      </h2>
      <div className="h-56 w-full bg-white px-3 lg:h-64 lg:px-8 lg:pb-6">
        <ClientMap
          position={[y, x]}
          mainMarkers={[[y, x]]}
          zoom={11}
          shouldRemap
        />
      </div>
      {Object.values(airportData).map((el, idx) => (
        <div
          className={clsx(
            "flex w-full items-center gap-3 bg-white px-3 lg:px-8",
            el.value && "border-b border-grayText py-[0.84rem] lg:py-5"
          )}
          key={idx}
        >
          {el.value && (
            <>
              {el.icon}
              <span>{el.value}</span>
            </>
          )}{" "}
        </div>
      ))}
      <div className="w-full rounded-[0_0_0.4rem_0.4rem] bg-white px-3 pb-4 pt-3 lg:px-8 lg:pb-7">
        <Link
          className="block w-full rounded-md bg-buttonBg py-3 text-center text-lg text-white"
          href={`/airport/${id}/${name.replaceAll(" ", "_").toLowerCase() || ""}`}
        >
          Explore airport
        </Link>
      </div>
    </>
  );
};
