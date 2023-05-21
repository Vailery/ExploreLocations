import type { FlightDistanceType } from "~/src/utils/types";
import { RelatedFlight } from "./RelatedFlight";

interface RelatedFlightsSectionProps {
  originCountry: string;
  destinationCountry: string;
  relatedOriginAirports: FlightDistanceType[];
  relatedDestinationAirports: FlightDistanceType[];
}

export const RelatedFlightsSection = ({
  originCountry,
  destinationCountry,
  relatedOriginAirports,
  relatedDestinationAirports,
}: RelatedFlightsSectionProps) => {
  return (
    <section className="container flex flex-col gap-5 lg:flex-row">
      <RelatedFlight country={originCountry} relatedAirports={relatedOriginAirports} />
      <RelatedFlight country={destinationCountry} relatedAirports={relatedDestinationAirports} />
    </section>
  );
};
