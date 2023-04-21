import clsx from "clsx";
import dynamic from "next/dynamic";
import { InfoIcon, MarkersIcon } from "~/src/assets";
import MarkerIcon from "~/src/assets/images/icons/marker.svg";
import type { AirportItem } from "~/src/server/api/routers/airport";

interface AirportsAroundSectionProps {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  airportsAround: AirportItem[];
}

export const AirportsAroundSection = ({
  name,
  position,
  airportsAround,
}: AirportsAroundSectionProps) => {
  const ClientMap = dynamic(() => import("../Map/Map"), {
    ssr: false,
  });

  return (
    <section className="container mb-5 bg-white pb-6 pt-3 lg:rounded-md lg:px-7 lg:pb-0 lg:pt-6">
      <h3 className="px-3 text-lg font-bold tracking-wide lg:text-3xl lg:tracking-wider">
        Airports near <span className="text-buttonBg">{name}</span>
      </h3>
      <div className="relative mt-3 h-[29.6rem] w-full lg:mb-6 lg:mt-6">
        <div className="relative z-0 h-full">
          <ClientMap
            position={position}
            zoom={9}
            airportsAround={airportsAround}
          />
        </div>
        <div className="right-5 top-7 z-10 hidden w-[20.8rem] rounded-md bg-white p-4 lg:absolute">
          <div className="mb-4 flex items-center gap-3">
            <MarkerIcon className="w-10 text-redBg" />
            <div className="text-lg font-bold leading-5 tracking-tight">
              Bern Airport
            </div>
          </div>
          <div className="mb-5 flex items-start gap-3">
            <MarkersIcon className="h-6 w-6" />
            <p className="leading-7 tracking-wider">
              <span className="font-bold">240km</span> away from Zurich Kloten
              Airport
            </p>
          </div>
          <div className="flex items-start gap-3">
            <InfoIcon className="h-6 w-6" />
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
      <div className="grid grid-rows-5 gap-x-20 px-3 pb-4 lg:grid-cols-2">
        {airportsAround.map((el, index) => (
          <p
            key={index}
            className={clsx(
              "pt-4 lg:text-xl lg:tracking-tighter",
              index !== airportsAround.length - 2 &&
                index !== airportsAround.length - 1 &&
                "border-b border-grayBg py-4"
            )}
          >
            <span className="text-buttonBg">{el.Name}</span> ({el.Distance} km
            away)
          </p>
        ))}
      </div>
    </section>
  );
};
