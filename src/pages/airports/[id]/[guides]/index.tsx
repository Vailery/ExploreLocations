import type { GetServerSideProps, NextPage } from "next";
import type { AirportItem, RegionType } from "~/src/utils/types";
import { CountryPage } from "~/src/components/pages/CountryPage";
import {
  getAdminRegions,
  getAirportsInRegion,
  getAirportsInRegionCount,
} from "~/src/utils/sqlQueries/adminRegions";

interface RegionsPageProps {
  currentRegion: RegionType;
  regions: RegionType[];
  airports: AirportItem[];
  airportsCount: number;
}

const RegionsPage: NextPage<RegionsPageProps> = ({
  currentRegion,
  regions,
  airports,
  airportsCount,
}) => {
  return (
    <CountryPage
      currentRegion={currentRegion}
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
          .map((el) => el.toLowerCase())
          .join(" ")
      : "";

  const regionId = context.params && (context.params.id as string);

  const pageNumber = context.query?.page ? +context.query?.page : 1;

  const currentRegion = await getAdminRegions(
    `WHERE "id" = '${regionId || ""}'`
  );

  const regions = await getAdminRegions(
    `WHERE LOWER("Country") = '${regionName}'`
  );

  const airports =
    await getAirportsInRegion(`ON ST_Intersects(a."Center", r."Geometry") and LOWER(r."Name") = '${regionName}' AND r."id" = '${
      regionId || ""
    }'
    ORDER BY COALESCE(CAST(a."Passengers" AS INTEGER), 0) DESC LIMIT 20 OFFSET '${
      (pageNumber - 1) * 10
    }'`);

  const airportsCount = await getAirportsInRegionCount(
    `ON ST_Intersects(a."Center", r."Geometry") and LOWER(r."Name") = '${regionName}' AND r."id" = '${
      regionId || ""
    }'`
  );

    console.log(airportsCount);

  return {
    props: {
      currentRegion: currentRegion[0],
      regions,
      airports,
      airportsCount: Number(airportsCount[0].count),
    },
  };
};
