import "swiper/css";

export const InfoSection = () => {
  return (
    <section className="container mb-4 grid grid-cols-1 grid-rows-[auto_auto] gap-5 lg:grid-cols-[2fr,1fr] lg:grid-rows-1">
      <div className="bg-white px-3 pb-5 pt-4 lg:rounded-md lg:px-8 lg:py-5">
        <div className="mb-4 flex items-center gap-2 lg:mb-10 lg:gap-5">
          <h3 className="text-lg font-bold tracking-[0.08em] lg:text-3xl">
            How long does it take to fly from Zurich to London?
          </h3>
        </div>
        <ul>
          <li className="mb-5 leading-8 tracking-wide lg:mb-7">
            Non-stop flight time from Bucharest to London is around{" "}
            <span className="font-bold">3 hours 45 minutes.</span>
          </li>
          <li className="mb-5 leading-8  tracking-wide lg:mb-7">
            <span className="font-bold">
              Fastest one-stop flight between Bucharest and London takes close
              to 5 hours.
            </span>{" "}
            However, some airlines could take as long as 28 hours based on the
            stopover destination and waiting duration.
          </li>
          <li className="mb-5 leading-8  tracking-wide lg:mb-7">
            This is the average non-stop flight time from any of the two
            airports in Bucharest to airports in London.
          </li>
          <li className="mb-5 leading-8  tracking-wide lg:mb-7">
            Apparently, connecting flights and direct flights with stopover take
            longer time than non-stop flights. In such cases, Bucharest - London
            flight time depend on the layover destination specified by your
            airline or the one you choose while booking your ticket.
          </li>
          <li className="mb-9 leading-8 tracking-wide">
            Waiting time at intermediate airports could be anywhere between 40
            mins to 24 hrs .
          </li>
          <li>
            <h3 className="mb-9 hidden text-lg font-bold tracking-widest lg:block">
              Flight time from Bucharest, Romania to airports near London,
              United Kingdom
            </h3>
            <div className="mb-9 tracking-wide">
              Non-stop flight time from Bucharest to London is around{" "}
              <span className="font-bold">3 hours 45 minutes</span>
            </div>
            <div className="grid lg:grid-cols-[1fr_3fr_1fr]">
              <div className="pb-2 text-lg font-bold">Journey</div>
              <div className="hidden pb-2 text-lg font-bold lg:block">
                Destination Airports
              </div>
              <div className="hidden pb-2 text-right text-lg font-bold lg:block">
                Duration
              </div>
              <div className="text-buttonBg lg:border-b lg:py-4">OTP-LCY</div>
              <div className="py-2 lg:border-b lg:py-4">
                London, London City Airport
              </div>
              <div className="border-b pb-3 lg:py-4 lg:text-right">
                4 hrs 50 mins
              </div>
              <div className="pt-3 text-buttonBg lg:border-b lg:py-4">
                OTP-BHX
              </div>
              <div className="py-2 lg:border-b lg:py-4">
                London, London City Airport
              </div>
              <div className="border-b pb-3 lg:py-4 lg:text-right">
                4 hrs 50 mins
              </div>
              <div className="pt-3 text-buttonBg lg:py-4">OTP-MAN</div>
              <div className="py-2 lg:py-4">London, London City Airport</div>
              <div className="lg:py-4 lg:text-right">4 hrs 50 mins</div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mx-3 h-fit rounded-md bg-white lg:mx-0">
        <h3 className="rounded-[0.375rem_0.375rem_0_0] bg-redBg lg:px-8 px-6 lg:py-5 py-4 text-xl font-bold text-white">
          Flight Distance
        </h3>
        <div className="px-8 pb-5 pt-7 text-lg lg:pb-7">
          <p className="">Search by airport name, city or IATA airport code.</p>
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 lg:py-4 py-3 italic text-white"
            placeholder="Name, city or IATA"
          />
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 lg:py-4 py-3 italic text-white"
            placeholder="Name, city or IATA"
          />
          <button className="mt-5 w-full rounded-md bg-buttonBg py-3 text-lg text-white lg:mt-7">
            Calculate Distance
          </button>
        </div>
      </div>
    </section>
  );
};
