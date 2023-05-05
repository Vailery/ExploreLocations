import type { RegionType } from "~/src/utils/types";
import { FaqBlock } from "./FAQBlock";

interface FAQSectionProps {
  region: RegionType;
}

export const FAQSection = ({ region }: FAQSectionProps) => {
  return (
    <section className="container mt-5 lg:mt-8">
      <h3 className="mb-4 px-5 font-bold leading-8 tracking-wider lg:mb-6 lg:px-8 lg:text-3xl">
        FAQ about Airports in {region.Country}
      </h3>
      <div className="mb-3 flex flex-col gap-2">
        {/* TODO: Replace with api array */}
        {new Array(5).fill("").map((el, idx) => (
          <FaqBlock
            key={idx}
            title={"Why does the price change when I go to book?"}
            text={"Text"}
          />
        ))}
      </div>
    </section>
  );
};
