import type { GetServerSideProps, NextPage } from "next";
import { getDrivingRoute } from "~/src/utils/sqlQueries/drivingRoutes";
import type { DrivingDistanceType } from "~/src/utils/types";
import { DrivingDistancePage } from "../../../components/pages/DrivingDistancePage";

const DrivingDistance: NextPage<{
  drivingDistanceData: DrivingDistanceType;
}> = (drivingDistanceData) => {
  return (
    <DrivingDistancePage
      drivingDistanceData={drivingDistanceData.drivingDistanceData}
    />
  );
};

export default DrivingDistance;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;

  const drivingDistanceData = await getDrivingRoute(+id);

  return {
    props: {
      drivingDistanceData: drivingDistanceData[0],
    },
  };
};
