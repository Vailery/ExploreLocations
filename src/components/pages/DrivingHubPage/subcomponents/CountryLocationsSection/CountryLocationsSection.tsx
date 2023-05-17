import { PlanetIcon } from "~/src/assets";
import { TopLocation } from "../TopLocation/TopLocation";
import { SectionDropdown } from "../SectionDropdown";
import { Menu } from "@headlessui/react";

interface CountryLocationsSectionProps {
  country: string;
}

export const CountryLocationsSection = ({
  country,
}: CountryLocationsSectionProps) => {
  return (
    <SectionDropdown
      button={
        <div className="mb-5 flex w-full justify-between">
          <div className="flex">
            <PlanetIcon className="h-14 w-14" />
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-5">{country}</h2>
              <h4>See Top 13 {country} Locations</h4>
            </div>
          </div>
          <Menu.Button className="h-fit">
            {({ open }) => (
              <div className="text-lg text-buttonBg">
                Show {open ? "less" : "more"}
              </div>
            )}
          </Menu.Button>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        {new Array(13).fill(0).map((el, idx) => (
          <TopLocation key={idx} />
        ))}
      </div>
    </SectionDropdown>
  );
};
