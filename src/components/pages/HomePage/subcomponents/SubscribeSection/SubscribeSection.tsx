import { NotificationIcon } from "~/src/assets";

export const SubscribeSection = () => (
  <section className="container rounded-md bg-gradientLeft pb-4 lg:pb-14 pt-7 lg:pt-12">
    <h2 className="mb-5 flex flex-col items-center justify-center gap-4 text-xl font-bold tracking-widest text-white lg:mb-7 lg:flex-row lg:gap-5 lg:text-5xl lg:tracking-normal">
      <NotificationIcon />
      Subscribe to newsletter
    </h2>
    <h4 className="mb-7 px-5 text-center text-white lg:text-lg">
      When planning a trip, most travelers have a set budget for everything from
      <br />
      accommodation and flights to dining and activities.
    </h4>
    <div className="mb-1 flex flex-col justify-center gap-3 px-3 lg:flex-row lg:px-0">
      <input
        className="h-12 w-full rounded-md bg-white pl-5 italic lg:w-[27.5rem]"
        placeholder="Email"
      />
      <button className="flex justify-center items-center gap-2 rounded-md bg-buttonBg px-8 py-4 text-white">
        Subscribe
      </button>
    </div>
  </section>
);
