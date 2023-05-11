import type { FlightDistanceType } from "~/src/utils/types";
import { AirportSection } from "./AirportSection";

interface AirportsSectionProps {
  data: FlightDistanceType;
}

export const AirportsSection = ({ data }: AirportsSectionProps) => {
  return (
    <section className="container mb-6 flex flex-col gap-5 lg:flex-row">
      <AirportSection
        name={data.OriginAirportName}
        city={data.OriginCityName}
        country={data.OriginCountryName}
        iata={data.OriginIata}
        x={data.OriginCenterX}
        y={data.OriginCenterY}
      />
      <AirportSection
        name={data.DestinationAirportName}
        city={data.DestinationCityName}
        country={data.DestinationCountryName}
        iata={data.DestinationIata}
        x={data.DestinationCenterX}
        y={data.DestinationCenterY}
      />
    </section>
  );
};
