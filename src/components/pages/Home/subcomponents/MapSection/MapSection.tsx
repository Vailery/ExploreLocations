import dynamic from "next/dynamic";
import Image from "next/image";
import { AirportImage, MarkerIcon } from "~/src/assets";

const position = { lat: 47.449577268745834, lng: 8.567820593313629 };

interface IMapSection {
  name: string;
}

export const MapSection = ({ name }: IMapSection) => {
  const ClientMap = dynamic(() => import("../Map/Map"), {
    ssr: false,
  });

  return (
    <section className="container mb-6 rounded-md bg-white pt-6 lg:mb-3">
      <h3 className="mb-2 px-3 text-lg font-bold tracking-wide lg:mb-7 lg:px-6 lg:text-3xl lg:tracking-wider">
        Discover more around {name}
      </h3>
      <div className="relative">
        <div className="absolute right-3 top-11 z-30 w-[15.5rem] rounded-md bg-white p-4 lg:right-5 lg:top-16 lg:h-[23.4rem] lg:w-[21rem]">
          <div className="flex items-center gap-3">
            <Image src={MarkerIcon} alt="" className="w-9 lg:w-10" />
            <div className="text-md font-bold leading-5 tracking-tight lg:text-lg">
              {name}
            </div>
          </div>
          <p className="leading-7 lg:leading-8">
            Willkommen am schönsten Seeufer Zürichs. Hier liegt eine maritime
            Welt für sich
          </p>
          <Image
            src={AirportImage}
            alt=""
            className="mt-2 h-24 w-full lg:h-auto"
          />
          <button className="mt-4 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
            View distance
          </button>
        </div>
        <div className="relative z-0 h-[29rem] w-full lg:h-[39rem]">
          <ClientMap position={position} zoom={14.5} />
        </div>
      </div>
    </section>
  );
};
