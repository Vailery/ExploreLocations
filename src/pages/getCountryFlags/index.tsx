import { iso1A2Code } from "@rapideditor/country-coder";
import type { GetServerSideProps } from "next";
import ReactCountryFlag from "react-country-flag";
import { prisma } from "~/src/server/db";

const GetCountryFlags = ({
  countries,
}: {
  countries: { id: number; Name: string }[];
}) => {
  return (
    <div className="flex flex-col">
      {countries.map((el, idx) => (
        <div key={idx}>
          <ReactCountryFlag
            countryCode={iso1A2Code(el.Name) || ""}
            svg
            style={{
              width: "50px",
              height: "30px",
            }}
          />
          {el.Name} {iso1A2Code(el.Name)} {el.id}
        </div>
      ))}
    </div>
  );
};

export default GetCountryFlags;

export const getServerSideProps: GetServerSideProps = async () => {
  const countries = await prisma.$queryRawUnsafe<[{ id: number }]>(
    `SELECT DISTINCT "id", "Name" FROM "Regions" WHERE "Type" = 'country'`
  );

  return {
    props: {
      countries: countries,
    },
  };
};
