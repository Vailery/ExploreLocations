import dynamic from "next/dynamic";
import MarkerIcon from "~/src/assets/images/icons/marker.svg";
import type { CoordinatesType } from "~/src/utils/types";

interface IMapSection {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  description: string;
  polygon?: CoordinatesType;
}

export const MapSection = ({ name, position, description, polygon }: IMapSection) => {
  const ClientMap = dynamic(
    () => import("~/src/components/shared/Map/MapContainer"),
    {
      ssr: false,
    }
  );

  return (
    <section className="container mb-6 rounded-md bg-white pt-6 lg:mb-3">
      <h3 className="mb-2 px-3 text-lg font-bold tracking-wide lg:mb-7 lg:px-6 lg:text-3xl lg:tracking-wider">
        Discover more around {name}
      </h3>
      <div className="relative">
        <div className="absolute right-3 top-11 z-30 w-[15.5rem] rounded-md bg-white p-4 lg:right-5 lg:top-16 lg:w-[21rem]">
          <div className="flex items-center gap-3">
            <MarkerIcon className="w-10 text-redBg" />
            <div className="text-md font-bold leading-5 tracking-tight lg:text-lg">
              {name}
            </div>
          </div>
          <p className="leading-7 lg:leading-8">
            {description.split(" ").length > 10
              ? description.split(" ").slice(0, 10).join(" ") + "..."
              : description}
          </p>
          <button className="mt-4 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
            View flying routes
          </button>
        </div>
        <div className="relative z-0 h-[29rem] w-full lg:h-[39rem]">
          <ClientMap
            position={position}
            mainMarkers={[position]}
            zoom={13}
            polygon={polygon}
          />
        </div>
      </div>
    </section>
  );
};
