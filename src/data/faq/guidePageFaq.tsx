import Link from "next/link";
import type { AirportItem, FaqType, RegionType } from "~/src/utils/types";

interface getFaqCountryDataProps {
  region: RegionType;
  airportsInRegion: AirportItem[];
  airportAroundRegion: AirportItem[];
  mostPopularAirport?: AirportItem;
  closestAirport?: AirportItem;
}

export const getFaqCountryData = ({
  region,
  airportsInRegion,
  airportAroundRegion,
  mostPopularAirport,
  closestAirport,
}: getFaqCountryDataProps): (FaqType | null)[] => [
  airportsInRegion || airportAroundRegion
    ? {
        question: `
    How many international airports are ${
      region.Type === "country" || region.Type === "continent"
        ? "in or near"
        : "in"
    } ${region.Name}?`,
        answer:
          region.Type === "country" || region.Type === "continent"
            ? `There ${airportsInRegion.length === 1 ? "is" : "are"} ${
                airportsInRegion.length
              } international airport${
                airportsInRegion.length !== 1 ? "s" : ""
              } located in ${
                region.Name
              }. You can explore all of them on the map on our guide.`
            : airportsInRegion
            ? `There ${airportsInRegion.length === 1 ? "is" : "are"} ${
                airportsInRegion.length
              } international airport${
                airportsInRegion.length !== 1 ? "s" : ""
              } located in ${
                region.Name
              }. You can explore all of them on the map, but also some others that are located nearby.`
            : `There are no international airports located in ${region.Name}, but on a 200 km / 124 miles radius, there are ${airportAroundRegion.length} international airports in the proximity.`,
      }
    : null,
  mostPopularAirport || closestAirport
    ? {
        question: `
        What is the ${
          region.Type === "country" || region.Type === "continent"
            ? "biggest airport in"
            : "closest airport to"
        } ${region.Name}?
        `,
        answer:
          region.Type === "country" || region.Type === "continent" ? (
            <>
              The biggest and most popular airport in {region.Name} is{" "}
              <Link
                className="text-buttonBg"
                href={`/airport/${mostPopularAirport?.id || ""}/${
                  mostPopularAirport?.Name || ""
                }`}
              >
                {mostPopularAirport?.Name}
              </Link>
              .
            </>
          ) : (
            <>
              The closest airport to {region.Name} is{" "}
              <Link
                className="text-buttonBg"
                href={`/airport/${
                  mostPopularAirport
                    ? mostPopularAirport.id
                    : closestAirport?.id || ""
                }/${
                  mostPopularAirport
                    ? mostPopularAirport.Name.replaceAll(" ", "_")
                    : closestAirport?.Name.replaceAll(" ", "_") || ""
                }`}
              >
                {mostPopularAirport
                  ? mostPopularAirport.Name
                  : closestAirport?.Name}
              </Link>
              .
            </>
          ),
      }
    : null,
];
