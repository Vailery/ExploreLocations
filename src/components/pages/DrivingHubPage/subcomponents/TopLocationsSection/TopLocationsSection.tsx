import { MedalIcon } from "~/src/assets";
import { TopLocation } from "../TopLocation/TopLocation";
import { SectionDropdown } from "../SectionDropdown";
import { Menu } from "@headlessui/react";

export const TopLocationsSection = () => {
  return (
    <SectionDropdown
      defaultOpen
      button={
        <div className="mb-5 flex w-full justify-between">
          <div className="flex">
            <MedalIcon className="h-14 w-14" />
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-5">Top Locations</h2>
              <h4>See our Top 13 Locations</h4>
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
