import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "~/src/assets";
import { Logo } from "../shared/Logo";

const linksInfo = [
  [
    {
      item: <Logo white className="lg:mb-16 mb-8" />,
      url: "#",
    },
    {
      item: "Blog",
      url: "#",
    },
    {
      item: "About us",
      url: "#",
    },
    {
      item: "Contact us",
      url: "#",
    },
    {
      item: "Terms of Use & Privacy",
      url: "#",
    },
  ],
  [
    {
      item: (
        <div className="mb-3 border-b-2 border-redBg py-3 font-bold">
          Explore Locations
        </div>
      ),
      url: "#",
    },
    {
      item: "Regions",
      url: "#",
    },
    {
      item: "Guides",
      url: "#",
    },
    {
      item: "Driving Distances",
      url: "#",
    },
    {
      item: "Flying Times and Distances",
      url: "#",
    },
    {
      item: "Explore Nearby",
      url: "#",
    },
  ],
  [
    {
      item: (
        <div className="mb-3 border-b-2 border-redBg py-3 font-bold">
          Social Media
        </div>
      ),
      url: "#",
    },
    {
      item: (
        <div className="flex gap-3">
          <Image src={FacebookIcon} alt="" />
          <p>Facebook</p>
        </div>
      ),
      url: "#",
    },
    {
      item: (
        <div className="flex gap-3">
          <Image src={InstagramIcon} alt="" />
          <p>Instagram</p>
        </div>
      ),
      url: "#",
    },
    {
      item: (
        <div className="flex gap-3">
          <Image src={TwitterIcon} alt="" />
          <p>Twitter</p>
        </div>
      ),
      url: "#",
    },
  ],
];

export const Footer = () => {
  return (
    <footer className="bg-darkGrayBg">
      <div className="container mx-auto px-3 py-5 lg:px-0">
        <div className="flex flex-col gap-x-[4.5rem]  border-b border-gray-700 lg:pb-[3.7rem] pb-7 lg:flex-row">
          {linksInfo.map((links, index) => (
            <div key={index}>
              <ul className="text-white">
                {links.map((link, index) => (
                  <Link href={link.url} key={index}>
                    <li
                      className={clsx(
                        "w-full pt-3 lg:w-auto",
                        index !== links.length - 1 &&
                          index !== 0 &&
                          "border-b border-gray-700 lg:pb-[1.35rem] pb-4"
                      )}
                    >
                      {link.item}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pb-4 lg:pt-7 pt-5 text-center lg:text-lg text-white">
          Made with ♥ in Romania & more© 2022 ExploreLocations.com.
        </div>
      </div>
    </footer>
  );
};
