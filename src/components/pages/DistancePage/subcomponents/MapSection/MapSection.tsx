import dynamic from "next/dynamic";
import { useMemo } from "react";
import MarkerIcon from "~/src/assets/images/icons/marker.svg";

export const MapSection = () => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );

  return (
    <section className="container mb-3 lg:rounded-md bg-white pt-3 lg:pt-4 lg:shadow-md lg:mb-5">
      <h3 className="mb-2 px-3 text-lg font-bold tracking-wide lg:mb-7 lg:px-7 lg:text-3xl lg:tracking-wider">
        Bucharest to London Flight Duration & Distance
      </h3>
      <div className="relative">
        <div className="absolute right-3 top-9 z-30 w-[15.5rem] rounded-md bg-white p-4 lg:right-11 lg:top-[4.4rem] lg:h-[16rem] lg:w-[21rem]">
          <div className="mb-4 flex items-center gap-3">
            <MarkerIcon className="w-10 text-redBg" />
            <div className="text-md font-bold leading-5 tracking-tight lg:text-lg">
              Bucharest to London
            </div>
          </div>
          <div className="mb-4 leading-8 tracking-wider">
            Distance between <span className="font-bold">Bucharest</span> and{" "}
            <span className="font-bold">London</span> is 2,400 kilometers
          </div>
          <div className=" leading-8 tracking-wider">
            Average flight time is{" "}
            <span className="font-bold">3 hours 30 minutes</span>
          </div>
        </div>
        <div className="relative z-0 h-[29rem] w-full pb-6 lg:h-[30.5rem] lg:px-7">
          <ClientMap position={[2, 3]} zoom={14.5} />
        </div>
      </div>
    </section>
  );
};
