import type { GetServerSideProps, NextPage } from "next";
import { AirportPage } from "~/src/components/pages/AirportPage";
import type { AirportItem, RegionType } from "~/src/utils/types";
import {
  getAirports,
  getAirportsAround,
} from "~/src/utils/sqlQueries/airports";
import {
  getAdminRegions,
  getChildRegions,
  getRegionTree,
} from "~/src/utils/sqlQueries/adminRegions";

interface AirportPageProps {
  airport: AirportItem;
  airportsAround: AirportItem[];
  regions: RegionType[];
  regionTree: RegionType[];
}

const Airport: NextPage<AirportPageProps> = ({
  airport,
  airportsAround,
  regions,
  regionTree,
}) => {
  return (
    <AirportPage
      regionTree={regionTree}
      airport={airport}
      airportsAround={airportsAround}
      regions={regions}
    />
  );
};

export default Airport;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<AirportPageProps> = async (
  context
) => {
  const airportId = context.params && (context.params.id as string);
  // const airportName =
  //   context.params && Array.isArray(context.params.airport)
  //     ? context.params.airport
  //         .flat()
  //         .map((el) => el.toLowerCase())
  //         .join("/")
  //         .split("_")
  //         .join(" ")
  //     : "";

  const airport = (await getAirports(`WHERE "id" = ${airportId || ""}`))[0];

  if (airport.Geometry) {
    const reversedPolygon = airport.Geometry.coordinates.map((el) =>
      el.map((el) => el.map<[number, number]>((el) => [el[1], el[0]]))
    );

    airport.Geometry = {
      type: airport.Geometry.type,
      coordinates: reversedPolygon,
    };
  }

  const airportsAround = await getAirportsAround(
    airport.CenterX,
    airport.CenterY,
    airport.id
  );

  airportsAround.forEach((el) => {
    el.Distance = Math.round(
      Math.sqrt(
        Math.pow(airport.CenterX - el.CenterX, 2) +
          Math.pow(airport.CenterY - el.CenterY, 2)
      ) * 100
    );
  });
  airportsAround.sort((a, b) => (a.Distance || 0) - (b.Distance || 0));

  const airportRegion = await getAdminRegions(`
    WHERE LOWER("Name") = '${airport.Country.toLowerCase()}' 
  `);

  const regions = await getChildRegions(`${airportRegion[0].id}`);

  const regionTree = await getRegionTree(`${airportRegion[0].id}`);

  return {
    props: {
      airport,
      airportsAround: airportsAround,
      regions,
      regionTree,
    },
  };
};
