import Image from "next/image";
import { LandingImage } from "~/src/assets";

export const DescriptionSection = () => (
  <section className="relative w-full bg-gradientLeft mb-6">
    <div className="container pb-24 pt-16">
      <h2 className="mb-8 text-center text-[5rem] z-10 relative font-bold tracking-wide text-white">
        Zürich Kloten Airport
      </h2>
      <h3 className="mx-auto w-3/5 text-center leading-8 tracking-wider text-white">
        For years it has been known as &rdquo;Europe&apos;s Leading
        Airport&rdquo;. Nowhere else do departing passengers, transiting
        passengers and home-coming passengers feel more comfortable than here.
        Zurich is also the home of SWISS.
      </h3>
    </div>
    <Image src={LandingImage} alt="" className="absolute z-0 h-full right-0 top-0" aria-hidden />
  </section>
);