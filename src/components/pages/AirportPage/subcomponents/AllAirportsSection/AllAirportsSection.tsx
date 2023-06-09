import clsx from "clsx";
import type { RegionType } from "~/src/utils/types";
import { ReactCountryFlag } from "react-country-flag";
import { iso1A2Code } from "@rapideditor/country-coder";
import Link from "next/link";

interface AllAirportsSectionProps {
  regions: RegionType[];
}

export const AllAirportsSection = ({ regions }: AllAirportsSectionProps) => {
  return (
    <section className="container mt-5 rounded-md bg-white py-1 shadow-md lg:py-6">
      <h3 className="mb-3 px-5 font-bold leading-8 tracking-wider lg:mb-11 lg:px-8 lg:text-3xl">
        Explore Airports in {regions[0]?.Country}
      </h3>
      <div className="grid grid-cols-1 grid-rows-6 gap-x-24 gap-y-4 px-4 pb-1 lg:grid-cols-2 lg:px-8">
        {regions.map((el, idx) => (
          <Link
            className={clsx(
              "flex gap-3 lg:gap-2",
              idx !== regions.length - 2 &&
                idx !== regions.length - 1 &&
                "border-b border-grayBg pb-3"
            )}
            key={el.id}
            href={`/airports/${el.id}/${el.Name.replaceAll(
              " ",
              "_"
            ).toLowerCase()}`}
          >
            <div className="h-6 w-6 overflow-hidden rounded-md lg:h-7 lg:w-7">
              <ReactCountryFlag
                countryCode={iso1A2Code(regions[0]?.Country || "US") || "US"}
                svg
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <span className="text-buttonBg">{el.Name}</span>
            (14 Airports)
            {/* hardcoded */}
          </Link>
        ))}
      </div>
      <div className="flex">
        <div
          // href={`/airports/${country.replaceAll(" ", "_").toLowerCase()}`}
          className="mx-auto mt-6 rounded-md bg-buttonBg px-16 py-3 text-lg text-white"
        >
          Airports in {regions[0]?.Country}
        </div>
      </div>
    </section>
  );
};
