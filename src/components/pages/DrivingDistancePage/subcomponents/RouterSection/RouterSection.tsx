import Link from "next/link";
import { PinIcon } from "~/src/assets";

export const RouterSection = () => {
  return (
    <section className="container mb-5 mt-6 hidden lg:flex">
      <PinIcon className="mr-1 h-6 w-6" />
      <Link
        href="/driving-routes"
        className="flex gap-4 text-sm text-grayColor"
      >
        <div> / </div>
        <div>Driving Distances & Routes</div>
      </Link>
    </section>
  );
};
