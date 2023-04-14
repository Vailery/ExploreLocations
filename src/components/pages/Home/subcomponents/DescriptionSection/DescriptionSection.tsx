import Image from "next/image";
import { LandingImage } from "~/src/assets";

export const DescriptionSection = () => (
  <section className="relative w-full bg-gradientLeft lg:mb-6">
    <div className="container lg:pb-24 pb-9 lg:pt-16 pt-6">
      <h2 className="lg:mb-8 mb-6 text-center text-[2.5rem] lg:text-[5rem] z-10 relative font-bold lg:tracking-wide tracking-wider text-white leading-tight">
        Zürich Kloten Airport
      </h2>
      <h3 className="mx-auto lg:w-3/5 px-3 lg:text-base text-sm text-center lg:leading-8 leading-[1.8rem] tracking-wider text-white">
        For years it has been known as &rdquo;Europe&apos;s Leading
        Airport&rdquo;. Nowhere else do departing passengers, transiting
        passengers and home-coming passengers feel more comfortable than here.
        Zurich is also the home of SWISS.
      </h3>
    </div>
    <Image src={LandingImage} alt="" className="absolute lg:block hidden z-0 h-full right-0 top-0" aria-hidden />
  </section>
);