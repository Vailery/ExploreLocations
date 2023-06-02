import dynamic from "next/dynamic";
import { useMemo } from "react";
import { AirportsIcon, FlagIcon, HourglassIcon, LuggageCar, MapIcon } from "~/src/assets";
import { ReactCountryFlag } from "react-country-flag";

export const RouteItem = () => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );
  return (
    <div className="rounded-md bg-white px-3 py-4 shadow-sm lg:p-7">
      <div className="mb-4 flex flex-wrap gap-3 lg:flex-nowrap lg:gap-8">
        <div className="h-52 min-w-full lg:min-w-[19.5rem]">
          <ClientMap position={[5, 5]} zoom={7.5} disabled shouldRemap />
        </div>
        <div className="w-full">
          <div className="mb-5 flex flex-wrap justify-between">
            <div>
              <div className="flex text-2xl font-bold">Bucharest to Brasov</div>
              <div className="mt-1 flex items-center tracking-wider">
                Driving route from{" "}
                <div className="mx-1 h-4 w-6">
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
                <div className="mx-1 h-4 w-6">
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
            <div className="h-7 w-9 overflow-hidden rounded-md">
              <ReactCountryFlag
                countryCode={"US"}
                svg
                alt={"us"}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <p className="mb-4 leading-[1.9rem] lg:mb-8 lg:text-[1.11rem]">
            São Paulo/Guarulhos – Governor André Franco Montoro International
            Airport is the primary international airport serving São Paulo. São
            Paulo/Guarulhos – Governor André Franco...
          </p>
          <div className="flex flex-col gap-2 pb-4 lg:flex-row lg:gap-8">
            <div className="flex items-center gap-2 border-b border-grayText text-lg lg:border-0">
              <MapIcon />
              161 km
              {/* hardcoded */}
            </div>
            <div className="flex items-center gap-2 border-b border-grayText text-lg lg:border-0">
              <HourglassIcon />
              2h
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-2 hidden w-full border-b border-grayText opacity-50 lg:block" />
      <div className="flex flex-wrap items-center gap-6">
        <div className="w-full rounded-md bg-buttonBg py-3 text-center text-lg text-white lg:w-auto lg:px-9 lg:py-4">
          View more
        </div>
        <div className="flex items-center text-buttonBg">
          <LuggageCar />
          <p className="lg:text-lg">Airports near Otopeni Airport</p>
        </div>
        <div className="flex items-center gap-2 text-buttonBg lg:ml-5">
          <LuggageCar />
          <p className="lg:text-lg">Airports near London Heathrow Airport</p>
        </div>
      </div>
    </div>
  );
};
