import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { CarIcon, UsaFlag } from "~/src/assets";

export const TopLocation = () => {
  return (
    <Menu
      as={"div"}
      className="h-fit rounded-md border border-grayText bg-grayBg px-3 py-3"
    >
      <Menu.Button className={"w-full"}>
        {({ open }) => (
          <div className="relative flex w-full gap-4">
            <UsaFlag className="h-12 w-12" />
            <div className="flex flex-col items-start">
              <h4 className="text-buttonBg">Brasil</h4>
              <h5>2415 POIs</h5>
            </div>
            <div
              className={clsx(
                "h-3 w-3 absolute right-1 top-2 rotate-45 border-2 border-transparent border-b-grayColor border-r-grayColor transition-all",
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
              {new Array(5).fill(0).map((el, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "flex items-center gap-3 border-grayColor py-[0.9rem]",
                    idx !== 0 && "border-t"
                  )}
                >
                  <CarIcon />
                  <h6 className="text-lg text-buttonBg">Beijing to Macau</h6>
                </div>
              ))}
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
