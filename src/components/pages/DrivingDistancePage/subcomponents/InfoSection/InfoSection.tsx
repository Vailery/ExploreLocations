import { Fragment } from "react";

interface InfoSectionProps {
  originX: number;
  originY: number;
  destinationX: number;
  destinationY: number;
  from: string;
  to: string;
  distance: number;
  distanceMiles: number;
  flightKm: number;
  flightMiles: number;
  time: string;
  countryTo: string;
  countryFrom: string;
}

const speedArray = [
  {
    value: 48,
    speed: "30 mph (48 km/h)",
  },
  {
    value: 64,
    speed: "40 mph (64 km/h)",
  },
  {
    value: 80,
    speed: "50 mph (80 km/h)",
  },
  {
    value: 97,
    speed: "60 mph (97 km/h)",
  },
  {
    value: 112,
    speed: "70 mph (112 km/h)",
  },
  {
    value: 128,
    speed: "80 mph (128 km/h)",
  },
];

export const InfoSection = ({
  originX,
  originY,
  destinationX,
  destinationY,
  from,
  to,
  distance,
  distanceMiles,
  flightKm,
  flightMiles,
  time,
  countryTo,
  countryFrom,
}: InfoSectionProps) => {  
  return (
    <section className="container mb-4 grid grid-cols-1 grid-rows-[auto_auto] gap-5 lg:grid-cols-[2fr,1fr] lg:grid-rows-1">
      <div className="bg-white px-3 pb-5 pt-4 lg:rounded-md lg:px-6 lg:pt-4">
        <div className="mb-4 flex items-center gap-2 lg:mb-4 lg:gap-5">
          <h3 className="text-lg font-bold tracking-[0.08em] lg:text-3xl">
            How far is {from} from {to}?
          </h3>
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          The driving distance between {from} and {to} is{" "}
          {distance.toLocaleString("en-US")} kilometers, which is the equivalent
          of {distanceMiles.toLocaleString("en-US")} miles.
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          The air distance from {from} to {to} is{" "}
          {flightKm.toLocaleString("en-US")} kilometers /{" "}
          {flightMiles.toLocaleString("en-US")} miles.
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          {from} is located in {countryFrom}, on the following coordinates:{" "}
          {originX}, {originY}.
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          {to} is located in {countryTo}, on the following coordinates:{" "}
          {destinationX}, {destinationY}.
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          <h3 className="text-lg font-bold tracking-[0.08em] lg:text-3xl">
            How long does it take to drive from {from} from {to}?
          </h3>
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          {/* look here */}
          On average, it would take you {time} to drive from {from} to {to}.
          However, the driving time depends on several factors such as: road
          conditions, traffic, weather and stops.
        </div>
        <div className="mb-8 leading-8 tracking-wider">
          To help you get a better understanding of the distance and time
          required to drive from {from} to {to}, below we have calculated the
          driving time, based on different average speeds.
        </div>
        <h3 className="mb-10 font-bold lg:text-xl">Estimated Driving Time</h3>
        <div className="grid grid-cols-2 gap-y-[1.6rem]">
          <span className="mb-6 hidden font-bold lg:block">Average Speed</span>
          <span className="hidden font-bold lg:block">Driving Time</span>
          {speedArray.map((el, idx) => (
            <Fragment key={idx}>
              <span className="border-b border-grayText pb-2">{el.speed}</span>
              <span className="border-b border-grayText pb-2">
                {`${Math.trunc(distance / el.value)} hours ${Math.round(
                  ((Math.trunc((distance / el.value) * 100) % 100) / 100) * 60
                )} minutes`}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="mx-3 h-fit rounded-md bg-white lg:mx-0">
        <h3 className="rounded-[0.375rem_0.375rem_0_0] bg-redBg px-6 py-4 text-xl font-bold text-white lg:px-8 lg:py-5">
          Driving Distance
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
