import type { GetServerSideProps, NextPage } from "next";
import type { AirportItem, RegionType } from "~/src/utils/types";
import { CountryPage } from "~/src/components/pages/CountryPage";
import {
  getAdminRegions,
  getAirportsInRegion,
  getAirportsInRegionCount,
} from "~/src/utils/sqlQueries/adminRegions";

interface RegionsPageProps {
  regions: RegionType[];
  airports: AirportItem[];
  airportsCount: number;
}

const RegionsPage: NextPage<RegionsPageProps> = ({
  regions,
  airports,
  airportsCount,
}) => {
  return (
    <CountryPage
      regions={regions}
      airports={airports}
      airportsCount={airportsCount}
    />
  );
};

export default RegionsPage;
// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const regionName =
    typeof context.params?.guides === "string"
      ? context.params.guides
          .split("-")
          .map((el) => (el = el.charAt(0).toUpperCase() + el.slice(1)))
          .join(" ")
      : "";

  const pageNumber = context.query?.page ? +context.query?.page : 1;

  const regions = await getAdminRegions(`WHERE "Country" = '${regionName}'`);

  const airports =
    await getAirportsInRegion(`ON ST_Intersects(a."Center", r."Geometry") and r."Country" = '${regionName}'
    ORDER BY COALESCE(CAST(a."Passengers" AS INTEGER), 0) DESC LIMIT 20 OFFSET '${
      (pageNumber - 1) * 10
    }'`);

  const airportsCount = await getAirportsInRegionCount(
    `ON ST_Intersects(a."Center", r."Geometry") and r."Country" = '${regionName}'`
  );

  return {
    props: {
      regions,
      airports,
      airportsCount: Number(airportsCount[0].count),
    },
  };
};
