import Image from "next/image";
import Link from "next/link";
import { PlaneImageSlider } from "~/src/assets";
import type { RegionType } from "~/src/utils/types";

interface MoreSectionProps {
  region: RegionType;
}

export const MoreSection = ({ region }: MoreSectionProps) => {
  return (
    <section className="container mt-5 lg:mt-7">
      <h3 className="mb-6 px-5 font-bold leading-8 tracking-wider lg:px-8 lg:text-3xl">
        Explore more of {region.Country}
      </h3>
      <div className="grid grid-rows-3 gap-2 lg:grid-cols-3 lg:grid-rows-1 lg:gap-6">
        <div className="flex items-center gap-5 rounded-md bg-white p-7">
          <Image className="w-28 rounded-md" src={PlaneImageSlider} alt="" />
          <div className="font-bold">
            {region.Country} <br /> Guide
          </div>
        </div>
        <Link
          href={`/flying-hub/${region.Country.replaceAll(" ", "_")}`}
          className="flex items-center gap-5 rounded-md bg-white p-7"
        >
          <Image className="w-28 rounded-md" src={PlaneImageSlider} alt="" />
          <div className="font-bold">Flying distances {region.Country}</div>
        </Link>
        <Link
          href={`/driving-hub/${region.Country.replaceAll(" ", "_")}`}
          className="flex items-center gap-5 rounded-md bg-white p-7"
        >
          <Image className="w-28 rounded-md" src={PlaneImageSlider} alt="" />
          <div className="font-bold">Driving distances {region.Country}</div>
        </Link>
      </div>
    </section>
  );
};
