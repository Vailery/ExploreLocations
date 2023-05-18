import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import {
  AirportsIcon,
  DirectionIcon,
  FlagIcon,
  IATAIcon,
  MarkerIcon,
  PassengersIcon,
} from "~/src/assets";
import type { AirportItem as AirportItemType } from "~/src/utils/types";
import { ReactCountryFlag } from "react-country-flag";

interface AirportItemProps {
  data: AirportItemType;
  countryCode: string;
}

export const AirportItem = ({ data, countryCode }: AirportItemProps) => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );
console.log(countryCode.substring(0, 1));

  return (
    <div className="rounded-md bg-white px-3 py-5 shadow-sm lg:p-7">
      <div className="flex flex-wrap gap-1 lg:flex-nowrap lg:gap-5">
        <div className="h-52 lg:min-w-[19.5rem]">
          <ClientMap
            position={[data.CenterY, data.CenterX]}
            airportsAround={[data]}
            zoom={5.5}
            disabled
            isStatic
          />
        </div>
        <div className="w-full">
          <div className="mb-3 flex flex-wrap justify-between">
            <h3 className="flex text-2xl font-bold">
              <MarkerIcon
                className={clsx(
                  "h-10 w-10 ",
                  data.Type.toLowerCase() === "international"
                    ? "text-redBg"
                    : data.Type.toLowerCase() === "domestic"
                    ? "text-buttonBg"
                    : "text-grayColor"
                )}
              />
              {data.Name}
            </h3>
            <div className="flex gap-2">
              <div className="h-7 w-9 overflow-hidden rounded-md">
                <ReactCountryFlag
                  countryCode={countryCode.substring(0, 2)}
                  svg
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          </div>
          <p className="mb-4 leading-[1.9rem] lg:mb-9 lg:px-2 lg:text-[1.11rem]">
            {data.SeoDescriptionEn.split(" ").length > 20
              ? data.SeoDescriptionEn.split(" ").slice(0, 20).join(" ") + "..."
              : data.SeoDescriptionEn}
          </p>
          <div className="flex flex-col gap-2 pb-4 lg:flex-row lg:gap-11 lg:px-2">
            <div className="flex items-center gap-3 border-b border-grayText text-lg lg:border-0">
              <DirectionIcon />
              Romania - Bucuresti 
              {/* hardcoded */}
            </div>
            <div className="flex items-center gap-3 border-b border-grayText text-lg lg:border-0">
              <MarkerIcon
                className={clsx(
                  "h-6 w-5",
                  data.Type.toLowerCase() === "international"
                    ? "text-redBg"
                    : data.Type.toLowerCase() === "domestic"
                    ? "text-buttonBg"
                    : "text-grayColor"
                )}
              />
              {data.Type}
            </div>
            {data.IATA && (
              <div className="flex items-center gap-3 border-b border-grayText text-lg lg:border-0">
                <IATAIcon />
                {data.IATA}
              </div>
            )}
            {data.Passengers && (
              <div className="flex items-center gap-3 text-lg">
                <PassengersIcon />
                {data.Passengers}
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="mt-4 hidden w-full border-b border-grayText opacity-50 lg:block" />
      <div className="mt-4 flex flex-wrap items-center gap-6">
        <Link
          className="w-full rounded-md bg-buttonBg py-3 text-lg text-white lg:w-auto lg:px-9 lg:py-4"
          href={`/airports/${
            data?.Name.replaceAll(" ", "-").toLowerCase() || ""
          }`}
        >
          Explore airport
        </Link>
        <div className="flex items-center gap-2 text-buttonBg">
          <FlagIcon className="h-4" />
          <p className="lg:text-lg">View Flying routes</p>
        </div>
        <div className="flex items-center gap-2 text-buttonBg lg:ml-5">
          <AirportsIcon className="h-4" />
          <p className="lg:text-lg">View Airports near</p>
        </div>
      </div>
    </div>
  );
};
