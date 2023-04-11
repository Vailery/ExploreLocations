import Link from "next/link";
import { Logo } from "../shared/Logo";
import { useRouter } from "next/router";
import { LanguageSwitch } from "./subcomponents/LanguageSwitch/LanguageSwitch";

export const Header = () => {
  const router = useRouter();

  const navData = [
    {
      name: "Regions",
      url: "/",
    },
    {
      name: "Guides",
      url: "/guides",
    },
    {
      name: "Driving Distances",
      url: "/driving-distances",
    },
    {
      name: "Flying time & distances",
      url: "/flying-time-distances",
    },
    {
      name: "Explore nearby",
      url: "/explore-nearby",
    },
  ];

  return (
    <div className="w-full bg-white shadow-[0px_4px_4px_#00000009]">
      <header className="container flex h-[6.3rem] w-full items-center">
        <Logo />
        <nav className="ml-20 h-full">
          <ul className="flex h-full items-center gap-[2.38rem]">
            {navData.map((item, idx) => (
              <li
                key={idx}
                className={
                  "relative flex h-full items-center text-center tracking-wider"
                }
              >
                <Link href={item.url} className="">
                  {item.name}
                </Link>
                {router.pathname === item.url && (
                  <div className="absolute bottom-0 left-1/2 w-[5.3rem] -translate-x-1/2 rounded-[0.2rem_0.2rem_0_0] border-0 border-t-2 border-redText transition-all" />
                )}
              </li>
            ))}
            <li>
              <LanguageSwitch />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
