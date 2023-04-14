import Image from "next/image";
import { LandingImage } from "~/src/assets";

interface IDescriptionSection {
  name: string;
}

export const DescriptionSection = ({ name }: IDescriptionSection) => (
  <section className="relative w-full bg-gradientLeft lg:mb-6">
    <div className="container pb-9 pt-6 lg:pb-24 lg:pt-16">
      <h2 className="relative z-10 mb-6 text-center text-[2.5rem] font-bold leading-tight tracking-wider text-white lg:mb-8 lg:text-[5rem] lg:tracking-wide">
        {name}
      </h2>
      <h3 className="mx-auto px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-3/5 lg:text-base lg:leading-8">
        For years it has been known as &rdquo;Europe&apos;s Leading
        Airport&rdquo;. Nowhere else do departing passengers, transiting
        passengers and home-coming passengers feel more comfortable than here.
        Zurich is also the home of SWISS.
      </h3>
    </div>
<<<<<<< HEAD
    <Image
      src={LandingImage}
      alt=""
      className="right-0 top-0 z-0 hidden h-full lg:absolute"
      aria-hidden
    />
=======
    <Image src={LandingImage} alt="" className="absolute lg:block hidden z-0 h-full right-0 top-0" aria-hidden />
>>>>>>> dev
  </section>
);
