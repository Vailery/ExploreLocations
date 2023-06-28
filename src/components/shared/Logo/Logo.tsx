import clsx from "clsx";
import { LogoIcon } from "~/src/assets";

interface LogoProps {
  white?: boolean;
  className?: string;
}

export const Logo = ({ white, className }: LogoProps) => {
  return (
    <div className={clsx("flex items-center gap-[0.1rem] lg:gap-2", className)}>
      <LogoIcon className="w-10 lg:w-14" />
      <h1
        className={clsx(
          "text-sm font-extrabold leading-4 tracking-widest lg:text-xl lg:leading-6",
          white && "text-white"
        )}
      >
        Explore <br /> Locations<span className="text-redText">.com</span>
      </h1>
    </div>
  );
};
