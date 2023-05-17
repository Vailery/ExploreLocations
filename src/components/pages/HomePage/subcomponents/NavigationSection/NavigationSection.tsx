import Link from "next/link";
import {
  DiscoverAirportsIcon,
  DiscoverDrivingIcon,
  DiscoverRoutesIcon,
} from "~/src/assets";

const data = [
  {
    title: "Discover Airports",
    icon: <DiscoverAirportsIcon />,
    link: "#",
    buttonText: "View Airports",
  },
  {
    title: "Discover Flying Routes",
    icon: <DiscoverRoutesIcon />,
    link: "/distances",
    buttonText: "View Flying Routes",
  },
  {
    title: "Discover Driving Routes",
    icon: <DiscoverDrivingIcon />,
    link: "/driving-distances",
    buttonText: "View Driving Routes",
  },
];

export const NavigationSection = () => (
  <section className="container lg:mb-9 mb-5">
    <h2 className="mb-3 lg:mb-2 text-center text-xl lg:text-[2.05rem] font-bold">
      Discover ExploreLocations.com
    </h2>
    <h3 className="mb-6 lg:mb-14 text-center lg:text-lg leading-[1.75rem] px-4">
      Unlock premium features like offline access, unlimited attachments, flight
      <br />
      deals, export to Google maps, and much more
    </h3>
    <div className="grid lg:grid-cols-3 lg:grid-rows-1 grid-rows-3 lg:gap-5 gap-4">
      {data.map(({ title, icon, link, buttonText }, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white px-4 py-7 lg:py-9 lg:rounded-md"
        >
          {icon}
          <h3 className="mt-6 lg:mt-8 text-[1.4rem] lg:text-[1.6rem] font-bold">{title}</h3>
          <h4 className="mt-5 lg:mt-6 text-center lg:text-lg">
            Unlock premium features like offline access, unlimited attachments.
          </h4>
          <Link
            href={link}
            className="mt-8 rounded-md bg-buttonBg px-7 py-4 text-white"
          >
            {buttonText}
          </Link>
        </div>
      ))}
    </div>
  </section>
);
