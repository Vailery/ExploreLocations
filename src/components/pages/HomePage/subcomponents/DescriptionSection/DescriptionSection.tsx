import { SearchIcon } from "~/src/assets";

export const DescriptionSection = () => (
  <section className="relative mb-6 w-full bg-gradientLeft lg:mb-9">
    <div className="container pb-4 pt-7 lg:pb-[5.4rem] lg:pt-[5.5rem]">
      <h2 className="relative z-10 mb-10 hidden text-center text-[4.4rem] font-bold leading-[5rem] tracking-wide text-white lg:block">
        Explore and discover airports, popular flying routes and scenic driving
        routes
      </h2>
      <h2 className="relative z-10 mb-7 px-5 text-center text-[2.5rem] font-bold leading-[3rem] tracking-wide text-white lg:hidden">
        You&apos;ll never travel without our trip planner again
      </h2>
      <h3 className="mb-9 text-center leading-7 tracking-wider text-white lg:mb-16">
        ExploreLocations.com helps you find the right airport for your next
        travel, anywhere in the world. You can also discover the most popular
        flying and driving routes, and get the right insights so you can plan
        your adventure like a PRO.
      </h3>
      <div className="mb-1 flex flex-col justify-center gap-3 px-3 lg:flex-row lg:px-0">
        <input
          className="w-full rounded-md bg-white py-4 pl-5 italic lg:w-[27.5rem]"
          placeholder="Popular locations"
        />
        <button className="flex items-center justify-center gap-2 rounded-md bg-buttonBg px-8 py-4 text-white">
          <SearchIcon />
          Search
        </button>
      </div>
    </div>
  </section>
);
