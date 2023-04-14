import clsx from "clsx";

export const AllAirportsSection = () => {
  return (
    <section className="container lg:mb-5 mb-7 bg-white px-3 lg:pb-7 pb-5 pt-2 lg:rounded-md lg:px-7 lg:pt-6">
      <h3 className="mb-5 text-xl font-bold tracking-tight lg:mb-10 lg:text-3xl lg:tracking-wider">
        Airports in Switzerland
      </h3>
      <div className="lg:mb-10 mb-7 flex flex-col justify-between pr-12 lg:flex-row">
        {new Array(3).fill(0).map((_, index) => (
          <div className="flex flex-col text-lg text-buttonBg" key={index}>
            <p className="border-b border-grayBg pb-5 lg:pt-0 pt-3">
              Airport name: Yakubu Gowon Airport
            </p>
            <p className="border-b border-grayBg pb-5 lg:pt-2 pt-3">
              City: JosCountry:Nigeria
            </p>
            <p
              className={clsx(
                "pt-2",
                index !== 2 && "border-b border-grayBg pb-5"
              )}
            >
              IATA Code: JOS
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <button className="mx-auto mt-4 rounded-md bg-buttonBg px-16 py-3 text-lg text-white">
          Airports in Switzerland
        </button>
      </div>
    </section>
  );
};
