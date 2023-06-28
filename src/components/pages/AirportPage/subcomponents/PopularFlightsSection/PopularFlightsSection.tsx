interface PopularFlightsSectionProps {
  name: string;
}

export const PopularFlightsSection = ({ name }: PopularFlightsSectionProps) => {
  return (
    <section className="container bg-white px-3 pb-7 pt-2 lg:rounded-md lg:px-7 lg:pt-6">
      <h3 className="mb-1 text-lg font-bold tracking-wider lg:mb-10 lg:text-3xl">
        Popular Flying distances and times from {name}
      </h3>
      <div className="mb-5 flex flex-col justify-between pr-12  lg:mb-10 lg:flex-row">
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
