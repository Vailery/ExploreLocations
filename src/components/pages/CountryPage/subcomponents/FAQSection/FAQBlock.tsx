import clsx from "clsx";
import type { ReactNode } from "react";
import { useState } from "react";

interface FaqBlockProps {
  title: string;
  text?: ReactNode;
  key?: number;
}

export const FaqBlock = ({ title, text, key }: FaqBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(key === 0);

  return (
    <div
      className="relative w-full lg:rounded-md bg-white lg:px-7 px-5 shadow-sm"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div
        className={clsx(
          "absolute lg:right-6 right-2 top-7 ml-1 h-3 w-3 rotate-45 border-2 border-transparent border-b-grayColor border-r-grayColor transition-all",
          isExpanded && "rotate-[225deg]"
        )}
      />
      <h4 className="lg:w-auto w-9/12 py-[1.4rem] lg:text-lg lg:font-bold leading-6 tracking-tight">
        {title}
      </h4>
      <div
        className={clsx(
          "block max-h-0 w-full overflow-hidden transition-all",
          isExpanded && "!max-h-96"
        )}
      >
        {text && (
          <>
            <hr className="bg-grayText opacity-50 mb-5" />
            <p className="text-secondaryText mb-8 text-base leading-5 tracking-tighter">
              {text}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
