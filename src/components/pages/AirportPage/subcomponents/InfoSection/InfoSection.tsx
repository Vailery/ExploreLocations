import Image from "next/image";
import { Fragment, useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowIcon,
  CityIcon,
  CoordinatesIcon,
  FlagIcon,
  HashtagIcon,
  PathIcon,
  PlaneIcon,
  PlaneImageSlider,
} from "~/src/assets";
import { Navigation } from "swiper";
import "swiper/css";
import type { AirportItem } from "~/src/server/api/routers/airport";
import { convertCoordinates } from "~/src/utils/convertCoordinates";

interface InfoSectionProps {
  airportInfo: AirportItem;
}

export const InfoSection = ({ airportInfo }: InfoSectionProps) => {
  const info = [
    {
      icon: <PlaneIcon className="w-6" />,
      text: `Airport name:  ${airportInfo.Name}`,
    },
    {
      icon: <CityIcon className="w-6" />,
      text: `City:  ${airportInfo.City}`,
    },
    {
      icon: <FlagIcon className="w-6 text-white" />,
      text: `JosCountry: ${airportInfo.Country}`,
    },
    {
      icon: <HashtagIcon className="w-6" />,
      text: `IATA Code: ${airportInfo.IATA}`,
    },
    {
      icon: <HashtagIcon className="w-6" />,
      text: `ICAO Code: ${airportInfo.ICAO}`,
    },
    {
      icon: <CoordinatesIcon className="w-6" />,
      text: `Coordinates: Latitude: ${convertCoordinates(
        airportInfo.CenterY
      )}, Longitude: ${convertCoordinates(airportInfo.CenterX, true)}`,
    },
    {
      //  Skip for now
      icon: <PathIcon className="w-6" />,
      text: "Runways:  Direction: 10/28, Length: 9845 x 148 ft",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevButton = useRef(null);
  const nextButton = useRef(null);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <section className="container mb-3 grid grid-cols-1 grid-rows-[auto_auto] gap-5 lg:grid-cols-[2fr,1fr] lg:grid-rows-1">
      <div className="bg-gradientRight px-3 pb-5 pt-3 lg:rounded-md lg:px-8 lg:py-6">
        <div className="mb-5 flex items-center gap-2 lg:gap-5">
          <PlaneIcon className="h-7 w-14 lg:w-auto" />
          <h3 className="text-lg font-bold leading-3 tracking-[0.08em] text-white lg:text-4xl">
            {airportInfo.Name}
          </h3>
        </div>
        <p className="mb-4 leading-7 tracking-wider text-white lg:mb-7 lg:leading-8">
          For years it has been known as &rdquo;Europe&apos;s Leading
          Airport&rdquo;. Nowhere else do departing passengers, transiting
          passengers and home-coming passengers feel more comfortable than here.
          Zurich is also the home of SWISS.
        </p>
        <h4 className="mb-8 font-bold text-white lg:mb-10">Airport Details</h4>
        <div>
          {info.map((item, idx) => (
            <Fragment key={idx}>
              <div className="flex gap-2">
                {item.icon}
                <p className="tracking-wider text-white">{item.text}</p>
              </div>
              {idx !== info.length - 1 && (
                <hr className="my-[0.87rem] w-full lg:my-[1.05rem]" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="mx-3 h-fit overflow-hidden rounded-md bg-white lg:mx-0">
        <h3 className="bg-redBg px-8 py-5 text-xl font-bold text-white">
          Flight Distance
        </h3>
        <div className="px-8 pb-5 pt-7 text-lg lg:pb-7">
          <p className="">Search by airport name, city or IATA airport code.</p>
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 py-4 italic text-white"
            placeholder="Name, city or IATA"
          />
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 py-4 italic text-white"
            placeholder="Name, city or IATA"
          />
          <button className="mt-1 w-full rounded-md bg-buttonBg py-3 text-lg text-white lg:mt-7">
            Calculate Distance
          </button>
          <p className="mt-6 text-base font-bold lg:mt-8">{airportInfo.Name}</p>
          <div className="relative mt-6">
            {hasMounted && (
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                navigation={{
                  nextEl: nextButton.current,
                  prevEl: prevButton.current,
                }}
              >
                {new Array(15).fill(0).map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <Image className="w-full" src={PlaneImageSlider} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="absolute bottom-3 left-1/2 z-10 flex h-9 w-2/5 -translate-x-1/2 items-center justify-between rounded-md bg-blackTransparent text-sm text-white">
              <div ref={prevButton}>
                <ArrowIcon className="w-7 cursor-pointer" />
              </div>
              <div>
                {currentSlide + 1} / {15}
              </div>
              <div ref={nextButton}>
                <ArrowIcon className="w-7 rotate-180 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
