import { MedalIcon } from "~/src/assets";
import { SectionDropdown } from "../../pages/DrivingHubPage/subcomponents/SectionDropdown";
import { useState } from "react";
import { TopLocation } from "~/src/components/shared/TopLocation";
import type { LocationsType } from "~/src/utils/types";

interface TopLocationsSectionProps {
  defaultOpen?: boolean;
  locations: LocationsType[];
}

export const TopLocationsSection = ({
  defaultOpen,
  locations,
}: TopLocationsSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  return (
    <SectionDropdown
      isOpen={isOpen}
      button={
        <div className="mb-5 flex w-full justify-between">
          <div className="flex">
            <MedalIcon className="h-12 w-12 lg:h-14 lg:w-14" />
            <div className="flex flex-col gap-1 lg:gap-3">
              <h2 className="text-xl font-bold leading-5 lg:text-3xl">
                Top Locations
              </h2>
              <h4>See our Top 13 Locations</h4>
            </div>
          </div>
          <div
            className="cursor-pointer text-lg text-buttonBg"
            onClick={() => setIsOpen(!isOpen)}
          >
            Show {isOpen ? "less" : "more"}
          </div>
        </div>
      }
    >
      <div className="grid gap-x-6 gap-y-4 lg:grid-cols-3">
        {locations.map((el, idx) => (
          <TopLocation key={idx} location={el} />
        ))}
      </div>
    </SectionDropdown>
  );
};
