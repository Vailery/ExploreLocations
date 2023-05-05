import { Fragment } from "react";
import { PinIcon } from "~/src/assets";

interface RouterSectionProps {
  city: string;
  country: string;
  name: string;
}

export const RouterSection = ({ city, country, name }: RouterSectionProps) => {
  const route = ["Europe", country, city, name];
  return (
    <section className="container mb-5 mt-6 hidden lg:flex">
      <PinIcon className="mr-1 h-6 w-6" />
      <div className="flex gap-4 text-sm text-grayColor">
        {route.map((item, index) => (
          <Fragment key={index}>
            {item && (
              <>
                <div> / </div>
                {item}
              </>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
};
