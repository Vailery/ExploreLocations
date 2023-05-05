export const RelatedFlight = () => {
  return (
    <div className="lg:w-1/2 w-full rounded-md bg-white px-3 lg:px-8 lg:pt-9 pt-2 pb-5 lg:pb-7">
      <h3 className="lg:mb-7 text-xl lg:text-3xl font-bold">
        Driving Distances San Antonio 
      </h3>
      <div className="mb-4 lg:flex justify-between hidden">
        <div className="text-xl font-bold">Cities</div>
        <div className="text-xl font-bold">Distance</div>
      </div>
      {new Array(5).fill(0).map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between border-b border-grayText lg:py-4 py-[0.85rem]"
        >
          <div className="text-buttonBg">Bucharest to Iasi</div>
          <div>389 km</div>
        </div>
      ))}
      <button className="mt-3 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
        All London Driving Distances
      </button>
    </div>
  );
};
