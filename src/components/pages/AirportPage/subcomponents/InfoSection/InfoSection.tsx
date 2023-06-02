import { Fragment } from "react";
import {
  CityIcon,
  CoordinatesIcon,
  FlagIcon,
  HashtagIcon,
  PlaneIcon,
} from "~/src/assets";
import "swiper/css";
import type { AirportItem } from "~/src/utils/types";
import { convertCoordinates } from "~/src/utils/convertCoordinates";

interface InfoSectionProps {
  airportInfo: AirportItem;
}

export const InfoSection = ({ airportInfo }: InfoSectionProps) => {
  const info = [
    airportInfo.Name ? (
      <>
        <div className="flex gap-2">
          <PlaneIcon className="w-6" />
          <p className="tracking-wider text-white">
            Airport name: {airportInfo.Name}
          </p>
        </div>
        <hr className="my-[0.87rem] w-full lg:my-[1.05rem]" />
      </>
    ) : (
      <></>
    ),
    airportInfo.City ? (
      <>
        <div className="flex gap-2">
          <CityIcon className="w-6 text-white" />
          <p className="tracking-wider text-white">City: {airportInfo.City}</p>
        </div>
        <hr className="my-[0.87rem] w-full lg:my-[1.05rem]" />
      </>
    ) : (
      <></>
    ),
    airportInfo.Country ? (
      <>
        <div className="flex gap-2">
          <FlagIcon className="w-6 text-white" />
          <p className="tracking-wider text-white">
            Country: {airportInfo.Country}
          </p>
        </div>
        <hr className="my-[0.87rem] w-full lg:my-[1.05rem]" />
      </>
    ) : (
      <></>
    ),
    airportInfo.IATA ? (
      <>
        <div className="flex gap-2">
          <HashtagIcon className="w-6" />
          <p className="tracking-wider text-white">
            IATA Code: {airportInfo.IATA}
          </p>
        </div>
        <hr className="my-[0.87rem] w-full lg:my-[1.05rem]" />
      </>
    ) : (
      <></>
    ),
    airportInfo.ICAO ? (
      <>
        <div className="flex gap-2">
          <HashtagIcon className="w-6" />
          <p className="tracking-wider text-white">
            ICAO Code: {airportInfo.ICAO}
          </p>
        </div>
        <hr className="my-[0.87rem] w-full lg:my-[1.05rem]" />
      </>
    ) : (
      <></>
    ),
    airportInfo.CenterX && airportInfo.CenterY ? (
      <>
        <div className="flex gap-2">
          <CoordinatesIcon className="w-9" />
          <p className="tracking-wider text-white">
            Coordinates: Latitude: {convertCoordinates(airportInfo.CenterY)},
            Longitude: {convertCoordinates(airportInfo.CenterX, true)}
          </p>
        </div>
        <hr className="my-[0.87rem] w-full lg:my-[1.05rem]" />
      </>
    ) : (
      <></>
    ),
    // {
    //   //  Skip for now
    //   icon: <PathIcon className="w-6" />,
    //   text: "Runways:  Direction: 10/28, Length: 9845 x 148 ft",
    // },
  ];
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const prevButton = useRef(null);
  // const nextButton = useRef(null);

  // const [hasMounted, setHasMounted] = useState(false);

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);
  return (
    <section className="container mb-3 grid grid-cols-1 grid-rows-[auto_auto] gap-5 lg:grid-cols-[2fr,1fr] lg:grid-rows-1">
      <div className="bg-gradientRight px-3 pb-5 pt-3 lg:rounded-md lg:px-8 lg:py-6">
        <div className="mb-5 flex items-center gap-2 lg:gap-5">
          <PlaneIcon className="h-7 w-14 lg:w-auto" />
          <h3 className="text-lg font-bold lg:leading-3 tracking-[0.08em] text-white lg:text-4xl">
            {airportInfo.Name}
          </h3>
        </div>
        {/* <p className="mb-4 leading-7 tracking-wider text-white lg:mb-7 lg:leading-8">
          {airportInfo.SeoDescriptionEn.split(" ").length > 20
            ? airportInfo.SeoDescriptionEn.split(" ").slice(0, 20).join(" ") +
              "..."
            : airportInfo.SeoDescriptionEn}
        </p> */}
        <h4 className="mb-8 font-bold text-white lg:mb-10">Airport Details</h4>
        <div>
          {info.map((item, idx) => (
            <Fragment key={idx}>{item}</Fragment>
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
          {/* <p className="mt-6 text-base font-bold lg:mt-8">{airportInfo.Name}</p>
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
          </div> */}
        </div>
      </div>
    </section>
  );
};
