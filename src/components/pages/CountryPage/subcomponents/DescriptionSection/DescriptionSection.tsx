import type { RegionType } from "~/src/utils/types";

interface DescriptionSectionProps {
  region: RegionType;
}

export const DescriptionSection = ({region}: DescriptionSectionProps) => (
  <section className="relative w-full bg-gradientLeft lg:mb-7">
    <div className="container pb-9 pt-6 lg:pb-[5.6rem] lg:pt-[4.5rem]">
      <h2 className="relative z-10 mb-6 text-center text-[2.5rem] font-bold leading-tight tracking-wider text-white lg:mb-10 lg:text-[5rem] lg:tracking-wide">
        Airports in {region.Country}
      </h2>
      <h3 className="mx-auto px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-4/6 lg:text-base lg:leading-8">
        Listed on this page are the best fares from all {region.Country} airports
        including international airports as well as domestic airports. Use
        Wego&apos;s airport directory to find the cheapest tickets from airports in
        other continents.
      </h3>
    </div>
  </section>
);
