import Image from "next/image";
import { LogoIcon } from "~/src/assets";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image src={LogoIcon} alt="Logo" width={60} height={60} />
      <h1 className="font-extrabold text-xl leading-6 tracking-widest">
        Explore <br /> Locations<span className="text-redText">.com</span>
      </h1>
    </div>
  );
};
