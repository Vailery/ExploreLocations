import { SearchIcon, MarkerIcon } from "~/src/assets";
import { useState, Fragment, useEffect, useMemo } from "react";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";
import type { AirportItem as AirportType, RegionType } from "~/src/utils/types";
import { AirportItem } from "../AirportItem";
import { api } from "~/src/utils/api";
import { Pagination } from "./Pagination";

interface ListSectionProps {
  airports: AirportType[];
  region: RegionType;
  airportsCount: number;
}

const sortOptions = [
  {
    element: <>All</>,
    value: "All",
  },
  {
    element: (
      <>
        <MarkerIcon className="h-5 w-5 text-redText" />
        International
      </>
    ),
    value: "International",
  },
  {
    element: (
      <>
        <MarkerIcon className="h-5 w-5 text-buttonBg" />
        Domestic
      </>
    ),
    value: "Domestic",
  },
  {
    element: (
      <>
        <MarkerIcon className="h-5 w-5 text-grayColor" />
        Local
      </>
    ),
    value: "Local",
  },
] as const;

const paginationLimit = 10;

export const ListSection = ({
  region,
  airports: defaultAirports,
  airportsCount: defaultAirportsCount,
}: ListSectionProps) => {
  const [sortOption, setSortOption] = useState<
    (typeof sortOptions)[number]["value"]
  >(sortOptions[0].value);

  const [airports, setAirports] = useState(defaultAirports);
  const [airportsCount, setAirportsCount] = useState(defaultAirportsCount);

  const [currentRow, setCurrentRow] = useState(0);

  const { data, refetch } = api.airport.getAirportsSort.useQuery({
    type: sortOption.toLowerCase(),
    country: region.Country,
    offset: currentRow * paginationLimit,
    limit: paginationLimit,
  });

  const pagesOffset = useMemo(
    () => Math.round(airportsCount / paginationLimit),
    [airportsCount]
  );

  useEffect(() => {
    if (data) {
      setAirports(data?.airports);
      setAirportsCount(Number(data?.count));
      console.log();
    }
  }, [data]);

  useEffect(() => {
    console.log(pagesOffset);
  }, [pagesOffset, airportsCount]);

  return (
    <section className="container">
      <h3 className="mx-3 mb-5 text-lg font-bold tracking-wide lg:text-3xl">
        {airportsCount} Airports in{" "}
        <span className="text-buttonBg">{region.Country}</span>
      </h3>
      <div className="flex flex-col justify-center gap-2 px-3 lg:flex-row lg:justify-between lg:px-0">
        <div className="flex gap-2">
          <input
            className="w-72 rounded-md px-4 py-3 tracking-wider lg:py-4"
            placeholder="Airport name"
          />
          <button className="flex w-[3.4rem] items-center justify-center rounded-md bg-redBg">
            <SearchIcon />
          </button>
        </div>
        <>
          <Listbox value={sortOption} onChange={setSortOption}>
            <div className="relative mt-1 lg:hidden">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white px-4 py-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 lg:py-4">
                {({ open }) => (
                  <>
                    <span className="relative flex items-center gap-2 tracking-wider">
                      {sortOption} Airport Types
                    </span>
                    <div
                      className={clsx(
                        "absolute right-6 top-1/2 ml-1 h-3 w-3 -translate-y-1/2 rotate-45 border-2 border-transparent border-b-grayColor border-r-grayColor transition-all",
                        open && "rotate-[225deg]"
                      )}
                    />
                  </>
                )}
              </Listbox.Button>
              <Transition
                as={Fragment}
                enter="transition ease-in duration-100"
                leave="transition ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sortOptions.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      className={clsx(
                        "relative flex items-center gap-2 px-4 tracking-wider",
                        sortOption === option.value && "font-bold"
                      )}
                      value={option.value}
                      onClick={() => void refetch()}
                    >
                      {sortOption === option.value && (
                        <div className="absolute bottom-0 left-0 h-full w-[0.3rem] rounded-[0_0.3rem_0.3rem_0] bg-redBg" />
                      )}
                      {option.element}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <div className="hidden gap-2 lg:flex">
            <span className="py-4 font-bold">Show only</span>
            {sortOptions.map((option, index) => (
              <button
                onClick={() => {
                  setSortOption(option.value);
                  void refetch();
                }}
                key={index}
                className={clsx(
                  "relative flex h-full items-center gap-2 rounded-md bg-white px-4 tracking-wider shadow-sm",
                  sortOption === option.value && "font-bold"
                )}
              >
                {sortOption === option.value && (
                  <div className="absolute bottom-0 left-0 h-[0.3rem] w-full rounded-[0_0_0.3rem_0.3rem] bg-redBg" />
                )}
                {option.element}
              </button>
            ))}
          </div>
        </>
      </div>
      <div className="my-5 flex flex-col gap-3">
        {airports.map((el, idx) => (
          <AirportItem key={idx} data={el} />
        ))}

        {/* Pagination section */}
        {pagesOffset > 1 && (
          <Pagination
            pagesOffset={pagesOffset}
            currentRow={currentRow}
            setCurrentRow={setCurrentRow}
            refetch={() => void refetch()}
          />
        )}
      </div>
    </section>
  );
};
