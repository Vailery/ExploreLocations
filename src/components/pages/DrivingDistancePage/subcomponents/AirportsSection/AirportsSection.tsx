import { AirportSection } from "./AirportSection";

interface InfoSectionProps {
  originX: number;
  originY: number;
  destinationX: number;
  destinationY: number;
  from: string;
  to: string;
  countryTo: string;
  countryFrom: string;
}

export const AirportsSection = ({originX, originY, destinationX, destinationY, from, to, countryTo, countryFrom}: InfoSectionProps) => {
  return (
    <section className="container mb-5 flex flex-col gap-5 lg:flex-row">
      <AirportSection
        x={originX}
        y={originY}
        from={from}
        to={to}
        countryTo={countryTo}
        countryFrom={countryFrom}
      />
      <AirportSection
        x={destinationX}
        y={destinationY}
        from={from}
        to={to}
        countryTo={countryTo}
        countryFrom={countryFrom}
      />
    </section>
  );
};
