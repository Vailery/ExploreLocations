export const RelatedFlight = () => {
  return (
    <div className="w-1/2 rounded-md bg-white px-8 pt-9 pb-7">
      <h3 className="mb-7 text-3xl font-bold">
        Related Flying Distances from X
      </h3>
      <div className="mb-4 flex justify-between">
        <div className="text-xl font-bold">Cities</div>
        <div className="text-xl font-bold">Distance</div>
      </div>
      {new Array(5).fill(0).map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between border-b border-grayText py-4"
        >
          <div className="text-buttonBg">Bucharest to Iasi</div>
          <div>389 km</div>
        </div>
      ))}
      <button className="mt-3 w-full rounded-md bg-buttonBg py-3 text-lg text-white">
        All Flying Distances from Bucharest
      </button>
    </div>
  );
};
