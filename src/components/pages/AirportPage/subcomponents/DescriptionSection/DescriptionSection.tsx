import Image from "next/image";
import { LandingImage } from "~/src/assets";

interface IDescriptionSection {
  name: string;
  description: string;
}

export const DescriptionSection = ({ name, description }: IDescriptionSection) => (
  <section className="relative w-full bg-gradientLeft lg:mb-6">
    <div className="container pb-9 pt-6 lg:pb-24 lg:pt-16">
      <h2 className="relative z-10 mb-6 text-center text-[2.5rem] font-bold leading-tight tracking-wider text-white lg:mb-8 lg:text-[5rem] lg:tracking-wide">
        {name}
      </h2>
      <h3 className="mx-auto px-3 text-center text-sm leading-[1.8rem] tracking-wider text-white lg:w-3/5 lg:text-base lg:leading-8">
        {description}
      </h3>
    </div>
    <Image
      src={LandingImage}
      alt=""
      className="absolute right-0 top-0 z-0 hidden h-full w-auto lg:block"
      aria-hidden
      priority
    />
  </section>
);
