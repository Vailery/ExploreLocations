import type { CityType } from "~/src/utils/types";
import { CitySection } from "./CitySection";

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

export const CitiesSection = ({
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
    <section className="mx-3 grid grid-flow-col grid-cols-1 grid-rows-[repeat(16,auto)] gap-x-5 lg:container lg:grid-cols-2 lg:grid-rows-[repeat(8,auto)]">
      <CitySection
        x={originX}
        y={originY}
        name={from}
        country={countryFrom}
        data={dataFrom}
      />
      <CitySection
        x={destinationX}
        y={destinationY}
        name={to}
        country={countryTo}
        data={dataTo}
      />
    </section>
  );
};
