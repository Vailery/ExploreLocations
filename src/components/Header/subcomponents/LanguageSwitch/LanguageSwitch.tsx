import { Menu } from "@headlessui/react";
import { useState } from "react";
import { UsaFlag } from "~/src/assets";
import "~/src/utils/i18n";

const languages = [
  {
    name: "EN",
    img: UsaFlag,
  },
];

export const LanguageSwitch = () => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>{}</Menu.Button>
      <Menu.Items>
        {languages.map((item, idx) => (
          <Menu.Item key={idx}>
            <div>{item.name}</div>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
