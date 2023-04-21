import type { GetServerSideProps, NextPage } from "next";
import { CountryPage } from "~/src/components/pages/CountryPage";

const Airport: NextPage = () => {
  return <CountryPage />;
};

export default Airport;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const airportID = context.params?.airport && +context.params.airport;

  // const airportsInCountry = await prisma.$queryRaw<AirportItem[]>(
  //   Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Name", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE "Country" = ${airport[0].Country} LIMIT 20`
  // );

  return {
    props: {
      // airport: airport[0],
      // airportsAround: airportsAround,
      // airportsInCountry: airportsInCountry,
    },
  };
};
