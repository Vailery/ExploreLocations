import dynamic from "next/dynamic";
import { useMemo } from "react";

interface MapSectionProps {
  originX: number;
  originY: number;
  destinationX: number;
  destinationY: number;
  from: string;
  to: string;
  distance: number;
  distanceMiles: number;
  time: string;
}

export const MapSection = ({
  destinationX,
  destinationY,
  originX,
  originY,
  from,
  to,
  distance,
  distanceMiles,
  time,
}: MapSectionProps) => {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("~/src/components/shared/Map/MapContainer"), {
        ssr: false,
      }),
    []
  );

  const middleCoords = useMemo(() => {
    const srcLatRad = originY * (Math.PI / 180);
    const dstLatRad = destinationY * (Math.PI / 180);
    const middleLatRad = Math.atan(
      Math.sinh(
        Math.log(
          Math.sqrt(
            (Math.tan(dstLatRad) + 1 / Math.cos(dstLatRad)) *
              (Math.tan(srcLatRad) + 1 / Math.cos(srcLatRad))
          )
        )
      )
    );
    const middleLat = middleLatRad * (180 / Math.PI);
    const middleLng = (originX + destinationX) / 2;
    return {
      lat: middleLat,
      lng: middleLng,
    };
  }, [originX, originY, destinationX, destinationY]);

  return (
    <section className="container mb-3 bg-white pt-3 lg:mb-4 lg:rounded-md lg:pt-4 lg:shadow-md">
      <h3 className="mb-2 px-3 text-lg font-bold tracking-wide lg:mb-7 lg:px-6 lg:text-3xl lg:tracking-wider">
        {from} to {to} Flight Duration & Distance
      </h3>
      <div className="relative">
        {/* <div className="absolute right-3 top-9 z-30 w-[15.5rem] rounded-md bg-white p-5 lg:right-11 lg:top-[4.4rem] lg:h-[15rem] lg:w-[21rem]">
          <div className="mb-[1.3rem] flex items-center gap-3">
            <MuseumMarkerIcon className="w-10 text-redBg" />
            <div className="text-md font-bold leading-5 tracking-tight lg:text-lg">
              {from} to {to}
            </div>
          </div>
          <div className="leading-8 tracking-wider">
            The direct drive from{" "}
            <span className="font-bold">
              {from} to {to}
            </span>{" "}
            is{" "}
            <span className="font-bold">
              {distanceMiles} miles ({distance} km)
            </span>
            , and should have a drive time of{" "}
            <span className="font-bold">{time}</span> in normal traffic.
          </div>
        </div> */}
        <div className="relative z-0 h-[29rem] w-full pb-6 lg:h-[31.5rem] lg:px-7">
          <ClientMap
            position={middleCoords}
            mainMarkers={[
              [originY, originX],
              [destinationY, destinationX],
            ]}
            bounds={[
              [originY, originX],
              [destinationY, destinationX],
            ]}
            isMuseum
            isStatic
          />
        </div>
      </div>
    </section>
  );
};
