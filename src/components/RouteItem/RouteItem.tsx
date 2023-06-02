import dynamic from "next/dynamic";
import { useMemo } from "react";
import { HourglassIcon, LuggageCar, MapIcon } from "~/src/assets";
import { ReactCountryFlag } from "react-country-flag";

interface RouteItemType {
  isFlyingRoute?: boolean;
}

export const RouteItem = ({ isFlyingRoute }: RouteItemType) => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );
  return (
    <div className="rounded-md bg-white px-3 py-3 shadow-sm lg:p-7">
      <div className="mb-2 flex flex-wrap gap-3 lg:mb-4 lg:flex-nowrap lg:gap-8">
        <div className="h-28 min-w-full overflow-hidden rounded-md lg:h-52 lg:min-w-[19.5rem]">
          <ClientMap position={[5, 5]} zoom={7.5} disabled shouldRemap isMuseum={!isFlyingRoute} />
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-wrap justify-between lg:mb-5">
            <div>
              <div className="flex text-lg font-bold lg:text-2xl">
                Bucharest to Brasov
              </div>
              <div className="mt-1 flex items-center tracking-tight lg:tracking-wider">
                Driving route from{" "}
                <div className="mx-1 h-3 w-4 lg:h-4 lg:w-6">
                  <ReactCountryFlag
                    countryCode={"ro"}
                    svg
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                Bucharest -
                <div className="mx-1 h-3 w-4 lg:h-4 lg:w-6">
                  <ReactCountryFlag
                    countryCode={"ro"}
                    svg
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                Brasov
              </div>
            </div>
          </div>
          <p className="mb-5 lg:mb-8 lg:text-[1.11rem] lg:leading-[1.9rem]">
            São Paulo/Guarulhos – Governor André Franco Montoro International
            Airport is the primary international airport serving São Paulo. São
            Paulo/Guarulhos – Governor André Franco...
          </p>
          <div className="flex flex-col gap-7 pb-4 lg:flex-row lg:gap-8">
            <div className="flex items-center gap-4 lg:text-lg">
              <MapIcon />
              161 km
            </div>
            <div className="flex items-center gap-4 lg:text-lg">
              <HourglassIcon />
              2h
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-2 hidden w-full border-b border-grayText opacity-50 lg:block" />
      <div className="flex flex-wrap items-center gap-6">
        <div className="w-full rounded-md bg-buttonBg py-3 text-center text-white lg:w-auto lg:px-9 lg:py-4 lg:text-lg">
          View more
        </div>
        <div className="flex w-full items-center justify-center gap-2 text-buttonBg lg:w-auto lg:justify-start">
          <LuggageCar />
          <p className="lg:text-lg">Airports near Otopeni Airport</p>
        </div>
        <div className="flex w-full items-center justify-center gap-2 text-buttonBg lg:ml-5 lg:w-auto lg:justify-start">
          <LuggageCar />
          <p className="lg:text-lg">Airports near London Heathrow Airport</p>
        </div>
      </div>
    </div>
  );
};
