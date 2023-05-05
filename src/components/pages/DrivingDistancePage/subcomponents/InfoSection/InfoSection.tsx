import { Fragment } from "react";
import "swiper/css";

export const InfoSection = () => {
  return (
    <section className="container mb-4 grid grid-cols-1 grid-rows-[auto_auto] gap-5 lg:grid-cols-[2fr,1fr] lg:grid-rows-1">
      <div className="bg-white px-3 pb-5 pt-4 lg:rounded-md lg:px-6 lg:pt-4 lg:pb-32">
        <div className="mb-4 flex items-center gap-2 lg:mb-4 lg:gap-5">
          <h3 className="text-lg font-bold tracking-[0.08em] lg:text-3xl">
            How far is San Antonio from Playa del Carmen?
          </h3>
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          The driving distance from San Antonio to Playa del Carmen is 2,719
          miles which is the equivalent of 1,689 km.
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          If you were to drive without a stop, it would take you around 24 hours
          and 16 minutes to complete the journey.
        </div>
        <div className="mb-1 leading-8 tracking-wider">
          The driving route between Playa del Carmen and San Antonio is long, so
          it&apos;s probably best to make it a multi-day journey.
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          The straight line flight distance is 1,508 km which is the equivalent
          of 937 miles.
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          San Antonio is located on the following coordinates: 29.4241, -98.4936
          , in United States. Playa del Carmen is located on the following
          coordinates: 20.6274, -87.0799 , in Mexico.
        </div>
        <div className="mb-[19.8rem] leading-8 tracking-wider">
          San Antonio and Playa del Carmen are located in different countries,
          so consider the time spent at the border crossing.
        </div>
        <h3 className="mb-10 text-xl font-bold">
          Estimated Driving Time Between San Antonio and Playa del Carmen
        </h3>
        <div className="grid grid-cols-2 gap-y-[1.6rem]">
          <span className="font-bold mb-6">Average Speed</span>
          <span className="font-bold">Driving Time</span>
          {new Array(7).fill(0).map((_, idx) => (
            <Fragment key={idx}>
              <span className="pb-2 border-b border-grayText">30 mph (48 km/h)</span>
              <span className="pb-2 border-b border-grayText">09 hours 19 minutes</span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="mx-3 h-fit rounded-md bg-white lg:mx-0">
        <h3 className="rounded-[0.375rem_0.375rem_0_0] bg-redBg px-6 py-4 text-xl font-bold text-white lg:px-8 lg:py-5">
          Flight Distance
        </h3>
        <div className="px-8 pb-5 pt-7 text-lg lg:pb-7">
          <p className="">Search by point of interest name.</p>
          <input
            className="mt-6 w-full rounded-md bg-grayBg px-3 py-3 italic text-white lg:py-4"
            placeholder="Location"
          />
          <input
            className="mt-4 w-full rounded-md bg-grayBg px-3 py-3 italic text-white lg:py-4"
            placeholder="Location"
          />
          <button className="mt-5 w-full rounded-md bg-buttonBg py-3 text-lg text-white lg:mt-7">
            Calculate Distance
          </button>
        </div>
      </div>
    </section>
  );
};
