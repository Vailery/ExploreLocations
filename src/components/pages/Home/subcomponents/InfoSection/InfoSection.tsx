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

const info = [
  {
    icon: PlaneIcon,
    text: "Airport name:  Zürich Kloten Airport",
  },
  {
    icon: CityIcon,
    text: "City:  Zürich",
  },
  {
    icon: FlagIcon,
    text: "JosCountry: Switzerland",
  },
  {
    icon: HashtagIcon,
    text: "IATA Code:  JOS",
  },
  {
    icon: HashtagIcon,
    text: "ICAO Code:  DNJO",
  },
  {
    icon: CoordinatesIcon,
    text: "Coordinates: Latitude: 9°38′23″N, Longitude: 8°52′8″E",
  },
  {
    icon: PathIcon,
    text: "Runways:  Direction: 10/28, Length: 9845 x 148 ft",
  },
];

export const InfoSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevButton = useRef(null);
  const nextButton = useRef(null);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <section className="container mb-3 grid lg:grid-cols-[2fr,1fr] grid-cols-1 grid-rows-[auto_auto] lg:grid-rows-1 gap-5">
      <div className="lg:rounded-md bg-gradientRight lg:px-8 px-3 lg:py-6 pt-3 pb-1">
        <div className="mb-5 flex items-center lg:gap-5 gap-2">
          <Image src={PlaneIcon} alt="" className="lg:w-auto w-9" />
          <h3 className="lg:text-4xl text-lg font-bold leading-3 tracking-[0.08em] text-white">
            Zürich Kloten Airport
          </h3>
        </div>
        <p className="lg:mb-7 mb-4 lg:leading-8 leading-7 tracking-wider text-white">
          For years it has been known as &rdquo;Europe&apos;s Leading
          Airport&rdquo;. Nowhere else do departing passengers, transiting
          passengers and home-coming passengers feel more comfortable than here.
          Zurich is also the home of SWISS.
        </p>
        <h4 className="lg:mb-10 mb-8 font-bold text-white">Airport Details</h4>
        <div>
          {info.map((item, idx) => (
            <Fragment key={idx}>
              <div className="flex gap-2">
                <Image className="w-6" src={item.icon} alt="" />
                <p className="tracking-wider text-white">{item.text}</p>
              </div>
              {idx !== info.length - 1 && (
                <hr className="lg:my-[1.05rem] my-[0.87rem] w-full" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-md bg-white lg:mx-0 mx-3 h-fit">
        <h3 className="bg-redBg px-8 py-5 text-xl font-bold text-white">
          Flight Distance
        </h3>
        <div className="px-8 lg:pb-7 pt-7 pb-5 text-lg">
          <p className="">Search by airport name, city or IATA airport code.</p>
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 py-4 italic text-white"
            placeholder="Name, city or IATA"
          />
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 py-4 italic text-white"
            placeholder="Name, city or IATA"
          />
          <button className="lg:mt-7 mt-1 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
            Calculate Distance
          </button>
          <p className="lg:mt-8 mt-6 text-base font-bold">Zürich Kloten Airport</p>
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
                <div className="absolute bottom-3 left-1/2 z-10 flex h-9 w-2/5 -translate-x-1/2 items-center justify-between rounded-md bg-blackTransparent text-sm text-white">
                  <Image
                    ref={prevButton}
                    className="w-7 cursor-pointer"
                    src={ArrowIcon}
                    alt=""
                  />
                  <div>
                    {currentSlide + 1} / {15}
                  </div>
                  <Image
                    ref={nextButton}
                    className="w-7 rotate-180 cursor-pointer"
                    src={ArrowIcon}
                    alt=""
                  />
                </div>
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
