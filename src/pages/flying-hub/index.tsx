import type { GetStaticProps, NextPage } from "next";
import { FlyingHubPage } from "~/src/components/pages/FlyingHubPage";
import { getAdminRegions } from "~/src/utils/sqlQueries/adminRegions";
import { getFLyingLocationsData } from "~/src/utils/sqlQueries/flyingLocations";
import type { LocationsType } from "~/src/utils/types";

interface FlyingHubPageProps {
  topLocations: LocationsType[];
}

const FlyingHub: NextPage<FlyingHubPageProps> = ({ topLocations }) => {
  return <FlyingHubPage topLocations={topLocations} />;
};

export default FlyingHub;

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  const topRegions = await getAdminRegions(
    `ORDER BY "Type", CAST("Points" AS INTEGER) DESC LIMIT 20`
  );

  const topLocations = [];

  for (let i = 0; i < topRegions.length; i++) {
    const locations = await getFLyingLocationsData(
      `ON r."OriginCountryName" = '${topRegions[i]?.Country || ""}' LIMIT 5`
    );
    topLocations.push({
      country: topRegions[i]?.Country || "",
      points: topRegions[i]?.Points || "",
      code: topRegions[i]?.Code || "",
      locations: locations.map((el) => ({
        from: el.OriginCityName,
        to: el.DestinationCityName,
      })),
    });
  }
  return {
    props: {
      topLocations: topLocations,
    },
  };
};
