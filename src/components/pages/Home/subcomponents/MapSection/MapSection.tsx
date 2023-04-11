import dynamic from "next/dynamic";
import Image from "next/image";
import { airportImage, Marker } from "~/src/assets";

const position = { lat: 47.449577268745834, lng: 8.567820593313629 };

export const MapSection = () => {
  const ClientMap = dynamic(() => import("../Map/Map"), {
    ssr: false,
  });

  return (
    <section className="container mt-6 rounded-md bg-white pb-7 pt-6">
      <h3 className="mb-7 px-6 text-3xl font-bold tracking-wider">
        Discover more around Zürich Kloten Airport
      </h3>
      <div className="relative">
        <div className="absolute right-5 top-16 z-30 h-[23.4rem] w-[21rem] rounded-md bg-white p-4">
          <div className="flex items-center gap-3">
            <Image src={Marker} alt="" className="w-10" />
            <div className="text-lg font-bold leading-5 tracking-tight">
              Zürich Kloten Airport
            </div>
          </div>
          <p className="leading-8">
            Willkommen am schönsten Seeufer Zürichs. Hier liegt eine maritime
            Welt für sich
          </p>
          <Image src={airportImage} alt="" className="mt-2 w-full" />
          <button className="w-full rounded-md bg-buttonBg mt-4 text-white py-3 text-lg">
            View distance
          </button>
        </div>
        <div className="relative z-0 h-[39rem] w-full">
          <ClientMap position={position} />
        </div>
      </div>
    </section>
  );
};
