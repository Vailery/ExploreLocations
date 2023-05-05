import { AirportSection } from "./AirportSection";

export const AirportsSection = () => {
  return (
    <section className="container flex lg:flex-row flex-col gap-5 mb-5">
      <AirportSection />
      <AirportSection />
    </section>
  );
};
