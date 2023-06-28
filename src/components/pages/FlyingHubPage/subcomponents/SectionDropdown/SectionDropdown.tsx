import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionDropdownProps {
  button: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
  isOpen: boolean;
}

export const SectionDropdown = ({
  button,
  children,
  isOpen,
}: SectionDropdownProps) => {
  return (
    <section className="container mb-5 rounded-md bg-white px-3 lg:px-8 py-2 lg:py-5">
      {button}
      <div
        className={clsx(
          "max-h-0 overflow-hidden transition-all duration-500",
          isOpen && "max-h-[100rem]"
        )}
      >
        {children}
      </div>
    </section>
  );
};
