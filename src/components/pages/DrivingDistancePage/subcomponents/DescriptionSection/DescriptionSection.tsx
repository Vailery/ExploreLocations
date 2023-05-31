import { CarMarkerIcon, CityIcon } from "~/src/assets";

interface DescriptionSectionProps {
  from: string;
  to: string;
  distance: number;
  time: string;
  distanceMiles: number;
}

const drivingSpeed = 80

export const DescriptionSection = ({
  from,
  to,
  distance,
  time,
  distanceMiles,
}: DescriptionSectionProps) => (
  <section className="relative mb-3 w-full bg-gradientLeft lg:mb-7">
    <div className="container pb-9 pt-7 lg:pb-[5.4rem] lg:pt-[4.8rem]">
      <h2 className="relative z-10 mb-[7.4rem] text-center text-[2.5rem] font-bold leading-[2.7rem] tracking-wider text-white lg:mb-[5.4rem] lg:text-[4.5rem] lg:leading-[5rem] lg:tracking-wide">
        Distance from {from} to {to}
      </h2>
      <div className="relative mx-auto w-[93%] rounded-md bg-white px-2 pb-7 pt-4 lg:w-[63%] lg:px-6 lg:pb-5 lg:pt-7">
        <div className="mb-2 flex items-center justify-between">
          <div>From</div>
          <div>To</div>
        </div>
        <div className="mb-6 flex items-center justify-between lg:mb-4">
          <div className="flex items-center gap-1 font-bold lg:text-xl">
            <CityIcon className="text-redBg" />
            {from}
          </div>
          <div className="flex items-center gap-1 font-bold lg:text-xl">
            <CityIcon className="text-redBg" />
            {to}
          </div>
        </div>
        <div className="dashed-border h-[1.5px] w-full" />
        <div className="mt-12 text-center lg:mt-[3.2rem]">
          <h3 className="font-bold lg:text-xl">
            The driving distance between {from} and {to}
          </h3>
          <h4 className="text-lg tracking-wider lg:mt-1">
            is {distanceMiles} miles ({distance} km), and could be completed in
            around{" "}
            {time ||
              `${Math.trunc(distance / drivingSpeed)} hours ${Math.round(
                ((Math.trunc((distance / drivingSpeed) * 100) % 100) / 100) * 60
              )} minutes`}
            .
          </h4>
        </div>
        <CarMarkerIcon className="absolute left-1/2 top-10 w-[4.2rem] -translate-x-1/2 text-redBg lg:top-14" />
      </div>
    </div>
  </section>
);
