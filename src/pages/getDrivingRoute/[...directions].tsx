import type { GetServerSideProps } from "next";
import { prisma } from "~/src/server/db";

const GetCountryIDPage = ({ id }: { id: { id: number }[] }) => {
  return <div className="flex flex-col">{id.map((el, idx) => <div key={idx}>{el.id}</div>)}</div>;
};

export default GetCountryIDPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const directions = Array.isArray(context.query.directions)
    ? context.query.directions.map((el) =>
        el.toLowerCase().split("_").join(" ")
      )
    : ["", ""];

  const id = await prisma.$queryRawUnsafe<[{ id: number }]>(
    `SELECT "id" FROM "DrivingRoutes" WHERE LOWER("RegionFromCityName") = '${
      directions[0]?.toLowerCase() || ""
    }' AND LOWER("RegionToCityName") = '${directions[1]?.toLowerCase() || ""}'`
  );

  return {
    props: {
      id: id,
    },
  };
};
