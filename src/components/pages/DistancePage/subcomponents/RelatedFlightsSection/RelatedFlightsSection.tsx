import { RelatedFlight } from "./RelatedFlight";

export const RelatedFlightsSection = () => {
  return (
    <section className="container flex gap-5">
      <RelatedFlight />
      <RelatedFlight />
    </section>
  );
};
