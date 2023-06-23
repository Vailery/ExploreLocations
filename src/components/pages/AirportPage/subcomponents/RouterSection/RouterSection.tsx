import Link from "next/link";
import { PinIcon } from "~/src/assets";
import type { RegionType } from "~/src/utils/types";

interface RouterSectionProps {
  regionTree: RegionType[];
  name: string;
}

export const RouterSection = ({ regionTree, name }: RouterSectionProps) => {
  return (
    <section className="container mb-5 mt-6 hidden lg:flex">
      <PinIcon className="mr-1 h-6 w-6" />
      <div className="flex gap-4 text-sm text-grayColor">
        {regionTree.map((item, index) => (
          <Link
            key={index}
            href={`/airports/${item.id}/${item.Name}`}
            className="flex gap-4 hover:text-buttonBg"
          >
            {item && (
              <>
                <div> / </div>
                {item.Name}
              </>
            )}
          </Link>
        ))}
        <>
          <div> / </div>
          {name}
        </>
      </div>
    </section>
  );
};
