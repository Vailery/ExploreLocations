import { Prisma } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import type { AirportItem, RegionType } from "~/src/utils/types";
import { prisma } from "~/src/server/db";
import { CountryPage } from "~/src/components/pages/CountryPage";

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

  console.log('/////////// \n ///////////////////')

  const regionName =
    typeof context.params?.guides === "string" ?
    context.params.guides
      .split("-")
      .map((el) => (el = el.charAt(0).toUpperCase() + el.slice(1)))
      .join(" ") : "";

  const pageNumber = context.query?.page ? +context.query?.page : 1;

  const regions = await prisma.$queryRaw<RegionType[]>(
    Prisma.sql`SELECT "id", "Code", "Country", "CountryI2", "Name", "TypeLocal", "TypeEn", "Type", "Points", "Points2" FROM "AdminRegions" WHERE "Country" = ${regionName}`
  );

  const airports = await prisma.$queryRawUnsafe<
    AirportItem[]
  >(`SELECT ST_X(a."Center"::geometry) as "CenterX", ST_Y(a."Center"::geometry) as "CenterY", a."Passengers", a."Name", a."Type", a."IATA", a."ICAO", a."City", a."Country", "IntroEn", "SeoTitleEn", "SeoDescriptionEn"
               FROM "Airports" a
               INNER JOIN "AdminRegions" r
               ON ST_Intersects(a."Center", r."Geometry") and r."Country" = '${regionName}'
               ORDER BY a."Passengers" LIMIT 20 OFFSET '${
                 (pageNumber - 1) * 10
               }'`);

  const airportsCount = await prisma.$queryRaw<[{ count: bigint }]>(
    Prisma.sql`SELECT COUNT(*) FROM "Airports" a
               INNER JOIN "AdminRegions" r
               ON ST_Intersects(a."Center", r."Geometry") and r."Country" = ${regionName}`
  );

  return {
    props: {
      regions,
      airports,
      airportsCount: Number(airportsCount[0].count),
    },
  };
};
