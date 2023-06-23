import type { GetServerSideProps, NextPage } from "next";
import { FlyingHubPage } from "~/src/components/pages/FlyingHubPage";
import { getAdminRegions } from "~/src/utils/sqlQueries/adminRegions";
import { getFLyingLocationsData } from "~/src/utils/sqlQueries/flyingLocations";
import type { LocationsType } from "~/src/utils/types";

interface FlyingHubCountryPageProps {
  countryLocations: LocationsType[];
  countryName?: string;
}

const FlyingHubCountry: NextPage<FlyingHubCountryPageProps> = ({
  countryLocations,
  countryName,
}) => {
  return (
    <FlyingHubPage
      countryLocations={countryLocations}
      countryName={countryName}
    />
  );
};

export default FlyingHubCountry;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<
  FlyingHubCountryPageProps
> = async (context) => {
  const country =
    typeof context.params?.country === "string"
      ? context.params.country
          .split("-")
          .map((el) => (el = el.charAt(0).toUpperCase() + el.slice(1)))
          .join(" ")
      : "";

  const countryData = await getAdminRegions(`WHERE "Name" = '${country}'`);

  const countryLocations = [];

  for (let i = 0; i < countryData.length; i++) {
    const locations = await getFLyingLocationsData(
      `ON r."OriginCountryName" = '${countryData[i]?.Name || ""}' LIMIT 5`
    );
    countryLocations.push({
      country: countryData[i]?.Name || "",
      points: countryData[i]?.Points || "",
      code: countryData[i]?.Name || "",
      locations: locations.map((el) => ({
        from: el.OriginCityName,
        to: el.DestinationCityName,
      })),
    });
  }
  return {
    props: {
      countryLocations: countryLocations,
      countryName: country,
    },
  };
};
