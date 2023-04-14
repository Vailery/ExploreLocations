import dynamic from "next/dynamic";
import Image from "next/image";
import { AirportImage, MarkerIcon } from "~/src/assets";

const position = { lat: 47.449577268745834, lng: 8.567820593313629 };

export const MapSection = () => {
  const ClientMap = dynamic(() => import("../Map/Map"), {
    ssr: false,
  });

  return (
    <section className="container lg:mb-3 mb-6 rounded-md bg-white pt-6">
      <h3 className="lg:mb-7 mb-2 lg:px-6 px-3 lg:text-3xl text-lg font-bold lg:tracking-wider tracking-wide">
        Discover more around Zürich Kloten Airport
      </h3>
      <div className="relative">
        <div className="absolute lg:right-5 right-3 lg:top-16 top-11 z-30 lg:h-[23.4rem] w-[15.5rem] lg:w-[21rem] rounded-md bg-white p-4">
          <div className="flex items-center gap-3">
            <Image src={MarkerIcon} alt="" className="lg:w-10 w-9" />
            <div className="lg:text-lg text-md font-bold leading-5 tracking-tight">
              Zürich Kloten Airport
            </div>
          </div>
          <p className="lg:leading-8 leading-7">
            Willkommen am schönsten Seeufer Zürichs. Hier liegt eine maritime
            Welt für sich
          </p>
          <Image src={AirportImage} alt="" className="mt-2 w-full lg:h-auto h-24" />
          <button className="mt-4 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
            View distance
          </button>
        </div>
        <div className="relative z-0 lg:h-[39rem] h-[29rem] w-full">
          <ClientMap position={position} zoom={14.5} />
        </div>
      </div>
    </section>
  );
};
