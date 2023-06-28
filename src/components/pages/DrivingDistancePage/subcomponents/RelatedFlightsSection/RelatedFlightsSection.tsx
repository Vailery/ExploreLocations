import type { DrivingDistanceType } from "~/src/utils/types";
import { RelatedFlight } from "./RelatedFlight";

interface RelatedFlightsSectionProps {
  fromCity: string;
  toCity: string;
  relatedOriginDistances: DrivingDistanceType[];
  relatedDestinationDistances: DrivingDistanceType[];
}

export const RelatedFlightsSection = ({
  fromCity,
  toCity,
  relatedDestinationDistances,
  relatedOriginDistances,
}: RelatedFlightsSectionProps) => {
  return (
    <section className="container flex flex-col gap-5 lg:flex-row">
      <RelatedFlight
        city={fromCity}
        relatedDistances={relatedOriginDistances}
      />
      <RelatedFlight
        city={toCity}
        relatedDistances={relatedDestinationDistances}
      />
    </section>
  );
};
