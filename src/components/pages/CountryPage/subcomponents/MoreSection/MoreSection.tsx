import Image from "next/image";
import { PlaneImageSlider } from "~/src/assets";
import type { RegionType } from "~/src/utils/types";

interface MoreSectionProps {
  region: RegionType;
}

export const MoreSection = ({region}: MoreSectionProps) => {
  return (
    <section className="container lg:mt-7 mt-5">
      <h3 className="mb-6 lg:px-8 px-5 lg:text-3xl font-bold leading-8 tracking-wider">
        Explore more of {region.Country}
      </h3>
      <div className="grid lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 lg:gap-6 gap-2">
        <div className="flex items-center gap-5 rounded-md bg-white p-7">
          <Image className="w-28 rounded-md" src={PlaneImageSlider} alt="" />
          <div className="font-bold">
            {region.Country} <br /> Guide
          </div>
        </div>
        <div className="flex items-center gap-5 rounded-md bg-white p-7">
          <Image className="w-28 rounded-md" src={PlaneImageSlider} alt="" />
          <div className="font-bold">Flying distances  {region.Country}</div>
        </div>
        <div className="flex items-center gap-5 rounded-md bg-white p-7">
          <Image className="w-28 rounded-md" src={PlaneImageSlider} alt="" />
          <div className="font-bold">Driving distances {region.Country}</div>
        </div>
      </div>
    </section>
  );
};
