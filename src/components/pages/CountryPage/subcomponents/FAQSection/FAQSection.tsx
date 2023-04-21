import { FaqBlock } from "./FAQBlock";

export const FAQSection = () => {
  return (
    <section className="container lg:mt-8 mt-5">
      <h3 className="lg:mb-6 mb-4 lg:px-8 px-5 lg:text-3xl font-bold leading-8 tracking-wider">
        FAQ about Airports in South America
      </h3>
      <div className="mb-3 flex flex-col gap-2">
        {new Array(5).fill("").map((el, idx) => (
          <FaqBlock
            title={"Why does the price change when I go to book?"}
            text={"Text"}
            key={idx}
          />
        ))}
      </div>
    </section>
  );
};
