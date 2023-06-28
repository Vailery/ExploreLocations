import type { GetServerSideProps, NextPage } from "next";
import type {
  AirportItem,
  AirportsCountType,
  RegionType,
} from "~/src/utils/types";
import { CountryPage } from "~/src/components/pages/CountryPage";
import {
  getAdminRegions,
  getAirportsAroundRegion,
  getAirportsCountData,
  getAirportsInRegion,
  getChildRegions,
  getRegionTree,
  getSameLevelRegions,
} from "~/src/utils/sqlQueries/adminRegions";

interface RegionsPageProps {
  currentRegion: RegionType;
  regionTree: RegionType[];
  regions: RegionType[];
  airportsInRegion: AirportItem[];
  airportsAroundRegion: AirportItem[];
  airportsCount: AirportsCountType;
  sameLevelRegions: RegionType[];
}

const RegionsPage: NextPage<RegionsPageProps> = ({
  currentRegion,
  regionTree,
  regions,
  airportsInRegion,
  airportsAroundRegion,
  airportsCount,
  sameLevelRegions,
}) => {
  return (
    <CountryPage
      currentRegion={currentRegion}
      regionTree={regionTree}
      regions={regions}
      airportsInRegion={airportsInRegion}
      airportsAroundRegion={airportsAroundRegion}
      airportsCount={airportsCount}
      sameLevelRegions={sameLevelRegions}
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

  const currentRegion = (
    await getAdminRegions(`WHERE "id" = '${regionId || ""}'`)
  )[0];

  if (currentRegion.Geometry) {
    const reversedPolygon = currentRegion.Geometry.coordinates
      .map(el => el.map(el => el.map<[number, number]>((el) => [el[1], el[0]])))

    currentRegion.Geometry = {
      type: currentRegion.Geometry.type,
      coordinates: reversedPolygon,
    };
    reversedPolygon && console.log(reversedPolygon[0]);
  }

  const regionTree = await getRegionTree(regionId || "");

  regionTree.reverse();

  const sameLevelRegions = await getSameLevelRegions(
    currentRegion.Type,
    currentRegion.IdParent
  );

  const regions = await getChildRegions(regionId || "");

  const airportsInRegion =
    await getAirportsInRegion(`ON ST_Intersects(a."Center", r."Geometry") AND r."id" = '${
      regionId || ""
    }'
    ORDER BY COALESCE(CAST(a."Passengers" AS INTEGER), 0) DESC LIMIT 20 OFFSET '${
      (pageNumber - 1) * 10
    }'`);

  const airportsCount = await getAirportsCountData(regionId || "");

  const airportsAroundRegion =
    currentRegion.Type !== "country" && airportsCount.international < 5
      ? await getAirportsAroundRegion(regionId || "")
      : [];

  // airportsAroundRegion.forEach((el) => el.Distance = Math.round(
  //     Math.sqrt(
  //       Math.pow(airport[0].CenterX - el.CenterX, 2) +
  //         Math.pow(airport[0].CenterY - el.CenterY, 2)
  //     ) * 100
  //   );)

  return {
    props: {
      currentRegion,
      regionTree,
      regions,
      airportsInRegion,
      airportsAroundRegion,
      airportsCount: airportsCount,
      sameLevelRegions,
    },
  };
};
