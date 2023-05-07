import dynamic from "next/dynamic";
import { useMemo } from "react";
import MarkerIcon from "~/src/assets/images/icons/marker.svg";

interface MapSectionProps {
  OriginCenterX: number;
  OriginCenterY: number;
  DestinationCenterX: number;
  DestinationCenterY: number;
  FlightDuration: string;
  LengthKm: number;
  OriginCityName: string;
  DestinationCityName: string;
}

export const MapSection = ({
  OriginCenterX,
  OriginCenterY,
  DestinationCenterX,
  DestinationCenterY,
  FlightDuration,
  LengthKm,
  OriginCityName,
  DestinationCityName,
}: MapSectionProps) => {
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
        {OriginCityName} to {DestinationCityName} Flight Duration & Distance
      </h3>
      <div className="relative">
        <div className="absolute right-3 top-9 z-30 w-[15.5rem] rounded-md bg-white p-4 lg:right-11 lg:top-[4.4rem] lg:h-[16rem] lg:w-[21rem]">
          <div className="mb-4 flex items-center gap-3">
            <MarkerIcon className="w-10 text-redBg" />
            <div className="text-md font-bold leading-5 tracking-tight lg:text-lg">
              {OriginCityName} to {DestinationCityName}
            </div>
          </div>
          <div className="mb-4 leading-8 tracking-wider">
            Distance between <span className="font-bold">{OriginCityName}</span> and{" "}
            <span className="font-bold">{DestinationCityName}</span> is {LengthKm} kilometers
          </div>
          <div className=" leading-8 tracking-wider">
            Average flight time is{" "}
            <span className="font-bold">{FlightDuration}</span>
          </div>
        </div>
        <div className="relative z-0 h-[29rem] w-full pb-6 lg:h-[30.5rem] lg:px-7">
          <ClientMap  zoom={14.5} />
        </div>
      </div>
    </section>
  );
};
