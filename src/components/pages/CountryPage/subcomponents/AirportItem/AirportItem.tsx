import Image from "next/image";
import {
  AirportsIcon,
  DirectionIcon,
  FlagIcon,
  JosIcon,
  MarkerIcon,
  PassengersIcon,
  PlaneImageSlider,
  UsaFlag,
} from "~/src/assets";

export const AirportItem = () => {
  return (
    <div className="rounded-md bg-white px-3 py-5 shadow-sm lg:p-7">
      <div className="flex lg:flex-nowrap flex-wrap gap-1 lg:gap-5">
        <Image
          src={PlaneImageSlider}
          alt="Airport"
          className="h-32 min-w-full lg:min-w-[19.5rem]"
        />
        <div>
          <div className="mb-3 flex w-full flex-wrap justify-between">
            <h3 className="flex text-2xl font-bold">
              <MarkerIcon className="h-10 w-10 text-redBg" />
              Buenos Aires Ministro Pistrani Airport
            </h3>
            <div className="ml-8 flex gap-2 lg:ml-0">
              <UsaFlag className="h-7" />
              <UsaFlag className="h-7" />
            </div>
          </div>
          <p className="mb-4 leading-[1.9rem] lg:mb-9 lg:px-2 lg:text-[1.11rem]">
            São Paulo/Guarulhos – Governor André Franco Montoro International
            Airport is the primary international airport serving São Paulo.
          </p>
          <div className="flex flex-col lg:gap-11 gap-2 lg:px-2 lg:flex-row">
            <div className="flex items-center gap-3 border-b border-grayText text-lg pb-4 lg:border-0">
              <DirectionIcon />
              Romania - Bucuresti
            </div>
            <div className="flex items-center gap-3 border-b border-grayText text-lg pb-4 lg:border-0">
              <MarkerIcon className="h-6 w-5 text-redBg" />
              International
            </div>
            <div className="flex items-center gap-3 border-b border-grayText text-lg pb-4 lg:border-0">
              <JosIcon />
              JOS
            </div>
            <div className="flex items-center gap-3 text-lg">
              <PassengersIcon />
              80,886,589
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-4 w-full lg:block hidden border-b border-grayText opacity-50" />
      <div className="mt-4 flex flex-wrap items-center gap-6">
        <button className="rounded-md bg-buttonBg lg:px-9 lg:py-4 py-3 lg:w-auto w-full text-lg text-white">
          View More
        </button>
        <div className="flex items-center gap-2 text-buttonBg">
          <FlagIcon className="h-4" />
          <p className="lg:text-lg">View Flying routes</p>
        </div>
        <div className="lg:ml-5 flex items-center gap-2 text-buttonBg">
          <AirportsIcon className="h-4" />
          <p className="lg:text-lg">View Airports near</p>
        </div>
      </div>
    </div>
  );
};
