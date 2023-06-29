import { feature, iso1A2Code } from "@rapideditor/country-coder";
import clsx from "clsx";
import type { GetServerSideProps } from "next";
import ReactCountryFlag from "react-country-flag";
import { prisma } from "~/src/server/db";

const GetCountryFlags = ({
  countries,
  names,
}: {
  countries: { id: number; Name: string }[];
  names: [[string, string, string]];
}) => {
  return (
    <>
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
      <div className="my-3 h-1 bg-black" />
      <div className="flex flex-col">
        {names.map((el, idx) => {
          console.log(feature(el[1] || ""));

          return (
            <div key={idx} className={clsx((el[0].includes("?") || !el[2]) && 'bg-red-500')}>
              <ReactCountryFlag
                countryCode={el[1]}
                svg
                style={{
                  width: "50px",
                  height: "30px",
                }}
              />
              old name:{el[0]}, code: {el[1]}, new name: {el[2]}
            </div>
          );
        })}
        <div>
          {JSON.stringify(
            names.map((el) => ({
              oldName: el[0],
              newName: el[2],
              ISO2code: el[1],
            }))
          )}
        </div>
      </div>
    </>
  );
};

export default GetCountryFlags;

export const getServerSideProps: GetServerSideProps = async () => {
  const countries = await prisma.$queryRawUnsafe<[{ id: number }]>(
    `SELECT DISTINCT "id", "Name" FROM "Regions" WHERE "Type" = 'country'`
  );

  const names = [
    ["Azores", "PT"],
    ["Bonaire", "BQ"],
    ["Brunei Darussalam", "BN"],
    ["Cabo Verde", "CV"],
    ["Canarias", "IC"],
    ["China", "CN"],
    ["Cocos Islands", "CC"],
    ["Congo", "CG"],
    ["Congo DRC ?", "CG"],
    ["Curacao", "CW"],
    ["Cyprus", "CY"],
    ["Czech Republic", "CZ"],
    ["Denmark", "DK"],
    ["Glorioso Islands", "TF"],
    ["Guernsey", "GG"],
    ["Ireland", "IE"],
    ["Jersey", "JE"],
    ["Juan De Nova Island", "JU"],
    ["Madeira ?", "PT"],
    ["Micronesia", "FM"],
    ["Netherlands", "NL"],
    ["Palestinian Territory", "PS"],
    ["Pitcairn", "PN"],
    ["Russian Federation", "RU"],
    ["Saba ?", "BQ-SA"],
    ["Saint Barthelemy", "BL"],
    ["Saint Eustatius ?", "	BQ-SE"],
    ["Saint Helena", "SH"],
    ["Saint Kitts and Nevis", "KN"],
    ["Saint Lucia", "LC"],
    ["Saint Vincent and the Grenadines", "VC"],
    ["Sao Tome and Principe", "ST"],
    ["Svalbard", "SJ"],
    ["Turkiye", "TR"],
    ["United States", "US"],
    ["US Virgin Islands", "VI"],
  ].map((el) => {
    el.push(feature(el[1] || "")?.properties.nameEn || "");
    return el;
  });

  return {
    props: {
      countries: countries,
      names: names,
    },
  };
};
