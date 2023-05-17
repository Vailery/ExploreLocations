import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { ReactNode } from "react";

interface SectionDropdownProps {
  button: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
  defaultOpen?: boolean;
}

export const SectionDropdown = ({
  button,
  children,
  defaultOpen,
}: SectionDropdownProps) => {
  return (
    <Menu
      as={"section"}
      defaultChecked={defaultOpen}
      className="container rounded-md bg-white px-8 py-5 mb-5"
    >
      <>
        {button}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items static>
            <Menu.Item>{children}</Menu.Item>
          </Menu.Items>
        </Transition>
      </>
    </Menu>
  );
};
