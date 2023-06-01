import { SearchIcon, MarkerIcon } from "~/src/assets";
import {
  useState,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";
import type { AirportItem as AirportType, RegionType } from "~/src/utils/types";
import { AirportItem } from "../AirportItem";
import { api } from "~/src/utils/api";
import { useRouter } from "next/router";
import { Pagination } from "./Pagination";

interface ListSectionProps {
  airports: AirportType[];
  region: RegionType;
  airportsCount: number;
  setAirports: (airports: AirportType[]) => void;
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

const paginationLimit = 20;

export const ListSection = ({
  region,
  airports,
  airportsCount: defaultAirportsCount,
  setAirports,
}: ListSectionProps) => {
  const [sortOption, setSortOption] = useState<
    (typeof sortOptions)[number]["value"]
  >(sortOptions[0].value);

  const [airportsCount, setAirportsCount] = useState(defaultAirportsCount);

  const router = useRouter();

  const [currentRow, setCurrentRow] = useState(
    router.query.page ? +router.query.page - 1 : 0
  );

  const { data, refetch } = api.airport.getAirportsSort.useQuery(
    {
      type: sortOption.toLowerCase(),
      country: region.Country,
      offset: currentRow * paginationLimit,
      limit: paginationLimit,
      regionId: (router.query.id as string) || "",
    },
    { enabled: false }
  );

  const pagesOffset = useMemo(
    () => Math.floor(airportsCount / paginationLimit + 1),
    [airportsCount]
  );

  useEffect(() => {
    if (data) {
      setAirports(data?.airports);
      setAirportsCount(Number(data?.count));
    }
  }, [data, setAirports]);

  const listTop = useRef<HTMLHeadingElement | null>(null);

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useLayoutEffect(() => {
    setIsFirstRender(false);
  }, []);

  const [updatedRoute, setUpdatedRoute] = useState(router.asPath);
  useEffect(() => {
    if (!router.asPath.includes("[")) {
      setUpdatedRoute(router.asPath.split("?")[0] || "");
    }
  }, [router]);

  useEffect(() => {
    setSortOption("All");
    setCurrentRow(0);
    void router.push(
      {
        pathname: router.pathname,
        query: {
          guides: router.query.guides,
          id: router.query.id,
        },
      },
      router.pathname,
      { shallow: true }
    );
    void refetch();
  }, [updatedRoute]);

  useEffect(() => {
    if (!isFirstRender && listTop.current) {
      void window.scrollTo({
        left: 0,
        top: listTop.current.offsetTop,
        behavior: "smooth",
      });
    }
    void refetch();
    if (currentRow !== 0) {
      void router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            page: `${currentRow + 1}`,
            id: router.query.id,
            guides: router.query.guides,
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      void router.push(
        {
          pathname: router.pathname,
          query: {
            guides: router.query.guides,
            id: router.query.id,
          },
        },
        router.pathname,
        { shallow: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRow]);

  useEffect(() => {
    if (!isFirstRender) {
      void refetch();
      void router.replace(
        {
          pathname: router.pathname,
          query: {
            guides: router.query.guides,
            id: router.query.id,
          },
        },
        undefined,
        { shallow: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  return (
    <section className="container">
      <h3
        className="mx-3 mb-5 text-lg font-bold tracking-wide lg:text-3xl"
        ref={listTop}
      >
        {airportsCount} Airports in{" "}
        <span className="text-buttonBg">{region.Name}</span>
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
                      onClick={() => setSortOption(option.value)}
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
            {sortOptions.map((option, index) => (
              <button
                onClick={() => {
                  setSortOption(option.value);
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
          <AirportItem key={idx} data={el} countryCode={region.Code} />
        ))}

        {pagesOffset > 1 && (
          <Pagination
            pagesOffset={pagesOffset}
            currentRow={currentRow}
            setCurrentRow={setCurrentRow}
          />
        )}
      </div>
    </section>
  );
};
