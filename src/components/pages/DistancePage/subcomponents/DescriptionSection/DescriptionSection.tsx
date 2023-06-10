import { MarkerIcon } from "~/src/assets";

interface DescriptionSectionProps {
  OriginCityName: string;
  DestinationCityName: string;
  OriginCountryName: string;
  DestinationCountryName: string;
  FlightDuration: string;
  DistanceKm: number;
  DistanceMiles: number;
}

export const DescriptionSection = ({
  OriginCityName,
  DestinationCityName,
  OriginCountryName,
  DestinationCountryName,
  FlightDuration,
  DistanceKm,
  DistanceMiles,
}: DescriptionSectionProps) => (
  <section className="relative mb-3 w-full bg-gradientLeft lg:mb-7">
    <div className="container pb-9 pt-7 lg:pb-[1.8rem] lg:pt-[3rem]">
      <h2 className="relative z-10 mb-9 text-center text-[2.5rem] font-bold leading-[2.7rem] tracking-wider text-white lg:mb-5 lg:text-[4.5rem] lg:leading-[5rem] lg:tracking-wide">
        {OriginCityName} to {DestinationCityName}
        <br />
        Flight Time
      </h2>
      <h3 className="mx-auto mb-8 px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-4/6 lg:text-base lg:leading-8">
        Explore how long is the flight time, distance, and route between{" "}
        {OriginCityName}, {OriginCountryName} and {DestinationCityName},{" "}
        {DestinationCountryName}
      </h3>
      <div className="relative mx-auto w-[93%] rounded-md bg-white px-2 pb-7 pt-4 lg:w-[63%] lg:px-6 lg:pb-5 lg:pt-7">
        <div className="mb-2 flex items-center justify-between">
          <div>From</div>
          <div>To</div>
        </div>
        <div className="mb-6 flex items-center justify-between lg:mb-4">
          <div className="font-bold lg:text-xl">{OriginCityName}</div>
          <div className="font-bold lg:text-xl">{DestinationCityName}</div>
        </div>
        <div className="dashed-border h-[1.5px] w-full" />
        <div className="mt-14 text-center lg:mt-12">
          {/* <h3 className="font-bold lg:text-xl">
            Average flight time is {FlightDuration}
          </h3> */}
          <h4 className="font-bold tracking-wider lg:mt-2">
            The flight time from {OriginCityName} to {DestinationCityName} is{" "}
            {FlightDuration}, and the distance is {DistanceKm} kilometers /{" "}
            {DistanceMiles} miles
          </h4>
        </div>
        <MarkerIcon className="absolute left-1/2 top-14 w-[4.2rem] -translate-x-1/2 text-redBg" />
      </div>
    </div>
  </section>
);
