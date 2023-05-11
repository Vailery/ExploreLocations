import type { GetServerSideProps, NextPage } from "next";
import { AirportPage } from "~/src/components/pages/AirportPage";
import type { AirportItem } from "~/src/utils/types";
import {
  getAirports,
  getAirportsAround,
} from "~/src/utils/sqlQueries/airports";

interface AirportPageProps {
  airport: AirportItem;
  airportsAround: AirportItem[];
  airportsInCountry: AirportItem[];
}

const Airport: NextPage<AirportPageProps> = ({
  airport,
  airportsAround,
  airportsInCountry,
}) => {
  return (
    <AirportPage
      airport={airport}
      airportsAround={airportsAround}
      airportsInCountry={airportsInCountry}
    />
  );
};

export default Airport;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<AirportPageProps> = async (
  context
) => {
  const airportName =
    typeof context.params?.airport === "string"
      ? context.params.airport
          .split("-")
          .map((el) => (el = el.charAt(0).toUpperCase() + el.slice(1)))
          .join(" ")
      : "";

  const airport = await getAirports(`WHERE "Name" = '${airportName}'`);

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

  const airportsInCountry = await getAirports(
    `WHERE "Country" = '${airport[0].Country}' LIMIT 20`
  );

  return {
    props: {
      airport: airport[0],
      airportsAround: airportsAround,
      airportsInCountry: airportsInCountry,
    },
  };
};
