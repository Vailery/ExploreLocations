import clsx from "clsx";
import type { ReactNode } from "react";
import { useState } from "react";

interface FaqBlockProps {
  question: string;
  answer?: ReactNode;
}

export const FaqBlock = ({ question, answer }: FaqBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="relative w-full bg-white px-5 shadow-sm lg:rounded-md lg:px-7"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div
        className={clsx(
          "absolute right-2 top-7 ml-1 h-3 w-3 rotate-45 border-2 border-transparent border-b-grayColor border-r-grayColor transition-all lg:right-6",
          isExpanded && "rotate-[225deg]"
        )}
      />
      <h4 className="w-9/12 py-[1.4rem] leading-6 tracking-tight lg:w-auto lg:text-lg lg:font-bold">
        {question}
      </h4>
      <div
        className={clsx(
          "block max-h-0 w-full overflow-hidden transition-all",
          isExpanded && "!max-h-96"
        )}
      >
        {answer && (
          <>
            <hr className="mb-5 bg-grayText opacity-50" />
            <p className="text-secondaryText mb-8 text-base leading-5 tracking-tighter">
              {answer}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
