import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { MedalIcon, UsaFlag } from "~/src/assets";

export const MostPopularSection = () => {
  const [selectedType, setSelectedType] = useState("Most Popular Airports");
  return (
    <section className="container lg:mb-5 mb-1">
      <h2 className="mb-2 hidden text-center text-[2.05rem] font-bold lg:block">
        Discover our most poplar POIs
      </h2>
      <h3 className="mb-[3.7rem] hidden text-center text-lg lg:block">
        Unlock premium features like offline access, unlimited attachments,
        flight
      </h3>
      <nav className="hidden lg:block">
        <ul className="flex">
          <li
            className={clsx(
              "flex cursor-pointer items-center gap-2 rounded-[0.375rem_0.375rem_0_0] px-5 py-4 text-lg",
              selectedType === "Most Popular Airports" && "bg-white"
            )}
            onClick={() => setSelectedType("Most Popular Airports")}
          >
            <MedalIcon
              className={clsx(
                selectedType !== "Most Popular Airports" && "hidden"
              )}
            />
            Most Popular Airports
          </li>
          <li
            className={clsx(
              "flex cursor-pointer items-center gap-2 rounded-[0.375rem_0.375rem_0_0] px-5 py-4 text-lg",
              selectedType === "Most Popular Flying Routes" && "bg-white"
            )}
            onClick={() => setSelectedType("Most Popular Flying Routes")}
          >
            <MedalIcon
              className={clsx(
                selectedType !== "Most Popular Flying Routes" && "hidden"
              )}
            />
            Most Popular Flying Routes
          </li>
          <li
            className={clsx(
              "flex cursor-pointer items-center gap-2 rounded-[0.375rem_0.375rem_0_0] px-5 py-4 text-lg",
              selectedType === "Popular Driving Routes" && "bg-white"
            )}
            onClick={() => setSelectedType("Popular Driving Routes")}
          >
            <MedalIcon
              className={clsx(
                selectedType !== "Popular Driving Routes" && "hidden"
              )}
            />
            Popular Driving Routes
          </li>
        </ul>
      </nav>
      <Listbox value={selectedType} onChange={setSelectedType}>
        <div className="relative lg:hidden mb-2">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white px-4 py-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 lg:py-4">
            {({ open }) => (
              <>
                <span className="px-3">
                  {selectedType}
                </span>
                <div
                  className={clsx(
                    "absolute right-8 top-1/2 ml-1 h-3 w-3 -translate-y-1/2 rotate-45 border-2 border-transparent border-b-grayColor border-r-grayColor transition-all",
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
            <Listbox.Options className="absolute mt-1 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {[
                "Most Popular Airports",
                "Most Popular Flying Routes",
                "Popular Driving Routes",
              ].map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={clsx(
                    "relative items-center px-7 tracking-wider"
                  )}
                  value={option}
                  onClick={() => setSelectedType(option)}
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <div className="rounded-md bg-white lg:px-7 px-4 pb-7 pt-5">
        <h4 className="mb-4 lg:mb-6">See our Top 13 Locations</h4>
        <div className="mb-7 grid lg:grid-cols-3 gap-x-5 gap-y-3">
          {new Array(26).fill(0).map((_, idx) => (
            <div
              key={idx}
              className="relative flex gap-2 lg:gap-3 rounded-md border border-grayText bg-gray-100 px-3 lg:px-5 py-2 lg:py-4"
            >
              <UsaFlag className="h-10 w-12" />
              <div>
                <div className="text-lg text-buttonBg">Romania</div>
                <div className="text-lg leading-5">2415 POIs</div>
              </div>
              <div className="absolute right-2 lg:right-4 top-4 lg:top-6 h-3 w-3 rotate-45 border-b-2 border-r-2 border-black" />
            </div>
          ))}
        </div>
        <button className="mx-auto block rounded-md bg-buttonBg px-10 py-3 lg:w-auto w-full text-lg text-white">
          Browse more by country
        </button>
      </div>
    </section>
  );
};
