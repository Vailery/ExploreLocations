import type { GetServerSideProps, NextPage } from "next";
import { DrivingHubPage } from "~/src/components/pages/DrivingHubPage";

const DrivingDistance: NextPage = () => {
  return <DrivingHubPage />;
};

export default DrivingDistance;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
