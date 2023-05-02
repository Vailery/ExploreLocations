import { MarkerIcon } from "~/src/assets";

export const DescriptionSection = () => (
  <section className="relative w-full bg-gradientLeft lg:mb-7">
    <div className="container pb-9 pt-6 lg:pb-[1.8rem] lg:pt-[3rem]">
      <h2 className="relative z-10 mb-6 text-center text-[2.5rem] font-bold leading-[5rem] tracking-wider text-white lg:mb-5 lg:text-[4.5rem] lg:tracking-wide">
        Bucharest to London
        <br />
        Flight Duration
      </h2>
      <h3 className="mx-auto mb-8 px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-4/6 lg:text-base lg:leading-8">
        Given below is the distance between Bucharest, Romania to London, United
        Kingdom
      </h3>
      <div className="relative mx-auto w-[63%] rounded-md bg-white px-6 pt-7 pb-5">
        <div className="mb-2 flex items-center justify-between">
          <div>From</div>
          <div>To</div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xl font-bold">Bucharest</div>
          <div className="text-xl font-bold">London</div>
        </div>
        <div className="dashed-border h-[1.5px] w-full" />
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold">
            Average flight time is 3 hours 30 minutes
          </h3>
          <h4 className="mt-2 tracking-wider">
            The fastest flight time from Bucharest to London is{" "}
            <span className="font-bold">3 hours 25 minutes</span>
          </h4>
        </div>
        <MarkerIcon className="text-redBg absolute left-1/2 -translate-x-1/2 w-[4.2rem] top-14" />
      </div>
    </div>
  </section>
);
