import "swiper/css";

export const InfoSection = () => {
  return (
    <section className="container mb-4 grid grid-cols-1 grid-rows-[auto_auto] gap-5 lg:grid-cols-[2fr,1fr] lg:grid-rows-1">
      <div className="bg-white px-3 pb-5 pt-3 lg:rounded-md lg:px-8 lg:py-5">
        <div className="mb-10 flex items-center gap-2 lg:gap-5">
          <h3 className="text-lg font-bold tracking-[0.08em] lg:text-3xl">
            How long does it take to fly from Zurich to London?
          </h3>
        </div>
        <ul>
          <li className="mb-7 leading-8 tracking-wide">
            Non-stop flight time from Bucharest to London is around{" "}
            <span className="font-bold">3 hours 45 minutes.</span>
          </li>
          <li className="mb-7 leading-8 tracking-wide">
            <span className="font-bold">
              Fastest one-stop flight between Bucharest and London takes close
              to 5 hours.
            </span>{" "}
            However, some airlines could take as long as 28 hours based on the
            stopover destination and waiting duration.
          </li>
          <li className="mb-7 leading-8 tracking-wide">
            This is the average non-stop flight time from any of the two
            airports in Bucharest to airports in London.
          </li>
          <li className="mb-7 leading-8 tracking-wide">
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
            <h3 className="mb-9 text-lg font-bold tracking-widest">
              Flight time from Bucharest, Romania to airports near London,
              United Kingdom
            </h3>
            <div className="mb-9 tracking-wide">
              Non-stop flight time from Bucharest to London is around{" "}
              <span className="font-bold">3 hours 45 minutes</span>
            </div>
            <div className="grid grid-cols-[1fr_3fr_1fr]">
              <div className="pb-2 text-lg font-bold">Journey</div>
              <div className="pb-2 text-lg font-bold">Destination Airports</div>
              <div className="pb-2 text-right text-lg font-bold">Duration</div>
              <div className="border-b py-4 text-buttonBg">OTP-LCY</div>
              <div className="border-b py-4">London, London City Airport</div>
              <div className="border-b py-4 text-right">4 hrs 50 mins</div>
              <div className="border-b py-4 text-buttonBg">OTP-BHX</div>
              <div className="border-b py-4">London, London City Airport</div>
              <div className="border-b py-4 text-right">4 hrs 50 mins</div>
              <div className="py-4 text-buttonBg">OTP-MAN</div>
              <div className="py-4">London, London City Airport</div>
              <div className="py-4 text-right">4 hrs 50 mins</div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mx-3 h-fit rounded-md bg-white lg:mx-0">
        <h3 className="rounded-[0.375rem_0.375rem_0_0] bg-redBg px-8 py-5 text-xl font-bold text-white">
          Flight Distance
        </h3>
        <div className="px-8 pb-5 pt-7 text-lg lg:pb-7">
          <p className="">Search by airport name, city or IATA airport code.</p>
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 py-4 italic text-white"
            placeholder="Name, city or IATA"
          />
          <input
            className="mt-3 w-full rounded-md bg-grayBg px-3 py-4 italic text-white"
            placeholder="Name, city or IATA"
          />
          <button className="mt-1 w-full rounded-md bg-buttonBg py-3 text-lg text-white lg:mt-7">
            Calculate Distance
          </button>
          <p className="mt-6 text-base font-bold lg:mt-8"></p>
        </div>
      </div>
    </section>
  );
};
