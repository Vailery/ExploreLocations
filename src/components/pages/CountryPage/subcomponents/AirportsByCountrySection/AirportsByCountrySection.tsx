import clsx from "clsx";
import { UsaFlag } from "~/src/assets";
import type { RegionType } from "~/src/utils/types";

interface AirportsByCountrySectionProps {
  regions: RegionType[];
}

export const AirportsByCountrySection = ({
  regions,
}: AirportsByCountrySectionProps) => {
  return (
    <section className="container mt-5 rounded-md bg-white py-1 shadow-md lg:py-6">
      <h3 className="mb-3 px-5 font-bold leading-8 tracking-wider lg:mb-11 lg:px-8 lg:text-3xl">
        Explore Airports in {regions[0]?.Country}
      </h3>
      <div className="grid grid-cols-1 grid-rows-6 gap-x-24 gap-y-4 px-4 pb-1 lg:grid-cols-2 lg:px-8">
        {regions.map((el, idx) => (
          <div
            className={clsx(
              "flex gap-3 lg:gap-2",
              idx !== regions.length - 2 &&
                idx !== regions.length - 1 &&
                "border-b border-grayBg pb-3"
            )}
            key={idx}
          >
            <UsaFlag className="h-6 w-6 lg:h-7 lg:w-7" />
            <span className="text-buttonBg">{el.Name}</span>
            (14 Airports)
          </div>
        ))}
      </div>
    </section>
  );
};
