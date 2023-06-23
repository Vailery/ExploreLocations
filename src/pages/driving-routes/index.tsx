import type { GetStaticProps, NextPage } from "next";
import { DrivingHubPage } from "~/src/components/pages/DrivingHubPage";
import { getAdminRegions } from "~/src/utils/sqlQueries/adminRegions";
import { getDrivingLocationsData } from "~/src/utils/sqlQueries/drivingLocations";
import type { LocationsType } from "~/src/utils/types";

interface DrivingHubPageProps {
  topLocations: LocationsType[];
}

const DrivingHub: NextPage<DrivingHubPageProps> = ({ topLocations }) => {
  return <DrivingHubPage topLocations={topLocations} />;
};

export default DrivingHub;

export const getStaticProps: GetStaticProps<DrivingHubPageProps> = async () => {
  const topRegions = await getAdminRegions(
    `ORDER BY "Type" DESC LIMIT 20`
  );

  const topLocations = [];

  for (let i = 0; i < topRegions.length; i++) {
    const locations = await getDrivingLocationsData(
      `ON r."CountryFromName" = '${topRegions[i]?.Name || ""}' LIMIT 5`
    );
    topLocations.push({
      country: topRegions[i]?.Name || "",
      code: topRegions[i]?.Name || "",
      locations: locations.map((el) => ({
        from: el.RegionFromCityName,
        to: el.RegionToCityName,
      })),
    });
  }
  return {
    props: {
      topLocations: topLocations,
    },
  };
};
