import dynamic from "next/dynamic";
import { useMemo } from "react";
import { InfoIcon, MarkersIcon } from "~/src/assets";
import MarkerIcon from "~/src/assets/images/icons/marker.svg";

export const MapSection = () => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("../Map/Map"), {
        ssr: false,
      }),
    []
  );

  return (
    <section className="container mb-6 rounded-md bg-white pt-6 shadow-md lg:mb-9">
      <h3 className="mb-2 px-3 text-lg font-bold tracking-wide lg:mb-7 lg:px-7 lg:text-3xl lg:tracking-wider">
        Airports in <span className="text-buttonBg">South America</span>
      </h3>
      <div className="relative">
        <div className="absolute right-3 top-11 z-30 w-[15.5rem] rounded-md bg-white p-4 lg:right-11 lg:top-6 lg:h-[21rem] lg:w-[21rem]">
          <div className="mb-6 flex items-center gap-3">
            <MarkerIcon className="w-10 text-redBg" />
            <div className="text-md font-bold leading-5 tracking-tight lg:text-lg">
              Bern Airport
            </div>
          </div>
          <div className="mb-5 flex items-start gap-3">
            <MarkersIcon className="h-7 w-7" />
            <p className="leading-7 tracking-wider">
              <span className="font-bold">240km</span> away from Zurich Kloten
              Airport
            </p>
          </div>
          <div className="flex items-start gap-3">
            <InfoIcon className="h-7 w-10" />
            <p className="leading-7 tracking-wider">
              Willkommen am schönsten Seeufer Zürichs. Hier liegt eine maritime
              Welt für sich
            </p>
          </div>
          {/* <p className="leading-7 lg:leading-8">
            Willkommen am schönsten Seeufer Zürichs. Hier liegt eine maritime
            Welt für sich
          </p> */}
          <button className="mt-4 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
            View distance
          </button>
        </div>
        <div className="relative z-0 h-[29rem] w-full pb-6 lg:h-[30.5rem] lg:px-7">
          <ClientMap position={[2, 4]} zoom={14.5} />
        </div>
      </div>
    </section>
  );
};
