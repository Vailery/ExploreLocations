import Image from "next/image";
import { Fragment } from "react";
import { PinIcon } from "~/src/assets";

const route = ["Europe", "Switzerland", "Zurich", "Zurich Kloten Airport"];

export const RouterSection = () => (
  <section className="container mb-5 mt-6 flex">
    <Image src={PinIcon} alt="" className="mr-1 h-6 w-6" />
    <div className="flex gap-4 text-sm text-greyColor">
      {route.map((item, index) => (
        <Fragment key={index}>
          <div> / </div>
          {item}
        </Fragment>
      ))}
    </div>
  </section>
);
