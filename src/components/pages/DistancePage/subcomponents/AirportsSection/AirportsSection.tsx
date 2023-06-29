import type { AirportItem } from "~/src/utils/types";
import { AirportSection } from "./AirportSection";

interface AirportsSectionProps {
  originAirport: AirportItem;
  destinationAirport: AirportItem;
}

export const AirportsSection = ({
  originAirport,
  destinationAirport,
}: AirportsSectionProps) => {
  return (
    <section className="container mb-6 grid grid-flow-col grid-cols-2 grid-rows-[repeat(9,auto)] gap-x-5">
      <AirportSection
        name={originAirport.Name}
        city={originAirport.City}
        country={originAirport.Country}
        iata={originAirport.IATA}
        x={originAirport.CenterX}
        y={originAirport.CenterY}
        type={originAirport.Type}
        timezone={originAirport.TimezoneD}
        id={originAirport.id || 0}
      />
      <AirportSection
        name={destinationAirport.Name}
        city={destinationAirport.City}
        country={destinationAirport.Country}
        iata={destinationAirport.IATA}
        x={destinationAirport.CenterX}
        y={destinationAirport.CenterY}
        type={destinationAirport.Type}
        timezone={destinationAirport.TimezoneD}
        id={destinationAirport.id || 0}
      />
    </section>
  );
};
