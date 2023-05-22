import { PlanetIcon } from "~/src/assets";
import { SectionDropdown } from "../SectionDropdown";
import { useState } from "react";
import { TopLocation } from "~/src/components/shared/TopLocation";

interface CountryLocationsSectionProps {
  country: string;
  defaultOpen?: boolean;
}

export const CountryLocationsSection = ({
  country,
  defaultOpen,
}: CountryLocationsSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  return (
    <SectionDropdown
      button={
        <div className="mb-5 flex w-full justify-between lg:pt-2">
          <div className="flex gap-3">
            <PlanetIcon className="mt-2 h-10 w-10 lg:mt-0 lg:h-14 lg:w-14" />
            <div className="flex flex-col lg:gap-3">
              <h2 className="leading-0 text-lg font-bold lg:text-3xl lg:leading-5">
                {country}
              </h2>
              <h4>See Top 13 {country} Locations</h4>
            </div>
          </div>
          <div
            className="cursor-pointer text-lg whitespace-nowrap text-buttonBg"
            onClick={() => setIsOpen(!isOpen)}
          >
            Show {isOpen ? "less" : "more"}
          </div>
        </div>
      }
      isOpen={isOpen}
    >
      <div className="grid-col-1 grid gap-x-6 gap-y-4 lg:grid-cols-3">
        {new Array(13).fill(0).map((el, idx) => (
          <TopLocation key={idx} />
        ))}
      </div>
    </SectionDropdown>
  );
};
