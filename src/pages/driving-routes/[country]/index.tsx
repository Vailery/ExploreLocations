import type { GetServerSideProps, NextPage } from "next";
import { DrivingHubPage } from "~/src/components/pages/DrivingHubPage";
import { getAdminRegions } from "~/src/utils/sqlQueries/adminRegions";
import { getDrivingLocationsData } from "~/src/utils/sqlQueries/drivingLocations";
import type { LocationsType } from "~/src/utils/types";

interface DrivingHubCountryPageProps {
  countryLocations: LocationsType[];
  countryName: string;
}

const DrivingHubCountry: NextPage<DrivingHubCountryPageProps> = ({
  countryLocations,
  countryName,
}) => {
  return (
    <DrivingHubPage
      countryLocations={countryLocations}
      countryName={countryName}
    />
  );
};

export default DrivingHubCountry;

export const getServerSideProps: GetServerSideProps<
  DrivingHubCountryPageProps
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
    const locations = await getDrivingLocationsData(
      `ON r."CountryFromName" = '${countryData[i]?.Name || ""}' LIMIT 5`
    );
    countryLocations.push({
      country: countryData[i]?.Name || "",
      points: countryData[i]?.Points || "",
      code: countryData[i]?.Name || "",
      locations: locations.map((el) => ({
        from: el.RegionFromCityName,
        to: el.RegionToCityName,
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
