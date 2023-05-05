import { MarkerIcon } from "~/src/assets";

export const DescriptionSection = () => (
  <section className="relative w-full bg-gradientLeft mb-3 lg:mb-7">
    <div className="container pb-9 pt-7 lg:pb-[1.8rem] lg:pt-[3rem]">
      <h2 className="relative z-10 mb-9 text-center text-[2.5rem] leading-[2.7rem] font-bold lg:leading-[5rem] tracking-wider text-white lg:mb-5 lg:text-[4.5rem] lg:tracking-wide">
        Bucharest to London
        <br />
        Flight Duration
      </h2>
      <h3 className="mx-auto mb-8 px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-4/6 lg:text-base lg:leading-8">
        Given below is the distance between Bucharest, Romania to London, United
        Kingdom
      </h3>
      <div className="relative mx-auto w-[93%] lg:w-[63%] rounded-md bg-white px-2 lg:px-6 pt-4 lg:pt-7 pb-7 lg:pb-5">
        <div className="mb-2 flex items-center justify-between">
          <div>From</div>
          <div>To</div>
        </div>
        <div className="mb-6 lg:mb-4 flex items-center justify-between">
          <div className="lg:text-xl font-bold">Bucharest</div>
          <div className="lg:text-xl font-bold">London</div>
        </div>
        <div className="dashed-border h-[1.5px] w-full" />
        <div className="mt-14 lg:mt-12 text-center">
          <h3 className="lg:text-xl font-bold">
            Average flight time is 3 hours 30 minutes
          </h3>
          <h4 className="lg:mt-2 tracking-wider">
            The fastest flight time from Bucharest to London is{" "}
            <span className="font-bold">3 hours 25 minutes</span>
          </h4>
        </div>
        <MarkerIcon className="text-redBg absolute left-1/2 -translate-x-1/2 w-[4.2rem] top-14" />
      </div>
    </div>
  </section>
);
