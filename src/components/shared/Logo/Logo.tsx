import clsx from "clsx";
import Image from "next/image";
import { LogoIcon } from "~/src/assets";

interface LogoProps {
  white?: boolean;
  className?: string;
}

export const Logo = ({ white, className }: LogoProps) => {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Image src={LogoIcon} alt="Logo" width={60} height={60} />
      <h1
        className={clsx(
          "text-xl font-extrabold leading-6 tracking-widest",
          white && "text-white"
        )}
      >
        Explore <br /> Locations<span className="text-redText">.com</span>
      </h1>
    </div>
  );
};
