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
    text: "Find airports in an around any region.",
    buttonText: "View Airports",
  },
  {
    title: "Discover Flying Routes",
    icon: <DiscoverRoutesIcon />,
    link: "/flying-hub",
    text: "Explore the most popular flying routes in the world.",
    buttonText: "View Flying Routes",
  },
  {
    title: "Discover Driving Routes",
    icon: <DiscoverDrivingIcon />,
    link: "/driving-hub",
    text: "Explore popular driving routes and plan your adventure.",
    buttonText: "View Driving Routes",
  },
];

export const NavigationSection = () => (
  <section className="container mb-5 lg:mb-9">
    <h2 className="mb-3 text-center text-xl font-bold lg:mb-2 lg:text-[2.05rem]">
      Discover ExploreLocations.com
    </h2>
    <h3 className="mb-6 px-4 text-center leading-[1.75rem] lg:mb-14 lg:text-lg">
      Unlock premium features like offline access, unlimited attachments, flight
      <br />
      deals, export to Google maps, and much more
    </h3>
    <div className="grid grid-rows-3 gap-4 lg:grid-cols-3 lg:grid-rows-1 lg:gap-5">
      {data.map(({ title, icon, link, buttonText, text }, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white px-4 py-7 lg:rounded-md lg:py-9"
        >
          {icon}
          <h3 className="mt-6 text-[1.4rem] font-bold lg:mt-8 lg:text-[1.6rem]">
            {title}
          </h3>
          <h4 className="mt-5 text-center lg:mt-6 lg:text-lg">
            {text}
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
