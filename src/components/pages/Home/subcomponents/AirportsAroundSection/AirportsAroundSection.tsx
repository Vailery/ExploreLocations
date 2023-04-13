import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { InfoIcon, MarkerIcon, MarkersIcon } from "~/src/assets";

export const AirportsAroundSection = () => {
  const ClientMap = dynamic(() => import("../Map/Map"), {
    ssr: false,
  });

  return (
    <section className="container mb-5 rounded-md bg-white px-7 pt-6">
      <h3 className="text-3xl font-bold tracking-wider">
        Airports near{" "}
        <span className="text-buttonBg">Zurich Kloten Airport</span>
      </h3>
      <div className="relative mb-6 mt-6 h-[29.6rem] w-full">
        <div className="relative z-0 h-full">
          <ClientMap
            position={{
              lat: 47.464722,
              lng: 8.549167,
            }}
            zoom={9}
          />
        </div>
        <div className="absolute right-5 top-7 z-10 w-[20.8rem] rounded-md bg-white p-4">
          <div className="mb-4 flex items-center gap-3">
            <Image src={MarkerIcon} alt="" className="w-10" />
            <div className="text-lg font-bold leading-5 tracking-tight">
              Bern Airport
            </div>
          </div>
          <div className="mb-5 flex items-start gap-3">
            <Image src={MarkersIcon} alt="" className="h-6 w-6" />
            <p className="leading-7 tracking-wider">
              <span className="font-bold">240km</span> away from Zurich Kloten
              Airport
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Image src={InfoIcon} alt="" className="h-6 w-6" />
            <p className="leading-7 tracking-wider">
              Willkommen am schönsten Seeufer Zürichs. Hier liegt eine maritime
              Welt für sich
            </p>
          </div>
          <button className="mt-4 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
            Learn more
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-5 gap-x-20">
        {new Array(10).fill(0).map((_, index) => (
          <p
            key={index}
            className={clsx(
              "pt-4 text-xl tracking-tighter",
              index !== 8 && index !== 9 && "border-b border-grayBg py-4"
            )}
          >
            <span className="text-buttonBg">Otopeni Airport</span> (1,230 km
            away)
          </p>
        ))}
      </div>
    </section>
  );
};
