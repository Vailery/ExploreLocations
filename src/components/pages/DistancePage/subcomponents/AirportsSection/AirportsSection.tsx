import type { AirportItem, FlightDistanceType } from "~/src/utils/types";
import { AirportSection } from "./AirportSection";

interface AirportsSectionProps {
  data: FlightDistanceType;
  originAirport: AirportItem | null;
  destinationAirport: AirportItem | null;
}

export const AirportsSection = ({
  data,
  originAirport,
  destinationAirport,
}: AirportsSectionProps) => {
  return (
    <section className="container mb-6 grid grid-flow-col grid-cols-2 grid-rows-[repeat(9,auto)] gap-x-5">
      <AirportSection
        name={originAirport?.Name || data.OriginAirportName}
        city={originAirport?.City || data.OriginCityName}
        country={originAirport?.Country || data.OriginCountryName}
        iata={originAirport?.IATA || data.OriginIata}
        x={originAirport?.CenterX || data.OriginCenterX}
        y={originAirport?.CenterY || data.OriginCenterY}
        type={originAirport?.Type}
        timezone={originAirport?.TimezoneD}
        id={originAirport?.id || 0}
      />
      <AirportSection
        name={destinationAirport?.Name || data.DestinationAirportName}
        city={destinationAirport?.City || data.DestinationCityName}
        country={destinationAirport?.Country || data.DestinationCountryName}
        iata={destinationAirport?.IATA || data.DestinationIata}
        x={destinationAirport?.CenterX || data.DestinationCenterX}
        y={destinationAirport?.CenterY || data.DestinationCenterY}
        type={destinationAirport?.Type}
        timezone={destinationAirport?.TimezoneD}
        id={destinationAirport?.id || 0}
      />
    </section>
  );
};
