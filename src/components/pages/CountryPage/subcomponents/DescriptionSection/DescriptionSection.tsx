import type { AirportsCountType, RegionType } from "~/src/utils/types";

interface DescriptionSectionProps {
  region: RegionType;
  airportsCount: AirportsCountType;
  country: string;
}

export const DescriptionSection = ({
  region,
  airportsCount,
  country,
}: DescriptionSectionProps) => (
  <section className="relative w-full bg-gradientLeft lg:mb-7">
    <div className="container pb-9 pt-6 lg:pb-[5.6rem] lg:pt-[4.5rem]">
      <h2 className="relative z-10 mb-6 text-center text-[2.5rem] font-bold leading-tight tracking-wider text-white lg:mb-10 lg:text-[5rem] lg:tracking-wide">
        {region.Type === "country" ? (
          <>Airports in {region.Name}</>
        ) : (
          <>
            Airports in and near {region.Name}, {country}
          </>
        )}
      </h2>
      <h3 className="mx-auto px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-4/6 lg:text-base lg:leading-8">
        Explore all airports{" "}
        {region.Type === "country" ? "from" : "in and around"} {country},
        including the international, domestic and local ones. From airports with
        millions of passengers a year to small aerodromes, we have listed all of
        the on the map and on a list, in this guide.
      </h3>
      <h3 className="mx-auto mt-4 px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-4/6 lg:text-base lg:leading-8">
        {region.Type === "country"
          ? `${country} has`
          : `In and around ${region.Name} there are`}
        {airportsCount.international ? (
          <>
            {" "}
            {airportsCount.international} international airports
            {airportsCount.international &&
            (airportsCount.domestic || airportsCount.local)
              ? ","
              : ""}
          </>
        ) : (
          ""
        )}
        {airportsCount.domestic ? (
          <>
            {" "}
            {airportsCount.domestic} domestic airports
            {airportsCount.domestic && airportsCount.local ? ", and" : ""}
          </>
        ) : (
          ""
        )}
        {airportsCount.local ? (
          <> {airportsCount.local} small airports of local interest</>
        ) : (
          ""
        )}
        .
      </h3>
    </div>
  </section>
);
