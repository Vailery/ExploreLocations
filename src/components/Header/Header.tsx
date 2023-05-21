import Link from "next/link";
import { Logo } from "../shared/Logo";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  const navData = [
    {
      name: "Regions",
      url: "/",
    },
    {
      name: "Guides",
      url: "/guide/Germany",
    },
    {
      name: "Driving Distances",
      url: "/driving-distances/216309",
    },
    {
      name: "Flying time & distances",
      url: "/distances/1",
    },
    {
      name: "Explore nearby",
      url: "/explore-nearby",
    },
  ];

  return (
    <div className="w-full bg-white shadow-[0px_4px_4px_#00000009]">
      <header className="container flex w-full items-center px-3 py-3 lg:h-[6.3rem] lg:py-0">
        <Logo />
        <nav className="ml-20 hidden h-full lg:block">
          <ul className="flex h-full items-center gap-[2.38rem]">
            {navData.map((item, idx) => (
              <li
                key={idx}
                className={
                  "relative flex h-full items-center text-center tracking-wider"
                }
              >
                <Link href={item.url} className="lg:whitespace-nowrap">
                  {item.name}
                </Link>
                {router.pathname.includes(item.url.toLowerCase()) && (
                  <div className="absolute bottom-0 left-1/2 w-[5.3rem] -translate-x-1/2 rounded-[0.2rem_0.2rem_0_0] border-0 border-t-2 border-redText transition-all" />
                )}
              </li>
            ))}
            {/* Skip for now */}
            {/* <li>
              <LanguageSwitch />
            </li> */}
          </ul>
        </nav>
        <div className="ml-auto flex flex-col lg:hidden">
          {new Array(3).fill(0).map((_, idx) => (
            <div
              key={idx}
              className="mb-1 h-[0.2rem] w-5 rounded-lg bg-black"
            />
          ))}
        </div>
      </header>
    </div>
  );
};
