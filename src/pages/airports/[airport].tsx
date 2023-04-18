import { Prisma } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { HomePage } from "~/src/components/pages/Home";
import type { AirportItem } from "~/src/server/api/routers/airport";
import { prisma } from "~/src/server/db";

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
    <>
      <Head>
        <title>Explore Locations</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <HomePage
        airport={airport}
        airportsAround={airportsAround}
        airportsInCountry={airportsInCountry}
      />
    </>
  );
};

export default Airport;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<AirportPageProps> = async (
  context
) => {
  const airportID = context.params?.airport && +context.params.airport;

  const airport = await prisma.$queryRaw<[AirportItem]>(
    Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Name", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE "id" = ${airportID}`
  );

  console.log(airport[0].CenterY, airport[0].CenterX);

  const airportsAround = await prisma.$queryRaw<AirportItem[]>(
    Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Name", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE ST_DWithin("Center"::geometry, ST_MakePoint(${airport[0].CenterX}, ${airport[0].CenterY})::geography, 100000) AND "id" != ${airportID} LIMIT 20`
  );

  airportsAround.map((el) => {
    el.Distance = Math.round(
      Math.sqrt(
        Math.pow(airport[0].CenterX - el.CenterX, 2) +
        Math.pow(airport[0].CenterY - el.CenterY, 2)
      ) * 100
    );
  });

  const airportsInCountry = await prisma.$queryRaw<AirportItem[]>(
    Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Name", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE "Country" = ${airport[0].Country} LIMIT 20`
  );

  return {
    props: {
      airport: airport[0],
      airportsAround: airportsAround,
      airportsInCountry: airportsInCountry,
    },
  };
};
