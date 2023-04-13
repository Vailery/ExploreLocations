export const AllAirportsSection = () => {
  return (
    <section className="container mb-5 rounded-md bg-white px-7 pb-7 pt-6">
      <h3 className="mb-10 text-3xl font-bold tracking-wider">
        Airports in Switzerland
      </h3>
      <div className="mb-10 flex justify-between pr-12">
        {new Array(3).fill(0).map((_, index) => (
          <div className="flex flex-col text-lg text-buttonBg" key={index}>
            <p className="border-b border-grayBg pb-5">
              Airport name: Yakubu Gowon Airport
            </p>
            <p className="border-b border-grayBg pb-5 pt-2">
              City: JosCountry:Nigeria
            </p>
            <p className="pt-2">IATA Code: JOS</p>
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
