import clsx from "clsx";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import {
  CityColoredIcon,
  ClockIcon,
  DirectionIcon,
  IATAIcon,
  MarkerIcon,
  UsaFlag,
} from "~/src/assets";

export const AirportSection = () => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );
  const airportData = {
    name: {
      value: "Bucharest Airport",
      icon: <DirectionIcon />,
    },
    city: {
      value: "Bucharest, Ilfov",
      icon: <CityColoredIcon />,
    },
    country: {
      value: "Romania",
      icon: <UsaFlag className="w-6" />,
    },
    iata: {
      value: "IATA Code: OTP",
      icon: <IATAIcon />,
    },
    type: {
      value: "International Airport",
      icon: <MarkerIcon className="w-5 text-redBg" />,
    },
    timezone: {
      value: "Europe/Bucharest, GMT +2:00 hours",
      icon: <ClockIcon />,
    },
  };
  return (
    <div className="rounded-md bg-white lg:px-8 px-3 pt-1 lg:pt-11 pb-4 lg:pb-7 lg:w-1/2 w-full">
      <h2 className="lg:mb-5 mb-4 text-lg lg:text-3xl font-bold tracking-wide">
        Henry Coanda International Airport
      </h2>
      <div className="lg:mb-6 lg:h-64 h-56 w-full">
        <ClientMap position={[2, 3]} zoom={14.5} />
      </div>
      {Object.values(airportData).map((el, idx) => (
        <div
          className={clsx(
            "flex items-center gap-3 lg:py-5 py-[0.84rem]",
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
