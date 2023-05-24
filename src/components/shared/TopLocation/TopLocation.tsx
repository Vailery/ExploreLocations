import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import ReactCountryFlag from "react-country-flag";
import { CarIcon } from "~/src/assets";
import type { LocationsType } from "~/src/utils/types";

interface TopLocationProps {
  location: LocationsType;
}

export const TopLocation = ({ location }: TopLocationProps) => {
  return (
    <Menu
      as={"div"}
      className="h-fit rounded-md border border-grayText bg-grayBg px-4 py-1 lg:px-3 lg:py-3"
    >
      <Menu.Button className={"w-full"}>
        {({ open }) => (
          <div className="relative flex w-full gap-2 lg:gap-4">
            <div className="h-8 w-11 overflow-hidden rounded-md">
              <ReactCountryFlag
                countryCode={location.code.substring(0, 2)}
                svg
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div className="flex flex-col items-start">
              <h4 className="text-buttonBg">{location.country}</h4>
              <h5>{(+location.points).toLocaleString("en-US")} POIs</h5>
            </div>
            <div
              className={clsx(
                "absolute right-1 top-2 h-3 w-3 rotate-45 border-2 border-transparent border-b-grayColor border-r-grayColor transition-all",
                open && "rotate-[225deg]"
              )}
            />
          </div>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items>
          <Menu.Item disabled>
            <div className="mt-4 flex flex-col px-1">
              <h5 className="text-lg font-bold">
                5 most popular driving distances
              </h5>
              {location.locations.map((el, idx) => (
                <Link
                  href={`/driving-route/${el.from.replaceAll(
                    " ",
                    "_"
                  )}/${el.to.replaceAll(" ", "_")}`}
                  key={idx}
                  className={clsx(
                    "flex items-center gap-3 border-grayColor py-[0.9rem]",
                    idx !== 0 && "border-t"
                  )}
                >
                  <CarIcon />
                  <h6 className="text-lg text-buttonBg">
                    {el.from} to {el.to}
                  </h6>
                </Link>
              ))}
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
