import type { GetServerSideProps, NextPage } from "next";
import { getCities } from "~/src/utils/sqlQueries/cities";
import {
  getDrivingDistances,
  getDrivingRoute,
} from "~/src/utils/sqlQueries/drivingRoutes";
import type { CityType, DrivingDistanceType } from "~/src/utils/types";
import { DrivingDistancePage } from "../../../components/pages/DrivingDistancePage";

interface DrivingDistancesPageProps {
  drivingDistanceData: DrivingDistanceType;
  relatedOriginDistances: DrivingDistanceType[];
  relatedDestinationDistances: DrivingDistanceType[];
  originCity: CityType | null;
  destinationCity: CityType | null;
}

const DrivingDistance: NextPage<DrivingDistancesPageProps> = ({
  drivingDistanceData,
  relatedDestinationDistances,
  relatedOriginDistances,
  originCity,
  destinationCity,
}) => {
  return (
    <DrivingDistancePage
      drivingDistanceData={drivingDistanceData}
      relatedDestinationDistances={relatedDestinationDistances}
      relatedOriginDistances={relatedOriginDistances}
      originCity={originCity}
      destinationCity={destinationCity}
    />
  );
};

export default DrivingDistance;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<
  DrivingDistancesPageProps
> = async (context) => {
  const directions = Array.isArray(context.query.directions)
    ? context.query.directions.map((el) =>
        `${el[0] ? el[0].toUpperCase() : ""}${el.substring(1, el.length)}`
          .split("_")
          .join(" ")
      )
    : ["", ""];

  const drivingDistanceData = await getDrivingRoute(
    directions[0] || "",
    directions[1] || ""
  );

  const relatedOriginDistances = await getDrivingDistances(
    drivingDistanceData[0].RegionToCityName,
    drivingDistanceData[0].id
  );
  const relatedDestinationDistances = await getDrivingDistances(
    drivingDistanceData[0].RegionFromCityName,
    drivingDistanceData[0].id
  );
  const originCity = await getCities(
    `WHERE "Name" = '${drivingDistanceData[0].RegionFromCityName}'`
  );
  const destinationCity = await getCities(
    `WHERE "Name" = '${drivingDistanceData[0].RegionToCityName}'`
  );
  return {
    props: {
      drivingDistanceData: drivingDistanceData[0],
      relatedDestinationDistances: relatedDestinationDistances,
      relatedOriginDistances: relatedOriginDistances,
      originCity: originCity[0] || null,
      destinationCity: destinationCity[0] || null,
    },
  };
};
