import clsx from "clsx";
import type { AirportItem } from "~/src/utils/types";
import { Fragment } from "react";
import { useRouter } from "next/router";

interface AllAirportsSectionProps {
  country: string;
  airportsInCountry: AirportItem[];
}

export const AllAirportsSection = ({
  country,
  airportsInCountry,
}: AllAirportsSectionProps) => {
  const router = useRouter();
  return country ? (
    <section className="container mb-7 bg-white px-3 pb-5 pt-2 lg:mb-5 lg:rounded-md lg:px-7 lg:pb-7 lg:pt-6">
      <h3 className="mb-5 text-xl font-bold tracking-tight lg:mb-10 lg:text-3xl lg:tracking-wider">
        Airports in {country}
      </h3>
      <div className="mb-7 grid grid-cols-1 gap-10 pr-12 lg:mb-10 lg:grid-cols-3">
        {airportsInCountry.map((el, index) => (
          <Fragment key={index}>
            {el.Name && (
              <div
                onClick={() =>
                  void router.push({
                    pathname: `/airport/${el.id}/${el.Name.replaceAll(
                      " ",
                      "_"
                    ).toLowerCase()}`,
                  })
                }
                className="flex flex-col text-lg text-buttonBg"
                key={index}
              >
                <p className="border-b border-grayBg pb-5 pt-3 lg:pt-0">
                  Airport name: {el.Name}
                </p>
                {el.City && (
                  <p className="border-b border-grayBg pb-5 pt-3 lg:pt-2">
                    City: {el.City}
                  </p>
                )}
                {el.IATA && (
                  <p
                    className={clsx(
                      "pt-2",
                      index !== 2 && "border-b border-grayBg pb-5"
                    )}
                  >
                    IATA Code: {el.IATA}
                  </p>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex">
        {/* <Link
          href={`/airports/${country.replaceAll(" ", "_").toLowerCase()}`}
          className="mx-auto mt-4 rounded-md bg-buttonBg px-16 py-3 text-lg text-white"
        >
          Airports in {country}
        </Link> */}
      </div>
    </section>
  ) : (
    <></>
  );
};
