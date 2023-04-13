export const PopularFlightsSection = () => {
  return (
    <section className="container rounded-md bg-white px-7 pb-7 pt-6">
      <h3 className="mb-10 text-3xl font-bold tracking-wider">
        Popular Flying distances and times from Zurich Kloten Airport
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
            <p className="border-b border-grayBg pb-5 pt-2">IATA Code: JOS</p>
            <p className="pt-2">ICAO Code: DNJO</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <button className="mx-auto mt-1 rounded-md bg-buttonBg px-9 py-3 text-lg text-white">
          All Distances and Flying Times
        </button>
      </div>
    </section>
  );
};
