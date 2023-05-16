import { SearchIcon } from "~/src/assets";

export const DescriptionSection = () => (
  <section className="relative mb-6 lg:mb-9 w-full bg-gradientLeft">
    <div className="container pb-4 lg:pb-[5.4rem] lg:pt-[5.5rem] pt-7">
      <h2 className="relative z-10 mb-10 hidden text-center text-[4.4rem] font-bold leading-[5rem] tracking-wide text-white lg:block">
        Explore Locations & Traveling <br /> Routes like never before
      </h2>
      <h2 className="relative z-10 mb-7 text-center px-5 text-[2.5rem] font-bold leading-[3rem] tracking-wide text-white lg:hidden">
        You&apos;ll never travel without our trip planner again
      </h2>
      <h3 className="lg:mb-16 mb-9 text-center tracking-wider leading-7 text-white">
        Planning your next travel adventure can be both exciting and stressful.
        While <br /> searching for amazing destinations and attractions to visit
        is always fun
      </h3>
      <div className="mb-1 flex lg:flex-row lg:px-0 px-3 flex-col justify-center gap-3">
        <input
          className="w-full lg:w-[27.5rem] h-12 rounded-md bg-white pl-5 italic"
          placeholder="Popular locations"
        />
        <button className="flex items-center gap-2 rounded-md bg-buttonBg justify-center px-8 py-4 text-white">
          <SearchIcon />
          Search
        </button>
      </div>
    </div>
  </section>
);
