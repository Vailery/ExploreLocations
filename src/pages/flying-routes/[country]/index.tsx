import type { NextPage } from "next";

// interface FlyingHubCountryPageProps {
//   countryLocations: LocationsType[];
//   countryName?: string;
// }

const FlyingHubCountry: NextPage = () => {
  return (
    <></>
    // <FlyingHubPage
    //   countryLocations={countryLocations}
    //   countryName={countryName}
    // />
  );
};

export default FlyingHubCountry;

// eslint-disable-next-line @typescript-eslint/require-await
// export const getServerSideProps: GetServerSideProps<
//   FlyingHubCountryPageProps
// > = async (context) => {
//   const country =
//     typeof context.params?.country === "string"
//       ? context.params.country
//           .split("-")
//           .map((el) => (el = el.charAt(0).toUpperCase() + el.slice(1)))
//           .join(" ")
//       : "";

//   const countryData = await getAdminRegions(`WHERE "Country" = '${country}'`);

//   const countryLocations = [];

//   for (let i = 0; i < countryData.length; i++) {
//     const locations = await getFLyingLocationsData(
//       `ON r."OriginCountryName" = '${countryData[i]?.Country || ""}' LIMIT 5`
//     );
//     countryLocations.push({
//       country: countryData[i]?.Name || "",
//       points: countryData[i]?.Points || "",
//       code: countryData[i]?.Code || "",
//       locations: locations.map((el) => ({
//         from: el.OriginCityName,
//         to: el.DestinationCityName,
//       })),
//     });
//   }
//   return {
//     props: {
//       countryLocations: countryLocations,
//       countryName: country,
//     },
//   };
// };
