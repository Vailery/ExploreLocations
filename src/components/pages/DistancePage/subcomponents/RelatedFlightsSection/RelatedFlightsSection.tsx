import { RelatedFlight } from "./RelatedFlight";

export const RelatedFlightsSection = () => {
  return (
    <section className="container flex lg:flex-row flex-col gap-5">
      <RelatedFlight />
      <RelatedFlight />
    </section>
  );
};
