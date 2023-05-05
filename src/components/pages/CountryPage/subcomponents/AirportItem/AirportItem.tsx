import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AirportsIcon,
  DirectionIcon,
  FlagIcon,
  IATAIcon,
  MarkerIcon,
  PassengersIcon,
  PlaneImageSlider,
  UsaFlag,
} from "~/src/assets";
import type { AirportItem as AirportItemType } from "~/src/utils/types";

interface AirportItemProps {
  data: AirportItemType;
}

export const AirportItem = ({ data }: AirportItemProps) => {
  const router = useRouter();

  return (
    <div className="rounded-md bg-white px-3 py-5 shadow-sm lg:p-7">
      <div className="flex flex-wrap gap-1 lg:flex-nowrap lg:gap-5">
        <Image
          src={PlaneImageSlider}
          alt="Airport"
          className="h-32 min-w-full lg:min-w-[19.5rem]"
        />
        <div>
          <div
            className="mb-3 flex w-full flex-wrap justify-between"
            onClick={() => {
              void router.push(
                `/airports/${data.Name.replaceAll(" ", "-").toLowerCase()}`
              );
            }}
          >
            <h3 className="flex text-2xl font-bold">
              <MarkerIcon className={"h-10 w-10 text-redBg"} />
              {data.Name}
            </h3>
            <div className="ml-8 flex gap-2 lg:ml-0">
              <UsaFlag className="h-7" />
            </div>
          </div>
          <p className="mb-4 leading-[1.9rem] lg:mb-9 lg:px-2 lg:text-[1.11rem]">
            São Paulo/Guarulhos – Governor André Franco Montoro International
            Airport is the primary international airport serving São Paulo.
          </p>
          <div className="flex flex-col gap-2 pb-4 lg:flex-row lg:gap-11 lg:px-2">
            <div className="flex items-center gap-3 border-b border-grayText text-lg lg:border-0">
              <DirectionIcon />
              Romania - Bucuresti
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
        <button className="w-full rounded-md bg-buttonBg py-3 text-lg text-white lg:w-auto lg:px-9 lg:py-4">
          View More
        </button>
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
