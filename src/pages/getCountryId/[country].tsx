import type { GetServerSideProps } from "next";
import { prisma } from "~/src/server/db";

const GetCountryIDPage = ({ id }: { id: { id: number, Name: string }[] }) => {
  return <div className="flex flex-col">{id.map((el, idx) => <div key={idx}>{el.id}/{el.Name}</div>)}</div>;
};

export default GetCountryIDPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const regionName =
    typeof context.params?.country === "string"
      ? context.params.country
          .split("-")
          .map((el) => el.toLowerCase())
          .join(" ")
      : "";

  const id = await prisma.$queryRawUnsafe<[{ id: number }]>(
    `SELECT "id", "Name" FROM "AdminRegions" WHERE LOWER("Country") = '${regionName.toLowerCase()}'`
  );

  return {
    props: {
      id: id,
    },
  };
};
