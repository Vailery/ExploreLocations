import Link from "next/link";
import type { DrivingDistanceType } from "~/src/utils/types";

interface RelatedFlightProps {
  city: string;
  relatedDistances: DrivingDistanceType[];
}

export const RelatedFlight = ({
  city,
  relatedDistances,
}: RelatedFlightProps) => {
  return (
    <div className="w-full rounded-md bg-white px-3 pb-5 pt-2 lg:w-1/2 lg:px-8 lg:pb-7 lg:pt-9">
      <h3 className="text-xl font-bold lg:mb-7 lg:text-3xl">
        Driving Distances {city}
      </h3>
      <div className="mb-4 hidden justify-between lg:flex">
        <div className="text-xl font-bold">Cities</div>
        <div className="text-xl font-bold">Distance</div>
      </div>
      {relatedDistances.map((el, idx) => (
        <Link
          href={`/driving-route/${el.RegionFromCityName.replaceAll(
            " ",
            "_"
          )}/${el.RegionToCityName.replaceAll(" ", "_")}`}
          key={idx}
          className="flex justify-between border-b border-grayText py-[0.85rem] lg:py-4"
        >
          <div className="text-buttonBg">
            {el.RegionFromCityName} to {el.RegionToCityName}
          </div>
          <div>{el.DistanceKm.toLocaleString("en-US")} km</div>
        </Link>
      ))}
      <button className="mt-3 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
        All {city} Driving Distances
      </button>
    </div>
  );
};
