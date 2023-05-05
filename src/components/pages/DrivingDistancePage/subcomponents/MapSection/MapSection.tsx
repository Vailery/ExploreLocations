import dynamic from "next/dynamic";
import { useMemo } from "react";
import { MuseumMarkerIcon } from "~/src/assets";

export const MapSection = () => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );

  return (
    <section className="container mb-3 bg-white pt-3 lg:mb-4 lg:rounded-md lg:pt-4 lg:shadow-md">
      <h3 className="mb-2 px-3 text-lg font-bold tracking-wide lg:mb-7 lg:px-6 lg:text-3xl lg:tracking-wider">
        Bucharest to London Flight Duration & Distance
      </h3>
      <div className="relative">
        <div className="absolute right-3 top-9 z-30 w-[15.5rem] rounded-md bg-white p-5 lg:right-11 lg:top-[4.4rem] lg:h-[15rem] lg:w-[21rem]">
          <div className="mb-[1.3rem] flex items-center gap-3">
            <MuseumMarkerIcon className="w-10 text-redBg" />
            <div className="text-md font-bold leading-5 tracking-tight lg:text-lg">
              Bucharest to London
            </div>
          </div>
          <div className="leading-8 tracking-wider">
            The direct drive from <span className="font-bold">Beijin to Beppu</span> is <span className="font-bold">1285 mi (2067 km)</span>, and
            should have a drive time of <span className="font-bold">1 day 2 hours</span> in normal traffic.
          </div>
        </div>
        <div className="relative z-0 h-[29rem] w-full pb-6 lg:h-[31.5rem] lg:px-7">
          <ClientMap position={[2, 3]} zoom={14.5} />
        </div>
      </div>
    </section>
  );
};
