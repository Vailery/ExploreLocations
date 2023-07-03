import type { FaqType, RegionType } from "~/src/utils/types";
import { FaqBlock } from "./FAQBlock";

interface FAQSectionProps {
  region?: RegionType;
  questionsData?: (FaqType | null)[];
}

export const FAQSection = ({ region, questionsData }: FAQSectionProps) => {
  return (
    <section className="container">
      <h3 className="mb-4 px-5 font-bold leading-8 tracking-wider lg:mb-6 lg:px-8 lg:text-3xl">
        FAQ about Airports in {region?.Name}
      </h3>
      <div className="mb-3 flex flex-col gap-2">
        {questionsData &&
          questionsData.map(
            (el, idx) =>
              el && (
                <FaqBlock key={idx} question={el.question} answer={el.answer} />
              )
          )}
      </div>
    </section>
  );
};
