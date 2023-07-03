import { iso1A2Code } from "@rapideditor/country-coder";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  CityColoredIcon,
  ClockIcon,
  PassengersIcon,
  ArrowRightIcon,
} from "~/src/assets";
import type { CityType } from "~/src/utils/types";

interface AirportSectionProps {
  x: number;
  y: number;
  name: string;
  country: string;
  data: CityType | null;
}

export const AirportSection = ({
  x,
  y,
  country,
  name,
  data,
}: AirportSectionProps) => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );
  const airportData = {
    city: {
      value: "City",
      icon: <CityColoredIcon />,
    },
    population: {
      value: data?.Population ? `${data.Population} million` : null,
      icon: <PassengersIcon />,
    },
    country: {
      value: data?.Country || country,
      icon: (
        <div className="h-6 w-7">
          <ReactCountryFlag
            countryCode={iso1A2Code(data?.Country || country) || "US"}
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
      value: data ? (
        <span className="text-buttonBg">
          {"{Region here}"} / {data.Country}
        </span>
      ) : null,
      icon: <ArrowRightIcon />,
    },
    timezone: {
      value: "South East Asia / China, GMT +08:00 hours",
      icon: <ClockIcon />,
    },
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
          isMuseum
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
        <div
          className="block w-full rounded-md bg-buttonBg py-3 text-center text-lg text-white"
          // href={`/airport/${name.replaceAll(" ", "_").toLowerCase() || ""}`}
        >
          Explore city
        </div>
      </div>
    </>
  );
};
