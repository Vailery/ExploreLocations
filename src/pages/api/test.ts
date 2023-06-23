import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
WITH RECURSIVE child_region AS (
  SELECT id, "IdParent", "Name", "Type"
  FROM "Regions"
  WHERE id = 65523

UNION ALL
    SELECT r.id, r."IdParent", r."Name", r."Type"
    FROM "Regions" r
    INNER JOIN child_region as cr ON r."id" = cr."IdParent"
)

SELECT id, "IdParent", "Name", "Type"
FROM child_region;
`
  );

  console.log(airportNames);
};

export default a;
