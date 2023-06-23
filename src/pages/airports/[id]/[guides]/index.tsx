import type { GetServerSideProps, NextPage } from "next";
import type {
  AirportItem,
  AirportsCountType,
  RegionType,
} from "~/src/utils/types";
import { CountryPage } from "~/src/components/pages/CountryPage";
import {
  getAdminRegions,
  getAirportsCountData,
  getAirportsInRegion,
  getChildRegions,
  getRegionTree,
} from "~/src/utils/sqlQueries/adminRegions";

interface RegionsPageProps {
  currentRegion: RegionType;
  regionTree: RegionType[];
  regions: RegionType[];
  airports: AirportItem[];
  airportsCount: AirportsCountType;
}

const RegionsPage: NextPage<RegionsPageProps> = ({
  currentRegion,
  regionTree,
  regions,
  airports,
  airportsCount,
}) => {
  return (
    <CountryPage
      currentRegion={currentRegion}
      regionTree={regionTree}
      regions={regions}
      airports={airports}
      airportsCount={airportsCount}
    />
  );
};

export default RegionsPage;
// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  // const regionName =
  //   typeof context.params?.guides === "string"
  //     ? context.params.guides
  //         .split("-")
  //         .map((el) => el.toLowerCase())
  //         .join(" ")
  //     : "";

  const regionId = context.params && (context.params.id as string);

  const pageNumber = context.query?.page ? +context.query?.page : 1;

  const currentRegion = await getAdminRegions(
    `WHERE "id" = '${regionId || ""}'`
  );

  console.log(currentRegion);

  const regionTree = await getRegionTree(regionId || "");

  regionTree.reverse();

  const regions = await getChildRegions(regionId || "");

  const airports =
    await getAirportsInRegion(`ON ST_Intersects(a."Center", r."Geometry") AND r."id" = '${
      regionId || ""
    }'
    ORDER BY COALESCE(CAST(a."Passengers" AS INTEGER), 0) DESC LIMIT 20 OFFSET '${
      (pageNumber - 1) * 10
    }'`);

  const airportsCount = await getAirportsCountData(regionId || "");

  return {
    props: {
      currentRegion: currentRegion[0],
      regionTree,
      regions,
      airports,
      airportsCount: airportsCount,
    },
  };
};
