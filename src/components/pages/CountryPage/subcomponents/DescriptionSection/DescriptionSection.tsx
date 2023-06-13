import type { AirportsCountType, RegionType } from "~/src/utils/types";

interface DescriptionSectionProps {
  region: RegionType;
  airportsCount: AirportsCountType;
}

export const DescriptionSection = ({
  region,
  airportsCount,
}: DescriptionSectionProps) => (
  <section className="relative w-full bg-gradientLeft lg:mb-7">
    <div className="container pb-9 pt-6 lg:pb-[5.6rem] lg:pt-[4.5rem]">
      <h2 className="relative z-10 mb-6 text-center text-[2.5rem] font-bold leading-tight tracking-wider text-white lg:mb-10 lg:text-[5rem] lg:tracking-wide">
        Airports in {region.Country}
      </h2>
      <h3 className="mx-auto px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-4/6 lg:text-base lg:leading-8">
        Explore all airports from {region.Country}, including the international,
        domestic and local ones. From airports with millions of passengers a
        year to small aerodromes, we have listed all of the on the map and on a
        list, in this guide. {region.Country} has {airportsCount.international}{" "}
        international airports, {airportsCount.domestic} domestic airports, and{" "}
        {airportsCount.local} small airports of local interest.
      </h3>
    </div>
  </section>
);
