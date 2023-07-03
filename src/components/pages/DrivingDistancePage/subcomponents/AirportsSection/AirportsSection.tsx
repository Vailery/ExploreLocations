import type { CityType } from "~/src/utils/types";
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
  dataFrom: CityType | null;
  dataTo: CityType | null;
}

export const AirportsSection = ({
  originX,
  originY,
  destinationX,
  destinationY,
  from,
  to,
  countryTo,
  countryFrom,
  dataFrom,
  dataTo,
}: InfoSectionProps) => {
  return (
    <section className="container mb-6 grid grid-flow-col grid-cols-2 grid-rows-[repeat(8,auto)] gap-x-5">
      <AirportSection
        x={originX}
        y={originY}
        name={from}
        country={countryFrom}
        data={dataFrom}
      />
      <AirportSection
        x={destinationX}
        y={destinationY}
        name={to}
        country={countryTo}
        data={dataTo}
      />
    </section>
  );
};
