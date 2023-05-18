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

interface AirportSectionProps {
  x: number;
  y: number;
  name: string;
  country: string;
}

export const AirportSection = ({
  x,
  y,
  country,
  name,
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
    passengers: {
      value: "21.54 million",
      icon: <PassengersIcon />,
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
      value: <span className="text-buttonBg">South East Asia / China</span>,
      icon: <ArrowRightIcon />,
    },
    timezone: {
      value: "South East Asia / China, GMT +08:00 hours",
      icon: <ClockIcon />,
    },
  };
  return (
    <div className="w-full rounded-md bg-white px-3 pb-4 pt-1 lg:w-1/2 lg:px-5 lg:pb-7 lg:pt-11">
      <h2 className="mb-4 text-lg font-bold tracking-wide lg:mb-5 lg:text-3xl">
        {name}
      </h2>
      <div className="h-56 w-full lg:h-64">
        <ClientMap position={[y, x]} mainMarkers={[[y, x]]} zoom={14.5} />
      </div>
      {Object.values(airportData).map((el, idx) => (
        <div
          className={clsx(
            "flex items-center gap-3 py-[0.84rem] lg:py-[1.1rem]",
            Object.values(airportData).length !== idx + 1 &&
              "border-b border-grayText"
          )}
          key={idx}
        >
          {el.icon}
          <span>{el.value}</span>
        </div>
      ))}
      <button className="mt-3 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
        View More
      </button>
    </div>
  );
};
