import type { GetServerSideProps, NextPage } from "next";
import { AirportPage } from "~/src/components/pages/AirportPage";
import type { AirportItem, RegionType } from "~/src/utils/types";
import {
  getAirports,
  getAirportsAround,
} from "~/src/utils/sqlQueries/airports";
import { getAdminRegions } from "~/src/utils/sqlQueries/adminRegions";

interface AirportPageProps {
  airport: AirportItem;
  airportsAround: AirportItem[];
  regions: RegionType[];
}

const Airport: NextPage<AirportPageProps> = ({
  airport,
  airportsAround,
  regions,
}) => {
  return (
    <AirportPage
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
  const airportName =
    context.params && Array.isArray(context.params.airport)
      ? context.params.airport
          .flat()
          .map((el) => el.toLowerCase())
          .join("/")
          .split("_")
          .join(" ")
      : "";

  const airport = await getAirports(`WHERE "id" = ${airportId || ""}`);

  const airportsAround = await getAirportsAround(
    airport[0].CenterX,
    airport[0].CenterY,
    airport[0].id
  );

  airportsAround.forEach((el) => {
    el.Distance = Math.round(
      Math.sqrt(
        Math.pow(airport[0].CenterX - el.CenterX, 2) +
          Math.pow(airport[0].CenterY - el.CenterY, 2)
      ) * 100
    );
  });
  airportsAround.sort((a, b) => (a.Distance || 0) - (b.Distance || 0));

  const regions = await getAdminRegions(
    `WHERE LOWER("Country") = '${airport[0].Country.toLowerCase()}'`
  );

  return {
    props: {
      airport: airport[0],
      airportsAround: airportsAround,
      regions: regions,
    },
  };
};
