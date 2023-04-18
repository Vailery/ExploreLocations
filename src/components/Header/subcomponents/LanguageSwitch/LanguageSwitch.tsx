import { Menu } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { UsaFlag } from "~/src/assets";

const languages = [
  {
    name: "EN",
    img: <UsaFlag width={30} height={30} />,
  },
];

export const LanguageSwitch = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        {({ open }) => (
          <div className="flex items-center gap-2">
            <p>EN</p>
            <UsaFlag width={30} height={30} />
            <div
              className={clsx(
                "ml-1 h-2 w-2 rotate-45 border-2 border-transparent border-b-grayColor border-r-grayColor transition-all",
                open && "rotate-[225deg]"
              )}
            />
          </div>
        )}
      </Menu.Button>
      <Menu.Items className={"absolute"}>
        {languages.map((item, idx) => (
          <Menu.Item key={idx}>
            <div>{item.name}</div>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
