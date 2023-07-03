import type { FaqType, RegionType } from "~/src/utils/types";

interface getFaqCountryDataProps {
  region: RegionType;
  airportsInRegionsCount: number;
  airportAroundRegionsCount: number;
  mostPopularAirportName: string;
  closestAirport: string;
}

export const getFaqCountryData = ({
  region,
  airportsInRegionsCount,
  airportAroundRegionsCount,
  mostPopularAirportName,
  closestAirport,
}: getFaqCountryDataProps): (FaqType | null)[] => [
  airportsInRegionsCount || airportAroundRegionsCount
    ? {
        question: `
    How many international airports are ${
      region.Type === "country" || region.Type === "continent"
        ? "in or near"
        : "in"
    } ${region.Name}?`,
        answer:
          region.Type === "country" || region.Type === "continent"
            ? `There are ${airportsInRegionsCount} international airports located in ${region.Name}. You can explore all of them on the map on our guide.`
            : airportsInRegionsCount
            ? `There are ${airportsInRegionsCount} international airports located in ${region.Name}. You can explore all of them on the map, but also some others that are located nearby.`
            : `There are no international airports located in ${region.Name}, but on a 200 km / 124 miles radius, there are ${airportAroundRegionsCount} international airports in the proximity.`,
      }
    : null,
  mostPopularAirportName || closestAirport
    ? {
        question: `
        What is the ${
          region.Type === "country" || region.Type === "continent"
            ? "biggest airport in"
            : "closest airport to"
        } ${region.Name}?
        `,
        answer:
          region.Type === "country" || region.Type === "continent"
            ? `The biggest and most popular airport in ${region.Name} is ${mostPopularAirportName}.`
            : `The closest airport to ${region.Name} is ${
                mostPopularAirportName ? mostPopularAirportName : closestAirport
              }.`,
      }
    : null,
];
