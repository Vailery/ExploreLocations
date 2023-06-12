import { iso1A2Code } from "@rapideditor/country-coder";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import type { AirportItem } from "~/src/utils/types";

interface InfoSectionProps {
  FlightDuration: string;
  OriginCityName: string;
  DestinationCityName: string;
  OriginCountryName: string;
  DestinationCountryName: string;
  DistanceKm: number;
  DistanceMiles: number;
  airportsAroundOrigin: AirportItem[];
  airportsAroundDestination: AirportItem[];
  originCountryId: number;
  destinationCountryId: number;
}

export const InfoSection = ({
  FlightDuration,
  OriginCityName,
  DestinationCityName,
  OriginCountryName,
  DestinationCountryName,
  DistanceMiles,
  DistanceKm,
  airportsAroundOrigin,
  airportsAroundDestination,
  originCountryId,
  destinationCountryId,
}: InfoSectionProps) => {
  return (
    <section className="container mb-4 grid grid-cols-1 grid-rows-[auto_auto] gap-5 lg:grid-cols-[2fr,1fr] lg:grid-rows-1">
      <div className="bg-white px-3 pb-5 pt-4 lg:rounded-md lg:px-8 lg:py-5">
        <div className="mb-4 flex items-center gap-2 lg:gap-5">
          <h3 className="text-lg font-bold tracking-[0.08em] lg:text-3xl">
            What&apos;s the flight time from {OriginCityName} to{" "}
            {DestinationCityName}?
          </h3>
        </div>
        <ul className="flex flex-col gap-3">
          <li className="leading-8 tracking-wide">
            The flight duration from {OriginCityName} to {DestinationCityName}{" "}
            is {FlightDuration}.
          </li>
          <li>
            The flight time depends on the aircraft cruising speed, weather
            conditions and wind. To calculate it, we have used the average
            flight speed of commercial airplanes which is 500 mph, or around 804
            km/h.
          </li>
          <li className="leading-8  tracking-wide">
            <h3 className="text-lg font-bold tracking-[0.08em] lg:text-3xl">
              What&apos;s the flight distance between {OriginCityName} and{" "}
              {DestinationCityName}?
            </h3>
          </li>
          <li className="leading-8  tracking-wide">
            The flight distance between {OriginCityName} and{" "}
            {DestinationCityName} is {DistanceMiles.toLocaleString()} miles,
            which is the equivalent of
            {DistanceKm.toLocaleString()} kilometers.
          </li>
          <li className="leading-8  tracking-wide">
            In the calculation, we have assumed a straight line ( as the crow
            flies ), but the distance might differ, especially if you have a
            stopover.
          </li>
          <li className="leading-8 tracking-wide">
            <h4 className="font-bold tracking-[0.08em] lg:text-3xl">
              International Airports near {OriginCityName}, {OriginCountryName}
            </h4>
            Closest International Airports to {OriginCityName}:
            {airportsAroundOrigin.length && (
              <ul className="flex list-inside list-disc flex-col">
                {airportsAroundOrigin.map((el, idx) => (
                  <li key={idx}>
                    <Link
                      className="text-buttonBg"
                      href={`/airport/${el.id}/${el.Name.replaceAll(
                        " ",
                        "_"
                      ).toLowerCase()}`}
                    >
                      {el.Name}
                    </Link>{" "}
                    - {el.Distance} km / {Math.trunc((el.Distance || 0) * 0.62)}{" "}
                    miles away ({el.Country})
                    <ReactCountryFlag
                      countryCode={iso1A2Code(el.Country || "US") || "US"}
                      svg
                      style={{
                        marginLeft: "10px",
                        width: "30px",
                        height: "20px",
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`/airports/${originCountryId}/${OriginCountryName}`}
              className="text-buttonBg"
            >
              Explore more airports from {OriginCountryName}
            </Link>
          </li>
          <li className="leading-8 tracking-wide">
            <h4 className="font-bold tracking-[0.08em] lg:text-3xl">
              International Airports near {DestinationCityName},{" "}
              {DestinationCountryName}
            </h4>
            Closest International Airports to {DestinationCityName}:
            {airportsAroundDestination.length && (
              <ul className="flex list-inside list-disc flex-col">
                {airportsAroundDestination.map((el, idx) => (
                  <li key={idx}>
                    <Link
                      className="text-buttonBg"
                      href={`/airport/${el.id}/${el.Name.replaceAll(
                        " ",
                        "_"
                      ).toLowerCase()}`}
                    >
                      {el.Name}
                    </Link>{" "}
                    - {el.Distance} km / {Math.trunc((el.Distance || 0) * 0.62)}{" "}
                    miles away
                    <ReactCountryFlag
                      countryCode={iso1A2Code(el.Country || "US") || "US"}
                      svg
                      style={{
                        marginLeft: "10px",
                        width: "30px",
                        height: "20px",
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`/airports/${destinationCountryId}/${DestinationCountryName}`}
              className="text-buttonBg"
            >
              Explore more airports from {DestinationCountryName}
            </Link>
          </li>
        </ul>
      </div>
      <div className="mx-3 h-fit rounded-md bg-white lg:mx-0">
        <h3 className="rounded-[0.375rem_0.375rem_0_0] bg-redBg px-6 py-4 text-xl font-bold text-white lg:px-8 lg:py-5">
          Flight Distance
        </h3>
        <div className="px-8 pb-5 pt-7 text-lg lg:pb-7">
          <p className="">Search by airport name, city or IATA airport code.</p>
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 py-3 italic text-white lg:py-4"
            placeholder="Name, city or IATA"
          />
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 py-3 italic text-white lg:py-4"
            placeholder="Name, city or IATA"
          />
          <button className="mt-5 w-full rounded-md bg-buttonBg py-3 text-lg text-white lg:mt-7">
            Calculate Distance
          </button>
        </div>
      </div>
    </section>
  );
};
