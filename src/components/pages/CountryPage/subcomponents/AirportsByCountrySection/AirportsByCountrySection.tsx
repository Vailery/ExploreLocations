import clsx from "clsx";
import { UsaFlag } from "~/src/assets";

export const AirportsByCountrySection = () => {
  return (
    <section className="container mt-5 rounded-md bg-white lg:py-6 py-1 shadow-md">
      <h3 className="lg:mb-11 mb-3 lg:px-8 px-5 lg:text-3xl font-bold leading-8 tracking-wider">
        Explore Airports in South America
      </h3>
      <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-6 gap-x-24 gap-y-4 lg:px-8 px-4 pb-1">
        {new Array(13).fill("").map((_, idx) => (
          <div
            className={clsx(
              "flex lg:gap-2 gap-3",
              idx !== 13 - 2 && idx !== 13 - 1 && "border-b border-grayBg pb-3"
            )}
            key={idx}
          >
            <UsaFlag className="lg:h-7 lg:w-7 w-6 h-6" />
            <span className="text-buttonBg">Argentina</span>
            (14 Airports)
          </div>
        ))}
      </div>
    </section>
  );
};
