import clsx from "clsx";
import Image from "next/image";
import { LogoIcon } from "~/src/assets";

interface LogoProps {
  white?: boolean;
  className?: string;
}

export const Logo = ({ white, className }: LogoProps) => {
  return (
    <div className={clsx("flex items-center lg:gap-2 gap-[0.1rem]", className)}>
      <Image src={LogoIcon} alt="Logo" className="lg:w-14 w-10" />
      <h1
        className={clsx(
          "lg:text-xl font-extrabold leading-4 text-sm lg:leading-6 tracking-widest",
          white && "text-white"
        )}
      >
        Explore <br /> Locations<span className="text-redText">.com</span>
      </h1>
    </div>
  );
};
