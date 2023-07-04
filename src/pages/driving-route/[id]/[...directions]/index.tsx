import type { GetServerSideProps, NextPage } from "next";
import { getCities } from "~/src/utils/sqlQueries/cities";
import {
  getDrivingDistances,
  getDrivingRoute,
} from "~/src/utils/sqlQueries/drivingRoutes";
import type { CityType, DrivingDistanceType } from "~/src/utils/types";
import { DrivingDistancePage } from "../../../../components/pages/DrivingDistancePage";

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
  // const directions = Array.isArray(context.query.directions)
  //   ? context.query.directions.map((el) =>
  //       el.toLowerCase().split("_").join(" ")
  //     )
  //   : ["", ""];

  const routeId = context.params && (context.params.id as string);

  const drivingDistanceData = (await getDrivingRoute(routeId || ""))[0];
  console.log(drivingDistanceData)

  const relatedOriginDistances = await getDrivingDistances(
    drivingDistanceData.RegionToCityName,
    drivingDistanceData.id
  );
  const relatedDestinationDistances = await getDrivingDistances(
    drivingDistanceData.RegionFromCityName,
    drivingDistanceData.id
  );
  const originCity =
    (
      await getCities(
        `WHERE LOWER("Name") = '${drivingDistanceData.RegionFromCityName.toLowerCase()}'`
      )
    )[0] || null;

  const destinationCity =
    (
      await getCities(
        `WHERE LOWER("Name") = '${drivingDistanceData.RegionToCityName.toLowerCase()}'`
      )
    )[0] || null;

  return {
    props: {
      drivingDistanceData,
      relatedDestinationDistances,
      relatedOriginDistances,
      originCity,
      destinationCity,
    },
  };
};
