import { Prisma } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { AirportPage } from "~/src/components/pages/AirportPage";
import type { AirportItem } from "~/src/utils/types";
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
    <AirportPage
      airport={airport}
      airportsAround={airportsAround}
      airportsInCountry={airportsInCountry}
    />
  );
};

export default Airport;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<AirportPageProps> = async (context) => {
  const airportName =
    typeof context.params?.airport === "string" &&
    context.params.airport
      .split("-")
      .map((el) => (el = el.charAt(0).toUpperCase() + el.slice(1)))
      .join(" ");

  const airport = await prisma.$queryRaw<[AirportItem]>(
    Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Passengers", "Name", "Type", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE "Name" = ${airportName}`
  );

  const airportsAround = await (async () => {
    //  Skip for now Add sorting by type
    const resultInFiveHundred = await prisma.$queryRaw<AirportItem[]>(
      Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Passengers", "Name", "Type", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE ST_DWithin("Center"::geometry, ST_MakePoint(${airport[0].CenterX}, ${airport[0].CenterY})::geography, 500000) AND "Name" != ${airportName} LIMIT 20`
    );
    if (resultInFiveHundred.length < 0) {
      const resultInThousand = await prisma.$queryRaw<AirportItem[]>(
        Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Passengers", "Name", "Type", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE ST_DWithin("Center"::geometry, ST_MakePoint(${airport[0].CenterX}, ${airport[0].CenterY})::geography, 1000000) AND "Name" != ${airportName} LIMIT 20`
      );
      return resultInThousand;
    } else {
      return resultInFiveHundred;
    }
  })();

  airportsAround.forEach((el) => {
    el.Distance = Math.round(
      Math.sqrt(
        Math.pow(airport[0].CenterX - el.CenterX, 2) +
          Math.pow(airport[0].CenterY - el.CenterY, 2)
      ) * 100
    );
  });
  airportsAround.sort((a, b) => (a.Distance || 0) - (b.Distance || 0));

  const airportsInCountry = await prisma.$queryRaw<AirportItem[]>(
    Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Passengers", "Name", "Type", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE "Country" = ${airport[0].Country} LIMIT 20`
  );

  return {
    props: {
      airport: airport[0],
      airportsAround: airportsAround,
      airportsInCountry: airportsInCountry,
    },
  };
};
